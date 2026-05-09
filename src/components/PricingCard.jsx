import React from "react";
import { motion } from "framer-motion";
import { scrollToContact } from "../utils/scrollToContact.js";

export default function PricingCard({ plan, index }) {

  return (
    <motion.div
      id="src_components_PricingCard_q0yo" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: plan.popular || plan.starter || plan.bestForStarters ? 1.05 : 1.02, y: -8 }}
      className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col ${
        plan.popular ? "ring-2 ring-primary-600 lg:scale-105 mt-6" : ""
      } ${
        plan.starter && !plan.bestForStarters ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
      } ${
        plan.bestForStarters ? "ring-2 ring-primary-300 dark:ring-primary-400 shadow-primary-300/15 dark:shadow-primary-400/15" : ""
      }`}
      style={
        plan.popular 
          ? { boxShadow: '0 0 30px rgba(220, 38, 38, 0.3)' } 
          : plan.starter 
          ? { boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' }
          : {}
      }
    >
      {plan.bestForStarters && (
        <div id="src_components_PricingCard_starter" className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2.5 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-400 text-white text-sm font-bold rounded-full shadow-lg z-20 tracking-wide uppercase whitespace-nowrap" style={{ 
          boxShadow: '0 6px 20px rgba(239, 68, 68, 0.25), 0 0 15px rgba(239, 68, 68, 0.2)',
          background: 'linear-gradient(135deg, #f87171 0%, #fca5a5 50%, #f87171 100%)',
          letterSpacing: '0.05em'
        }}>
          <span id="src_components_PricingCard_starter_text" className="relative">
            Best for Starters
            <span id="src_components_PricingCard_starter_underline" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white/30 rounded-full"></span>
          </span>
        </div>
      )}
      {plan.starter && !plan.bestForStarters && (
        <div id="src_components_PricingCard_starter_alt" className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2.5 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white text-sm font-bold rounded-full shadow-2xl z-20 tracking-wide uppercase whitespace-nowrap" style={{ 
          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4), 0 0 20px rgba(59, 130, 246, 0.3)',
          background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%)',
          letterSpacing: '0.05em'
        }}>
          <span id="src_components_PricingCard_starter_alt_text" className="relative">
            Best for Starters
            <span id="src_components_PricingCard_starter_alt_underline" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white/30 rounded-full"></span>
          </span>
        </div>
      )}
      {plan.popular && (
        <div id="src_components_PricingCard_2gbx" className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2.5 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-white text-sm font-bold rounded-full shadow-2xl z-20 tracking-wide uppercase whitespace-nowrap" style={{ 
          boxShadow: '0 8px 24px rgba(220, 38, 38, 0.4), 0 0 20px rgba(220, 38, 38, 0.3)',
          background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #dc2626 100%)',
          letterSpacing: '0.05em'
        }}>
          <span id="src_components_PricingCard_v4wd" className="relative">
            Most Popular
            <span id="src_components_PricingCard_1gpx" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white/30 rounded-full"></span>
          </span>
        </div>
      )}
      
      <div id="src_components_PricingCard_u8cd" className="p-6 sm:p-8 flex flex-col h-full">
        {/* Plan Name and Subtitle */}
        <div id="src_components_PricingCard_m8ef" className="text-center mb-6">
          <h3 id="src_components_PricingCard_a0vk" className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {plan.name}
          </h3>
          <p id="src_components_PricingCard_c1ei" className="text-sm text-gray-500 dark:text-gray-400">
            {plan.subtitle}
          </p>
        </div>

        {/* Pricing */}
        <div id="src_components_PricingCard_ppo9" className="text-center mb-8">
          <div id="src_components_PricingCard_5mbu" className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {plan.setupPrice}
          </div>
          <p id="src_components_PricingCard_y5pl" className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            One-time setup fee
          </p>
          <div id="src_components_PricingCard_8cbl" className="mt-3">
            <p id="src_components_PricingCard_tm6k" className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {plan.monthlyPrice}
            </p>
            <p id="src_components_PricingCard_yq9e" className="text-xs text-gray-500 dark:text-gray-400">
              {plan.monthlyDescription}
            </p>
          </div>
        </div>

        {/* Features - Red bars with white text */}
        <ul id="src_components_PricingCard_al0w" className="space-y-2 mb-8 flex-grow">
          {plan.features.map((feature, idx) => (
            <motion.li
              id="src_components_PricingCard_kl0f" 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 + idx * 0.05 }}
              className="bg-primary-600 dark:bg-primary-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-700 dark:hover:bg-primary-800 transition-colors duration-200"
            >
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          id="src_components_PricingCard_4xzx" 
          onClick={scrollToContact}
          className={`w-full py-3.5 px-6 rounded-lg font-bold text-base transition-all duration-300 mt-auto ${
            plan.popular 
              ? "bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl hover:shadow-primary-500/50 transform hover:scale-105" 
              : plan.bestForStarters
              ? "bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg hover:shadow-primary-400/40 transform hover:scale-105"
              : plan.starter
              ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105"
              : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white transform hover:scale-105"
          }`}
        >
          {plan.popular ? "Choose Plan" : "Get Started"}
        </button>
      </div>
    </motion.div>
  );
}
