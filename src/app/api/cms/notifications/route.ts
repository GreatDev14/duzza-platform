import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireActiveRole } from "@/lib/iam/auth-middleware";
import { createNotification, listNotifications } from "@/lib/iam/db";

const createNotificationSchema = z.object({
  title: z.string().min(3, "Notification title is required"),
  message: z.string().min(4, "Notification message is required"),
  priority: z.enum(["INFO", "IMPORTANT", "URGENT"]).default("INFO"),
});

export async function GET(req: NextRequest) {
  const auth = requireActiveRole(req, ["ADMIN", "MANAGER", "CONTRIBUTOR"]);
  if (!auth.ok) return auth.response;

  const notifications = listNotifications();
  return NextResponse.json({ notifications }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const auth = requireActiveRole(req, ["ADMIN", "MANAGER", "CONTRIBUTOR"]);
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json();
    const parsed = createNotificationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid notification payload" },
        { status: 400 }
      );
    }

    const notification = createNotification({
      title: parsed.data.title.trim(),
      message: parsed.data.message.trim(),
      priority: parsed.data.priority,
      createdBy: auth.user.name,
      createdByEmail: auth.user.email,
    });

    return NextResponse.json({ notification }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to add notification" },
      { status: 500 }
    );
  }
}

