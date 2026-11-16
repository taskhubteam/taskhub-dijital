import { SITE_NAME, SITE_URL } from "@/lib/site";

export type TocItem = { id: string; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated: string;
  readTime: string;
  category: string;
  keywords: string[];
  contentHtml: string;
  featuredImage: string | null;
  featuredImageAlt: string;
  seoTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  canonicalUrl: string;
  noindex: boolean;
  tocItems: TocItem[];
};

/** Posts are published by the agency (author box + BlogPosting `author`). */
export const BLOG_AUTHOR = {
  name: `${SITE_NAME} Team`,
  url: `${SITE_URL}/`,
  about: `${SITE_NAME} is a Dallas, Texas web and AI agency that builds agentic AI systems, AI-ready websites, WordPress sites and managed hosting for US businesses.`,
};
