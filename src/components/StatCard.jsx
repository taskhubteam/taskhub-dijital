"use client";

import React from "react";
import { motion } from "framer-motion";

export default function StatCard({ stat, index }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7 + index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-card p-6 text-center cursor-pointer hover:shadow-xl hover:shadow-primary-500/20 transition-all duration-300"
    >
      <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary-600 dark:text-primary-400 icon-bounce" />
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {stat.value}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
    </motion.div>
  );
}
