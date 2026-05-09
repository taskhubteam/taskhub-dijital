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
  Users
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
    <div id="src_pages_ManagedHostingServicesPage_8uva" className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <main id="src_pages_ManagedHostingServicesPage_o6gv">
        {/* Hero Section */}
        <section id="src_pages_ManagedHostingServicesPage_1vyd" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/20 dark:to-gray-950">
          <PlexusBackground />
          
          <div id="src_pages_ManagedHostingServicesPage_xn7i" className="max-w-6xl mx-auto relative z-10 text-center pt-32 pb-20">
            <motion.div
              id="src_pages_ManagedHostingServicesPage_xw0n" initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                id="src_pages_ManagedHostingServicesPage_4lrl" initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block mb-6"
              >
                <span id="src_pages_ManagedHostingServicesPage_c2dr" className="px-6 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-wide">
                  PREMIUM HOSTING SOLUTIONS
                </span>
              </motion.div>

              <h1 id="src_pages_ManagedHostingServicesPage_d0jb" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Managed Hosting{' '}
                <span id="src_pages_ManagedHostingServicesPage_7dct" className="text-primary-600 dark:text-primary-500">
                  Services
                </span>
              </h1>

              <motion.p
                id="src_pages_ManagedHostingServicesPage_qlm1" initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto font-light"
              >
                We provide the best Hosting &amp; Domain solutions in the United States with unmatched performance and support.
              </motion.p>

              <motion.button
                id="src_pages_ManagedHostingServicesPage_0zfb" initial={{ opacity: 0, y: 20 }}
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
            <motion.div
              id="src_pages_ManagedHostingServicesPage_6lrd" initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
            >
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "<100ms", label: "Response Time" },
                { value: "24/7", label: "Support" },
                { value: "500+", label: "Happy Clients" },
              ].map((stat, idx) => (
                <motion.div
                  id="src_pages_ManagedHostingServicesPage_pk3r" key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="text-center"
                >
                  <div id="src_pages_ManagedHostingServicesPage_tu8x" className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.value}
                  </div>
                  <div id="src_pages_ManagedHostingServicesPage_7irr" className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Highlight Section */}
        <section id="src_pages_ManagedHostingServicesPage_g4sc" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 overflow-hidden">
          <AnimatedBackground />
          
          <div id="src_pages_ManagedHostingServicesPage_6dig" className="max-w-7xl mx-auto relative z-10">
            <motion.div
              id="src_pages_ManagedHostingServicesPage_w5du" initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 id="src_pages_ManagedHostingServicesPage_rr1x" className="section-title mb-4">
                Why Choose Our Hosting?
              </h2>
              <p id="src_pages_ManagedHostingServicesPage_0xvi" className="section-subtitle">
                Enterprise-grade infrastructure with unmatched reliability
              </p>
            </motion.div>

            <div id="src_pages_ManagedHostingServicesPage_tyl9" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  id="src_pages_ManagedHostingServicesPage_l5su" key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="glass-card p-8 text-center group cursor-pointer"
                >
                  <div id="src_pages_ManagedHostingServicesPage_a2jb" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 mb-6 group-hover:bg-primary-600 dark:group-hover:bg-primary-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <feature.icon id="src_pages_ManagedHostingServicesPage_ngp3" className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 id="src_pages_ManagedHostingServicesPage_cd9b" className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p id="src_pages_ManagedHostingServicesPage_3yrp" className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="src_pages_ManagedHostingServicesPage_boa3" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <AnimatedBackground />
          
          <div id="src_pages_ManagedHostingServicesPage_6ytq" className="max-w-7xl mx-auto relative z-10">
            <motion.div
              id="src_pages_ManagedHostingServicesPage_z7jz" initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 id="src_pages_ManagedHostingServicesPage_obd6" className="section-title mb-4">
                Simple, Transparent Pricing
              </h2>
              <p id="src_pages_ManagedHostingServicesPage_i6zu" className="section-subtitle">
                Choose the perfect plan to launch your online presence
              </p>
            </motion.div>

            <div id="src_pages_ManagedHostingServicesPage_5you" className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, idx) => (
                <motion.div
                  id="src_pages_ManagedHostingServicesPage_lt8n" key={plan.name}
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
                    <div id="src_pages_ManagedHostingServicesPage_zat4" className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span id="src_pages_ManagedHostingServicesPage_9yjt" className="px-6 py-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold text-sm shadow-lg">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div id="src_pages_ManagedHostingServicesPage_ebj5" className="text-center mb-8">
                    <h3 id="src_pages_ManagedHostingServicesPage_pra0" className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p id="src_pages_ManagedHostingServicesPage_gn5x" className="text-gray-600 dark:text-gray-400 mb-6">
                      {plan.description}
                    </p>
                    <div id="src_pages_ManagedHostingServicesPage_j4tk" className="flex items-baseline justify-center gap-2">
                      <span id="src_pages_ManagedHostingServicesPage_3zdo" className="text-5xl font-bold text-primary-600 dark:text-primary-400">
                        {plan.price}
                      </span>
                      <span id="src_pages_ManagedHostingServicesPage_z9zr" className="text-gray-600 dark:text-gray-400">
                        per month
                      </span>
                    </div>
                  </div>

                  <ul id="src_pages_ManagedHostingServicesPage_w5ip" className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        id="src_pages_ManagedHostingServicesPage_8nre" key={feature}
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                        <span id="src_pages_ManagedHostingServicesPage_lla4">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    id="src_pages_ManagedHostingServicesPage_jcg7" onClick={scrollToContact}
                    className={`w-full ${
                      plan.popular ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    {plan.popular ? "Get Growth Plan" : "Choose Plan"}
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div id="src_pages_ManagedHostingServicesPage_addon_note" className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p id="src_pages_ManagedHostingServicesPage_v0zp" className="text-xs text-center text-gray-500 dark:text-gray-400 italic">
                      Add-ons are billed separately.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section id="src_pages_ManagedHostingServicesPage_ryk1" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 overflow-hidden">
          <AnimatedBackground />
          
          <div id="src_pages_ManagedHostingServicesPage_g0gr" className="max-w-7xl mx-auto relative z-10">
            <motion.div
              id="src_pages_ManagedHostingServicesPage_q3np" initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 id="src_pages_ManagedHostingServicesPage_z1gz" className="section-title mb-4">
                Trusted by Businesses Across the US
              </h2>
              <p id="src_pages_ManagedHostingServicesPage_l4qw" className="section-subtitle">
                Powered by industry-leading technology partners
              </p>
            </motion.div>

            <div id="src_pages_ManagedHostingServicesPage_5guz" className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {trustLogos.map((logo, idx) => (
                <motion.div
                  id="src_pages_ManagedHostingServicesPage_1hrl" key={logo.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex items-center justify-center p-6 glass-card group cursor-pointer"
                >
                  <div id="src_pages_ManagedHostingServicesPage_ghd2" className="text-center">
                    <div id="src_pages_ManagedHostingServicesPage_oeo3" className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:bg-primary-600 dark:group-hover:bg-primary-600 transition-all duration-300">
                      <Award className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p id="src_pages_ManagedHostingServicesPage_emi5" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {logo.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div
              id="src_pages_ManagedHostingServicesPage_lpv5" initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="mt-16 max-w-3xl mx-auto"
            >
              <div id="src_pages_ManagedHostingServicesPage_ke5d" className="glass-card p-8 text-center">
                <div id="src_pages_ManagedHostingServicesPage_e7yu" className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      id="src_pages_ManagedHostingServicesPage_dq8o" key={i}
                      className="w-6 h-6 text-primary-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path id="src_pages_ManagedHostingServicesPage_pn6y" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p id="src_pages_ManagedHostingServicesPage_dwa9" className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic">
                  "TaskHub Dijital's managed hosting has been a game-changer for our business. Lightning-fast performance and exceptional support!"
                </p>
                <div id="src_pages_ManagedHostingServicesPage_a7mv" className="flex items-center justify-center gap-4">
                  <div id="src_pages_ManagedHostingServicesPage_kz6g" className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div id="src_pages_ManagedHostingServicesPage_gh1q" className="text-left">
                    <p id="src_pages_ManagedHostingServicesPage_lm5s" className="font-semibold text-gray-900 dark:text-white">
                      Sarah Johnson
                    </p>
                    <p id="src_pages_ManagedHostingServicesPage_lry1" className="text-sm text-gray-600 dark:text-gray-400">
                      CEO, TechStart Inc.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="src_pages_ManagedHostingServicesPage_fye5" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
          <div id="src_pages_ManagedHostingServicesPage_f9jr" className="absolute inset-0 opacity-10">
            <PlexusBackground />
          </div>
          
          <div id="src_pages_ManagedHostingServicesPage_tbo7" className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.div
              id="src_pages_ManagedHostingServicesPage_mac1" initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              <h2 id="src_pages_ManagedHostingServicesPage_v2nr" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Launch Your Website with Confidence
              </h2>
              <p id="src_pages_ManagedHostingServicesPage_r9af" className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join hundreds of successful businesses who trust us with their online presence. Get started today with our premium hosting solutions.
              </p>
              
              <motion.button
                id="src_pages_ManagedHostingServicesPage_rqb0" whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-semibold text-primary-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 text-lg"
              >
                Start Now
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              <div id="src_pages_ManagedHostingServicesPage_5rxy" className="mt-12 flex items-center justify-center gap-8 text-white/80 text-sm">
                <div id="src_pages_ManagedHostingServicesPage_lh5q" className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span id="src_pages_ManagedHostingServicesPage_3ugy">No Setup Fees</span>
                </div>
                <div id="src_pages_ManagedHostingServicesPage_im5c" className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span id="src_pages_ManagedHostingServicesPage_ft5t">Cancel Anytime</span>
                </div>
                <div id="src_pages_ManagedHostingServicesPage_sbp8" className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span id="src_pages_ManagedHostingServicesPage_pl8u">24/7 Support</span>
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
