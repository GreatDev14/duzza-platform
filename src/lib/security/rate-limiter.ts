import Redis from "ioredis";

// In-memory fallback bucket for resilience during local development or network partition
interface MemoryBucket {
  tokens: number;
  lastRefill: number;
}
const memoryBuckets = new Map<string, MemoryBucket>();

let redisClient: Redis | null = null;

function getRedisInstance(): Redis | null {
  if (redisClient) return redisClient;
  const redisUrl = process.env.REDIS_URL;

  // Only attempt Redis connection if explicitly pointing to a real reachable host (not placeholder .internal)
  if (redisUrl && !redisUrl.includes("Example") && !redisUrl.includes(".internal") && !redisUrl.includes("localhost")) {
    try {
      redisClient = new Redis(redisUrl, {
        maxRetriesPerRequest: 1,
        connectTimeout: 1000,
        lazyConnect: true,
      });
      redisClient.on("error", () => {
        redisClient = null;
      });
    } catch {
      redisClient = null;
    }
  }
  return redisClient;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
  limit: number;
}

/**
 * Token Bucket / Sliding Window Rate Limiter
 * @param identifier Unique client key (IP, User UUID, or Session hash)
 * @param limit Maximum allowed requests per window
 * @param windowSeconds Window duration in seconds
 */
export async function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowSeconds: number = 60
): Promise<RateLimitResult> {
  const redis = getRedisInstance();
  const key = `rate_limit:enquiry:${identifier}`;

  if (redis) {
    try {
      // Redis pipeline with atomic increment and expiry
      const multi = redis.multi();
      multi.incr(key);
      multi.ttl(key);
      const results = await multi.exec();

      if (results && results[0] && results[1]) {
        const count = results[0][1] as number;
        let ttl = results[1][1] as number;

        if (ttl === -1) {
          // Set TTL if first hit
          await redis.expire(key, windowSeconds);
          ttl = windowSeconds;
        }

        const remaining = Math.max(0, limit - count);
        const allowed = count <= limit;

        return {
          allowed,
          remaining,
          resetSeconds: ttl > 0 ? ttl : windowSeconds,
          limit,
        };
      }
    } catch (err: any) {
      console.warn("[Redis Rate Limiter Error - Falling back to local memory bucket]:", err.message);
    }
  }

  // Resilient In-Memory Sliding Bucket Fallback
  const now = Date.now();
  const bucket = memoryBuckets.get(key) || { tokens: limit, lastRefill: now };

  const elapsedSeconds = (now - bucket.lastRefill) / 1000;
  const tokensToAdd = elapsedSeconds * (limit / windowSeconds);
  bucket.tokens = Math.min(limit, bucket.tokens + tokensToAdd);
  bucket.lastRefill = now;

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    memoryBuckets.set(key, bucket);
    return {
      allowed: true,
      remaining: Math.floor(bucket.tokens),
      resetSeconds: Math.ceil(windowSeconds - elapsedSeconds),
      limit,
    };
  } else {
    memoryBuckets.set(key, bucket);
    return {
      allowed: false,
      remaining: 0,
      resetSeconds: Math.ceil(windowSeconds - elapsedSeconds),
      limit,
    };
  }
}

