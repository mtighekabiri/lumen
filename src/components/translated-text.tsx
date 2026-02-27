"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";

// Client-side cache shared across all instances
const clientCache = new Map<string, string>();

interface TranslatedTextProps {
  /** The original English text to translate */
  text: string;
  /** Optional element type (defaults to span) */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Pass-through className */
  className?: string;
}

/**
 * Client component that displays text in the current language.
 * When language is 'en', shows original text.
 * Otherwise, fetches a translation from the API and caches it.
 */
export function TranslatedText({ text, as: Tag = "span", className }: TranslatedTextProps) {
  const { language } = useLanguage();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    if (language === "en" || !text.trim()) {
      setTranslated(text);
      return;
    }

    const cacheKey = `${language}:${text}`;
    const cached = clientCache.get(cacheKey);
    if (cached) {
      setTranslated(cached);
      return;
    }

    let cancelled = false;

    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLang: language }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.translation) {
          clientCache.set(cacheKey, data.translation);
          setTranslated(data.translation);
        }
      })
      .catch(() => {
        // On error, keep original text
      });

    return () => {
      cancelled = true;
    };
  }, [text, language]);

  return <Tag className={className}>{translated}</Tag>;
}
