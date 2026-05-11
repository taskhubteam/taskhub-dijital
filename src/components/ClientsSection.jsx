import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Premium brand logos - using TASKHUB logo
const clients = [
  { src: "/images/1777324078022_TASKHUB__logo-image.webp", alt: "TASKHUB Dijital" },
  { src: "/images/1777323694703_WE-DEM-BOS-LOGO-image.webp", alt: "WE DEM BOS" },
  { src: "/images/1777324227641_WE-DEM-BOS-LOGO-image.webp", alt: "WE DEM BOS New" },
  { src: "/images/1777917084483_1000299329-image.jpg", alt: "Partner Company" },
  { src: "/images/1777917477293_1000299328-image.jpg", alt: "Partner Company New" },
  { src: "/images/1777324078022_TASKHUB__logo-image.webp", alt: "TASKHUB Partner 1" },
  { src: "/images/1777323694703_WE-DEM-BOS-LOGO-image.webp", alt: "WE DEM BOS Partner" },
  { src: "/images/1777917084483_1000299329-image.jpg", alt: "Partner Company 2" },
  { src: "/images/1777917477293_1000299328-image.jpg", alt: "Partner Company New 2" },
  { src: "/images/1777324078022_TASKHUB__logo-image.webp", alt: "TASKHUB Partner 2" },
  { src: "/images/1777323694703_WE-DEM-BOS-LOGO-image.webp", alt: "Client Partner 1" },
  { src: "/images/1777917084483_1000299329-image.jpg", alt: "Partner Company 3" },
  { src: "/images/1777917477293_1000299328-image.jpg", alt: "Partner Company New 3" },
  { src: "/images/1777324078022_TASKHUB__logo-image.webp", alt: "TASKHUB Partner 3" },
];

export default function ClientsSection() {
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  // Triple the array for seamless infinite loop
  const triplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section 
      id="src_components_ClientsSection_y1dw" ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      {/* Subtle background pattern */}
      <div id="src_components_ClientsSection_rlv1" className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div id="src_components_ClientsSection_iia5" className="absolute inset-0 bg-grid" />
      </div>

      <div id="src_components_ClientsSection_b0dp" className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Parallax */}
        <motion.div
          id="src_components_ClientsSection_qvr7" initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <motion.h2 
            id="src_components_ClientsSection_y3pp" initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white"
          >
            Trusted by{" "}
            <span id="src_components_ClientsSection_zg0l" className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 bg-clip-text text-transparent">
              Leading Companies
            </span>{" "}
            Worldwide
          </motion.h2>
          <motion.p 
            id="src_components_ClientsSection_az3i" initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Join thousands of businesses using our platform to scale faster
          </motion.p>
        </motion.div>

        {/* Glassmorphism Logo Carousel Container */}
        <motion.div
          id="src_components_ClientsSection_z9gn" initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glassmorphism background strip */}
          <div id="src_components_ClientsSection_ny7f" className="absolute inset-0 backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl" />
          
          {/* Logo carousel */}
          <div 
            id="src_components_ClientsSection_phb5" className="relative overflow-hidden py-12 px-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div id="src_components_ClientsSection_1vfc" className="flex">
              <motion.div
                id="src_components_ClientsSection_d9kw" className="flex gap-12 md:gap-16 lg:gap-20"
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
                  <motion.div
                    id="src_components_ClientsSection_a2tt" key={index}
                    className="group relative flex-shrink-0 w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Hover glow effect */}
                    <div id="src_components_ClientsSection_c6dr" className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    
                    {/* Logo container */}
                    <div id="src_components_ClientsSection_gux4" className="relative w-full h-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-2xl group-hover:border-primary-300/50 dark:group-hover:border-primary-600/50 transition-all duration-500 overflow-hidden">
                      {/* Shimmer effect on hover */}
                      <div id="src_components_ClientsSection_2sbb" className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      
                      {/* Logo image with monochrome to color transition */}
                      <img
                        id="src_components_ClientsSection_zcl3" src={logo.src === "/images/1777324227641_WE-DEM-BOS-LOGO-image.webp" ? "/images/1777918260032_Gemini_Generated_Image_66ydua66ydua66yd-image.png" : logo.src}
                        alt={logo.alt}
                        className="relative z-10 w-full h-full object-contain filter grayscale brightness-0 dark:brightness-100 opacity-40 dark:opacity-30 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Left gradient fade */}
            <div id="src_components_ClientsSection_eo0y" className="absolute left-0 top-0 bottom-0 w-24 md:w-32 lg:w-40 bg-gradient-to-r from-white/80 via-white/40 dark:from-gray-800/80 dark:via-gray-800/40 to-transparent pointer-events-none z-10" />
            
            {/* Right gradient fade */}
            <div id="src_components_ClientsSection_ao3b" className="absolute right-0 top-0 bottom-0 w-24 md:w-32 lg:w-40 bg-gradient-to-l from-white/80 via-white/40 dark:from-gray-800/80 dark:via-gray-800/40 to-transparent pointer-events-none z-10" />
          </div>
        </motion.div>

        {/* Subtle decorative elements */}
        <motion.div
          id="src_components_ClientsSection_5sov" initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 left-10 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl"
        />
        <motion.div
          id="src_components_ClientsSection_9ycd" initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-1/2 right-10 w-40 h-40 bg-primary-600/5 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
}
