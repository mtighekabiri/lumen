"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";

// Client-side cache for HTML translations
const htmlCache = new Map<string, string>();

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString(36);
}

/**
 * Extracts text nodes from HTML, translates them, and reassembles.
 * Preserves all HTML tags, attributes, and structure.
 */
async function translateHTML(html: string, targetLang: string): Promise<string> {
  // Extract text segments (content between/outside tags)
  const parts: { type: "tag" | "text"; value: string }[] = [];
  const tagRegex = /<[^>]+>/g;
  let lastIndex = 0;
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: html.slice(lastIndex, match.index) });
    }
    parts.push({ type: "tag", value: match[0] });
    lastIndex = tagRegex.lastIndex;
  }
  if (lastIndex < html.length) {
    parts.push({ type: "text", value: html.slice(lastIndex) });
  }

  // Collect non-empty text segments for batch translation
  const textsToTranslate: string[] = [];
  const textIndices: number[] = [];

  parts.forEach((part, index) => {
    if (part.type === "text" && part.value.trim()) {
      textsToTranslate.push(part.value);
      textIndices.push(index);
    }
  });

  if (textsToTranslate.length === 0) return html;

  // Batch translate
  const response = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts: textsToTranslate, targetLang }),
  });

  const data = await response.json();
  if (!data.translations) return html;

  // Reassemble with translated text
  data.translations.forEach((translated: string, i: number) => {
    parts[textIndices[i]].value = translated;
  });

  return parts.map((p) => p.value).join("");
}

interface TranslatedHTMLProps {
  /** The original HTML content */
  html: string;
  /** CSS class for the container */
  className?: string;
}

/**
 * Client component that renders HTML content translated to the current language.
 * When language is 'en', shows original HTML.
 * Otherwise, extracts text, translates it, and renders the translated HTML.
 */
export function TranslatedHTML({ html, className }: TranslatedHTMLProps) {
  const { language } = useLanguage();
  const [translatedHTML, setTranslatedHTML] = useState(html);

  useEffect(() => {
    if (language === "en" || !html.trim()) {
      setTranslatedHTML(html);
      return;
    }

    const cacheKey = `${language}:${hashString(html)}`;
    const cached = htmlCache.get(cacheKey);
    if (cached) {
      setTranslatedHTML(cached);
      return;
    }

    let cancelled = false;

    translateHTML(html, language)
      .then((result) => {
        if (!cancelled) {
          htmlCache.set(cacheKey, result);
          setTranslatedHTML(result);
        }
      })
      .catch(() => {
        // On error, keep original HTML
      });

    return () => {
      cancelled = true;
    };
  }, [html, language]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: translatedHTML }}
    />
  );
}
