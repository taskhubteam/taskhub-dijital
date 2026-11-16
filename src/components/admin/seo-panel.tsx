"use client";

import { ChevronDown, Monitor, Smartphone } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PostFormValues } from "@/components/admin/post-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BLOG_TITLE_SUFFIX } from "@/lib/post-seo";
import type { Check, CheckStatus, Score } from "@/lib/seo-analysis";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// The Yoast-style box under the editor: focus keyphrase, Google preview, SEO title / slug /
// meta description, live SEO + readability analysis, social and advanced (noindex, canonical).

export const TITLE_MAX_PX = 600;
export const META_MAX = 156;

const DOT: Record<CheckStatus | "none", string> = {
  good: "bg-emerald-500",
  ok: "bg-amber-400",
  bad: "bg-red-500",
  none: "bg-neutral-300",
};

const SCORE_LABEL: Record<Score, string> = {
  good: "Good",
  ok: "OK",
  bad: "Needs improvement",
  none: "Not available",
};

export function ScoreDot({ score, className = "" }: { score: Score; className?: string }) {
  return (
    <span
      className={`inline-block size-3 shrink-0 rounded-full ${DOT[score]} ${className}`}
      aria-hidden
    />
  );
}

export function ScoreLine({ label, score }: { label: string; score: Score }) {
  return (
    <p className="flex items-center gap-2 text-sm">
      <ScoreDot score={score} />
      <span className="text-neutral-600">{label}:</span>
      <span className="font-medium text-neutral-900">{SCORE_LABEL[score]}</span>
    </p>
  );
}

type Tab = "seo" | "readability" | "social" | "advanced";

