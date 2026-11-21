"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

const MotionLink = motion.create(Link);

export default function AddonsRevisionsPricingCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 p-8">
        {/* Icon */}
        <motion.div initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
        >
          <Wrench className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </motion.div>

        {/* Heading */}
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Add-ons & Revisions
        </h3>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-5xl font-bold text-primary-600 dark:text-primary-400">
            $10
          </span>
          <span className="text-2xl text-gray-600 dark:text-gray-400 font-medium">
            /hour
          </span>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Flexible updates and revisions whenever you need
        </p>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {[
            "Quick turnaround time",
            "Professional quality work",
            "No minimum commitment",
            "Pay only for what you use"
          ].map((feature, idx) => (
            <motion.div key={feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <MotionLink whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/contact"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/50 flex items-center justify-center gap-2"
        >
          <Clock className="w-5 h-5" />
          Request Changes
        </MotionLink>
      </div>
    </motion.div>
  );
}
