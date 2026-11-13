import { NextRequest, NextResponse } from "next/server";
import { requireActiveRole } from "@/lib/iam/auth-middleware";
import { deleteImageById } from "@/lib/iam/db";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Backend server-side role check middleware: strictly blocks CONTRIBUTOR
  const auth = await requireActiveRole(req, ["ADMIN", "MANAGER"]);
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  const deleted = await deleteImageById(id);
  if (!deleted) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
}