export function SeoPanel({
  form,
  seoChecks,
  readabilityChecks,
  seoScore,
  readabilityScore,
  finalTitle,
  finalDescription,
  titleWidthPx,
}: {
  form: UseFormReturn<PostFormValues>;
  seoChecks: Check[];
  readabilityChecks: Check[];
  seoScore: Score;
  readabilityScore: Score;
  finalTitle: string;
  finalDescription: string;
  titleWidthPx?: number;
}) {
  const [tab, setTab] = useState<Tab>("seo");
  const v = form.watch();

  const tabs: { id: Tab; label: string; score?: Score }[] = [
    { id: "seo", label: "SEO", score: seoScore },
    { id: "readability", label: "Readability", score: readabilityScore },
    { id: "social", label: "Social" },
    { id: "advanced", label: "Advanced" },
  ];

  return (
    <section className="rounded-lg border border-neutral-200 bg-white">
      <header className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-neutral-900">SEO</h2>
        <span className="text-xs text-neutral-500">
          Optimize this post for Google, Bing and AI search
        </span>
      </header>

      <div
        role="tablist"
        className="flex gap-1 overflow-x-auto overflow-y-hidden border-b border-neutral-200 px-3 pt-2"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px flex items-center gap-2 whitespace-nowrap rounded-t-md border px-3 py-2 text-sm font-medium ${
              tab === t.id
                ? "border-neutral-200 border-b-white bg-white text-neutral-900"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            {t.score && <ScoreDot score={t.score} className="size-2.5" />}
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {tab === "seo" && (
          <div className="space-y-6">
            <Field
              label="Focus keyphrase"
              htmlFor="focusKeyphrase"
              hint="The main phrase you want this post to be found for in Google, Bing and AI answers."
            >
              <Input
                id="focusKeyphrase"
                placeholder="e.g. mobile app development cost"
                {...form.register("focusKeyphrase")}
              />
            </Field>
            <Field
              label="Keyphrase synonyms"
              htmlFor="keyphraseSynonyms"
              hint="Other ways people search for the same thing, separated by commas."
            >
              <Input
                id="keyphraseSynonyms"
                placeholder="app development price, cost to build an app"
                {...form.register("keyphraseSynonyms")}
              />
            </Field>

            <Collapsible title="Search appearance" defaultOpen>
              <GooglePreview
                title={finalTitle}
                description={finalDescription}
                slug={v.slug}
                date={v.publishedAt}
              />

              <div className="mt-5 space-y-5">
                <Field
                  label="SEO title"
                  htmlFor="seoTitle"
                  hint={`Leave empty to use “${v.title || "Post title"}${BLOG_TITLE_SUFFIX}”.`}
                  aside={
                    v.seoTitle ? (
                      <button
                        type="button"
                        className="text-xs text-blue-700 hover:underline"
                        onClick={() => form.setValue("seoTitle", "", { shouldDirty: true })}
                      >
                        Use default
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-xs text-blue-700 hover:underline"
                        onClick={() => form.setValue("seoTitle", finalTitle, { shouldDirty: true })}
                      >
                        Customize
                      </button>
                    )
                  }
                >
                  <Input id="seoTitle" placeholder={finalTitle} {...form.register("seoTitle")} />
                  <LengthBar
                    value={titleWidthPx ?? finalTitle.length * 10}
                    min={400}
                    max={TITLE_MAX_PX}
                  />
                </Field>

                <Field
                  label="Slug"
                  htmlFor="slug"
                  hint={`${SITE_URL}/blog/${v.slug || "your-post"}`}
                >
                  <Input id="slug" {...form.register("slug")} />
                  {form.formState.errors.slug && (
                    <p className="mt-1 text-xs text-red-600">
                      {form.formState.errors.slug.message}
                    </p>
                  )}
                </Field>

                <Field
                  label="Meta description"
                  htmlFor="metaDescription"
                  hint="Leave empty to use the excerpt. Aim for 120–156 characters with the keyphrase."
                  aside={
                    <span className="text-xs tabular-nums text-neutral-500">
                      {finalDescription.length} / {META_MAX}
                    </span>
                  }
                >
                  <Textarea
                    id="metaDescription"
                    rows={3}
                    placeholder={v.excerpt || "Write a short summary that makes people click."}
                    {...form.register("metaDescription")}
                  />
                  <LengthBar value={finalDescription.length} min={120} max={META_MAX} />
                </Field>
              </div>
            </Collapsible>

            <Collapsible title="SEO analysis" defaultOpen score={seoScore}>
              <CheckList checks={seoChecks} />
            </Collapsible>
          </div>
        )}

        {tab === "readability" && (
          <div>
            <p className="mb-4 text-sm text-neutral-600">
              Easy-to-read posts keep visitors on the page longer, which helps rankings and leads.
            </p>
            <CheckList checks={readabilityChecks} />
          </div>
        )}

        {tab === "social" && (
          <div className="space-y-5">
            <p className="text-sm text-neutral-600">
              How the post looks when shared on LinkedIn, Facebook, X and WhatsApp. Leave empty to
              use the SEO title and meta description.
            </p>
            <SocialPreview
              image={v.featuredImage}
              title={v.ogTitle || v.seoTitle || v.title || "Post title"}
              description={v.ogDescription || finalDescription}
            />
            <Field label="Social title" htmlFor="ogTitle">
              <Input
                id="ogTitle"
                placeholder={v.seoTitle || v.title}
                {...form.register("ogTitle")}
              />
            </Field>
            <Field label="Social description" htmlFor="ogDescription">
              <Textarea
                id="ogDescription"
                rows={3}
                placeholder={finalDescription}
                {...form.register("ogDescription")}
              />
            </Field>
            <p className="text-xs text-neutral-500">The share image is the featured image.</p>
          </div>
        )}

        {tab === "advanced" && (
          <div className="space-y-5">
            <Field
              label="Allow search engines to show this post in search results?"
              htmlFor="noindex"
            >
              <select
                id="noindex"
                value={v.noindex ? "no" : "yes"}
                onChange={(e) =>
                  form.setValue("noindex", e.target.value === "no", { shouldDirty: true })
                }
                className="h-9 w-full max-w-xs rounded-md border border-neutral-300 bg-white px-3 text-sm"
              >
                <option value="yes">Yes (recommended)</option>
                <option value="no">No — hide from Google (noindex)</option>
              </select>
              {v.noindex && (
                <p className="mt-2 text-xs text-amber-700">
                  This post will still be on the blog, but it gets a noindex tag and is left out of
                  the sitemap and llms.txt.
                </p>
              )}
            </Field>
            <Field
              label="Canonical URL"
              htmlFor="canonicalUrl"
              hint="Only if this article was first published elsewhere (e.g. Medium or LinkedIn). Leave empty otherwise."
            >
              <Input
                id="canonicalUrl"
                placeholder={`${SITE_URL}/blog/${v.slug || "your-post"}`}
                {...form.register("canonicalUrl")}
              />
              {form.formState.errors.canonicalUrl && (
                <p className="mt-1 text-xs text-red-600">
                  {form.formState.errors.canonicalUrl.message}
                </p>
              )}
            </Field>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Field({
  label,
  htmlFor,
  hint,
  aside,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label htmlFor={htmlFor} className="text-sm font-medium text-neutral-900">
          {label}
        </label>
        {aside}
      </div>
      {children}
      {hint && (
        <p className="mt-1.5 break-all text-xs text-neutral-500 [word-break:break-word]">{hint}</p>
      )}
    </div>
  );
}

function Collapsible({
  title,
  defaultOpen,
  score,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  score?: Score;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-t border-neutral-200 pt-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 text-left"
      >
        {score && <ScoreDot score={score} />}
        <span className="flex-1 text-sm font-semibold text-neutral-900">{title}</span>
        <ChevronDown
          className={`size-4 text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function LengthBar({ value, min, max }: { value: number; min: number; max: number }) {
  const status: CheckStatus =
    value === 0 ? "bad" : value > max ? "bad" : value < min ? "ok" : "good";
  const width = Math.min(100, (value / max) * 100);
  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200" aria-hidden>
      <div className={`h-full rounded-full ${DOT[status]}`} style={{ width: `${width}%` }} />
    </div>
  );
}

function CheckList({ checks }: { checks: Check[] }) {
  const groups: { title: string; status: CheckStatus }[] = [
    { title: "Problems", status: "bad" },
    { title: "Improvements", status: "ok" },
    { title: "Good results", status: "good" },
  ];
  return (
    <div className="space-y-4">
      {groups.map((g) => {
        const items = checks.filter((c) => c.status === g.status);
        if (!items.length) return null;
        return (
          <div key={g.status}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {g.title} ({items.length})
            </p>
            <ul className="space-y-2">
              {items.map((c) => (
                <li key={c.id} className="flex gap-2.5 text-sm leading-relaxed">
                  <ScoreDot score={c.status} className="mt-1.5 size-2.5" />
                  <span>
                    <span className="font-medium text-neutral-900">{c.label}:</span>{" "}
                    <span className="text-neutral-600">{c.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, text.lastIndexOf(" ", max) || max)} …` : text;
}

function GooglePreview({
  title,
  description,
  slug,
  date,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
}) {
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop");
  const mobile = device === "mobile";
  const shownDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-900">Google preview</p>
        <div className="flex rounded-md bg-neutral-100 p-0.5">
          {(["mobile", "desktop"] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDevice(d)}
              aria-pressed={device === d}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium capitalize ${
                device === d ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"
              }`}
            >
              {d === "mobile" ? (
                <Smartphone className="size-3.5" />
              ) : (
                <Monitor className="size-3.5" />
              )}
              {d}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`rounded-lg border border-neutral-200 bg-white p-4 font-[Arial,sans-serif] shadow-sm ${
          mobile ? "max-w-[360px]" : "max-w-[600px]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-full border border-neutral-200 bg-white">
            <img src="/favicon.png" alt="" className="size-[18px] rounded-full" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[14px] text-[#202124]">{SITE_NAME}</span>
            <span className="block truncate text-[12px] text-[#4d5156]">
              {SITE_URL} › blog › {slug || "your-post"}
            </span>
          </span>
        </div>
        <p
          className={`mt-2 text-[#1a0dab] ${mobile ? "line-clamp-2 text-[18px] leading-snug" : "truncate text-[20px] leading-[1.3]"}`}
          title={title}
        >
          {title}
        </p>
        <p className="mt-1 text-[14px] leading-[1.58] text-[#4d5156]">
          {shownDate && <span className="text-[#70757a]">{shownDate} — </span>}
          {truncate(
            description || "Add a meta description so Google shows your own text here.",
            mobile ? 120 : META_MAX,
          )}
        </p>
      </div>
    </div>
  );
}

function SocialPreview({
  image,
  title,
  description,
}: {
  image: string | null;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-[500px] overflow-hidden rounded-lg border border-neutral-200 bg-white">
      {image ? (
        <img
          src={`${image}${image.startsWith("/uploads/") ? "?w=640" : ""}`}
          alt=""
          className="aspect-[1.91/1] w-full object-cover"
        />
      ) : (
        <div className="grid aspect-[1.91/1] place-items-center bg-neutral-100 text-sm text-neutral-400">
          Set a featured image to show here
        </div>
      )}
      <div className="border-t border-neutral-200 bg-neutral-50 px-3 py-2.5">
        <p className="text-[11px] uppercase text-neutral-500">{SITE_URL.replace(/^https?:\/\//, "")}</p>
        <p className="mt-0.5 line-clamp-2 text-[15px] font-semibold leading-snug text-neutral-900">
          {title}
        </p>
        <p className="mt-0.5 line-clamp-1 text-[13px] text-neutral-600">{description}</p>
      </div>
    </div>
  );
}
