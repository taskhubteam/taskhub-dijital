"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Premium brand logos - using TASKHUB logo
const clients = [
  { src: "/images/clients/kcp-supplies.webp", alt: "KCP Supplies & Logistics" },
  { src: "/images/clients/killa-lips.webp", alt: "Killa Lips" },
  { src: "/images/clients/we-dem-bos.webp", alt: "We Dem Bos" },
  { src: "/images/clients/super-sports-elite.webp", alt: "Super Sports Elite" },
  { src: "/images/clients/kcp-sports.webp", alt: "KCP Sports" },
  { src: "/images/clients/sass.webp", alt: "Student-Athlete Success Summit" },
  { src: "/images/clients/kcp-gear-up.webp", alt: "KCP Gear Up" },
  { src: "/images/clients/go-team-buzz.webp", alt: "Go Team Buzz" },
  { src: "/images/clients/novel-tv.webp", alt: "Novel TV" },
  { src: "/images/clients/dir-sports-wear.webp", alt: "D.I.R Sports Wear" },
];

export default function ClientsSection() {
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  // Triple the array for seamless infinite loop
  const triplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute inset-0 bg-grid" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Parallax */}
        <motion.div initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <motion.h2 initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white"
          >
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 bg-clip-text text-transparent">
              Businesses &amp; Teams
            </span>{" "}
            Across the US
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Brands, online stores and sports organizations whose websites we designed, built and launched
          </motion.p>
        </motion.div>

        {/* Glassmorphism Logo Carousel Container */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glassmorphism background strip */}
          <div className="absolute inset-0 backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl" />
          
          {/* Logo carousel */}
          <div className="relative overflow-hidden py-12 px-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex">
              <motion.div className="flex gap-12 md:gap-16 lg:gap-20"
                animate={{
                  x: isPaused ? undefined : [0, "-33.333%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
                style={{
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              >
                {triplicatedClients.map((logo, index) => (
                  <motion.div key={index}
                    className="group relative flex-shrink-0 w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    
                    {/* Logo container */}
                    <div className="relative w-full h-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-2xl group-hover:border-primary-300/50 dark:group-hover:border-primary-600/50 transition-all duration-500 overflow-hidden">
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      
                      {/* Logo image with monochrome to color transition */}
                      <img src={logo.src}
                        alt={logo.alt}
                        className="relative z-10 w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Left gradient fade */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 lg:w-40 bg-gradient-to-r from-white/80 via-white/40 dark:from-gray-800/80 dark:via-gray-800/40 to-transparent pointer-events-none z-10" />
            
            {/* Right gradient fade */}
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 lg:w-40 bg-gradient-to-l from-white/80 via-white/40 dark:from-gray-800/80 dark:via-gray-800/40 to-transparent pointer-events-none z-10" />
          </div>
        </motion.div>

        {/* Subtle decorative elements */}
        <motion.div initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 left-10 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl"
        />
        <motion.div initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-1/2 right-10 w-40 h-40 bg-primary-600/5 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
}
