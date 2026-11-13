import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireActiveRole } from "@/lib/iam/auth-middleware";
import { deleteUserById, findUserById, updateUser } from "@/lib/iam/db";

const patchUserSchema = z.object({
  status: z.enum(["PENDING", "ACTIVE", "SUSPENDED"]).optional(),
  role: z.enum(["ADMIN", "MANAGER", "CONTRIBUTOR"]).optional(),
  name: z.string().min(2).optional(),
});

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = requireActiveRole(req, ["ADMIN", "MANAGER"]);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await context.params;
    const body = await req.json();
    const parsed = patchUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid update payload" },
        { status: 400 }
      );
    }

    const target = findUserById(id);
    if (!target) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // MANAGER cannot promote someone to ADMIN or modify an ADMIN account
    if (auth.user.role !== "ADMIN") {
      if (target.role === "ADMIN" || parsed.data.role === "ADMIN") {
        return NextResponse.json(
          { error: "Forbidden: Only an ADMIN can modify ADMIN privileges." },
          { status: 403 }
        );
      }
    }

    const updated = updateUser(id, parsed.data);
    return NextResponse.json({ user: updated }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update user" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = requireActiveRole(req, ["ADMIN", "MANAGER"]);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await context.params;
    const target = findUserById(id);
    if (!target) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (target.id === auth.user.id) {
      return NextResponse.json(
        { error: "You cannot delete your own active session account." },
        { status: 400 }
      );
    }

    if (target.role === "ADMIN" && auth.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: A MANAGER cannot delete an ADMIN account." },
        { status: 403 }
      );
    }

    const deleted = deleteUserById(id);
    if (!deleted) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Account deleted successfully." }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to delete user" },
      { status: 400 }
    );
  }
}

