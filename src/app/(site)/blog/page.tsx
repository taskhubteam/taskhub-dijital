import Link from "next/link";
import { BookOpen } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { PostCard } from "@/components/blog/PostCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { listPostSummaries } from "@/lib/api/posts";
import { absoluteUrl, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { slugify } from "@/lib/slugify";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const title = "Blog — AI, Web Development & SEO Guides";
const description =
  "Practical guides from TaskHub Dijital on AI-ready websites, agentic systems, WordPress, web development, SEO and managed hosting for small businesses.";

export const metadata = pageMetadata({ title, description, path: "/blog" });

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const posts = await listPostSummaries();
  const categories = [...new Set(posts.map((p) => p.category))].sort();
  const active = category ? categories.find((c) => slugify(c) === category) : undefined;
  const shown = active ? posts.filter((p) => p.category === active) : posts;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${SITE_URL}/blog#blog`,
            name: `${SITE_NAME} Blog`,
            description,
            url: absoluteUrl("/blog"),
            publisher: { "@id": `${SITE_URL}/#organization` },
            blogPost: posts.slice(0, 20).map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: absoluteUrl(`/blog/${p.slug}`),
              datePublished: p.date,
            })),
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <Navbar />
      <main>
        <section className="relative px-4 sm:px-6 lg:px-8 pt-36 pb-12 text-center">
          <div className="max-w-4xl mx-auto">
            <Eyebrow icon={BookOpen}>Insights &amp; Guides</Eyebrow>
            <h1 className="hero-rise text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              The TaskHub Dijital <span className="text-primary-600 dark:text-primary-500">Blog</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              Guides on AI-ready websites, agentic systems, web development, SEO and hosting.
            </p>
          </div>
        </section>

        {categories.length > 1 && (
          <nav aria-label="Blog categories" className="px-4 pb-10">
            <ul className="flex flex-wrap justify-center gap-2">
              {[{ label: "All", href: "/blog", on: !active }, ...categories.map((c) => ({ label: c, href: `/blog?category=${slugify(c)}`, on: c === active }))].map(
                (chip) => (
                  <li key={chip.href}>
                    <Link
                      href={chip.href}
                      aria-current={chip.on ? "page" : undefined}
                      className={`inline-block rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        chip.on
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-primary-600"
                      }`}
                    >
                      {chip.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        )}

        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-7xl mx-auto">
            {shown.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 py-16">
                New articles are on the way. In the meantime,{" "}
                <Link href="/contact" className="text-primary-600 underline">
                  tell us about your project
                </Link>
                .
              </p>
            ) : (
              <>
              <h2 className="sr-only">{active ? `${active} articles` : "Latest articles"}</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((post, i) => (
                  <PostCard key={post.slug} post={post} priority={i < 3} />
                ))}
              </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
