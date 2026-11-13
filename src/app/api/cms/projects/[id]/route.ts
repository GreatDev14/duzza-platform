import { NextRequest, NextResponse } from "next/server";
import { requireActiveRole } from "@/lib/iam/auth-middleware";
import { deleteProjectById } from "@/lib/iam/db";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Backend server-side role check middleware: strictly blocks CONTRIBUTOR
  const auth = requireActiveRole(req, ["ADMIN", "MANAGER"]);
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  const deleted = deleteProjectById(id);
  if (!deleted) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
}

