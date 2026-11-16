import type { MetadataRoute } from "next";
import { lastModified, listFeedPosts } from "@/lib/feeds";
import { absoluteUrl } from "@/lib/seo";
import { PAGES } from "@/lib/site";
import { uploadSrc } from "@/lib/images";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Awaited<ReturnType<typeof listFeedPosts>> = [];
  try {
    posts = await listFeedPosts();
  } catch (err) {
    console.error("[sitemap] could not read posts", err);
  }

  const pages: MetadataRoute.Sitemap = PAGES.map((p) => ({
    url: absoluteUrl(p.path),
    changeFrequency: p.path === "/blog" ? "daily" : "monthly",
    priority: p.path === "/" ? 1 : p.path === "/blog" ? 0.8 : 0.7,
    ...(p.path === "/blog" && posts[0] ? { lastModified: lastModified(posts[0]) } : {}),
  }));

  const articles: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: lastModified(p),
    changeFrequency: "monthly",
    priority: 0.6,
    ...(p.featured_image ? { images: [absoluteUrl(uploadSrc(p.featured_image, 1280))] } : {}),
  }));

  return [...pages, ...articles];
}
