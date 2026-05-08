import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import { sendEmail } from "../utils/sendEmail.js";
import { validateContactForm } from "../utils/validateForm.js";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validateContactForm(formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    try {
      await sendEmail(formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@taskhub-dijital.agency",
      href: "mailto:hello@taskhub-dijital.agency",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      label: "Office",
      value: "123 Innovation Street, San Francisco, CA 94102",
      href: null,
    },
  ];

  return (
    <div id="src_pages_ContactUsPage_hk9v" className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <main id="src_pages_ContactUsPage_r9yy" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground />

        <div id="src_pages_ContactUsPage_r2xw" className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <motion.div
            id="src_pages_ContactUsPage_qh7g" initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              id="src_pages_ContactUsPage_zx8c" initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 mb-6"
            >
              <MessageSquare className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span id="src_pages_ContactUsPage_bh3d" className="text-sm font-medium text-primary-600 dark:text-primary-400">
                Get In Touch
              </span>
            </motion.div>

            <h1 id="src_pages_ContactUsPage_dxv0" className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Work{" "}
              <span id="src_pages_ContactUsPage_i1sk" className="gradient-text">Together</span>
            </h1>
            <p id="src_pages_ContactUsPage_aj7t" className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We'd love to hear from you. Share your ideas and let's create something amazing together.
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div id="src_pages_ContactUsPage_te3i" className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Information */}
            <motion.div
              id="src_pages_ContactUsPage_rq4y" initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-8"
            >
              <div id="src_pages_ContactUsPage_8pot" className="glass-card p-8 hover:shadow-2xl transition-all duration-300">
                <h2 id="src_pages_ContactUsPage_lkw8" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h2>
                <div id="src_pages_ContactUsPage_2hth" className="space-y-6">
                  {contactDetails.map((item, idx) => (
                    <motion.div
                      id="src_pages_ContactUsPage_ngm6" key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                      className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300"
                    >
                      <div id="src_pages_ContactUsPage_on0m" className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-600 group-hover:scale-110 transition-all duration-300">
                        <item.icon id="src_pages_ContactUsPage_2byn" className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div id="src_pages_ContactUsPage_fc0d">
                        <div id="src_pages_ContactUsPage_zyl5" className="font-semibold text-gray-900 dark:text-white mb-1">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            id="src_pages_ContactUsPage_ayo5" href={item.href}
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p id="src_pages_ContactUsPage_p3yw" className="text-gray-600 dark:text-gray-400">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Info Card */}
              <motion.div
                id="src_pages_ContactUsPage_6xnw" initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="glass-card p-8 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-900 border-2 border-primary-200 dark:border-primary-800"
              >
                <h3 id="src_pages_ContactUsPage_qz1k" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Choose Us?
                </h3>
                <ul id="src_pages_ContactUsPage_xl0q" className="space-y-3">
                  {[
                    "24/7 Expert Support",
                    "Fast Response Time",
                    "Tailored Solutions",
                    "Proven Track Record",
                  ].map((item, idx) => (
                    <motion.li
                      id="src_pages_ContactUsPage_4zkz" key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + idx * 0.1, duration: 0.4 }}
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                    >
                      <div id="src_pages_ContactUsPage_ry3z" className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              id="src_pages_ContactUsPage_j1ip" initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div id="src_pages_ContactUsPage_6haf" className="glass-card p-8 hover:shadow-2xl transition-all duration-300">
                <h2 id="src_pages_ContactUsPage_2xjg" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send Us a Message
                </h2>

                <form id="src_pages_ContactUsPage_6ewp" onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div id="src_pages_ContactUsPage_ar7p" className="relative">
                    <label
                      id="src_pages_ContactUsPage_0mrj" htmlFor="name"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focusedField === "name" || formData.name
                          ? "-top-2.5 text-xs bg-white dark:bg-gray-900 px-2 text-primary-600 dark:text-primary-400"
                          : "top-3.5 text-sm text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20"}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email Field */}
                  <div id="src_pages_ContactUsPage_td7u" className="relative">
                    <label
                      id="src_pages_ContactUsPage_zkb6" htmlFor="email"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focusedField === "email" || formData.email
                          ? "-top-2.5 text-xs bg-white dark:bg-gray-900 px-2 text-primary-600 dark:text-primary-400"
                          : "top-3.5 text-sm text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20"}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Subject Field */}
                  <div id="src_pages_ContactUsPage_xr1u" className="relative">
                    <label
                      id="src_pages_ContactUsPage_7eem" htmlFor="subject"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focusedField === "subject" || formData.subject
                          ? "-top-2.5 text-xs bg-white dark:bg-gray-900 px-2 text-primary-600 dark:text-primary-400"
                          : "top-3.5 text-sm text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${errors.subject ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20"}`}
                    />
                    {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                  </div>

                  {/* Message Field */}
                  <div id="src_pages_ContactUsPage_qm2t" className="relative">
                    <label
                      id="src_pages_ContactUsPage_os1v" htmlFor="message"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focusedField === "message" || formData.message
                          ? "-top-2.5 text-xs bg-white dark:bg-gray-900 px-2 text-primary-600 dark:text-primary-400"
                          : "top-3.5 text-sm text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-primary-500/20"}`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    id="src_pages_ContactUsPage_uq8b" type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <span id="src_pages_ContactUsPage_s8bc" className="flex items-center justify-center gap-2">
                        <div id="src_pages_ContactUsPage_z0ym" className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span id="src_pages_ContactUsPage_vxb5" className="flex items-center justify-center gap-2">
                        Send Message
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
