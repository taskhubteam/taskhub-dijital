import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import toast from "react-hot-toast";
import { sendEmail } from "../utils/sendEmail.js";
import { validateContactForm } from "../utils/validateForm.js";

export default function FreeAICallToAction() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "Free AI Assessment Request",
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
      setFormData({ name: "", email: "", message: "", subject: "Free AI Assessment Request" });
      setErrors({});
      setIsFormOpen(false);
    } catch {
      toast.error("Failed to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        id="src_components_FreeAICallToAction_pk8h" className="fixed right-8 bottom-24 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Pulsing Glow Effect */}
        <motion.div
          id="src_components_FreeAICallToAction_j4az" className="absolute inset-0 rounded-full blur-xl opacity-60"
          style={{
            background: "linear-gradient(135deg, #FF3B30 0%, #FF1F1F 100%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main Button */}
        <motion.button
          id="src_components_FreeAICallToAction_ky5l" onClick={() => setIsFormOpen(true)}
          className="relative px-6 py-3 rounded-full text-white font-semibold shadow-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #FF3B30 0%, #FF1F1F 100%)",
          }}
          whileHover={{
            y: -4,
            boxShadow: "0 0 30px rgba(255, 59, 48, 0.8), 0 0 60px rgba(255, 31, 31, 0.6)",
          }}
          transition={{ duration: 0.3 }}
        >
          <span id="src_components_FreeAICallToAction_2kec" className="relative flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span id="src_components_FreeAICallToAction_ogh5">Get Free AI Assessment</span>
          </span>
        </motion.button>
      </motion.div>

      {/* Sliding Contact Form */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="src_components_FreeAICallToAction_sw1c" className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
            />

            {/* Form Container */}
            <motion.div
              id="src_components_FreeAICallToAction_pe2f" className="fixed right-0 bottom-0 w-full sm:w-96 h-auto max-h-[90vh] bg-white dark:bg-gray-900 shadow-2xl z-50 rounded-tl-2xl overflow-hidden"
              initial={{ x: "100%", y: "100%" }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: "100%", y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div id="src_components_FreeAICallToAction_6gwh" className="relative p-6 border-b border-gray-200 dark:border-gray-700"
                style={{
                  background: "linear-gradient(135deg, #FF3B30 0%, #FF1F1F 100%)",
                }}
              >
                <button
                  id="src_components_FreeAICallToAction_zc2i" onClick={() => setIsFormOpen(false)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 id="src_components_FreeAICallToAction_6vbp" className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Free AI Assessment
                </h3>
                <p id="src_components_FreeAICallToAction_2lgg" className="text-white/90 text-sm mt-1">
                  Get your personalized AI readiness report
                </p>
              </div>

              {/* Form */}
              <form id="src_components_FreeAICallToAction_uhs1" onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div id="src_components_FreeAICallToAction_erh3">
                  <label id="src_components_FreeAICallToAction_1kcu" htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-red-500"}`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div id="src_components_FreeAICallToAction_dpc5">
                  <label id="src_components_FreeAICallToAction_ny4q" htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-red-500"}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div id="src_components_FreeAICallToAction_3fxg">
                  <label id="src_components_FreeAICallToAction_b8sh" htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all resize-none ${errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-red-500"}`}
                    placeholder="Tell us about your AI needs..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                <motion.button
                  id="src_components_FreeAICallToAction_jc3h" type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #FF3B30 0%, #FF1F1F 100%)",
                  }}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? "Sending..." : "Submit Request"}
                </motion.button>

                <p id="src_components_FreeAICallToAction_3rfr" className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  No credit card required · Instant results
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
