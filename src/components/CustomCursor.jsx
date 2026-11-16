"use client";

import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef({ mx: 0, my: 0, cx: 0, cy: 0 });

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const onMove = (e) => {
      posRef.current.mx = e.clientX;
      posRef.current.my = e.clientY;
    };

    const tick = () => {
      const pos = posRef.current;
      pos.cx += (pos.mx - pos.cx) * 0.13;
      pos.cy += (pos.my - pos.cy) * 0.13;
      ring.style.transform = `translate(${pos.cx - 14}px, ${pos.cy - 14}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        border: '1px solid rgba(220, 38, 38, 0.55)',
        background: 'transparent',
        pointerEvents: 'none',
        zIndex: 9997,
        willChange: 'transform',
      }}
    />
  );
}
