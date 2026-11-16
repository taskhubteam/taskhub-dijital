"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { WORKS, WORK_FILTERS, workImage, workSrcSet, type WorkType } from "@/content/portfolio";

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<WorkType | null>(null);
  const works = filter ? WORKS.filter((w) => w.type === filter) : WORKS;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="projects-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
          {works.length} {works.length === 1 ? "project" : "projects"}
        </h2>
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {WORK_FILTERS.map((f) => {
            const active = filter === f.type;
            return (
              <button
                key={f.label}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.type)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-primary-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((w, i) => (
          <li key={w.slug}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[16/10] overflow-hidden border-b border-gray-100 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
                <img
                  src={workImage(w.slug, 640)}
                  srcSet={workSrcSet(w.slug)}
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  alt={`${w.title} website homepage designed and built by TaskHub Dijital`}
                  width={640}
                  height={400}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
                  {w.category}
                </p>
                <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="after:absolute after:inset-0"
                  >
                    {w.title}
                  </a>
                </h3>
                <p className="mt-3 flex-1 text-gray-600 dark:text-gray-400">{w.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                  {w.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-gray-100 dark:bg-gray-900 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400">
                  Visit website
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
