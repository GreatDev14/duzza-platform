import { NextRequest, NextResponse } from "next/server";
import { requireActiveRole } from "@/lib/iam/auth-middleware";
import { listLoginAuditLogs } from "@/lib/iam/db";

export async function GET(req: NextRequest) {
  const auth = requireActiveRole(req, ["ADMIN", "MANAGER"]);
  if (!auth.ok) return auth.response;

  const logs = listLoginAuditLogs();
  return NextResponse.json({ logs }, { status: 200 });
}

