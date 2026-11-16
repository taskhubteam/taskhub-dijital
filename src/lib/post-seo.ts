// Shared by the blog post page (real <head>) and the admin SEO panel (Google preview), so the
// preview always shows exactly what search engines will get.

export const BLOG_TITLE_SUFFIX = " | TaskHub Dijital Blog";

type SeoInput = {
  title: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
};

export function postSeo(post: SeoInput) {
  const title = post.seoTitle.trim() || `${post.title}${BLOG_TITLE_SUFFIX}`;
  const description = post.metaDescription.trim() || post.excerpt;
  return {
    title,
    description,
    ogTitle: post.ogTitle.trim() || post.seoTitle.trim() || post.title,
    ogDescription: post.ogDescription.trim() || description,
  };
}
