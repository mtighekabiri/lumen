import { readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const PARTNERS_DIR = path.join(process.cwd(), "public", "partners");
const ALLOWED_EXT = new Set([".svg", ".png", ".jpg", ".jpeg", ".webp"]);

export async function GET() {
  try {
    const files = await readdir(PARTNERS_DIR);
    const logos = files
      .filter((f) => ALLOWED_EXT.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => ({
        src: `/partners/${f}`,
        alt: path.basename(f, path.extname(f)).replace(/[-_]/g, " "),
      }));
    return NextResponse.json(logos);
  } catch {
    return NextResponse.json([]);
  }
}
