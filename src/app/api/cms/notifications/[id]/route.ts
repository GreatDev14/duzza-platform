import { NextRequest, NextResponse } from "next/server";
import { requireActiveRole } from "@/lib/iam/auth-middleware";
import { deleteNotificationById } from "@/lib/iam/db";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireActiveRole(req, ["ADMIN", "MANAGER"]);
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  const deleted = await deleteNotificationById(id);
  if (!deleted) {
    return NextResponse.json({ error: "Notification not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Notification deleted successfully" }, { status: 200 });
}
