import { readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const PARTNERS_DIR = path.join(process.cwd(), "public", "partners");
const ALLOWED_EXT = new Set([".svg", ".png", ".jpg", ".jpeg", ".webp"]);

const PREFIX_TO_CHART: Record<string, string> = {
  "1": "profit",
  "2": "brandLift",
  "3": "performance",
};

export async function GET() {
  try {
    const files = await readdir(PARTNERS_DIR);
    const logos = files
      .filter((f) => ALLOWED_EXT.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => {
        const name = path.basename(f, path.extname(f));
        const prefix = name.charAt(0);
        const chart = PREFIX_TO_CHART[prefix] ?? "profit";
        const alt = name.replace(/^[123]/, "").replace(/[-_]/g, " ").trim();
        return { src: `/partners/${f}`, alt, chart };
      });
    return NextResponse.json(logos);
  } catch {
    return NextResponse.json([]);
  }
}
