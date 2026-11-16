"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Server, 
  Globe, 
  Shield, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import PlexusBackground from "../components/PlexusBackground.jsx";
import { scrollToContact } from "../utils/scrollToContact.js";

const features = [
  {
    icon: Zap,
    title: "High-Speed Hosting",
    description: "Lightning-fast servers with SSD storage and optimized performance for instant page loads.",
  },
  {
    icon: Globe,
    title: "Free Domain Setup",
    description: "Get your custom domain registered and configured at no additional cost.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock expert support to ensure your website stays online and performs optimally.",
  },
  {
    icon: Shield,
    title: "Secure & Scalable Infrastructure",
    description: "Enterprise-grade security with SSL, DDoS protection, and seamless scalability as you grow.",
  },
];

const pricingPlans = [
  {
    name: "Starter Setup",
    price: "$49.99",
    description: "Perfect for launching your first website",
    features: [
      "Domain Registration",
      "Hosting Setup",
      "Basic Configuration",
      "SSL Certificate",
      "Email Setup",
      "1 Month Free Support",
    ],
    popular: false,
  },
  {
    name: "Growth Plus",
    price: "$69.99",
    description: "Ideal for growing businesses",
    features: [
      "Domain Registration",
      "Hosting Setup",
      "Monthly SEO Optimization",
      "Performance Monitoring",
      "SSL Certificate",
      "Priority Support",
      "Weekly Backups",
      "Analytics Dashboard",
    ],
    popular: true,
  },
];

const trustLogos = [
  { name: "Google Cloud", alt: "Google Cloud Partner" },
  { name: "AWS", alt: "AWS Certified" },
  { name: "Cloudflare", alt: "Cloudflare Protected" },
  { name: "Let's Encrypt", alt: "SSL Secured" },
];

export default function ManagedHostingServicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/20 dark:to-gray-950">
          <PlexusBackground />
          
          <div className="max-w-6xl mx-auto relative z-10 text-center pt-32 pb-20">
            <motion.div initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div initial={false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block mb-6"
              >
                <span className="px-6 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-wide">
                  PREMIUM HOSTING SOLUTIONS
                </span>
              </motion.div>

              <h1 className="hero-rise text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Managed Hosting{' '}
                <span className="text-primary-600 dark:text-primary-500">
                  Services
                </span>
              </h1>

              <motion.p initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto font-light"
              >
                Fully managed hosting and domain setup for US businesses — fast, secure and backed by real support.
              </motion.p>

              <motion.button initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="btn-primary text-lg px-10 py-5"
              >
                Get Started Today
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
            >
              {[
                { value: "99.9%", label: "Uptime Target" },
                { value: "Free", label: "SSL Certificate" },
                { value: "24/7", label: "Support" },
                { value: "Daily", label: "Backups" },
              ].map((stat, idx) => (
                <motion.div key={stat.label}
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Highlight Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 overflow-hidden">
          <AnimatedBackground />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 className="section-title mb-4">
                Why Choose Our Hosting?
              </h2>
              <p className="section-subtitle">
                Enterprise-grade infrastructure with unmatched reliability
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <motion.div key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="glass-card p-8 text-center group cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 mb-6 group-hover:bg-primary-600 dark:group-hover:bg-primary-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <feature.icon className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <AnimatedBackground />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 className="section-title mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="section-subtitle">
                Choose the perfect plan to launch your online presence
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, idx) => (
                <motion.div key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.2 }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  className={`relative glass-card p-8 ${
                    plan.popular
                      ? "border-2 border-primary-500 shadow-2xl shadow-primary-500/20"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-6 py-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold text-sm shadow-lg">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold text-primary-600 dark:text-primary-400">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        per month
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature}
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button onClick={scrollToContact}
                    className={`w-full ${
                      plan.popular ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    {plan.popular ? "Get Growth Plan" : "Choose Plan"}
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic">
                      Add-ons are billed separately.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 overflow-hidden">
          <AnimatedBackground />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 className="section-title mb-4">
                Trusted by Businesses Across the US
              </h2>
              <p className="section-subtitle">
                Powered by industry-leading technology partners
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {trustLogos.map((logo, idx) => (
                <motion.div key={logo.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex items-center justify-center p-6 glass-card group cursor-pointer"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:bg-primary-600 dark:group-hover:bg-primary-600 transition-all duration-300">
                      <Award className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {logo.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="mt-16 max-w-3xl mx-auto"
            >
              <div className="glass-card p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our hosting promise</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Your site runs on secure, monitored infrastructure with free SSL, regular backups and a real
                  team to contact when you need help. We handle updates and maintenance, so you can focus on
                  your business.
                </p>
                <a href="/contact" className="btn-primary inline-flex">
                  Talk to our hosting team
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <PlexusBackground />
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Launch Your Website with Confidence
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join hundreds of successful businesses who trust us with their online presence. Get started today with our premium hosting solutions.
              </p>
              
              <motion.button whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-semibold text-primary-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 text-lg"
              >
                Start Now
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              <div className="mt-12 flex items-center justify-center gap-8 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>No Setup Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Cancel Anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
