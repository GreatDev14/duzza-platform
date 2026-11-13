import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireActiveRole } from "@/lib/iam/auth-middleware";
import { createProject, listProjects } from "@/lib/iam/db";

const createProjectSchema = z.object({
  title: z.string().min(3, "Project title is required"),
  division: z.enum(["Duzza Projects", "Duzza Branding", "Duzza Fashion", "Duzza Bakery"]),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(5, "Project description is required"),
  imageUrl: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const auth = await requireActiveRole(req, ["ADMIN", "MANAGER", "CONTRIBUTOR"]);
  if (!auth.ok) return auth.response;

  const projects = await listProjects();
  return NextResponse.json({ projects }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const auth = await requireActiveRole(req, ["ADMIN", "MANAGER", "CONTRIBUTOR"]);
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json();
    const parsed = createProjectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid project data" },
        { status: 400 }
      );
    }

    const project = await createProject({
      title: parsed.data.title.trim(),
      division: parsed.data.division,
      location: parsed.data.location.trim(),
      description: parsed.data.description.trim(),
      imageUrl:
        parsed.data.imageUrl?.trim() ||
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80",
      createdBy: auth.user.name,
      createdByEmail: auth.user.email,
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
