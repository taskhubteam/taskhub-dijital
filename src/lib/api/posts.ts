"use server";

import { z } from "zod";
import { getDb, newId, nowIso } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { pingIndexNow } from "@/lib/indexnow";
import type { Post, TocItem } from "@/lib/content";
import { slugify } from "@/lib/slugify";

type PostStatus = "draft" | "published";

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  keywords: string;
  content_html: string;
  featured_image: string | null;
  featured_image_alt: string;
  focus_keyphrase: string;
  keyphrase_synonyms: string;
  seo_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  canonical_url: string;
  noindex: number;
  status: PostStatus;
  author_id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  keywords: string[];
  contentHtml: string;
  featuredImage: string | null;
  status: PostStatus;
  publishedAt: string | null;
  updatedAt: string;
} & SeoFields;

export type SeoFields = {
  featuredImageAlt: string;
  focusKeyphrase: string;
  keyphraseSynonyms: string;
  seoTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  canonicalUrl: string;
  noindex: boolean;
};

function seoFields(row: PostRow): SeoFields {
  return {
    featuredImageAlt: row.featured_image_alt,
    focusKeyphrase: row.focus_keyphrase,
    keyphraseSynonyms: row.keyphrase_synonyms,
    seoTitle: row.seo_title,
    metaDescription: row.meta_description,
    ogTitle: row.og_title,
    ogDescription: row.og_description,
    canonicalUrl: row.canonical_url,
    noindex: !!row.noindex,
  };
}

function parseKeywords(raw: string): string[] {
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value.map(String) : [];
  } catch {
    return [];
  }
}

const postInputSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string().min(1),
  keywords: z.array(z.string()),
  contentHtml: z.string().min(1),
  featuredImage: z.string().nullable(),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().nullable(),
  featuredImageAlt: z.string().trim().max(250).default(""),
  focusKeyphrase: z.string().trim().max(120).default(""),
  keyphraseSynonyms: z.string().trim().max(300).default(""),
  seoTitle: z.string().trim().max(200).default(""),
  metaDescription: z.string().trim().max(400).default(""),
  ogTitle: z.string().trim().max(200).default(""),
  ogDescription: z.string().trim().max(400).default(""),
  canonicalUrl: z.union([z.literal(""), z.string().trim().url()]).default(""),
  noindex: z.boolean().default(false),
});

function wordCount(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").trim();
  return text ? text.split(/\s+/).length : 0;
}

function readTime(html: string): string {
  const minutes = Math.max(1, Math.round(wordCount(html) / 200));
  return `${minutes} min`;
}

// Tags each <h2> in the content with a unique id and returns a matching table-of-contents
// list, so the public post page can render jump links without a client-side HTML parse.
function withTableOfContents(html: string): { html: string; tocItems: TocItem[] } {
  const tocItems: TocItem[] = [];
  const usedIds = new Set<string>();

  const taggedHtml = html.replace(/<h2>(.*?)<\/h2>/gs, (match, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (!text) return match;

    const base = slugify(text) || "section";
    let id = base;
    let suffix = 2;
    while (usedIds.has(id)) {
      id = `${base}-${suffix}`;
      suffix++;
    }
    usedIds.add(id);
    tocItems.push({ id, text });

    return `<h2 id="${id}">${inner}</h2>`;
  });

  return { html: taggedHtml, tocItems: tocItems.length >= 2 ? tocItems : [] };
}

function toPublicPost(row: PostRow): Post {
  const date = row.published_at ?? row.created_at;
  const { html: contentHtml, tocItems } = withTableOfContents(row.content_html);
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: date.slice(0, 10),
    updated: (row.updated_at > date ? row.updated_at : date).slice(0, 10),
    readTime: readTime(row.content_html),
    category: row.category,
    keywords: parseKeywords(row.keywords),
    contentHtml,
    featuredImage: row.featured_image,
    featuredImageAlt: row.featured_image_alt,
    seoTitle: row.seo_title,
    metaDescription: row.meta_description,
    ogTitle: row.og_title,
    ogDescription: row.og_description,
    canonicalUrl: row.canonical_url,
    noindex: !!row.noindex,
    tocItems,
  };
}

function toAdminPost(row: PostRow): AdminPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    keywords: parseKeywords(row.keywords),
    contentHtml: row.content_html,
    featuredImage: row.featured_image,
    status: row.status,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    ...seoFields(row),
  };
}

// A post is only publicly visible once its scheduled published_at has actually arrived —
// this is what makes "schedule for later" work with no cron job: a future-dated post simply
// doesn't match this filter yet. ISO-8601 UTC strings compare correctly as text.
const PUBLIC_WHERE = "status = 'published' AND published_at IS NOT NULL AND published_at <= ?";

