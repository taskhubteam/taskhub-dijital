// Websites built by TaskHub Dijital. Summaries describe each live site in its own words —
// never invent results, traffic numbers or client quotes. Screenshots live in
// public/images/work/<slug>.webp (1200w) with -640 and -960 siblings.

export type WorkType = "ecommerce" | "business" | "sports" | "media";

export type Work = {
  slug: string;
  title: string;
  category: string;
  type: WorkType;
  summary: string;
  tags: string[];
  url: string;
};

export const WORK_FILTERS: { label: string; type: WorkType | null }[] = [
  { label: "All projects", type: null },
  { label: "E-commerce", type: "ecommerce" },
  { label: "Business websites", type: "business" },
  { label: "Sports & events", type: "sports" },
  { label: "Media & streaming", type: "media" },
];

export const WORKS: Work[] = [
  {
    slug: "taskhubrecruitmentsolutions",
    title: "TaskHub Recruitment Solutions",
    category: "Recruitment & Virtual Assistants",
    type: "business",
    summary:
      "Website for a Dallas-based company that connects growing businesses with pre-vetted virtual assistants for admin, marketing, finance and tech roles — with free consultation booking.",
    tags: ["WordPress", "Lead generation", "Booking"],
    url: "https://taskhubrecruitmentsolutions.com/",
  },
  {
    slug: "killalips",
    title: "Killa Lips",
    category: "Beauty E-commerce",
    type: "ecommerce",
    summary:
      "Online store for a bold beauty brand selling long-lasting lip gloss, matte liquid lipstick, lip oils and 2-in-1 and 3-in-1 lip kits.",
    tags: ["WooCommerce", "WordPress", "Beauty"],
    url: "https://killalips.com/",
  },
  {
    slug: "istoreworks",
    title: "iStore Works",
    category: "Promotional Products Store",
    type: "ecommerce",
    summary:
      "E-commerce store for promotional products and custom branded merchandise — apparel, drinkware, corporate gifts and tech accessories.",
    tags: ["WooCommerce", "WordPress", "Merchandise"],
    url: "https://istoreworks.com/",
  },
  {
    slug: "istoreworksgearup",
    title: "iStore Works Gear Up",
    category: "Gear & Accessories Store",
    type: "ecommerce",
    summary:
      "Online store for premium gear and accessories with secure checkout and fast shipping.",
    tags: ["WooCommerce", "WordPress", "Retail"],
    url: "https://istoreworksgearup.com/",
  },
  {
    slug: "kcpsuppliesinc",
    title: "KCP Supplies & Logistics Inc.",
    category: "Promotional Products",
    type: "business",
    summary:
      "Website for a Garland, Texas supplier of promotional items, apparel and corporate gifts, built around a wide product selection and first-class service.",
    tags: ["Business website", "Promotional products", "Texas"],
    url: "https://www.kcpsuppliesinc.com/",
  },
  {
    slug: "kustomcreativeprints",
    title: "Kustom Creative Prints",
    category: "Branded Products Store",
    type: "ecommerce",
    summary:
      "Store for premium branded products — custom apparel, promotional items and organizational gear for schools, agencies and businesses nationwide, with shop-by-category browsing.",
    tags: ["WooCommerce", "WordPress", "Custom apparel"],
    url: "https://kustomcreativeprints.com/",
  },
  {
    slug: "kcpgearupstore",
    title: "KCP Gear Up",
    category: "Official Gear Store",
    type: "ecommerce",
    summary:
      "The official KCP Gear Up store for premium gear, accessories and featured collections, with fast shipping.",
    tags: ["WooCommerce", "WordPress", "Retail"],
    url: "https://kcpgearupstore.com/",
  },
  {
    slug: "kcptriostore",
    title: "KCP Trio Store",
    category: "Promotional Products Store",
    type: "ecommerce",
    summary:
      "Online store for custom promotional products and branded merchandise for businesses, events and marketing campaigns, with secure checkout.",
    tags: ["WooCommerce", "WordPress", "Merchandise"],
    url: "https://kcptriostore.com/",
  },
  {
    slug: "kcpsports",
    title: "KCP Sports",
    category: "Sports Services Agency",
    type: "sports",
    summary:
      "Website for an all-in-one partner to sports organizations — websites, grants, media, branding, recruiting, events, operations and merchandise, with services from $10 per hour.",
    tags: ["WordPress", "Sports", "Services"],
    url: "https://kcpsports.com/",
  },
  {
    slug: "recruita-bulls",
    title: "Recruita-BULLS",
    category: "Marketing Team Service",
    type: "business",
    summary:
      "Website for a dedicated marketing team service covering e-commerce, lead generation, GoHighLevel and WordPress SEO, with a no-obligation strategy call.",
    tags: ["WordPress", "Marketing", "GoHighLevel"],
    url: "https://recruita-bulls.com/",
  },
  {
    slug: "tvfl-media",
    title: "TVFL — Texas Varsity Football League",
    category: "Sports Media",
    type: "media",
    summary:
      "The home of Texas varsity sports: football, basketball, baseball, volleyball, track and field, recruiting news and recent scores.",
    tags: ["WordPress", "Sports media", "Scores"],
    url: "https://tvfl-media.com/",
  },
  {
    slug: "wedembos",
    title: "We Dem Bos",
    category: "Sports Talent Media",
    type: "media",
    summary:
      "A home for young sports talent with a spotlight series, top headlines and highlight videos of standout players.",
    tags: ["WordPress", "Sports media", "Video"],
    url: "https://wedembos.com/",
  },
  {
    slug: "supersports-elite",
    title: "Super Sports Elite",
    category: "Youth Sports Organization",
    type: "sports",
    summary:
      "Site for a multi-sport organization developing athletes on and off the field, from football to cheer, with online registration.",
    tags: ["WordPress", "Registration", "Youth sports"],
    url: "https://supersports-elite.com/",
  },
  {
    slug: "goteambuzz",
    title: "Go Team Buzz",
    category: "Basketball Tournaments",
    type: "sports",
    summary:
      "Website for a Georgia youth basketball tournament host, with upcoming events and team sign-ups.",
    tags: ["WordPress", "Events", "Basketball"],
    url: "https://goteambuzz.com/",
  },
  {
    slug: "studentathletesuccesssummit",
    title: "Student-Athlete Success Summit",
    category: "Event Website",
    type: "sports",
    summary:
      "Event site for a summit that prepares student-athletes for success in sports, school, careers and life — with an event countdown, success sessions and networking.",
    tags: ["WordPress", "Events", "Education"],
    url: "https://studentathletesuccesssummit.org/",
  },
  {
    slug: "novel-network",
    title: "Novel TV",
    category: "Streaming Platform",
    type: "media",
    summary:
      "A streaming platform for movies, TV shows, live TV and originals, with subscription plans and watchlists.",
    tags: ["Streaming", "Web app", "Subscriptions"],
    url: "https://www.novel-network.com/",
  },
];

export function workImage(slug: string, width?: 640 | 960) {
  return width ? `/images/work/${slug}-${width}.webp` : `/images/work/${slug}.webp`;
}

export function workSrcSet(slug: string) {
  return `${workImage(slug, 640)} 640w, ${workImage(slug, 960)} 960w, ${workImage(slug)} 1200w`;
}
