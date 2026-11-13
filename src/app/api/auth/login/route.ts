import { NextRequest, NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { z } from "zod";
import {
  SESSION_COOKIE_NAME,
  signSessionToken,
  verifyPassword,
} from "@/lib/iam/crypto";
import {
  findUserByEmail,
  recordLoginAudit,
  sanitizeUser,
} from "@/lib/iam/db";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  try {
    const botCheck = await checkBotId();
    if (botCheck.isBot) {
      return NextResponse.json(
        { error: "Automated request blocked by Vercel BotID." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid login input" },
        { status: 400 }
      );
    }

    const email = parsed.data.email.trim().toLowerCase();
    const password = parsed.data.password;
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "Unknown Client";

    const user = findUserByEmail(email);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      recordLoginAudit({
        userId: user ? user.id : null,
        name: user ? user.name : "Unregistered / Unknown",
        email,
        role: user ? user.role : "UNKNOWN",
        status: "FAILED_CREDENTIALS",
        ipAddress,
        userAgent,
      });

      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    if (user.status === "PENDING") {
      recordLoginAudit({
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: "BLOCKED_PENDING",
        ipAddress,
        userAgent,
      });

      return NextResponse.json(
        {
          error:
            "Your account is currently PENDING approval. You have no access to the dashboard until an ADMIN or MANAGER activates your account.",
          code: "ACCOUNT_PENDING",
        },
        { status: 403 }
      );
    }

    if (user.status === "SUSPENDED") {
      recordLoginAudit({
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: "BLOCKED_SUSPENDED",
        ipAddress,
        userAgent,
      });

      return NextResponse.json(
        {
          error: "Your account has been SUSPENDED. Please contact an ADMIN or MANAGER.",
          code: "ACCOUNT_SUSPENDED",
        },
        { status: 403 }
      );
    }

    // Successful ACTIVE login -> log audit event and issue HTTP-only signed session cookie
    recordLoginAudit({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: "SUCCESS",
      ipAddress,
      userAgent,
    });

    const token = signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: sanitizeUser(user),
      },
      { status: 200 }
    );

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Authentication failed" },
      { status: 500 }
    );
  }
}

