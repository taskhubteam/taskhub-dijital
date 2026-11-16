"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeferredValue, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ScoreLine, SeoPanel } from "@/components/admin/seo-panel";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Category } from "@/lib/api/categories";
import { createPost, updatePost, type AdminPost, type KeyphraseUse } from "@/lib/api/posts";
import { postSeo } from "@/lib/post-seo";
import { analyzeReadability, analyzeSeo, overallScore } from "@/lib/seo-analysis";
import { slugify } from "@/lib/slugify";
import { useImageUpload } from "@/lib/use-image-upload";
import { SITE_URL } from "@/lib/site";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  excerpt: z.string().min(1, "Excerpt is required"),
  category: z.string().min(1, "Category is required"),
  keywords: z.string(),
  status: z.enum(["draft", "published"]),
  contentHtml: z.string().min(1, "Content is required"),
  featuredImage: z.string().nullable(),
  publishedAt: z.string().min(1, "Pick a publish date"),
  featuredImageAlt: z.string().max(250, "Keep alt text under 250 characters"),
  focusKeyphrase: z.string().max(120),
  keyphraseSynonyms: z.string().max(300),
  seoTitle: z.string().max(200),
  metaDescription: z.string().max(400),
  ogTitle: z.string().max(200),
  ogDescription: z.string().max(400),
  canonicalUrl: z.union([
    z.literal(""),
    z.string().trim().url("Enter a full URL starting with https://"),
  ]),
  noindex: z.boolean(),
});

export type PostFormValues = z.infer<typeof postSchema>;

// <input type="datetime-local"> works with a timezone-less "YYYY-MM-DDTHH:mm" string,
// interpreted as local time by both the input and `new Date(...)` — no explicit timezone
// handling needed for a single-author blog.
function toDatetimeLocal(iso: string | null): string {
  const date = iso ? new Date(iso) : new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function FeaturedImageField({
  value,
  onChange,
  postTitle,
  alt,
  onAltChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  postTitle: string;
  alt: string;
  onAltChange: (alt: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const altRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { upload } = useImageUpload();

  async function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    const result = await upload(file, postTitle || "post");
    setUploading(false);
    if (result) {
      onChange(result.url);
      // Ask for alt text straight away.
      setTimeout(() => altRef.current?.focus(), 50);
    }
  }

  return (
    <div>
      {value ? (
        <img
          src={value.startsWith("/uploads/") ? `${value}?w=640` : value}
          alt={alt}
          className="aspect-video w-full rounded-md border border-neutral-200 object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-neutral-300 text-sm text-neutral-500 hover:border-neutral-400 hover:text-neutral-700"
        >
          {uploading ? "Uploading…" : "Set featured image"}
        </button>
      )}
      {value && (
        <div className="mt-3">
          <label htmlFor="featuredImageAlt" className="text-sm font-medium text-neutral-900">
            Alt text
          </label>
          <input
            id="featuredImageAlt"
            ref={altRef}
            value={alt}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Describe the image, ideally with the keyphrase"
            className="mt-1.5 h-9 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm"
          />
          <p className={`mt-1 text-xs ${alt.trim() ? "text-neutral-500" : "text-amber-700"}`}>
            {alt.trim()
              ? "Shown to Google Images and screen readers."
              : "Missing — add alt text for SEO and accessibility."}
          </p>
        </div>
      )}
      <div className="mt-3 flex gap-2">
        {value && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? "Uploading…" : "Replace image"}
          </Button>
        )}
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-red-600"
            onClick={() => {
              onChange(null);
              onAltChange("");
            }}
          >
            Remove
          </Button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleSelect}
      />
    </div>
  );
}

