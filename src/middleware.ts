import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "duzza_cms_session";

function getAuthSecret(): string {
  return (
    process.env.AUTH_SECRET ||
    process.env.SYSTEM_ENCRYPTION_KEY ||
    "duzza-enterprise-iam-secret-2026-cama-rc7149208"
  );
}

function base64UrlToUint8Array(base64Url: string): Uint8Array {
  const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
  const base64 = (base64Url + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function verifyEdgeSession(token: string | undefined): Promise<{
  userId: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "CONTRIBUTOR";
  exp: number;
} | null> {
  if (!token || !token.includes(".")) return null;
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;

  try {
    const keyData = new TextEncoder().encode(getAuthSecret());
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBytes = base64UrlToUint8Array(sig);
    const dataBytes = new TextEncoder().encode(encoded);
    const valid = await crypto.subtle.verify(
      "HMAC",
      cryptoKey,
      sigBytes as BufferSource,
      dataBytes as BufferSource
    );
    if (!valid) return null;

    const jsonStr = new TextDecoder().decode(base64UrlToUint8Array(encoded));
    const payload = JSON.parse(jsonStr);
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifyEdgeSession(token);

  // 1. Protect /cms/dashboard pages
  if (pathname.startsWith("/cms/dashboard")) {
    if (!session) {
      const loginUrl = new URL("/cms/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 2. Protect /api/cms/* backend endpoints with role-based middleware
  if (pathname.startsWith("/api/cms")) {
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: CMS authentication required." },
        { status: 401 }
      );
    }

    // Strict middleware block: CONTRIBUTOR cannot perform ANY DELETE request
    if (req.method === "DELETE" && session.role === "CONTRIBUTOR") {
      return NextResponse.json(
        {
          error:
            "STRICTLY FORBIDDEN (Middleware): CONTRIBUTOR accounts are blocked from deleting projects, images, notifications, or user accounts.",
          code: "CONTRIBUTOR_DELETE_BLOCKED",
        },
        { status: 403 }
      );
    }

    // Strict middleware block: Only ADMIN & MANAGER can access user management or audit logs
    if (
      (pathname.startsWith("/api/cms/users") || pathname.startsWith("/api/cms/audit-logs")) &&
      session.role === "CONTRIBUTOR"
    ) {
      return NextResponse.json(
        {
          error:
            "Forbidden (Middleware): Only ADMIN and MANAGER roles can access IAM user management or audit logs.",
          code: "INSUFFICIENT_ROLE_PRIVILEGE",
        },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cms/dashboard/:path*", "/api/cms/:path*"],
};

