import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireActiveRole } from "@/lib/iam/auth-middleware";
import { createUser, listUsers } from "@/lib/iam/db";

const inviteUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(4, "Initial password must be at least 4 characters"),
  role: z.enum(["ADMIN", "MANAGER", "CONTRIBUTOR"]).default("CONTRIBUTOR"),
  status: z.enum(["ACTIVE", "PENDING"]).default("ACTIVE"),
});

export async function GET(req: NextRequest) {
  const auth = await requireActiveRole(req, ["ADMIN", "MANAGER"]);
  if (!auth.ok) return auth.response;

  const users = await listUsers();
  return NextResponse.json({ users }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const auth = await requireActiveRole(req, ["ADMIN", "MANAGER"]);
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json();
    const parsed = inviteUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid user payload" },
        { status: 400 }
      );
    }

    // Only ADMIN can invite another ADMIN; MANAGER can invite MANAGER or CONTRIBUTOR
    if (parsed.data.role === "ADMIN" && auth.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Only an ADMIN can assign the ADMIN role." },
        { status: 403 }
      );
    }

    const user = await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
      role: parsed.data.role,
      status: parsed.data.status,
      invitedBy: auth.user.email,
    });

    return NextResponse.json({ user, message: "User invited successfully." }, { status: 201 });
  } catch (err: any) {
    const isDuplicate = err?.message?.includes("already exists");
    return NextResponse.json(
      { error: err?.message || "Failed to invite user" },
      { status: isDuplicate ? 409 : 500 }
    );
  }
}

