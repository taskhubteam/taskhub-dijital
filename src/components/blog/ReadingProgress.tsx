"use client";

import { useEffect, useRef } from "react";

/** Thin bar at the top of an article showing how far the reader has scrolled. */
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      bar.current?.style.setProperty("transform", `scaleX(${max > 0 ? el.scrollTop / max : 0})`);
    }
    function onScroll() {
      frame ||= requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={bar} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-primary-600 to-primary-400" style={{ transform: "scaleX(0)" }} aria-hidden />;
}
