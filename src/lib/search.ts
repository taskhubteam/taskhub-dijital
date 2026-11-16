import { HOME_FAQS } from "@/content/faqs";
import { WORKS } from "@/content/portfolio";
import { PAGES } from "@/lib/site";

// Site search (⌘K / Ctrl+K / "/"): a small in-memory index built from the same facts as the
// pages, plus published blog posts fetched when the dialog opens. Plain word matching is plenty
// for a site this size and needs no search service.

export type SearchKind = "Page" | "Service" | "Pricing" | "FAQ" | "Portfolio" | "Blog";

export type SearchEntry = {
  kind: SearchKind;
  title: string;
  desc: string;
  href: string;
  /** Opens another website. */
  external?: boolean;
  /** Extra words to match on that aren't shown. */
  keywords?: string;
};

const PAGE_KEYWORDS: Record<string, string> = {
  "/": "home agentic systems ai agents web development hosting wordpress pricing",
  "/ai-readiness": "ai websites mern stack react node mongodb saas web app ai integration",
  "/traditional-websites": "business website sports website ecommerce store diamond gold platinum enterprise",
  "/managed-hosting": "hosting domain ssl backups cdn support starter setup growth plus",
  "/products": "wordpress shopify mern mobile apps products",
  "/portfolio": "work projects examples clients websites stores case studies",
  "/blog": "articles guides posts",
  "/privacy-policy": "privacy data cookies gdpr personal information",
  "/terms-of-service": "terms conditions legal agreement payments refunds",
  "/careers": "jobs hiring work with us positions apply",
  "/contact":
    "quote estimate price cost hire call book meeting schedule email phone whatsapp get in touch address dallas",
};

export const PAGE_ENTRIES: SearchEntry[] = PAGES.map((p) => ({
  kind: "Page",
  title: p.name,
  desc: p.description,
  href: p.path,
  keywords: PAGE_KEYWORDS[p.path],
}));

const SERVICES: SearchEntry[] = [
  { title: "Agentic AI systems", desc: "Conceive, build and deploy AI agents that automate your business", href: "/", keywords: "ai agents automation chatbot workflow agentic" },
  { title: "Web Development", desc: "Custom websites and web applications built with modern technologies", href: "/#services", keywords: "react next.js responsive seo fast" },
  { title: "UI/UX Design", desc: "Beautiful, intuitive interfaces for every device", href: "/#services", keywords: "design user research wireframing prototyping design systems" },
  { title: "SEO Optimization", desc: "Improve search rankings and drive organic traffic", href: "/#services", keywords: "seo keyword research on-page technical seo analytics google ranking" },
  { title: "Digital Marketing", desc: "Data-driven campaigns with measurable results", href: "/#services", keywords: "social media content strategy ppc email marketing ads" },
  { title: "WordPress Development", desc: "Custom WordPress websites with hosting and domain", href: "/#wordpress", keywords: "wordpress woocommerce themes plugins blog" },
  { title: "Shopify Development", desc: "High-converting e-commerce stores", href: "/products", keywords: "shopify ecommerce store payments themes apps" },
  { title: "MERN Stack Development", desc: "Full-stack web applications and SaaS platforms", href: "/ai-readiness", keywords: "mongodb express react node saas api dashboard" },
  { title: "Mobile & Web Apps", desc: "Cross-platform iOS and Android apps", href: "/products", keywords: "mobile app ios android" },
  { title: "Managed Hosting", desc: "SSL, backups, CDN and 24/7 support", href: "/managed-hosting", keywords: "hosting server uptime security backups" },
].map((s) => ({ ...s, kind: "Service" as const }));

