"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Code, Smartphone, Cloud, Brain, Zap,
  ArrowRight,
  Rocket, Shield, TrendingUp, Users
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import PricingCard from "../components/PricingCard.jsx";
import StatCard from "../components/StatCard.jsx";
import ContactInfo from "../components/ContactInfo.jsx";
import ContactForm from "../components/ContactForm.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import PlexusBackground from "../components/PlexusBackground.jsx";
import HeroSphere from "../components/HeroSphere.jsx";
import WordPressPricingCard from "../components/WordPressPricingCard.jsx";
import AddonsRevisionsPricingCard from "../components/AddonsRevisionsPricingCard.jsx";
import IntegrationsSection from "../components/IntegrationsSection.jsx";
import TestimonialCarousel from "../components/TestimonialCarousel.jsx";
import ClientsSection from "../components/ClientsSection.jsx";
import AssessmentModal from "../components/AssessmentModal.jsx";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies for optimal performance and scalability.",
    features: ["React & Next.js", "Responsive Design", "SEO Optimized", "Fast Loading"],
  },
  {
    icon: Smartphone,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that provide exceptional user experiences across all devices.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    icon: Cloud,
    title: "SEO Optimization",
    description: "Comprehensive SEO strategies to improve your search rankings and drive organic traffic.",
    features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Analytics"],
  },
  {
    icon: Brain,
    title: "Digital Marketing",
    description: "Data-driven marketing campaigns that deliver measurable results and ROI.",
    features: ["Social Media", "Content Strategy", "PPC Campaigns", "Email Marketing"],
  },
];


const pricingPlans = [
  {
    name: "Starter Plan",
    subtitle: "Basic Website",
    setupPrice: "$800",
    monthlyPrice: "$49.99/month",
    monthlyDescription: "for domain & hosting",
    description: "Perfect for small businesses and startups",
    features: [
      "Custom design tailored to brand",
      "Responsive design on all devices",
      "5 pages only",
      "Visitor tracking & analytics",
      "Website management",
      "SEO-ready",
    ],
    popular: false,
  },
  // {
  //   name: "Basic Plan",
  //   subtitle: "Everything you need to get started",
  //   setupPrice: "$800",
  //   monthlyPrice: "$49.99/month",
  //   monthlyDescription: "for domain & hosting",
  //   description: "Perfect entry-level package for new users and small businesses",
  //   features: [
  //     "Custom design tailored to brand",
  //     "Responsive design on all devices",
  //     "10 pages",
  //     "E-commerce functionality",
  //     "Integration of 50 products",
  //     "Order tracking & management system",
  //     "Shop management",
  //     "SEO ready",
  //   ],
  //   popular: false,
  //   starter: true,
  //   bestForStarters: true,
  // },
  {
    name: "Gold Plan",
    subtitle: "Modern Website",
    setupPrice: "$1500",
    monthlyPrice: "$69.99/month",
    monthlyDescription: "for domain, hosting, and SEO optimization",
    description: "Ideal for growing businesses",
    features: [
      "Custom design tailored to brand",
      "Responsive design on all devices",
      "15 pages only",
      "Visitor tracking & analytics",
      "Website management",
      "SEO-ready",
    ],
    popular: true,
  },
  {
    name: "Diamond Plan",
    subtitle: "Modern Website",
    setupPrice: "$2500",
    monthlyPrice: "$69.99/month",
    monthlyDescription: "for domain, hosting, and SEO optimization",
    description: "For large-scale applications",
    features: [
      "Custom design tailored to brand",
      "Responsive design on all devices",
      "20 pages only",
      "Visitor tracking & analytics",
      "Website management",
      "SEO-ready",
    ],
    popular: false,
  },
];

