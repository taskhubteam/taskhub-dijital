import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { ADDRESS, EMAIL, LEGAL_NAME, PARENT_URL, PHONE, PHONE_DISPLAY, SITE_NAME, SOCIALS } from "@/lib/site";

const navItems = [
  { label: "AI Websites", href: "/ai-readiness" },
  { label: "Services", href: "/products" },
  { label: "Traditional Websites", href: "/traditional-websites" },
  { label: "Managed Hosting", href: "/managed-hosting" },
  { label: "VA Expert", href: PARENT_URL, isExternal: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const muted = "text-gray-600 dark:text-gray-400";
const link = "hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200";
const iconLink =
  "flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all duration-300";

// Server component: plain links + NAP (name, address, phone) so every page carries
// consistent business details for search engines and answer engines.
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          {/* Brand + contact */}
          <div>
            <Link href="/" aria-label="TaskHub Dijital home" className="inline-block">
              <img
                src="/images/logo.webp"
                alt="TaskHub Dijital logo"
                width="78"
                height="48"
                loading="lazy"
                className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className={`mt-3 max-w-sm text-sm ${muted}`}>
              Building AI-powered websites and agentic systems for growing businesses.
            </p>
            <address className={`mt-4 space-y-1.5 not-italic text-sm ${muted}`}>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                {ADDRESS.streetAddress}, {ADDRESS.addressLocality}, {ADDRESS.addressRegion} {ADDRESS.postalCode}
              </p>
              <p className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                <a href={`tel:${PHONE.replace(/-/g, "")}`} className={`flex items-center gap-2 ${link}`}>
                  <Phone className="h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
                <a href={`mailto:${EMAIL}`} className={`flex items-center gap-2 ${link}`}>
                  <Mail className="h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  {EMAIL}
                </a>
              </p>
            </address>
          </div>

          {/* Links + social */}
          <div>
            <nav aria-label="Footer">
              <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${link}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 flex gap-3">
              <a
                href={SOCIALS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLink}
                aria-label="TaskHub Dijital on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLink}
                aria-label="TaskHub Dijital on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`mt-8 flex flex-col gap-3 border-t border-gray-200 dark:border-gray-800 pt-6 pb-16 text-xs sm:flex-row sm:items-center sm:justify-between sm:pb-0 sm:pr-52 ${muted}`}
        >
          <p>
            © {currentYear} {SITE_NAME}. All rights reserved. Powered by{" "}
            <a href={PARENT_URL} target="_blank" rel="noopener noreferrer" className={`font-medium ${link}`}>
              {LEGAL_NAME}
            </a>
          </p>
          <p className="flex items-center gap-3">
            <Link href="/privacy-policy" className={link}>
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-gray-400">
              ·
            </span>
            <Link href="/terms-of-service" className={link}>
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
