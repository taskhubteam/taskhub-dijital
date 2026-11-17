"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Three.js (~130 KB) is purely decorative, so it loads only after the visitor interacts with the
// page or a few seconds after load — never competing with the headline for the first paint.
const HeroSphere = dynamic(() => import("./HeroSphere.jsx"), { ssr: false });

export default function DeferredHeroSphere() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer;
    const events = ["pointermove", "pointerdown", "scroll", "keydown", "touchstart"];
    const start = () => {
      setShow(true);
      cleanup();
    };
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      window.removeEventListener("load", onLoad);
      clearTimeout(timer);
    };
    const onLoad = () => {
      timer = setTimeout(start, 4000);
    };
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return cleanup;
  }, []);

  return show ? <HeroSphere /> : null;
}
