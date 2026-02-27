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
 * Translate plain text using the free Google Translate endpoint.
 * No API key or npm package required.
 */
async function googleTranslate(text: string, targetLang: string): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(text)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Translation request failed: ${res.status}`);

  const data = await res.json();

  // Response format: [[["translated text","original text",null,null,10]],null,"en",...]
  // Concatenate all translated segments
  if (Array.isArray(data) && Array.isArray(data[0])) {
    return data[0]
      .filter((segment: unknown) => Array.isArray(segment) && segment[0])
      .map((segment: string[]) => segment[0])
      .join("");
  }

  throw new Error("Unexpected response format");
}

/**
 * Translate plain text to the target language.
 * Results are cached in memory to avoid repeated requests.
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
    const translated = await googleTranslate(text, targetLang);
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
