import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

const navItems = [
  { label: "AI Websites", href: "/ai-readiness", isRoute: true },
  { label: "VA Expert", href: "https://taskhubrecruitmentsolutions.com/", isRoute: false, isExternal: true },
  { label: "Traditional Websites", href: "/traditional-websites", isRoute: true },
  { label: "Managed Hosting Services", href: "/managed-hosting", isRoute: true },
  { label: "Careers", href: "/careers", isRoute: true },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href, isRoute = false, isExternal = false) => {
    setMobileOpen(false);
    if (isExternal) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (isRoute) {
      navigate(href);
    } else if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Single horizontal header bar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-white/90 dark:bg-gray-900/90 shadow-lg"
            : "bg-white/70 dark:bg-gray-900/70"
          } backdrop-blur-md border-b border-white/20 dark:border-gray-800/40`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="cursor-pointer flex-shrink-0"
          >
            <img
              src="/images/logo.png"
              alt="TaskHub Recruitment Solutions AI"
              className="h-14 w-auto object-contain select-none"
            />
          </motion.div>

          {/* Desktop nav — centered */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, idx) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.07 }}
                onClick={() => handleNav(item.href, item.isRoute, item.isExternal)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100/60 dark:hover:bg-gray-800/60 transition-all duration-200 whitespace-nowrap"
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Right side: theme toggle + contact button */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Moon className="w-5 h-5 text-red-400" />
                ) : (
                  <Sun className="w-5 h-5 text-red-600" />
                )}
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact")}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </motion.button>
          </div>

          {/* Mobile right side */}
          <div className="lg:hidden flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact")}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              Contact
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Moon className="w-4 h-4 text-red-400" />
                ) : (
                  <Sun className="w-4 h-4 text-red-600" />
                )}
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed top-20 left-1/2 -translate-x-1/2 w-80 max-w-[90vw] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl z-40 overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleNav(item.href, item.isRoute, item.isExternal)}
                  className="w-full px-4 py-3 rounded-xl text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
