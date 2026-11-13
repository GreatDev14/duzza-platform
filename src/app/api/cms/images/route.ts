import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { requireActiveRole } from "@/lib/iam/auth-middleware";
import { createImage, listImages } from "@/lib/iam/db";

export async function GET(req: NextRequest) {
  const auth = requireActiveRole(req, ["ADMIN", "MANAGER", "CONTRIBUTOR"]);
  if (!auth.ok) return auth.response;

  const images = listImages();
  return NextResponse.json({ images }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const auth = requireActiveRole(req, ["ADMIN", "MANAGER", "CONTRIBUTOR"]);
  if (!auth.ok) return auth.response;

  try {
    const contentType = req.headers.get("content-type") || "";
    let title = "";
    let category = "General";
    let finalUrl = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      title = String(formData.get("title") || "").trim();
      category = String(formData.get("category") || "General").trim();
      const file = formData.get("file") as File | null;
      const urlInput = String(formData.get("url") || "").trim();

      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const ext = path.extname(file.name) || ".png";
        const safeName = `duzza-${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        fs.writeFileSync(path.join(uploadDir, safeName), buffer);
        finalUrl = `/uploads/${safeName}`;
        if (!title) title = file.name.replace(ext, "");
      } else if (urlInput) {
        finalUrl = urlInput;
      }
    } else {
      const body = await req.json();
      title = String(body.title || "").trim();
      category = String(body.category || "General").trim();
      finalUrl = String(body.url || "").trim();
    }

    if (!title || !finalUrl) {
      return NextResponse.json(
        { error: "Image title and either an uploaded image file or image URL are required." },
        { status: 400 }
      );
    }

    const image = createImage({
      title,
      category: category || "General",
      url: finalUrl,
      uploadedBy: auth.user.name,
      uploadedByEmail: auth.user.email,
    });

    return NextResponse.json({ image }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}

