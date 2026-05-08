import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = [
  "Built for any business",
  "Leading-edge technology",
  "Modern, scalable tools",
];

export default function IntegrationsSection() {
  return (
    <section
      id="integrations"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-peach-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Subtle background gradient overlay */}
      <div id="src_components_IntegrationsSection_9vsb" className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-transparent to-orange-100/20 dark:from-gray-900/50 dark:via-transparent dark:to-gray-800/30" />

      <div id="src_components_IntegrationsSection_o8dc" className="max-w-7xl mx-auto relative">
        {/* Central Text Block */}
        <div id="src_components_IntegrationsSection_fah7" className="relative flex items-center justify-center">
          <motion.div
            id="src_components_IntegrationsSection_q5ql" initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl"
          >
            <h2 id="src_components_IntegrationsSection_pp2r" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Seamless Integrations
            </h2>

            <div id="src_components_IntegrationsSection_rr1j" className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  id="src_components_IntegrationsSection_g2yb" key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 text-left group"
                >
                  <div id="src_components_IntegrationsSection_7oup" className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span id="src_components_IntegrationsSection_cc3w" className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.p
              id="src_components_IntegrationsSection_uut1" initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-sm text-gray-600 dark:text-gray-400"
            >
              Connect with the tools you already use and love
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