export async function listPublishedPosts() : Promise<Post[]> {
    const { results } = await getDb()
      .prepare(`SELECT * FROM posts WHERE ${PUBLIC_WHERE} ORDER BY published_at DESC`)
      .bind(nowIso())
      .all<PostRow>();
    return results.map(toPublicPost);
  }

const getPostBySlugSchema = z.object({ slug: z.string() });

export async function getPostBySlug(input: { data: z.input<typeof getPostBySlugSchema> }) : Promise<Post | null> {
    const data = getPostBySlugSchema.parse(input.data);
    const row = await getDb()
      .prepare(`SELECT * FROM posts WHERE ${PUBLIC_WHERE} AND slug = ?`)
      .bind(nowIso(), data.slug)
      .first<PostRow>();
    return row ? toPublicPost(row) : null;
  }

export type RelatedPost = { slug: string; title: string; category: string };

const listRelatedPostsSchema = z.object({ excludeSlug: z.string(), category: z.string().default("") });

export async function listRelatedPosts(input: { data: z.input<typeof listRelatedPostsSchema> }) : Promise<RelatedPost[]> {
    const data = listRelatedPostsSchema.parse(input.data);
    const { results } = await getDb()
      .prepare(
        `SELECT slug, title, category FROM posts WHERE ${PUBLIC_WHERE} AND slug != ?
         ORDER BY (category = ?) DESC, published_at DESC LIMIT 3`,
      )
      .bind(nowIso(), data.excludeSlug, data.category)
      .all<RelatedPost>();
    return results;
  }

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  featuredImage: string | null;
};

type SummaryRow = Pick<
  PostRow,
  "slug" | "title" | "excerpt" | "category" | "featured_image" | "published_at" | "created_at"
>;

const SUMMARY_COLUMNS = "slug, title, excerpt, category, featured_image, published_at, created_at";

function toSummary(r: SummaryRow): PostSummary {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category,
    date: (r.published_at ?? r.created_at).slice(0, 10),
    featuredImage: r.featured_image,
  };
}

export async function listLatestPosts() : Promise<PostSummary[]> {
    const { results } = await getDb()
      .prepare(
        `SELECT ${SUMMARY_COLUMNS} FROM posts WHERE ${PUBLIC_WHERE} ORDER BY published_at DESC LIMIT 3`,
      )
      .bind(nowIso())
      .all<SummaryRow>();
    return results.map(toSummary);
  }

/** Every published post, without bodies — for cross-linking. */
export async function listPostSummaries() : Promise<PostSummary[]> {
    const { results } = await getDb()
      .prepare(
        `SELECT ${SUMMARY_COLUMNS} FROM posts WHERE ${PUBLIC_WHERE} ORDER BY published_at DESC`,
      )
      .bind(nowIso())
      .all<SummaryRow>();
    return results.map(toSummary);
  }

export async function listPosts() : Promise<AdminPost[]> {
    await requireSession();
    const { results } = await getDb()
      .prepare("SELECT * FROM posts ORDER BY updated_at DESC")
      .all<PostRow>();
    return results.map(toAdminPost);
  }

const getPostSchema = z.object({ id: z.string() });

export async function getPost(input: { data: z.input<typeof getPostSchema> }) : Promise<AdminPost | null> {
    const data = getPostSchema.parse(input.data);
    await requireSession();
    const row = await getDb()
      .prepare("SELECT * FROM posts WHERE id = ?")
      .bind(data.id)
      .first<PostRow>();
    return row ? toAdminPost(row) : null;
  }

export type KeyphraseUse = { id: string; title: string; focusKeyphrase: string };

/** Focus keyphrases already used by other posts — for the "previously used keyphrase" check. */
export async function listFocusKeyphrases() : Promise<KeyphraseUse[]> {
    await requireSession();
    const { results } = await getDb()
      .prepare("SELECT id, title, focus_keyphrase FROM posts WHERE focus_keyphrase != ''")
      .all<{ id: string; title: string; focus_keyphrase: string }>();
    return results.map((r) => ({ id: r.id, title: r.title, focusKeyphrase: r.focus_keyphrase }));
  }

// Drafts have no publish date. For a published post, an explicit client-supplied date
// (chosen in the editor) is authoritative — a future date is what makes it "scheduled"
// rather than immediately live. Falls back to now only if none was supplied.
function isLive(post: { status: PostStatus; publishedAt: string | null }): boolean {
  return post.status === "published" && !!post.publishedAt && post.publishedAt <= nowIso();
}

/** Ask Bing & co. (IndexNow) to recrawl changed blog URLs plus the pages that list them. */
function pingPostUrls(slugs: string[]) {
  return pingIndexNow([...slugs.map((slug) => `/blog/${slug}`), "/blog", "/"]);
}

