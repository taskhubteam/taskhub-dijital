// Single source of truth for business facts used in metadata, JSON-LD, llms.txt and the footer.
// Change SITE_URL once the production domain is final — canonicals, sitemap and feeds follow it.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://taskhubdijital.com").replace(/\/$/, "");
export const SITE_NAME = "TaskHub Dijital";
export const LEGAL_NAME = "TASKHUB Recruitment Solutions";
export const SITE_TAGLINE = "AI-Powered Websites, Agentic Systems & Managed Hosting";
export const SITE_DESCRIPTION =
  "TaskHub Dijital builds AI-ready websites, agentic systems, WordPress sites and managed hosting for small and growing businesses in the US.";

export const LOGO = "/images/logo.png";
export const OG_IMAGE = "/images/og-image.jpg";

export const EMAIL = "taskhubdijital@gmail.com";
export const PHONE = "+1-469-577-0392";
export const PHONE_DISPLAY = "469-577-0392";
export const ADDRESS = {
  streetAddress: "PO Box 494995",
  addressLocality: "Dallas",
  addressRegion: "TX",
  postalCode: "75044",
  addressCountry: "US",
};

/** WhatsApp (US number, international format without "+"). */
export const WHATSAPP_NUMBER = "14693964221";
export const WHATSAPP_DISPLAY = "+1 (469) 396-4221";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi TaskHub Dijital, I found you on taskhubdijital.com and I'd like to talk about a project.",
)}`;

export const SCHEDULE_URL = "https://taskhubrecruitmentsolutions.com/schedule/";
export const PARENT_URL = "https://taskhubrecruitmentsolutions.com/";

export const SOCIALS = {
  facebook: "https://www.facebook.com/taskhubdijital",
  instagram: "https://www.instagram.com/taskhubdijital/",
} as const;

/** GA4 web stream "taskhubdijital.com" (stream 16356367532). Public by design. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-DTHV71Q962";
/** GA only runs on the live domain — never on localhost, previews or the admin. */
export const GA_HOSTS = ["taskhubdijital.com"];

/** Public marketing pages (sitemap, llms.txt, chat assistant link allow-list). */
export const PAGES = [
  { path: "/", name: "Home", description: "Agentic systems, web development, managed hosting, WordPress and pricing." },
  { path: "/ai-readiness", name: "AI Websites", description: "AI-ready websites and custom MERN web applications." },
  { path: "/traditional-websites", name: "Traditional Websites", description: "Custom business websites with fixed-price packages." },
  { path: "/managed-hosting", name: "Managed Hosting Services", description: "Managed hosting plans with backups, SSL, CDN and support." },
  { path: "/products", name: "Services", description: "WordPress, Shopify, MERN stack and mobile app development services." },
  { path: "/portfolio", name: "Portfolio", description: "Websites, online stores, sports and media sites built by TaskHub Dijital." },
  { path: "/blog", name: "Blog", description: "Guides on AI websites, web development, SEO and hosting." },
  { path: "/careers", name: "Careers", description: "Open positions at TaskHub Dijital." },
  { path: "/contact", name: "Contact", description: "Contact TaskHub Dijital for a project quote." },
  { path: "/privacy-policy", name: "Privacy Policy", description: "How TaskHub Dijital collects, uses and protects personal information." },
  { path: "/terms-of-service", name: "Terms of Service", description: "Terms for using the website and TaskHub Dijital services." },
] as const;
