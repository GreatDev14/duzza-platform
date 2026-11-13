import { NextRequest, NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { z } from "zod";
import { createUser } from "@/lib/iam/db";

const signupSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const botCheck = await checkBotId();
    if (botCheck.isBot) {
      return NextResponse.json(
        { error: "Automated signup blocked by Vercel BotID." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid signup details" },
        { status: 400 }
      );
    }

    // Rigid enforcement: all public signups default to CONTRIBUTOR + PENDING status
    const user = createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
      role: "CONTRIBUTOR",
      status: "PENDING",
    });

    return NextResponse.json(
      {
        message:
          "Registration received. Your account status is PENDING and awaits approval from an ADMIN or MANAGER before you can access the dashboard.",
        user,
      },
      { status: 201 }
    );
  } catch (err: any) {
    const isDuplicate = err?.message?.includes("already exists");
    return NextResponse.json(
      { error: err?.message || "Signup failed" },
      { status: isDuplicate ? 409 : 500 }
    );
  }
}

