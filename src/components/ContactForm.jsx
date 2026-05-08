import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import { sendEmail } from "../utils/sendEmail.js";
import { validateContactForm } from "../utils/validateForm.js";

export default function ContactForm() {
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

  return (
    <div className="glass-card p-8 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Send Us a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label
            htmlFor="contact-name"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              focusedField === "name" || formData.name
                ? "-top-2.5 text-xs bg-white dark:bg-gray-900 px-2 text-primary-600 dark:text-primary-400"
                : "top-3.5 text-sm text-gray-500 dark:text-gray-400"
            }`}
          >
            Name
          </label>
          <input
            id="contact-name"
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

        <div className="relative">
          <label
            htmlFor="contact-email"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              focusedField === "email" || formData.email
                ? "-top-2.5 text-xs bg-white dark:bg-gray-900 px-2 text-primary-600 dark:text-primary-400"
                : "top-3.5 text-sm text-gray-500 dark:text-gray-400"
            }`}
          >
            Email
          </label>
          <input
            id="contact-email"
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

        <div className="relative">
          <label
            htmlFor="contact-subject"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              focusedField === "subject" || formData.subject
                ? "-top-2.5 text-xs bg-white dark:bg-gray-900 px-2 text-primary-600 dark:text-primary-400"
                : "top-3.5 text-sm text-gray-500 dark:text-gray-400"
            }`}
          >
            Subject
          </label>
          <input
            id="contact-subject"
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

        <div className="relative">
          <label
            htmlFor="contact-message"
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              focusedField === "message" || formData.message
                ? "-top-2.5 text-xs bg-white dark:bg-gray-900 px-2 text-primary-600 dark:text-primary-400"
                : "top-3.5 text-sm text-gray-500 dark:text-gray-400"
            }`}
          >
            Message
          </label>
          <textarea
            id="contact-message"
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

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Send Message
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          )}
        </motion.button>
      </form>
    </div>
  );
}
