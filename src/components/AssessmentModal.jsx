"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import toast from "react-hot-toast";
import { sendEmail } from "../utils/sendEmail";
import { trackLead } from "@/lib/analytics";
import { validateContactForm } from "../utils/validateForm.js";

export default function AssessmentModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "AI Readiness Assessment Request",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      toast.success("Assessment request sent successfully!");
      trackLead("contact_form");
      setFormData({ name: "", email: "", subject: "AI Readiness Assessment Request", message: "" });
      setErrors({});
      onClose();
    } catch {
      toast.error("Failed to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Card */}
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Get Your Free AI Assessment
                </h2>
                <button onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Fill out the form below and our AI experts will contact you within 24 hours to discuss your business needs.
                </p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-700 focus:ring-primary-500"}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-700 focus:ring-primary-500"}`}
                    placeholder="john@company.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input type="text"
                    name="company"
                    value={formData.company || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tell us about your AI needs *
                  </label>
                  <textarea name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all resize-none ${errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-700 focus:ring-primary-500"}`}
                    placeholder="Describe your business challenges and how AI could help..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                <button type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-full shadow-lg hover:shadow-primary-500/50 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Submit Request <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
