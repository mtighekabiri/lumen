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

  for (const ext of EXTENSIONS) {
    const filePath = path.join(devicesDir, `${name}${ext}`);
    if (fs.existsSync(filePath)) {
      return NextResponse.json({ src: `/devices/${name}${ext}` });
    }
  }

  return NextResponse.json({ src: null });
}
