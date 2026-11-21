"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Globe, Lock, Headphones, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WordPressPricingCard() {
  const features = [
    "Custom WordPress website design",
    "Basic business websites, blogs, landing pages",
    "Mobile responsive design",
    "SEO-friendly structure",
    "Fast loading optimization",
    "Free domain for 1 year",
    "Free SSL certificate",
    "24/7 customer support",
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      className="relative max-w-md mx-auto"
    >
      {/* Limited Time Badge */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg"
        >
          <Package className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="text-sm font-bold">All-in-One Package</span>
        </motion.div>
      </div>

      <div className="card mt-8 border-2 border-primary-500 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent dark:from-primary-900/20 dark:to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          {/* Included highlights (replaces a fake, always-restarting countdown) */}
          <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Included at no extra cost
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Globe, label: "Free domain", sub: "1st year" },
                { icon: Lock, label: "Free SSL", sub: "HTTPS" },
                { icon: Headphones, label: "Support", sub: "24/7" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <item.icon className="mx-auto h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  <div className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{item.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold gradient-text">$49.99</span>
              <span className="text-gray-600 dark:text-gray-400">/month</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            WordPress Website Package
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Complete WordPress solution with hosting, domain, and professional design
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {features.map((feature) => (
              <li key={feature}
                className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-200"
              >
                <Check className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Get Started Button */}
          <Link href="/contact"
            className="btn-primary w-full group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