const PRICING: SearchEntry[] = [
  { title: "Starter Plan — $800 + $49.99/mo", desc: "Basic website, up to 5 pages, domain & hosting", href: "/#pricing" },
  { title: "Gold Plan — $1,500 + $69.99/mo", desc: "Modern website, up to 15 pages, hosting & SEO", href: "/#pricing" },
  { title: "Diamond Plan — $2,500 + $69.99/mo", desc: "Modern website, up to 20 pages, hosting & SEO", href: "/#pricing" },
  { title: "Add-ons & Revisions — $10/hour", desc: "Updates and changes, no minimum commitment", href: "/#pricing", keywords: "changes edits updates hourly" },
  { title: "Traditional website packages — from $2,500", desc: "Essential, Growth, Professional and Enterprise builds up to unlimited pages", href: "/traditional-websites", keywords: "ecommerce products essential growth professional enterprise" },
  { title: "Hosting plans — from $49.99/mo", desc: "Starter, Business and Enterprise hosting", href: "/#managed-hosting", keywords: "hosting price cost monthly" },
  { title: "Hosting setup — from $49.99", desc: "Starter Setup and Growth Plus packages", href: "/managed-hosting", keywords: "setup domain registration email" },
  { title: "Custom web apps — from $2.5k", desc: "MERN websites, business apps and SaaS; $60–$120/hr", href: "/ai-readiness", keywords: "hourly rate saas cost" },
].map((p) => ({ ...p, kind: "Pricing" as const, keywords: `price cost pricing plan ${p.keywords ?? ""}` }));

const FAQS: SearchEntry[] = HOME_FAQS.map((f) => ({
  kind: "FAQ",
  title: f.q,
  desc: f.a,
  href: "/#faq",
}));

const PORTFOLIO: SearchEntry[] = WORKS.map((w) => ({
  kind: "Portfolio",
  title: w.title,
  desc: w.summary,
  href: w.url,
  external: true,
  keywords: [w.category, w.tags.join(" ")].join(" "),
}));

export const STATIC_ENTRIES: SearchEntry[] = [...PAGE_ENTRIES, ...SERVICES, ...PRICING, ...FAQS, ...PORTFOLIO];

export const QUICK_LINKS: SearchEntry[] = [
  SERVICES[0],
  ...PAGE_ENTRIES.filter((p) =>
    ["/ai-readiness", "/traditional-websites", "/managed-hosting", "/portfolio", "/blog", "/contact"].includes(p.href),
  ),
  PRICING[0],
];

export type PostForSearch = { slug: string; title: string; excerpt: string; category: string };

export function postEntries(posts: PostForSearch[]): SearchEntry[] {
  return posts.map((p) => ({
    kind: "Blog",
    title: p.title,
    desc: p.excerpt,
    href: `/blog/${p.slug}`,
    keywords: p.category,
  }));
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9+#.$]+/g, " ")
    .trim();
}

type Prepared = { title: string; desc: string; rest: string };
const cache = new WeakMap<SearchEntry, Prepared>();
function prepare(entry: SearchEntry): Prepared {
  let p = cache.get(entry);
  if (!p) {
    p = {
      title: ` ${normalize(entry.title)}`,
      desc: ` ${normalize(entry.desc)}`,
      rest: ` ${normalize(entry.keywords ?? "")}`,
    };
    cache.set(entry, p);
  }
  return p;
}

const KIND_BOOST: Record<SearchKind, number> = { Service: 3, Page: 2, Pricing: 2, FAQ: 1, Portfolio: 1, Blog: 1 };

/** Entries containing every word of the query (word starts count), best matches first. */
export function searchEntries(entries: SearchEntry[], query: string, limit = 12): SearchEntry[] {
  const q = normalize(query);
  if (!q) return [];
  const words = q.split(" ");

  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of entries) {
    const p = prepare(entry);
    let score = 0;
    let ok = true;
    for (const w of words) {
      const start = ` ${w}`;
      if (p.title.includes(start)) score += 10;
      else if (p.title.includes(w)) score += 6;
      else if (p.desc.includes(start)) score += 4;
      else if (p.rest.includes(start)) score += 3;
      else if (p.desc.includes(w) || p.rest.includes(w)) score += 1;
      else {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    if (p.title.trim() === q) score += 20;
    else if (p.title.startsWith(` ${q}`)) score += 8;
    else if (p.title.includes(q)) score += 4;
    scored.push({ entry, score: score + KIND_BOOST[entry.kind] });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry);
}
