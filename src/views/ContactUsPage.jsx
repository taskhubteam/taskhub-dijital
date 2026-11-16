"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
// import ContactForm from "../components/ContactForm.jsx";
import GHLContactForm from "../components/GHLContactForm.jsx";

export default function ContactUsPage() {
  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: "taskhubdijital@gmail.com",
      href: "mailto:taskhubdijital@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "469-577-0392",
      href: "tel:+14695770392",
    },
    {
      icon: MapPin,
      label: "Office",
      value: "PO Box 494995, Dallas, TX 75044",
      href: null,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 mb-6"
            >
              <MessageSquare className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                Get In Touch
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Work{" "}
              <span className="gradient-text">Together</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We'd love to hear from you. Share your ideas and let's create something amazing together.
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Information */}
            <motion.div initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-8"
            >
              <div className="glass-card p-8 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactDetails.map((item, idx) => (
                    <motion.div key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                      className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300"
                    >
                      <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-600 group-hover:scale-110 transition-all duration-300">
                        <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a href={item.href}
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Info Card */}
              <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="glass-card p-8 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-900 border-2 border-primary-200 dark:border-primary-800"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Choose Us?
                </h3>
                <ul className="space-y-3">
                  {[
                    "24/7 Expert Support",
                    "Fast Response Time",
                    "Tailored Solutions",
                    "Proven Track Record",
                  ].map((item, idx) => (
                    <motion.li key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + idx * 0.1, duration: 0.4 }}
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* <ContactForm /> */}
              <GHLContactForm />
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
