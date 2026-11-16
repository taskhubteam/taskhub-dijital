import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ArrowLeft, Calendar, Clock, RefreshCw } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { BlogShare } from "@/components/blog/BlogShare";
import { BlogToc } from "@/components/blog/BlogToc";
import { formatDate } from "@/components/blog/PostCard";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPostBySlug, listRelatedPosts } from "@/lib/api/posts";
import { BLOG_AUTHOR } from "@/lib/content";
import { optimizeContentImages, uploadSrc, uploadSrcSet, wrapContentTables } from "@/lib/images";
import { postSeo } from "@/lib/post-seo";
import { absoluteUrl, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { SCHEDULE_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { slugify } from "@/lib/slugify";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

const loadPost = cache((slug: string) => getPostBySlug({ data: { slug } }));

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  const seo = postSeo(post);
  const meta = pageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/blog/${post.slug}`,
    image: post.featuredImage ? uploadSrc(post.featuredImage, 1280) : null,
    type: "article",
    absoluteTitle: true,
    noindex: post.noindex,
    publishedTime: post.date,
    modifiedTime: post.updated,
    keywords: post.keywords,
  });
  if (post.canonicalUrl) meta.alternates = { canonical: post.canonicalUrl };
  if (meta.openGraph) {
    meta.openGraph.title = seo.ogTitle;
    meta.openGraph.description = seo.ogDescription;
  }
  return meta;
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const related = await listRelatedPosts({ data: { excludeSlug: post.slug, category: post.category } });
  const url = absoluteUrl(`/blog/${post.slug}`);
  const html = wrapContentTables(optimizeContentImages(post.contentHtml));
  const words = post.contentHtml.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ReadingProgress />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            headline: post.title,
            description: postSeo(post).description,
            ...(post.featuredImage
              ? { image: { "@type": "ImageObject", url: absoluteUrl(uploadSrc(post.featuredImage, 1280)), caption: post.featuredImageAlt } }
              : {}),
            datePublished: post.date,
            dateModified: post.updated,
            wordCount: words,
            inLanguage: "en-US",
            articleSection: post.category,
            keywords: post.keywords.join(", "),
            author: { "@type": "Organization", name: BLOG_AUTHOR.name, url: BLOG_AUTHOR.url },
            publisher: { "@id": `${SITE_URL}/#organization` },
            isPartOf: { "@id": `${SITE_URL}/blog#blog` },
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <Navbar />
      <main className="px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <article className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary-600">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-primary-600">Blog</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/blog?category=${slugify(post.category)}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                  {post.category}
                </Link>
              </li>
            </ol>
          </nav>

          <header>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
              {post.title}
            </h1>
            <p className="mt-5 text-xl text-gray-600 dark:text-gray-400">{post.excerpt}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              <span>
                By <strong className="text-gray-900 dark:text-white">{BLOG_AUTHOR.name}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              {post.updated !== post.date && (
                <span className="inline-flex items-center gap-1.5">
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {post.readTime} read
              </span>
            </p>
          </header>

          {post.featuredImage && (
            <img
              src={uploadSrc(post.featuredImage, 1280)}
              srcSet={uploadSrcSet(post.featuredImage)}
              sizes="(min-width: 768px) 768px, 100vw"
              alt={post.featuredImageAlt || post.title}
              width={1280}
              height={720}
              fetchPriority="high"
              className="mt-10 w-full rounded-2xl shadow-lg object-cover aspect-[16/9]"
            />
          )}

          <div className="mt-12">
            <BlogToc items={post.tocItems} />
            <div className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
          </div>

          <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <BlogShare slug={post.slug} title={post.title} />
          </div>

          <aside className="mt-12 rounded-2xl bg-gray-50 dark:bg-gray-900 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
              About the author
            </p>
            <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{BLOG_AUTHOR.name}</p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{BLOG_AUTHOR.about}</p>
          </aside>

          <section className="mt-12 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-center text-white shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold">Ready to grow your business online?</h2>
            <p className="mt-3 text-white/90">
              Tell us about your project and get a clear plan and price from the {SITE_NAME} team.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={SCHEDULE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-primary-700 hover:bg-gray-100"
              >
                Book a free call
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </section>

          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="related-title">
              <h2 id="related-title" className="text-2xl font-bold text-gray-900 dark:text-white">
                Keep reading
              </h2>
              <ul className="mt-6 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-xl bg-gray-50 dark:bg-gray-900 p-5 hover:shadow-lg transition-all"
                    >
                      <span>
                        <span className="block text-xs font-semibold uppercase text-primary-600 dark:text-primary-400">
                          {r.category}
                        </span>
                        <span className="mt-1 block font-semibold text-gray-900 dark:text-white group-hover:text-primary-600">
                          {r.title}
                        </span>
                      </span>
                      <ArrowLeft className="h-5 w-5 rotate-180 text-primary-600" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
