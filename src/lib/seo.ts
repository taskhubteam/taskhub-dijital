import type { Metadata } from "next";
import {
  ADDRESS,
  EMAIL,
  LEGAL_NAME,
  LOGO,
  OG_IMAGE,
  PARENT_URL,
  PHONE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIALS,
} from "@/lib/site";

export type JsonLdData = Record<string, unknown>;

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "/" : path}`;

/**
 * Standard per-page metadata: title, description, canonical, Open Graph and Twitter card.
 * Titles should stay ≤ 60 chars and descriptions 120–158 chars.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  absoluteTitle = false,
  noindex = false,
  publishedTime,
  modifiedTime,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  /** Use the title as-is (skip the " | TaskHub Dijital" template). */
  absoluteTitle?: boolean;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const images = [{ url: absoluteUrl(image || OG_IMAGE) }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_US",
      images,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}

/** The business — a ProfessionalService (LocalBusiness subtype) with NAP for local + AI search. */
export const ORGANIZATION_LD: JsonLdData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: absoluteUrl(LOGO) },
  image: absoluteUrl(OG_IMAGE),
  description: SITE_DESCRIPTION,
  email: EMAIL,
  telephone: PHONE,
  priceRange: "$$",
  address: { "@type": "PostalAddress", ...ADDRESS },
  areaServed: { "@type": "Country", name: "United States" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE,
    email: EMAIL,
    contactType: "customer service",
    availableLanguage: "English",
    areaServed: "US",
  },
  parentOrganization: { "@type": "Organization", name: LEGAL_NAME, url: PARENT_URL },
  sameAs: Object.values(SOCIALS),
  knowsAbout: [
    "AI website development",
    "Agentic AI systems",
    "Web development",
    "WordPress development",
    "MERN stack development",
    "Next.js",
    "Managed web hosting",
    "Search engine optimization",
    "UI/UX design",
  ],
};

export const WEBSITE_LD: JsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: "en-US",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function breadcrumbLd(items: { name: string; path: string }[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** A service page: Service offered by the organization, with optional starting prices. */
export function serviceLd({
  name,
  description,
  path,
  serviceType,
  offers = [],
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  offers?: { name: string; price: number; unit?: string }[];
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    ...(offers.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name,
            itemListElement: offers.map((o) => ({
              "@type": "Offer",
              name: o.name,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: o.price,
                priceCurrency: "USD",
                ...(o.unit ? { unitText: o.unit } : {}),
              },
            })),
          },
        }
      : {}),
  };
}

export function webPageLd({
  name,
  description,
  path,
  type = "WebPage",
}: {
  name: string;
  description: string;
  path: string;
  type?: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };
}
