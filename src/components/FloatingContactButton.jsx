import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingContactButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/contact") {
      // If already on contact page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to contact page
      navigate("/contact");
    }
  };

  return (
    <motion.button
      id="src_components_FloatingContactButton_qli3" onClick={handleClick}
      className="fixed top-24 right-8 z-50 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 group flex items-center gap-2"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
    >
      <MessageCircle className="w-5 h-5" />
      <span id="src_components_FloatingContactButton_kv1g" className="font-semibold text-sm">Contact Us</span>
      
      {/* Subtle glow effect */}
      <div id="src_components_FloatingContactButton_f2jv" className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
    </motion.button>
  );
}