function Card({
  title,
  children,
  aside,
}: {
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white">
      <header className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-neutral-900">{title}</h2>
        {aside}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

/** Pixel width of the SEO title in Google's desktop title font (Arial 20px). */
function useTitleWidth(text: string): number | undefined {
  const [width, setWidth] = useState<number>();
  useEffect(() => {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return;
    ctx.font = "20px Arial";
    setWidth(Math.round(ctx.measureText(text).width));
  }, [text]);
  return width;
}

export function PostForm({
  post,
  categories,
  keyphrases = [],
}: {
  post?: AdminPost;
  categories: Category[];
  keyphrases?: KeyphraseUse[];
}) {
  const navigate = useRouter();
  const router = useRouter();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      excerpt: post?.excerpt ?? "",
      category: post?.category ?? "",
      keywords: post?.keywords.join(", ") ?? "",
      status: post?.status ?? "draft",
      contentHtml: post?.contentHtml ?? "",
      featuredImage: post?.featuredImage ?? null,
      publishedAt: toDatetimeLocal(post?.publishedAt ?? null),
      featuredImageAlt: post?.featuredImageAlt ?? "",
      focusKeyphrase: post?.focusKeyphrase ?? "",
      keyphraseSynonyms: post?.keyphraseSynonyms ?? "",
      seoTitle: post?.seoTitle ?? "",
      metaDescription: post?.metaDescription ?? "",
      ogTitle: post?.ogTitle ?? "",
      ogDescription: post?.ogDescription ?? "",
      canonicalUrl: post?.canonicalUrl ?? "",
      noindex: post?.noindex ?? false,
    },
  });

  const v = form.watch();
  const { title, status, publishedAt } = v;
  const isScheduled = status === "published" && new Date(publishedAt) > new Date();

  useEffect(() => {
    if (post) return; // don't auto-slug when editing an existing post
    form.setValue("slug", slugify(title), { shouldValidate: false });
  }, [title, post, form]);

  // SEO + readability analysis (deferred so typing in the editor stays smooth).
  const seo = postSeo({ ...v, title: v.title.trim() || "Post title" });
  const titleWidthPx = useTitleWidth(seo.title);
  const contentHtml = useDeferredValue(v.contentHtml);
  const otherKeyphrases = useMemo(
    () => keyphrases.filter((k) => k.id !== post?.id),
    [keyphrases, post?.id],
  );
  const seoChecks = useMemo(
    () =>
      analyzeSeo({
        keyphrase: v.focusKeyphrase,
        synonyms: v.keyphraseSynonyms,
        title: v.title,
        seoTitle: seo.title,
        slug: v.slug,
        metaDescription: seo.description,
        contentHtml,
        featuredImage: v.featuredImage,
        featuredImageAlt: v.featuredImageAlt,
        otherKeyphrases,
        titleWidthPx,
      }),
    [
      v.focusKeyphrase,
      v.keyphraseSynonyms,
      v.title,
      seo.title,
      v.slug,
      seo.description,
      contentHtml,
      v.featuredImage,
      v.featuredImageAlt,
      otherKeyphrases,
      titleWidthPx,
    ],
  );
  const readabilityChecks = useMemo(() => analyzeReadability(contentHtml), [contentHtml]);
  const seoScore = v.focusKeyphrase.trim() ? overallScore(seoChecks) : "none";
  const readabilityScore = overallScore(readabilityChecks);

  let submitLabel = post ? "Save changes" : "Save draft";
  if (status === "published") {
    submitLabel = isScheduled ? "Schedule" : post ? "Update" : "Publish";
  }

  async function onSubmit(values: PostFormValues) {
    const payload = {
      ...values,
      keywords: values.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      // The datetime-local value has no timezone info — resolve it against the browser's
      // local time here (the only place that knows what the picker meant) into a proper
      // UTC-anchored ISO string, rather than let the server guess in its own timezone.
      publishedAt: new Date(values.publishedAt).toISOString(),
    };

    try {
      if (post) {
        await updatePost({ data: { id: post.id, ...payload } });
        toast.success("Post updated");
      } else {
        await createPost({ data: payload });
        toast.success("Post created");
      }
      await router.refresh();
      navigate.push("/admin/posts");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  function onInvalid(errors: Record<string, { message?: string } | undefined>) {
    const first = Object.values(errors).find(Boolean);
    toast.error(first?.message ?? "Please fix the highlighted fields");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]"
      >
        {/* ------------------------------------------------------------ main column */}
        <div className="min-w-0 space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add title"
                    className="h-12 bg-white text-xl font-semibold md:text-xl"
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-neutral-500">
                  Permalink: {`${SITE_URL.replace(/^https?:\/\//, "")}/blog/${v.slug || "…"}`} — edit it in the SEO box below.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contentHtml"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Content</FormLabel>
                <FormControl>
                  <RichTextEditor value={field.value} onChange={field.onChange} postTitle={title} />
                </FormControl>
                <WordCount html={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />

          <SeoPanel
            form={form}
            seoChecks={seoChecks}
            readabilityChecks={readabilityChecks}
            seoScore={seoScore}
            readabilityScore={readabilityScore}
            finalTitle={seo.title}
            finalDescription={seo.description}
            titleWidthPx={titleWidthPx}
          />

          <Card title="Excerpt">
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Excerpt</FormLabel>
                  <FormControl>
                    <Textarea rows={3} className="bg-white" {...field} />
                  </FormControl>
                  <p className="text-xs text-neutral-500">
                    Shown under the title on the post and in the blog list. Also used as the meta
                    description when that's left empty.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        </div>

        {/* ------------------------------------------------------------ sidebar */}
        <aside className="space-y-4">
          <Card title="Publish">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publishedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publish date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" className="bg-white" {...field} />
                    </FormControl>
                    <p className="text-xs text-neutral-500">
                      {status !== "published"
                        ? "Set Status to Published for this date to take effect — pick a future time to schedule it."
                        : isScheduled
                          ? "Set in the future — this post will go live automatically at that time."
                          : "Leave as-is to publish immediately, or pick a future date to schedule it."}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-1.5 border-t border-neutral-200 pt-3">
                <ScoreLine label="SEO" score={seoScore} />
                <ScoreLine label="Readability" score={readabilityScore} />
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-neutral-200 pt-4">
                {post && post.status === "published" ? (
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-700 hover:underline"
                  >
                    View post
                  </a>
                ) : (
                  <span />
                )}
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Saving…" : submitLabel}
                </Button>
              </div>
            </div>
          </Card>

          <Card title="Featured image">
            <FeaturedImageField
              value={v.featuredImage}
              onChange={(url) => form.setValue("featuredImage", url, { shouldDirty: true })}
              postTitle={title}
              alt={v.featuredImageAlt}
              onAltChange={(alt) => form.setValue("featuredImageAlt", alt, { shouldDirty: true })}
            />
          </Card>

          <Card title="Category">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Category</FormLabel>
                  {categories.length === 0 ? (
                    <p className="text-sm text-neutral-500">
                      No categories yet —{" "}
                      <Link href="/admin/categories" className="underline">
                        add one first
                      </Link>
                      .
                    </p>
                  ) : (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card title="Keywords">
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Keywords</FormLabel>
                  <FormControl>
                    <Input placeholder="RAG, retrieval, LLM" className="bg-white" {...field} />
                  </FormControl>
                  <p className="text-xs text-neutral-500">Separate with commas.</p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        </aside>
      </form>
    </Form>
  );
}

function WordCount({ html }: { html: string }) {
  const count = html
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return <p className="text-xs text-neutral-500">Word count: {count.toLocaleString()}</p>;
}