function resolvePublishedAt(status: PostStatus, clientValue: string | null): string | null {
  if (status !== "published") return null;
  return (clientValue ? new Date(clientValue) : new Date()).toISOString();
}

type PostInput = z.infer<typeof postInputSchema>;

/** Column values shared by INSERT and UPDATE, in COLUMN order. */
const COLUMNS = [
  "slug",
  "title",
  "excerpt",
  "category",
  "keywords",
  "content_html",
  "featured_image",
  "featured_image_alt",
  "focus_keyphrase",
  "keyphrase_synonyms",
  "seo_title",
  "meta_description",
  "og_title",
  "og_description",
  "canonical_url",
  "noindex",
  "status",
  "published_at",
] as const;

function columnValues(data: PostInput, publishedAt: string | null) {
  return [
    data.slug,
    data.title,
    data.excerpt,
    data.category,
    JSON.stringify(data.keywords),
    data.contentHtml,
    data.featuredImage,
    data.featuredImageAlt,
    data.focusKeyphrase,
    data.keyphraseSynonyms,
    data.seoTitle,
    data.metaDescription,
    data.ogTitle,
    data.ogDescription,
    data.canonicalUrl,
    data.noindex ? 1 : 0,
    data.status,
    publishedAt,
  ];
}

async function slugTaken(slug: string, exceptId?: string): Promise<boolean> {
  const row = await getDb()
    .prepare("SELECT id FROM posts WHERE slug = ? AND id != ?")
    .bind(slug, exceptId ?? "")
    .first();
  return !!row;
}

const createPostSchema = postInputSchema;

export async function createPost(input: { data: z.input<typeof createPostSchema> }) : Promise<{ id: string }> {
    const data = createPostSchema.parse(input.data);
    const session = await requireSession();
    if (await slugTaken(data.slug)) throw new Error("A post with this slug already exists");

    const id = newId();
    const now = nowIso();
    const publishedAt = resolvePublishedAt(data.status, data.publishedAt);
    const cols = [...COLUMNS, "id", "author_id", "created_at", "updated_at"];
    await getDb()
      .prepare(`INSERT INTO posts (${cols.join(", ")}) VALUES (${cols.map(() => "?").join(", ")})`)
      .bind(...columnValues(data, publishedAt), id, session.userId, now, now)
      .run();

    if (isLive({ status: data.status, publishedAt })) await pingPostUrls([data.slug]);

    return { id };
  }

const updatePostSchema = postInputSchema.extend({ id: z.string() });

export async function updatePost(input: { data: z.input<typeof updatePostSchema> }) : Promise<{ ok: true }> {
    const data = updatePostSchema.parse(input.data);
    await requireSession();
    const { id, ...fields } = data;
    const db = getDb();

    const current = await db
      .prepare("SELECT slug, status, published_at FROM posts WHERE id = ?")
      .bind(id)
      .first<Pick<PostRow, "slug" | "status" | "published_at">>();
    if (!current) throw new Error("Post not found");

    if (fields.slug !== current.slug && (await slugTaken(fields.slug, id))) {
      throw new Error("A post with this slug already exists");
    }

    const publishedAt = resolvePublishedAt(fields.status, fields.publishedAt);
    await db
      .prepare(
        `UPDATE posts SET ${COLUMNS.map((c) => `${c} = ?`).join(", ")}, updated_at = ? WHERE id = ?`,
      )
      .bind(...columnValues(fields, publishedAt), nowIso(), id)
      .run();

    // Ping the new URL if it's live, and the old one if it moved or was unpublished.
    const liveNow = isLive({ status: fields.status, publishedAt });
    const wasLive = isLive({ status: current.status, publishedAt: current.published_at });
    const changed = [
      ...(liveNow ? [fields.slug] : []),
      ...(wasLive && (!liveNow || current.slug !== fields.slug) ? [current.slug] : []),
    ];
    if (changed.length) await pingPostUrls(changed);

    return { ok: true };
  }

const deletePostSchema = z.object({ id: z.string() });

export async function deletePost(input: { data: z.input<typeof deletePostSchema> }) : Promise<{ ok: true }> {
    const data = deletePostSchema.parse(input.data);
    await requireSession();
    const db = getDb();
    const post = await db
      .prepare("SELECT slug, status, published_at FROM posts WHERE id = ?")
      .bind(data.id)
      .first<Pick<PostRow, "slug" | "status" | "published_at">>();
    await db.prepare("DELETE FROM posts WHERE id = ?").bind(data.id).run();
    if (post && isLive({ status: post.status, publishedAt: post.published_at })) {
      await pingPostUrls([post.slug]);
    }
    return { ok: true };
  }
