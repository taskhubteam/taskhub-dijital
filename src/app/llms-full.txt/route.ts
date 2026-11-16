import { FEED_CACHE, htmlToMarkdown, listFeedPostBodies } from "@/lib/feeds";
import { absoluteUrl } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

/** Every published article as Markdown, for AI assistants (see /llms.txt). */
export async function GET() {
  const posts = await listFeedPostBodies();
  const parts = posts.map(
    (p) =>
      `# ${p.title}\n\nURL: ${absoluteUrl(`/blog/${p.slug}`)}\nPublished: ${p.published_at.slice(0, 10)}\nCategory: ${p.category}\n\n> ${p.excerpt}\n\n${htmlToMarkdown(p.content_html)}`,
  );
  const body = `# ${SITE_NAME} — full articles\n\nSource: ${SITE_URL}/blog\n\n${parts.join("\n\n---\n\n")}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": FEED_CACHE },
  });
}
