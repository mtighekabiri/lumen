import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const EXTENSIONS = [".png", ".jpg", ".jpeg"];

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name || /[^a-zA-Z0-9_-]/.test(name)) {
    return NextResponse.json({ src: null }, { status: 400 });
  }

  const devicesDir = path.join(process.cwd(), "public", "devices");

  let src: string | null = null;
  let heatmap: string | null = null;

  for (const ext of EXTENSIONS) {
    if (!src) {
      const filePath = path.join(devicesDir, `${name}${ext}`);
      if (fs.existsSync(filePath)) {
        src = `/devices/${name}${ext}`;
      }
    }
    if (!heatmap) {
      const heatmapPath = path.join(devicesDir, `${name}_heatmap${ext}`);
      if (fs.existsSync(heatmapPath)) {
        heatmap = `/devices/${name}_heatmap${ext}`;
      }
    }
  }

  return NextResponse.json({ src, heatmap });
}
