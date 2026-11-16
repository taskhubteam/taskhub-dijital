import type { TocItem } from "@/lib/content";

export function BlogToc({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 text-[15px]"
    >
      <span className="text-sm font-bold text-gray-900 dark:text-white">In this article</span>
      <ol className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              <span className="mr-2 font-semibold text-primary-600 dark:text-primary-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
