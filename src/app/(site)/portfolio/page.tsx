import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { WORKS, workImage } from "@/content/portfolio";
import { absoluteUrl, breadcrumbLd, pageMetadata, webPageLd } from "@/lib/seo";
import { SCHEDULE_URL, SITE_URL } from "@/lib/site";

const title = "Portfolio — Websites & Stores We Built";
const description =
  "See websites, WooCommerce stores, sports and media sites and a streaming platform designed and built by TaskHub Dijital for US businesses and organizations.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/portfolio",
  image: workImage(WORKS[0].slug),
});

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <JsonLd
        data={[
          webPageLd({ name: title, description, path: "/portfolio", type: "CollectionPage" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/portfolio" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "TaskHub Dijital portfolio",
            numberOfItems: WORKS.length,
            itemListElement: WORKS.map((w, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "CreativeWork",
                name: w.title,
                url: w.url,
                description: w.summary,
                genre: w.category,
                image: absoluteUrl(workImage(w.slug)),
                creator: { "@id": `${SITE_URL}/#organization` },
              },
            })),
          },
        ]}
      />
      <Navbar />
      <main>
        <section className="relative px-4 sm:px-6 lg:px-8 pt-36 pb-14 text-center">
          <div className="max-w-4xl mx-auto">
            <Eyebrow icon={Briefcase}>Our Portfolio</Eyebrow>
            <h1 className="hero-rise text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Work We&apos;re <span className="text-primary-600 dark:text-primary-500">Proud Of</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              Websites, online stores, sports and media platforms — designed, built and live for real
              businesses and organizations. Click any project to see it in action.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm sm:px-8 sm:py-4 sm:text-lg">
                Start your project <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <a
                href={SCHEDULE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm sm:px-8 sm:py-4 sm:text-lg"
              >
                Book a free call
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="projects-heading" className="px-4 sm:px-6 lg:px-8 pb-24">
          <PortfolioGrid />
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 p-10 text-center text-white shadow-xl">
            <h2 className="text-3xl font-bold">Want a website like these?</h2>
            <p className="mt-3 text-white/90">
              Website plans start at $800 setup plus $49.99/month, with domain and hosting included.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-primary-700 hover:bg-gray-100"
              >
                See pricing
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