/** @param {{ faq?: import("react").ReactNode }} props */
export default function LandingPage({ faq = null }) {
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-gray-950"
        >
          <HeroSphere />
          
          <div className="max-w-6xl mx-auto relative z-10 text-center pt-32 pb-20">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-rise text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Conceive – Build – Deploy{' '}
                <span className="text-primary-600 dark:text-primary-500">
                  Agentic Systems
                </span>{' '}
                that Supercharge Your Business
              </h1>

              <motion.p initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-12 font-light"
              >
                Unlock the Future with Agent-powered Solutions
              </motion.p>

              <motion.div initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a href="https://taskhubrecruitmentsolutions.com/schedule/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

        </section>

        {/* Services Section */}
        <section 
          id="services" 
          className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 overflow-hidden"
        >
          <AnimatedBackground />
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 className="section-title mb-4">
                Our Services
              </h2>
              <p className="section-subtitle">
                Comprehensive digital solutions tailored to your business needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <ServiceCard key={service.title} service={service} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Managed Hosting Services Section */}
        <section 
          id="managed-hosting" 
          className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 overflow-hidden"
        >
          <AnimatedBackground />
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 className="section-title mb-4">
                Managed Hosting Services
              </h2>
              <p className="section-subtitle">
                Enterprise-grade hosting solutions with 24/7 expert support
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Why Choose Our Managed Hosting?
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "99.9% Uptime Guarantee",
                      description: "Your website stays online with our reliable infrastructure and redundant systems.",
                    },
                    {
                      title: "Lightning-Fast Performance",
                      description: "Optimized servers with SSD storage and CDN integration for blazing-fast load times.",
                    },
                    {
                      title: "Advanced Security",
                      description: "SSL certificates, DDoS protection, malware scanning, and automated backups included.",
                    },
                    {
                      title: "Expert Support 24/7",
                      description: "Our team of hosting experts is available around the clock to assist you.",
                    },
                    {
                      title: "Automatic Updates",
                      description: "We handle all server maintenance, security patches, and software updates for you.",
                    },
                    {
                      title: "Scalable Resources",
                      description: "Easily scale your hosting resources as your business grows without downtime.",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4 group hover:translate-x-2 transition-transform duration-300"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Zap className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                className="glass-card p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Hosting Plans
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      name: "Starter Hosting",
                      price: "$49.99/mo",
                      features: ["10 GB SSD Storage", "100 GB Bandwidth", "Free SSL Certificate", "Daily Backups", "Email Support"],
                    },
                    {
                      name: "Business Hosting",
                      price: "$69.99/mo",
                      features: ["50 GB SSD Storage", "Unlimited Bandwidth", "Free SSL Certificate", "Hourly Backups", "Priority Support", "CDN Integration"],
                      popular: true,
                    },
                    {
                      name: "Enterprise Hosting",
                      price: "$99.99/mo",
                      features: ["Unlimited Storage", "Unlimited Bandwidth", "Dedicated Resources", "Real-time Backups", "24/7 Phone Support", "Custom Configuration"],
                    },
                  ].map((plan, idx) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                        plan.popular
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700"
                      }`}
                    >
                      {plan.popular && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary-600 rounded-full mb-3">
                          Most Popular
                        </span>
                      )}
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h4>
                      <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                        {plan.price}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Zap className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="https://taskhubrecruitmentsolutions.com/schedule/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-primary inline-block text-center"
                      >
                        Get Started
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WordPress Services Section */}
        <section 
          id="wordpress" 
          className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 overflow-hidden"
        >
          <AnimatedBackground />
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 className="section-title mb-4">
                WordPress Services
              </h2>
              <p className="section-subtitle">
                Professional WordPress development with hosting and domain packages
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
              <motion.div initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  What's Included
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Custom WordPress Design",
                      description: "Tailored website design that matches your brand identity and business goals.",
                    },
                    {
                      title: "Business Websites & Blogs",
                      description: "Perfect for small businesses, startups, blogs, and professional landing pages.",
                    },
                    {
                      title: "Mobile Responsive",
                      description: "Fully optimized for all devices - desktop, tablet, and mobile.",
                    },
                    {
                      title: "SEO-Friendly Structure",
                      description: "Built with SEO best practices to help you rank higher in search results.",
                    },
                    {
                      title: "Fast Loading Speed",
                      description: "Optimized performance for quick page loads and better user experience.",
                    },
                    {
                      title: "Hosting & Domain",
                      description: "Complete package with reliable hosting and free domain for 1 year.",
                    },
                  ].map((item, idx) => (
                    <motion.div key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4 group hover:translate-x-2 transition-transform duration-300"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Zap className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div>
                <WordPressPricingCard />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <AnimatedBackground />
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              <h2 className="section-title mb-6">
                Why Choose TaskHub Dijital?
              </h2>
              <p 
                className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto"
              >
                We're not just a digital agency – we're your growth partners.
                With years of experience and a passion for innovation, we deliver solutions
                that drive real business results.
              </p>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {[
                  "Expert team with 10+ years experience",
                  "Data-driven strategies that deliver ROI",
                  "Agile development methodology",
                  "24/7 dedicated support",
                  "Transparent pricing & timelines",
                ].map((item, idx) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-left">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>


        {/* Integrations Section */}
        <IntegrationsSection />

        {/* Testimonial Carousel Section */}
        <TestimonialCarousel />

        {/* Clients Logo Showcase Section */}
        <ClientsSection />

        {/* Pricing Section */}
        <section 
          id="pricing" 
          className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 overflow-hidden"
        >
          <AnimatedBackground />
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Choose the perfect plan for your project needs
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto mb-12">
              {pricingPlans.map((plan, idx) => (
                <div key={plan.name} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
                  <PricingCard plan={plan} index={idx} />
                </div>
              ))}
            </div>

            {/* Add-ons & Revisions Card */}
            <div className="max-w-2xl mx-auto mt-16">
              <AddonsRevisionsPricingCard />
            </div>
          </div>
        </section>

        {/* FAQ (server-rendered, passed in by app/(site)/page.tsx) */}
        {faq}

        {/* Contact Section */}
        <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 overflow-hidden">
          <AnimatedBackground />
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 className="section-title mb-4">
                Get In Touch
              </h2>
              <p className="section-subtitle">
                Ready to start your project? Let's discuss how we can help
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
              >
                <ContactInfo />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Assessment Modal */}
      <AssessmentModal 
        isOpen={isAssessmentModalOpen} 
        onClose={() => setIsAssessmentModalOpen(false)} 
      />
    </div>
  );
}
