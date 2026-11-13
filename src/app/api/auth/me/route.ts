import { NextRequest, NextResponse } from "next/server";
import { requireActiveRole } from "@/lib/iam/auth-middleware";

export async function GET(req: NextRequest) {
  const auth = requireActiveRole(req, ["ADMIN", "MANAGER", "CONTRIBUTOR"]);
  if (!auth.ok) return auth.response;
  return NextResponse.json({ user: auth.user }, { status: 200 });
}

