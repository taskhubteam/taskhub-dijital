import { SITE_URL } from "@/lib/site";
import { getDb, nowIso } from "@/lib/db";

// Server-only (imported by the sitemap / rss / llms.txt server routes).

export type FeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
  updated_at: string;
  featured_image: string | null;
  featured_image_alt: string;
};

/** Live, indexable posts, newest first. */
export async function listFeedPosts(): Promise<FeedPost[]> {
  const { results } = await getDb()
    .prepare(
      `SELECT slug, title, excerpt, category, published_at, updated_at, featured_image,
              featured_image_alt FROM posts
       WHERE status = 'published' AND published_at IS NOT NULL AND published_at <= ? AND noindex = 0
       ORDER BY published_at DESC`,
    )
    .bind(nowIso())
    .all<FeedPost>();
  return results;
}

/** Full article HTML for /llms-full.txt (same filter as listFeedPosts). */
export async function listFeedPostBodies(): Promise<(FeedPost & { content_html: string })[]> {
  const { results } = await getDb()
    .prepare(
      `SELECT slug, title, excerpt, category, published_at, updated_at, featured_image,
              featured_image_alt, content_html FROM posts
       WHERE status = 'published' AND published_at IS NOT NULL AND published_at <= ? AND noindex = 0
       ORDER BY published_at DESC`,
    )
    .bind(nowIso())
    .all<FeedPost & { content_html: string }>();
  return results;
}

/** Minimal HTML → Markdown for stored post bodies (headings, lists, code, links, emphasis). */
export function htmlToMarkdown(html: string): string {
  const decode = (s: string) =>
    s
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&");
  const codeBlocks: string[] = [];
  let md = html.replace(/<pre\b[^>]*>\s*<code\b[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi, (_, code) => {
    codeBlocks.push("```\n" + decode(code).trim() + "\n```");
    return `\n\n@@CODE${codeBlocks.length - 1}@@\n\n`;
  });
  md = md
    .replace(
      /<h([2-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi,
      (_, n, t) => `\n\n${"#".repeat(Number(n))} ${t}\n\n`,
    )
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1")
    .replace(/<\/(ul|ol)>/gi, "\n\n")
    .replace(
      /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,
      (_, href, t) => `[${t}](${href.startsWith("/") ? SITE_URL + href : href})`,
    )
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, "**$2**")
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, "_$2_")
    .replace(/<code>([\s\S]*?)<\/code>/gi, "`$1`")
    .replace(/<\/p>|<br\s*\/?>/gi, "\n\n")
    .replace(/<[^>]+>/g, "");
  md = decode(md)
    .replace(/@@CODE(\d+)@@/g, (_, i) => codeBlocks[Number(i)])
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n");
  return md.trim();
}

export function lastModified(p: FeedPost): string {
  return p.updated_at > p.published_at ? p.updated_at : p.published_at;
}

export function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const FEED_CACHE = "public, max-age=0, s-maxage=3600";
