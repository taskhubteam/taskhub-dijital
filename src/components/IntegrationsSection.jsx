"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tech = [
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/react/react-original.svg',
    bg: '#20232a',
    light: false,
  },
  {
    name: 'Next.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/nextjs/nextjs-original.svg',
    bg: '#000000',
    light: false,
  },
  {
    name: 'Node.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/nodejs/nodejs-original.svg',
    bg: '#f9fafb',
    light: true,
  },
  {
    name: 'MongoDB',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mongodb/mongodb-original.svg',
    bg: '#f9fafb',
    light: true,
  },
  {
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/typescript/typescript-original.svg',
    bg: '#3178c6',
    light: false,
  },
  {
    name: 'WordPress',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/wordpress/wordpress-plain.svg',
    bg: '#21759b',
    light: false,
  },
  {
    name: 'Tailwind',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/tailwindcss/tailwindcss-original.svg',
    bg: '#f9fafb',
    light: true,
  },
  {
    name: 'AWS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    bg: '#232f3e',
    light: false,
  },
];

// Geometry — large tiles, wide orbit
const ORBIT_R = 480;
const TILE_W  = 210;
const TILE_H  = 145;
const LOGO_PX = 80;

// Width covers the full orbit diameter; height is just the tile + breathing room
// (orbit rotates on Y axis → tiles never move vertically)
const STAGE_W = ORBIT_R * 2 + TILE_W + 32;   // 1192 px wide
const STAGE_H = TILE_H + 250;                 //  395 px tall

export default function IntegrationsSection() {
  const orbitRef   = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(orbit, { rotateY: 360, duration: 30, ease: 'none', repeat: -1 });

    // Spin only while the section is on screen — no work when scrolled away.
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
    });

    return () => { tl.kill(); st.kill(); };
  }, []);

  return (
    <section
      id="integrations"
      ref={sectionRef}
      className="relative py-36 overflow-hidden bg-gradient-to-br from-white via-orange-50/20 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-transparent to-orange-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-gray-800/30" />

      {/* Heading — stays constrained */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="section-title mb-4">Tech Stack &amp; Integrations</h2>
          <p className="section-subtitle">
            The tools we master to build your digital future
          </p>
        </motion.div>
      </div>

      {/* Mobile / tablet: static 2-col grid (hidden on lg+) */}
      <div className="lg:hidden max-w-2xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10">
        {tech.map((t) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl shadow-md"
            style={{
              background: t.bg,
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <img
              src={t.logo}
              alt={t.name}
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span
              className="text-xs font-semibold text-center"
              style={{ color: t.light ? '#111827' : '#ffffff' }}
            >
              {t.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Desktop: 3D orbit (hidden below lg) */}
      <div
        className="hidden lg:block relative mx-auto"
        style={{
          width: `${STAGE_W}px`,
          height: `${STAGE_H}px`,
          perspective: '1400px',
          maxWidth: '100vw',
          overflow: 'hidden',
        }}
      >
        {/* Rotating ring */}
        <div
          ref={orbitRef}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
        >
          {tech.map((t, i) => {
            const angle = (i / tech.length) * 360;
            return (
              <div
                key={t.name}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: `${TILE_W}px`,
                  height: `${TILE_H}px`,
                  marginLeft: `-${TILE_W / 2}px`,
                  marginTop: `-${TILE_H / 2}px`,
                  transform: `rotateY(${angle}deg) translateZ(${ORBIT_R}px)`,
                  borderRadius: 20,
                  background: t.bg,
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow:
                    '0 12px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: 18,
                }}
              >
                <img
                  src={t.logo}
                  alt={t.name}
                  width={LOGO_PX}
                  height={LOGO_PX}
                  style={{
                    width: LOGO_PX,
                    height: LOGO_PX,
                    objectFit: 'contain',
                    display: 'block',
                    flexShrink: 0,
                  }}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span
                  style={{
                    color: t.light ? '#111827' : '#ffffff',
                    fontWeight: 700,
                    fontSize: 15,
                    letterSpacing: '0.04em',
                    textAlign: 'center',
                    lineHeight: 1,
                  }}
                >
                  {t.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pills — constrained again */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center mt-10"
        >
          {['Built for any business', 'Leading-edge technology', 'Modern, scalable tools'].map(
            (label) => (
              <span
                key={label}
                className="px-5 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 shadow-sm"
              >
                {label}
              </span>
            )
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5 }}
          className="mt-5 text-sm text-center text-gray-500 dark:text-gray-400"
        >
          Connect with the tools you already use and love
        </motion.p>
      </div>
    </section>
  );
}
