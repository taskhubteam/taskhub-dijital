import { SITE_URL } from "@/lib/site";

/**
 * IndexNow (https://www.indexnow.org): tells Bing — and through it ChatGPT search and Copilot —
 * plus Yandex, Seznam and Naver that URLs changed, so they're recrawled within hours.
 * The key is public by design; it must match the file at /<key>.txt in public/.
 */
export const INDEXNOW_KEY = "9ad10b53e60308c4f811929672e2775f";

/** Notify IndexNow about changed URLs (paths or absolute). Production only; never throws. */
export async function pingIndexNow(paths: string[]): Promise<void> {
  if (process.env.SITE_ENV !== "production" || paths.length === 0) return;
  const host = new URL(SITE_URL).host;
  const urlList = [...new Set(paths.map((p) => (p.startsWith("http") ? p : `${SITE_URL}${p}`)))];
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok && res.status !== 202) {
      console.error("IndexNow ping failed:", res.status, await res.text());
    }
  } catch (error) {
    console.error("IndexNow ping failed:", error);
  }
}
