"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Three.js (~130 KB) is purely decorative. It loads only after the visitor interacts with the page
// (mouse move, scroll, touch, key) — never on a timer — and only when the device has a real GPU.
// Without a GPU, WebGL falls back to software rendering on the main thread, which froze slow
// machines (PageSpeed desktop measured 12.7 s of blocking time from it).
const HeroSphere = dynamic(() => import("./HeroSphere.jsx"), { ssr: false });

function hasHardwareGpu() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}

export default function DeferredHeroSphere() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const events = ["pointermove", "pointerdown", "scroll", "keydown", "touchstart", "wheel"];
    const start = () => {
      cleanup();
      if (hasHardwareGpu()) setShow(true);
    };
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, start));
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return cleanup;
  }, []);

  return show ? <HeroSphere /> : null;
}
