import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

export interface AwardEntry {
  title: string;
  placement: string;
  year: string;
  image: string;
  organisation?: string;
}

export interface AwardWithImage extends AwardEntry {
  imageSrc: string | null;
}

export async function GET() {
  const awardsDir = path.join(process.cwd(), "public", "awards");
  const jsonPath = path.join(awardsDir, "awards.json");

  if (!fs.existsSync(jsonPath)) {
    return NextResponse.json([]);
  }

  let raw: AwardEntry[];
  try {
    const content = fs.readFileSync(jsonPath, "utf-8");
    raw = JSON.parse(content);
  } catch {
    return NextResponse.json([], { status: 500 });
  }

  // Filter out the instructions entry (has _INSTRUCTIONS key)
  const awards = raw.filter(
    (entry) => !("_INSTRUCTIONS" in entry) && entry.title,
  );

  const result: AwardWithImage[] = awards.map((award) => {
    let imageSrc: string | null = null;

    if (award.image) {
      // Check if the specified image file exists
      const filePath = path.join(awardsDir, award.image);
      if (fs.existsSync(filePath)) {
        imageSrc = `/awards/${award.image}`;
      }
    } else {
      // Auto-discover: try title-based filename (kebab-case)
      const slug = award.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      for (const ext of IMAGE_EXTENSIONS) {
        const filePath = path.join(awardsDir, `${slug}${ext}`);
        if (fs.existsSync(filePath)) {
          imageSrc = `/awards/${slug}${ext}`;
          break;
        }
      }
    }

    return { ...award, imageSrc };
  });

  return NextResponse.json(result);
}
