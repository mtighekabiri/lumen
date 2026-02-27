import translate from "google-translate-api-x";

// In-memory translation cache: key = "lang:hash" → translated text
const cache = new Map<string, string>();

function hashText(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString(36);
}

/**
 * Translate plain text to the target language.
 * Results are cached in memory to avoid repeated API calls.
 */
export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  if (!text.trim() || targetLang === "en") return text;

  const key = `${targetLang}:${hashText(text)}`;
  const cached = cache.get(key);
  if (cached) return cached;

  try {
    const result = await translate(text, { to: targetLang });
    const translated = result.text;
    cache.set(key, translated);
    return translated;
  } catch {
    // On error, return original text
    return text;
  }
}

/**
 * Translate multiple texts in a single batch.
 */
export async function translateBatch(
  texts: string[],
  targetLang: string
): Promise<string[]> {
  if (targetLang === "en") return texts;

  const results = await Promise.all(
    texts.map((text) => translateText(text, targetLang))
  );
  return results;
}
