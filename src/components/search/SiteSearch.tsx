"use client";

import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Header search button. The dialog (cmdk + index) is code-split and only downloaded the first
// time someone opens search — by click, ⌘K / Ctrl+K, or "/".
const SearchDialog = dynamic(() => import("@/components/search/SearchDialog"), { ssr: false });

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
  );
}

export default function SiteSearch({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [mac, setMac] = useState(true);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    if (compact) return; // only one instance listens for the shortcut
    function onKey(e: KeyboardEvent) {
      const combo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (combo || (e.key === "/" && !isTyping(e.target))) {
        e.preventDefault();
        setLoaded(true);
        setOpen((o) => (combo ? !o : true));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [compact]);

  function openSearch() {
    setLoaded(true);
    setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        onPointerEnter={() => void import("@/components/search/SearchDialog")}
        aria-label="Search the site"
        aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
        className={
          compact
            ? "flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            : "flex items-center gap-2 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all duration-200 w-10 justify-center 2xl:w-auto 2xl:justify-start 2xl:pl-3.5 2xl:pr-2"
        }
      >
        <Search
          className={compact ? "w-4 h-4 text-red-600 dark:text-red-400" : "w-5 h-5 2xl:w-4 2xl:h-4 text-red-600 dark:text-red-400"}
          aria-hidden="true"
        />
        {!compact && (
          <>
            <span className="hidden text-sm 2xl:inline">Search</span>
            <kbd className="hidden rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-1.5 py-0.5 font-sans text-[11px] 2xl:inline">
              {mac ? "⌘K" : "Ctrl K"}
            </kbd>
          </>
        )}
      </button>
      {loaded && <SearchDialog open={open} onOpenChange={setOpen} />}
    </>
  );
}
