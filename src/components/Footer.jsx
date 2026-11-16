import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { ADDRESS, EMAIL, LEGAL_NAME, PARENT_URL, PHONE, PHONE_DISPLAY, SITE_NAME, SOCIALS } from "@/lib/site";

const navItems = [
  { label: "AI Websites", href: "/ai-readiness" },
  { label: "Services", href: "/products" },
  { label: "Traditional Websites", href: "/traditional-websites" },
  { label: "Managed Hosting Services", href: "/managed-hosting" },
  { label: "VA Expert", href: PARENT_URL, isExternal: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const iconLink =
  "text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 icon-bounce";

// Server component: plain links + NAP (name, address, phone) so every page carries
// consistent business details for search engines and answer engines.
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section: Logo + Tagline */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" aria-label="TaskHub Dijital home">
            <img
              src="/images/logo.webp"
              alt="TaskHub Dijital logo"
              width="78"
              height="48"
              loading="lazy"
              className="h-12 w-auto object-contain mb-4 cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm max-w-md">
            Building AI-powered websites and agentic systems for growing businesses
          </p>
        </div>

        {/* Navigation Links */}
        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-8"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 text-sm font-medium hover:scale-105"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href={SOCIALS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={iconLink}
            aria-label="TaskHub Dijital on Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={iconLink}
            aria-label="TaskHub Dijital on Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* NAP */}
        <address className="not-italic text-center text-sm text-gray-600 dark:text-gray-400 mb-8">
          {ADDRESS.streetAddress}, {ADDRESS.addressLocality}, {ADDRESS.addressRegion}{" "}
          {ADDRESS.postalCode} ·{" "}
          <a href={`tel:${PHONE.replace(/-/g, "")}`} className="hover:text-primary-600">
            {PHONE_DISPLAY}
          </a>{" "}
          ·{" "}
          <a href={`mailto:${EMAIL}`} className="hover:text-primary-600">
            {EMAIL}
          </a>
        </address>

        {/* Copyright */}
        <div className="text-center border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="mt-2 flex justify-center gap-4 text-xs">
            <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-gray-400">·</span>
            <Link href="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              Terms of Service
            </Link>
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-xs mt-2">
            Powered by{" "}
            <a
              href={PARENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {LEGAL_NAME}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
