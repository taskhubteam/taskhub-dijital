"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FlipStat({ value, label, delay = 0 }) {
  const containerRef = useRef(null);
  const charRefs = useRef([]);
  const chars = value.split('');

  useEffect(() => {
    const els = charRefs.current.filter(Boolean);
    if (!els.length) return;

    gsap.set(els, { rotateY: -90, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(els, {
          rotateY: 0,
          opacity: 1,
          duration: 0.52,
          stagger: 0.08,
          delay,
          ease: 'back.out(1.5)',
        });
      },
      // Reset when scrolled back above so it replays on re-entry
      onLeaveBack: () => {
        gsap.set(els, { rotateY: -90, opacity: 0 });
      },
    });

    return () => trigger.kill();
  }, [delay]);

  return (
    <div ref={containerRef} className="text-center">
      <div
        className="flex items-center justify-center gap-0.5 mb-2"
        style={{ perspective: '400px' }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => { charRefs.current[i] = el; }}
            className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400"
            style={{
              display: 'inline-block',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              lineHeight: 1,
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        {label}
      </div>
    </div>
  );
}
