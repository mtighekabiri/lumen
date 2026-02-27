import { NextRequest, NextResponse } from "next/server";
import { translateText, translateBatch } from "@/lib/translate";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, texts, targetLang } = body;

    if (!targetLang) {
      return NextResponse.json(
        { error: "targetLang is required" },
        { status: 400 }
      );
    }

    // Batch translation
    if (Array.isArray(texts)) {
      const translated = await translateBatch(texts, targetLang);
      return NextResponse.json({ translations: translated });
    }

    // Single text translation
    if (typeof text === "string") {
      const translated = await translateText(text, targetLang);
      return NextResponse.json({ translation: translated });
    }

    return NextResponse.json(
      { error: "Provide either 'text' (string) or 'texts' (string[])" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}
