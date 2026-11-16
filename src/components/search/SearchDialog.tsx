"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import {
  ArrowUpRight,
  BookOpen,
  CircleDollarSign,
  CircleHelp,
  CornerDownLeft,
  FileText,
  Layers,
  Search,
  X,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { track } from "@/lib/analytics";
import { listPostSummaries } from "@/lib/api/posts";
import {
  QUICK_LINKS,
  STATIC_ENTRIES,
  postEntries,
  searchEntries,
  type SearchEntry,
  type SearchKind,
} from "@/lib/search";

// Loaded lazily by SiteSearch the first time search is opened, so cmdk/Radix and the index don't
// weigh on page load.

const KIND_ICON: Record<SearchKind, LucideIcon> = {
  Page: FileText,
  Service: Layers,
  Pricing: CircleDollarSign,
  FAQ: CircleHelp,
  Blog: BookOpen,
};

let postsCache: Promise<SearchEntry[]> | null = null;
function loadPostEntries(): Promise<SearchEntry[]> {
  postsCache ??= listPostSummaries()
    .then(postEntries)
    .catch(() => {
      postsCache = null; // try again next time
      return [];
    });
  return postsCache;
}

export default function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<SearchEntry[]>([]);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    void loadPostEntries().then((p) => alive && setPosts(p));
    return () => {
      alive = false;
    };
  }, [open]);

  const results = useMemo(() => searchEntries([...STATIC_ENTRIES, ...posts], query), [posts, query]);
  const searching = query.trim().length > 0;

  function go(entry: SearchEntry) {
    if (searching) track("search", { search_term: query.trim() });
    onOpenChange(false);
    setQuery("");
    if (entry.external) window.open(entry.href, "_blank", "noopener,noreferrer");
    else router.push(entry.href);
  }

  const items = searching ? results : QUICK_LINKS;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[90] bg-gray-950/60 backdrop-blur-sm" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-x-4 top-[8vh] z-[90] mx-auto flex max-h-[80vh] max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-2xl focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
        >
          <DialogPrimitive.Title className="sr-only">Search TaskHub Dijital</DialogPrimitive.Title>
          <Command shouldFilter={false} loop label="Search the site" className="flex min-h-0 flex-col">
            <div className="flex items-center gap-3 border-b border-gray-200 px-4 dark:border-gray-800">
              <Search className="h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder="Search services, pricing, articles…"
                className="h-14 w-full bg-transparent text-base outline-none placeholder:text-gray-400"
              />
              <DialogPrimitive.Close
                aria-label="Close search"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </DialogPrimitive.Close>
            </div>

            <Command.List className="min-h-0 overflow-y-auto overscroll-contain p-2">
              {searching && (
                <Command.Empty className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    No results for &ldquo;
                    <span className="text-gray-900 dark:text-white">{query.trim()}</span>&rdquo;.
                  </p>
                  <p className="mt-2">
                    Can&apos;t find it?{" "}
                    <a href="/contact" className="font-semibold text-primary-600 hover:underline">
                      Ask us directly
                    </a>
                    .
                  </p>
                </Command.Empty>
              )}

              <Command.Group
                heading={searching ? undefined : "Popular"}
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-gray-500"
              >
                {items.map((entry) => {
                  const Icon = KIND_ICON[entry.kind];
                  return (
                    <Command.Item
                      key={`${entry.kind}:${entry.title}`}
                      value={`${entry.kind}:${entry.title}`}
                      onSelect={() => go(entry)}
                      className="group flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 data-[selected=true]:bg-primary-50 dark:data-[selected=true]:bg-primary-900/20"
                    >
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gray-100 text-primary-600 group-data-[selected=true]:bg-white dark:bg-gray-800 dark:text-primary-400 dark:group-data-[selected=true]:bg-gray-900">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold">{entry.title}</span>
                          {entry.external && (
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gray-400" aria-label="opens in a new tab" />
                          )}
                        </span>
                        <span className="mt-0.5 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                          {entry.desc}
                        </span>
                      </span>
                      {searching && (
                        <span className="mt-1 shrink-0 rounded-md border border-gray-200 px-1.5 py-0.5 text-[11px] font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
                          {entry.kind}
                        </span>
                      )}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            </Command.List>

            <div className="hidden items-center gap-4 border-t border-gray-200 px-4 py-2.5 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400 sm:flex">
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border border-gray-300 px-1.5 py-0.5 font-sans dark:border-gray-700">↑</kbd>
                <kbd className="rounded border border-gray-300 px-1.5 py-0.5 font-sans dark:border-gray-700">↓</kbd>
                to move
              </span>
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border border-gray-300 px-1.5 py-0.5 font-sans dark:border-gray-700">
                  <CornerDownLeft className="inline h-3 w-3" aria-hidden="true" />
                </kbd>
                to open
              </span>
              <span className="inline-flex items-center gap-1.5">
                <kbd className="rounded border border-gray-300 px-1.5 py-0.5 font-sans dark:border-gray-700">esc</kbd>
                to close
              </span>
            </div>
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
