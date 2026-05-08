import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
  const contactItems = [
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
      value: "PO Box 494995\nDallas, TX 75044",
      href: null,
    },
  ];

  return (
    <div id="src_components_ContactInfo_5aco" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <h3 id="src_components_ContactInfo_0tsd" className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Contact Information
      </h3>
      <div id="src_components_ContactInfo_t0rw" className="space-y-8">
        {contactItems.map((item) => (
          <div
            id="src_components_ContactInfo_g1jg" key={item.label}
            className="flex items-start gap-5 group/contact hover:translate-x-2 transition-transform duration-300"
          >
            <div id="src_components_ContactInfo_sns9" className="flex-shrink-0 p-4 rounded-xl bg-primary-100 dark:bg-primary-900/30 group-hover/contact:bg-primary-600 group-hover/contact:scale-110 transition-all duration-300 shadow-md">
              <item.icon id="src_components_ContactInfo_r7dp" className="w-7 h-7 text-primary-600 dark:text-primary-400 group-hover/contact:text-white transition-colors duration-300" />
            </div>
            <div id="src_components_ContactInfo_vsh6" className="flex-1 min-w-0">
              <div id="src_components_ContactInfo_iwo3" className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                {item.label}
              </div>
              {item.href ? (
                <a
                  id="src_components_ContactInfo_6kpx" href={item.href}
                  className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 break-words"
                >
                  {item.value}
                </a>
              ) : (
                <p id="src_components_ContactInfo_n9ny" className="text-lg font-medium text-gray-900 dark:text-white whitespace-pre-line">
                  {item.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
