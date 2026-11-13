import { Pool, PoolConfig } from "pg";

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (pool) return pool;

  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    "postgresql://postgres:postgres@localhost:5432/duzza_enterprise";

  const config: PoolConfig = {
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    ssl:
      connectionString.includes("localhost") || connectionString.includes("127.0.0.1")
        ? undefined
        : { rejectUnauthorized: false },
  };

  pool = new Pool(config);

  pool.on("error", (err) => {
    console.error("[PostgreSQL Pool Unexpected Error]:", err);
  });

  return pool;
}

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const db = getDbPool();
  const start = Date.now();
  try {
    const res = await db.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === "development") {
      console.log(`[Database Query Executed] Duration: ${duration}ms | Rows: ${res.rowCount}`);
    }
    return res.rows as T[];
  } catch (error) {
    console.error("[Database Query Error]:", (error as any).message);
    throw error;
  }
}
