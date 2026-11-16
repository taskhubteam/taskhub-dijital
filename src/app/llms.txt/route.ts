import { HOME_FAQS } from "@/content/faqs";
import { FEED_CACHE, listFeedPosts } from "@/lib/feeds";
import { absoluteUrl } from "@/lib/seo";
import {
  ADDRESS,
  EMAIL,
  LEGAL_NAME,
  PAGES,
  PHONE_DISPLAY,
  SCHEDULE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export const dynamic = "force-dynamic";

// Markdown summary for AI assistants and answer engines (https://llmstxt.org). Built from the
// same data as the pages (site facts + FAQ), so it never drifts. Full articles: /llms-full.txt.
export async function GET() {
  let posts: Awaited<ReturnType<typeof listFeedPosts>> = [];
  try {
    posts = await listFeedPosts();
  } catch {}

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION} ${SITE_NAME} is part of ${LEGAL_NAME} and is based in ${ADDRESS.addressLocality}, ${ADDRESS.addressRegion}, United States.

## Key facts

- Company: ${SITE_NAME} (${LEGAL_NAME})
- Website: ${SITE_URL}/
- Location: ${ADDRESS.streetAddress}, ${ADDRESS.addressLocality}, ${ADDRESS.addressRegion} ${ADDRESS.postalCode}, USA
- Phone: ${PHONE_DISPLAY}
- Email: ${EMAIL}
- Book a call: ${SCHEDULE_URL}
- Services: agentic AI systems, AI-ready websites, custom MERN/Next.js web apps, WordPress and Shopify development, UI/UX design, SEO, digital marketing, managed hosting

## Pages

${PAGES.map((p) => `- [${p.name}](${absoluteUrl(p.path)}): ${p.description}`).join("\n")}

## Frequently asked questions

${HOME_FAQS.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}
${
  posts.length
    ? `
## Blog articles

${posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.excerpt}`).join("\n")}
`
    : ""
}
## Optional

- [Full text of every article](${SITE_URL}/llms-full.txt)
- [RSS feed](${SITE_URL}/rss.xml)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": FEED_CACHE },
  });
}
