"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  ShoppingBag, 
  Layers, 
  Smartphone,
  Search,
  TrendingUp,
  Zap,
  Award,
  Target,
  Rocket,
  Shield,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import Link from "next/link";

const MotionLink = motion.create(Link);

export default function ProductsPage() {

  const services = [
    {
      icon: Code,
      title: "WordPress Development",
      description: "High-quality custom WordPress websites",
      features: [
        "Speed optimized",
        "SEO-friendly",
        "Scalable builds",
        "Custom themes"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: ShoppingBag,
      title: "Shopify Development",
      description: "High-converting eCommerce stores",
      features: [
        "Custom themes",
        "App integrations",
        "Payment setup",
        "Store optimization"
      ],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Layers,
      title: "MERN Stack Development",
      description: "Full-stack web applications",
      features: [
        "Scalable SaaS platforms",
        "Custom dashboards",
        "API development",
        "Real-time features"
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Smartphone,
      title: "Mobile & Web Apps",
      description: "Cross-platform mobile applications",
      features: [
        "iOS & Android",
        "Responsive design",
        "Native performance",
        "Cloud integration"
      ],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const seoServices = [
    { label: "Technical SEO", icon: Search },
    { label: "On-page & Off-page SEO", icon: Layers },
    { label: "Performance optimization", icon: Zap },
    { label: "Paid ads strategy", icon: TrendingUp },
  ];

  const whyUsPoints = [
    {
      icon: Award,
      title: "Top-tier Development Quality",
      description: "Industry-leading code standards and best practices"
    },
    {
      icon: Rocket,
      title: "Fast Delivery & Scalable Architecture",
      description: "Agile methodology with enterprise-grade solutions"
    },
    {
      icon: Sparkles,
      title: "AI-Ready Modern Solutions",
      description: "Future-proof applications with AI integration"
    },
    {
      icon: Target,
      title: "US Market-Focused Strategies",
      description: "Tailored solutions for American businesses"
    },
    {
      icon: Shield,
      title: "Proven Results for Businesses",
      description: "Track record of successful digital transformations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-pink-200/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-pink-900/20 blur-3xl"
          />
          <motion.div animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-200/30 via-purple-200/20 to-blue-200/30 dark:from-pink-900/20 dark:via-purple-900/10 dark:to-blue-900/20 blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Premium Digital Solutions
              </span>
            </motion.div>

            <h1 className="hero-rise text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              WordPress, Shopify&nbsp;&amp;{" "}
              <br/>
              <span className="gradient-text">MERN Development</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
              We build high-performance digital solutions trusted by businesses across the US
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MotionLink whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="btn-primary group"
              >
                Get a Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MotionLink>
              <motion.button whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-secondary"
              >
                View Services
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section id="services" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Core Services & Offerings
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="glass-card p-6 h-full">
                  {/* Gradient glow on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
                  
                  <motion.div whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO & Digital Marketing Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-gray-900" />
        <motion.div animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-transparent to-blue-500/30 blur-3xl"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              SEO & Digital Growth Services
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              We help businesses rank higher, attract traffic, and grow revenue with data-driven SEO and digital marketing strategies.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seoServices.map(({ label, icon: Icon }, idx) => (
                <motion.div key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-white mb-3 mx-auto" />
                  <h3 className="text-lg font-semibold text-white">
                    {label}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why We Are the Best Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why We Are the Best in the US
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Trusted by businesses nationwide for exceptional digital solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUsPoints.map((point, idx) => (
              <motion.div key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card p-6 text-center group"
              >
                <motion.div whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30"
                >
                  <point.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-gray-900" />
        <motion.div animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-transparent to-blue-500/30 blur-3xl"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something Powerful Together
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Start your digital transformation with industry-leading experts
            </p>
            <MotionLink whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-primary-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/50 group relative overflow-hidden"
            >
              <motion.div animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 blur-xl"
              />
              <span className="relative">Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative" />
            </MotionLink>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
