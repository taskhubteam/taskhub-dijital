import { FEED_CACHE, lastModified, listFeedPosts, xmlEscape } from "@/lib/feeds";
import { EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = (await listFeedPosts()).slice(0, 30);
  const updated = posts[0] ? lastModified(posts[0]) : new Date().toISOString();
  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      return `    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${xmlEscape(p.excerpt)}</description>
      <category>${xmlEscape(p.category)}</category>
      <pubDate>${new Date(p.published_at).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(`${SITE_NAME} — Blog`)}</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Guides on AI-ready websites, agentic systems, web development, SEO and hosting from ${xmlEscape(SITE_NAME)}.</description>
    <language>en-us</language>
    <managingEditor>${EMAIL} (${xmlEscape(SITE_NAME)})</managingEditor>
    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": FEED_CACHE },
  });
}
