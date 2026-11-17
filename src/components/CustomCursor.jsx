"use client";

import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef({ mx: 0, my: 0, cx: 0, cy: 0 });

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    // Touch devices have no cursor: skip entirely (no listeners, no animation loop).
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      ring.style.display = 'none';
      return;
    }

    const tick = () => {
      const pos = posRef.current;
      pos.cx += (pos.mx - pos.cx) * 0.13;
      pos.cy += (pos.my - pos.cy) * 0.13;
      ring.style.transform = `translate(${pos.cx - 14}px, ${pos.cy - 14}px)`;
      // Only keep animating while the ring is still catching up with the pointer.
      if (Math.abs(pos.mx - pos.cx) > 0.1 || Math.abs(pos.my - pos.cy) > 0.1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    const onMove = (e) => {
      posRef.current.mx = e.clientX;
      posRef.current.my = e.clientY;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
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
