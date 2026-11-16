import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { PostSummary } from "@/lib/api/posts";
import { uploadSrc, uploadSrcSet } from "@/lib/images";

export function formatDate(iso: string) {
  return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function PostCard({ post, priority = false }: { post: PostSummary; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800">
        {post.featuredImage && (
          <img
            src={uploadSrc(post.featuredImage, 640)}
            srcSet={uploadSrcSet(post.featuredImage)}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            alt=""
            width={640}
            height={360}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          <span className="text-primary-600 dark:text-primary-400">{post.category}</span>
          <span aria-hidden="true">·</span>
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3 className="mt-3 text-xl font-bold leading-snug text-gray-900 dark:text-white">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-gray-600 dark:text-gray-400">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400">
          Read article
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
