import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      id="src_components_ServiceCard_jne2" initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -8 }}
      className="card group cursor-pointer"
    >
      <div id="src_components_ServiceCard_gxs7" className="flex items-start gap-4 mb-4">
        <div id="src_components_ServiceCard_l1ef" className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 group-hover:bg-primary-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 red-glow-hover">
          <service.icon id="src_components_ServiceCard_7jmg" className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
        </div>
        <div id="src_components_ServiceCard_e4ot">
          <h3 id="src_components_ServiceCard_ysp7" className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {service.title}
          </h3>
          <p id="src_components_ServiceCard_9mle" className="text-gray-600 dark:text-gray-400">
            {service.description}
          </p>
        </div>
      </div>
      <ul id="src_components_ServiceCard_pgg8" className="space-y-2 mt-4">
        {service.features.map((feature) => (
          <li
            id="src_components_ServiceCard_8wfr" key={feature}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 group/item hover:translate-x-1 transition-transform duration-200"
          >
            <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-primary-400 group-hover/item:scale-110 transition-transform duration-200" />
            <span id="src_components_ServiceCard_gh7t" className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
