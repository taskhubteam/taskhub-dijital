import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Zap, 
  Shield, 
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Trophy,
  ShoppingCart,
  Sparkles,
  Target,
  Rocket,
  Users,
  Award
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import PlexusBackground from "../components/PlexusBackground.jsx";
import { scrollToContact } from "../utils/scrollToContact.js";

const services = [
  {
    icon: Briefcase,
    title: "Business Websites",
    description: "Professional corporate websites that establish credibility and drive conversions for your business.",
    features: [
      "Custom Brand Design",
      "Lead Generation Forms",
      "Professional Content",
      "Mobile Responsive",
    ],
  },
  {
    icon: Trophy,
    title: "Sports Websites",
    description: "Dynamic sports team and league websites with real-time updates, schedules, and fan engagement.",
    features: [
      "Team Rosters & Stats",
      "Event Calendars",
      "News & Updates",
      "Fan Interaction",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Stores",
    description: "Full-featured online stores with secure payment processing and inventory management.",
    features: [
      "Product Catalog",
      "Secure Checkout",
      "Order Management",
      "Payment Integration",
    ],
  },
];

const whyChooseUs = [
  {
    icon: Target,
    title: "US Market Standards",
    description: "Built to meet and exceed American business expectations with professional quality.",
  },
  {
    icon: Zap,
    title: "Performance Optimized",
    description: "Lightning-fast loading speeds with optimized code and modern technologies.",
  },
  {
    icon: Globe,
    title: "Responsive Design",
    description: "Perfect display across all devices - desktop, tablet, and mobile.",
  },
  {
    icon: TrendingUp,
    title: "SEO Ready",
    description: "Search engine optimized structure to help you rank higher in Google.",
  },
  {
    icon: Sparkles,
    title: "Modern UI/UX",
    description: "Beautiful, intuitive interfaces that provide exceptional user experiences.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with SSL certificates and regular backups.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn about your business, goals, and target audience to create the perfect strategy.",
  },
  {
    number: "02",
    title: "Design",
    description: "Our designers craft beautiful mockups that align with your brand identity.",
  },
  {
    number: "03",
    title: "Development",
    description: "Expert developers bring the design to life with clean, efficient code.",
  },
  {
    number: "04",
    title: "Launch",
    description: "We deploy your website and provide training and ongoing support.",
  },
];

export default function TraditionalWebsitesPage() {
  return (
    <div id="src_pages_TraditionalWebsitesPage_kr8l" className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <main id="src_pages_TraditionalWebsitesPage_bmq6">
        {/* Hero Section */}
        <section id="src_pages_TraditionalWebsitesPage_lb5d" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/20 dark:to-gray-950">
          <PlexusBackground />
          
          <div id="src_pages_TraditionalWebsitesPage_m5ul" className="max-w-6xl mx-auto relative z-10 text-center pt-32 pb-20">
            <motion.div
              id="src_pages_TraditionalWebsitesPage_bj3b" initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                id="src_pages_TraditionalWebsitesPage_q6vh" initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block mb-6"
              >
                <span id="src_pages_TraditionalWebsitesPage_rj0g" className="px-6 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-wide">
                  TRADITIONAL WEB SOLUTIONS
                </span>
              </motion.div>

              <h1 id="src_pages_TraditionalWebsitesPage_4bag" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Premium Traditional Websites{' '}
                <span id="src_pages_TraditionalWebsitesPage_4src" className="text-primary-600 dark:text-primary-500">
                  for Modern Businesses
                </span>
              </h1>

              <motion.p
                id="src_pages_TraditionalWebsitesPage_9lfo" initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto font-light"
              >
                Built with trust, performance, and scalability at the core. Designed for the US market.
              </motion.p>

              <motion.button
                id="src_pages_TraditionalWebsitesPage_c4ne" initial={{ opacity: 0, y: 20 }}
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
              id="src_pages_TraditionalWebsitesPage_nt2v" initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
            >
              {[
                { value: "500+", label: "Websites Built" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "<2s", label: "Load Time" },
                { value: "24/7", label: "Support" },
              ].map((stat, idx) => (
                <motion.div
                  id="src_pages_TraditionalWebsitesPage_l9xl" key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="text-center"
                >
                  <div id="src_pages_TraditionalWebsitesPage_o8cx" className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.value}
                  </div>
                  <div id="src_pages_TraditionalWebsitesPage_cb3u" className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="src_pages_TraditionalWebsitesPage_4xzs" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 overflow-hidden">
          <AnimatedBackground />
          
          <div id="src_pages_TraditionalWebsitesPage_dte8" className="max-w-7xl mx-auto relative z-10">
            <motion.div
              id="src_pages_TraditionalWebsitesPage_qmm8" initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 id="src_pages_TraditionalWebsitesPage_jr1k" className="section-title mb-4">
                Our Website Solutions
              </h2>
              <p id="src_pages_TraditionalWebsitesPage_gq7c" className="section-subtitle">
                Tailored websites for every business need
              </p>
            </motion.div>

            <div id="src_pages_TraditionalWebsitesPage_jla9" className="grid md:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <motion.div
                  id="src_pages_TraditionalWebsitesPage_lsw2" key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="glass-card p-8 text-center group cursor-pointer"
                >
                  <div id="src_pages_TraditionalWebsitesPage_tdp6" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 mb-6 group-hover:bg-primary-600 dark:group-hover:bg-primary-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <service.icon id="src_pages_TraditionalWebsitesPage_zrv6" className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 id="src_pages_TraditionalWebsitesPage_i1yt" className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p id="src_pages_TraditionalWebsitesPage_tgp3" className="text-gray-600 dark:text-gray-400 mb-6">
                    {service.description}
                  </p>
                  <ul id="src_pages_TraditionalWebsitesPage_lc8n" className="space-y-2 text-left">
                    {service.features.map((feature) => (
                      <li
                        id="src_pages_TraditionalWebsitesPage_oas7" key={feature}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="src_pages_TraditionalWebsitesPage_x3fj" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <AnimatedBackground />
          
          <div id="src_pages_TraditionalWebsitesPage_yqt9" className="max-w-7xl mx-auto relative z-10">
            <motion.div
              id="src_pages_TraditionalWebsitesPage_oe3g" initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 id="src_pages_TraditionalWebsitesPage_3rej" className="section-title mb-4">
                Why Choose Us
              </h2>
              <p id="src_pages_TraditionalWebsitesPage_g3jk" className="section-subtitle">
                Excellence in every aspect of web development
              </p>
            </motion.div>

            <div id="src_pages_TraditionalWebsitesPage_0pog" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUs.map((item, idx) => (
                <motion.div
                  id="src_pages_TraditionalWebsitesPage_gpp2" key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card p-6 group cursor-pointer"
                >
                  <div id="src_pages_TraditionalWebsitesPage_4ydf" className="flex items-start gap-4">
                    <div id="src_pages_TraditionalWebsitesPage_gp3o" className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:bg-primary-600 dark:group-hover:bg-primary-600 transition-all duration-300 group-hover:scale-110">
                      <item.icon id="src_pages_TraditionalWebsitesPage_jk5p" className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div id="src_pages_TraditionalWebsitesPage_vrb1">
                      <h3 id="src_pages_TraditionalWebsitesPage_fvp8" className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p id="src_pages_TraditionalWebsitesPage_x9ce" className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="src_pages_TraditionalWebsitesPage_1hvc" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 overflow-hidden">
          <AnimatedBackground />
          
          <div id="src_pages_TraditionalWebsitesPage_qs8h" className="max-w-7xl mx-auto relative z-10">
            <motion.div
              id="src_pages_TraditionalWebsitesPage_1voa" initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 id="src_pages_TraditionalWebsitesPage_skw7" className="section-title mb-4">
                Our Process
              </h2>
              <p id="src_pages_TraditionalWebsitesPage_8hxh" className="section-subtitle">
                A proven approach to building exceptional websites
              </p>
            </motion.div>

            <div id="src_pages_TraditionalWebsitesPage_sw0s" className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, idx) => (
                <motion.div
                  id="src_pages_TraditionalWebsitesPage_blq7" key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {idx < processSteps.length - 1 && (
                    <div id="src_pages_TraditionalWebsitesPage_7qep" className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary-600 to-primary-300 dark:from-primary-500 dark:to-primary-800 -translate-x-1/2 z-0" />
                  )}
                  
                  <div id="src_pages_TraditionalWebsitesPage_cwe2" className="relative z-10 text-center">
                    <motion.div
                      id="src_pages_TraditionalWebsitesPage_y3ki" whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 text-white font-bold text-3xl mb-4 shadow-xl shadow-primary-500/30"
                    >
                      {step.number}
                    </motion.div>
                    <h3 id="src_pages_TraditionalWebsitesPage_2cpk" className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p id="src_pages_TraditionalWebsitesPage_cjn8" className="text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="src_pages_TraditionalWebsitesPage_mz2j" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
          <div id="src_pages_TraditionalWebsitesPage_oop3" className="absolute inset-0 opacity-10">
            <PlexusBackground />
          </div>
          
          <div id="src_pages_TraditionalWebsitesPage_tko2" className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.div
              id="src_pages_TraditionalWebsitesPage_auc6" initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 id="src_pages_TraditionalWebsitesPage_1tzd" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Build Your Website with Us
              </h2>
              <p id="src_pages_TraditionalWebsitesPage_7vna" className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join hundreds of successful businesses who trust us with their online presence. Let's create something amazing together.
              </p>
              
              <motion.button
                id="src_pages_TraditionalWebsitesPage_8khg" whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-semibold text-primary-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 text-lg"
              >
                Start Your Project
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              <div id="src_pages_TraditionalWebsitesPage_5hel" className="mt-12 flex items-center justify-center gap-8 text-white/80 text-sm">
                <div id="src_pages_TraditionalWebsitesPage_6tna" className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span id="src_pages_TraditionalWebsitesPage_vcg9">Free Consultation</span>
                </div>
                <div id="src_pages_TraditionalWebsitesPage_de8b" className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span id="src_pages_TraditionalWebsitesPage_op3x">No Hidden Fees</span>
                </div>
                <div id="src_pages_TraditionalWebsitesPage_1rqy" className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span id="src_pages_TraditionalWebsitesPage_ahu2">Fast Delivery</span>
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
