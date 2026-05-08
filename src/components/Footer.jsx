import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react";
import { scrollToContact } from "../utils/scrollToContact.js";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "AI Websites", href: "/ai-readiness", isRoute: true },
    { label: "Products", href: "/products", isRoute: true },
    { label: "Traditional Websites", href: "/traditional-websites", isRoute: true },
    { label: "Managed Hosting Services", href: "/managed-hosting", isRoute: true },
    { label: "VA Expert", href: "https://taskhubrecruitmentsolutions.com/", isRoute: false, isExternal: true },
    { label: "Careers", href: "/careers", isRoute: true },
  ];

  const handleNavigation = (href, isRoute, isExternal) => {
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (isRoute) {
      navigate(href);
      // Scroll to top when navigating to a new page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="src_components_Footer_rit9" className="relative bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div id="src_components_Footer_2zgb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section: Logo + Tagline */}
        <div id="src_components_Footer_rv2u" className="flex flex-col items-center mb-8">
          <img
            id="src_components_Footer_3kyg" src="/images/logo.png"
            alt="Taskhub Dijital AI Logo"
            className="h-12 w-auto object-contain mb-4 cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => navigate("/")}
          />
          <p id="src_components_Footer_aj7l" className="text-gray-600 dark:text-gray-400 text-center text-sm max-w-md">
            Building AI-powered recruitment solutions for the future
          </p>
        </div>

        {/* Navigation Links */}
        <nav id="src_components_Footer_wyk3" className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-8">
          {navItems.map((item) => (
            <button
              id="src_components_Footer_y6kc" key={item.label}
              onClick={() => handleNavigation(item.href, item.isRoute, item.isExternal)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 text-sm font-medium hover:scale-105"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Social Icons */}
        <div id="src_components_Footer_lp6m" className="flex justify-center gap-6 mb-8">
          <a
            id="src_components_Footer_facebook"
            href="https://www.facebook.com/taskhubdijital"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 icon-bounce"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            id="src_components_Footer_instagram"
            href="https://www.instagram.com/taskhubdijital/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 icon-bounce"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            id="src_components_Footer_itp4" href="#"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 icon-bounce"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            id="src_components_Footer_hk1g" href="#"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 icon-bounce"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <div id="src_components_Footer_6zml" className="text-center border-t border-gray-200 dark:border-gray-800 pt-8">
          <p id="src_components_Footer_cfk2" className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} TaskHub Recruitment Solutions. All rights reserved.
          </p>
          <p id="src_components_Footer_6cdg" className="text-gray-500 dark:text-gray-500 text-xs mt-2">
            Powered by TaskHub Recruitment Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
