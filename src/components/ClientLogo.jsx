import React from "react";
import { motion } from "framer-motion";

export default function ClientLogo({ logo, index }) {
  return (
    <motion.div
      id="src_components_ClientLogo_h9bp" initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.1, y: -5 }}
      className="group relative flex-shrink-0 w-40 h-24 mx-6 cursor-pointer"
    >
      {/* Gradient border on hover */}
      <div id="src_components_ClientLogo_o8vk" className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 via-white to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      {/* Logo container */}
      <div id="src_components_ClientLogo_z5od" className="relative w-full h-full bg-white dark:bg-gray-800 rounded-xl p-6 flex items-center justify-center shadow-md group-hover:shadow-2xl group-hover:shadow-primary-500/30 transition-all duration-500 overflow-hidden">
        {/* Gradient overlay on hover */}
        <div id="src_components_ClientLogo_brm1" className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Light reflection effect */}
        <div id="src_components_ClientLogo_2bqn" className="absolute -top-full -left-full w-full h-full bg-gradient-to-br from-white/40 to-transparent rotate-45 group-hover:top-0 group-hover:left-0 transition-all duration-700" />
        
        {/* Logo image */}
        <img
          id="src_components_ClientLogo_g1ug" src={logo.src}
          alt={logo.alt}
          className="relative z-10 w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
          loading="lazy"
        />
        
        {/* Glow effect */}
        <div id="src_components_ClientLogo_r9yk" className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary-500/20 to-white/20 blur-xl" />
      </div>
    </motion.div>
  );
}
