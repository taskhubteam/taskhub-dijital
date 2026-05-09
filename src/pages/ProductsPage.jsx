import React from "react";
import { motion } from "framer-motion";
import { scrollToContact } from "../utils/scrollToContact.js";
import { 
  Code, 
  ShoppingBag, 
  Layers, 
  Smartphone,
  Search,
  TrendingUp,
  Zap,
  Award,
  Target,
  Rocket,
  Shield,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";

export default function ProductsPage() {

  const services = [
    {
      icon: Code,
      title: "WordPress Development",
      description: "High-quality custom WordPress websites",
      features: [
        "Speed optimized",
        "SEO-friendly",
        "Scalable builds",
        "Custom themes"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: ShoppingBag,
      title: "Shopify Development",
      description: "High-converting eCommerce stores",
      features: [
        "Custom themes",
        "App integrations",
        "Payment setup",
        "Store optimization"
      ],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Layers,
      title: "MERN Stack Development",
      description: "Full-stack web applications",
      features: [
        "Scalable SaaS platforms",
        "Custom dashboards",
        "API development",
        "Real-time features"
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Smartphone,
      title: "Mobile & Web Apps",
      description: "Cross-platform mobile applications",
      features: [
        "iOS & Android",
        "Responsive design",
        "Native performance",
        "Cloud integration"
      ],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const seoServices = [
    { label: "Technical SEO", icon: Search },
    { label: "On-page & Off-page SEO", icon: Layers },
    { label: "Performance optimization", icon: Zap },
    { label: "Paid ads strategy", icon: TrendingUp },
  ];

  const whyUsPoints = [
    {
      icon: Award,
      title: "Top-tier Development Quality",
      description: "Industry-leading code standards and best practices"
    },
    {
      icon: Rocket,
      title: "Fast Delivery & Scalable Architecture",
      description: "Agile methodology with enterprise-grade solutions"
    },
    {
      icon: Sparkles,
      title: "AI-Ready Modern Solutions",
      description: "Future-proof applications with AI integration"
    },
    {
      icon: Target,
      title: "US Market-Focused Strategies",
      description: "Tailored solutions for American businesses"
    },
    {
      icon: Shield,
      title: "Proven Results for Businesses",
      description: "Track record of successful digital transformations"
    }
  ];

  return (
    <div id="src_pages_ProductsPage_6sov" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section id="src_pages_ProductsPage_2spo" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Gradient Background */}
        <div id="src_pages_ProductsPage_oo2w" className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            id="src_pages_ProductsPage_3mks" animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-pink-200/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-pink-900/20 blur-3xl"
          />
          <motion.div
            id="src_pages_ProductsPage_a0df" animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-200/30 via-purple-200/20 to-blue-200/30 dark:from-pink-900/20 dark:via-purple-900/10 dark:to-blue-900/20 blur-3xl"
          />
        </div>

        <div id="src_pages_ProductsPage_n5sy" className="max-w-7xl mx-auto relative z-10">
          <motion.div
            id="src_pages_ProductsPage_vtn2" initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              id="src_pages_ProductsPage_qtb9" initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span id="src_pages_ProductsPage_5mrg" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Premium Digital Solutions
              </span>
            </motion.div>

            <h1 id="src_pages_ProductsPage_d3lf" className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Premium Digital Products
              <br id="src_pages_ProductsPage_t4jx"/>
              <span id="src_pages_ProductsPage_eqe7" className="gradient-text">& Services</span>
            </h1>

            <p id="src_pages_ProductsPage_1pse" className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
              We build high-performance digital solutions trusted by businesses across the US
            </p>

            <div id="src_pages_ProductsPage_i0ji" className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                id="src_pages_ProductsPage_z7ct" whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="btn-primary group"
              >
                Get a Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                id="src_pages_ProductsPage_pnv2" whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-secondary"
              >
                View Services
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section id="services" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div id="src_pages_ProductsPage_r9tt" className="max-w-7xl mx-auto">
          <motion.div
            id="src_pages_ProductsPage_ltd9" initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 id="src_pages_ProductsPage_i5md" className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Core Services & Offerings
            </h2>
            <p id="src_pages_ProductsPage_uc6d" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>

          <div id="src_pages_ProductsPage_llt0" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                id="src_pages_ProductsPage_wcc7" key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div id="src_pages_ProductsPage_gv8c" className="glass-card p-6 h-full">
                  {/* Gradient glow on hover */}
                  <div id="src_pages_ProductsPage_ina4" className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
                  
                  <motion.div
                    id="src_pages_ProductsPage_hi0k" whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <service.icon id="src_pages_ProductsPage_v6fq" className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 id="src_pages_ProductsPage_o3lt" className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p id="src_pages_ProductsPage_fc9j" className="text-gray-600 dark:text-gray-400 mb-4">
                    {service.description}
                  </p>

                  <ul id="src_pages_ProductsPage_ri4g" className="space-y-2">
                    {service.features.map((feature, fIdx) => (
                      <li id="src_pages_ProductsPage_7yuq" key={fIdx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO & Digital Marketing Section */}
      <section id="src_pages_ProductsPage_lsd1" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div id="src_pages_ProductsPage_bwh0" className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-gray-900" />
        <motion.div
          id="src_pages_ProductsPage_fm4j" animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-transparent to-blue-500/30 blur-3xl"
        />

        <div id="src_pages_ProductsPage_1fnn" className="max-w-7xl mx-auto relative z-10">
          <motion.div
            id="src_pages_ProductsPage_gqb3" initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center"
          >
            <h2 id="src_pages_ProductsPage_ni1j" className="text-4xl md:text-5xl font-bold text-white mb-6">
              SEO & Digital Growth Services
            </h2>
            <p id="src_pages_ProductsPage_2qmy" className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              We help businesses rank higher, attract traffic, and grow revenue with data-driven SEO and digital marketing strategies.
            </p>

            <div id="src_pages_ProductsPage_rp5b" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seoServices.map(({ label, icon: Icon }, idx) => (
                <motion.div
                  id="src_pages_ProductsPage_tu8q" key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-white mb-3 mx-auto" />
                  <h3 id="src_pages_ProductsPage_ne7d" className="text-lg font-semibold text-white">
                    {label}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why We Are the Best Section */}
      <section id="src_pages_ProductsPage_0iei" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <AnimatedBackground />
        <div id="src_pages_ProductsPage_v3uq" className="max-w-7xl mx-auto relative z-10">
          <motion.div
            id="src_pages_ProductsPage_ae0b" initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 id="src_pages_ProductsPage_w5yn" className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why We Are the Best in the US
            </h2>
            <p id="src_pages_ProductsPage_s6as" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Trusted by businesses nationwide for exceptional digital solutions
            </p>
          </motion.div>

          <div id="src_pages_ProductsPage_y8wn" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUsPoints.map((point, idx) => (
              <motion.div
                id="src_pages_ProductsPage_toh1" key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card p-6 text-center group"
              >
                <motion.div
                  id="src_pages_ProductsPage_2ygy" whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30"
                >
                  <point.icon id="src_pages_ProductsPage_ty0n" className="w-8 h-8 text-white" />
                </motion.div>
                <h3 id="src_pages_ProductsPage_9eat" className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {point.title}
                </h3>
                <p id="src_pages_ProductsPage_r5dd" className="text-gray-600 dark:text-gray-400">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="src_pages_ProductsPage_k4xm" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div id="src_pages_ProductsPage_vki4" className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-gray-900" />
        <motion.div
          id="src_pages_ProductsPage_gf1f" animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-transparent to-blue-500/30 blur-3xl"
        />

        <div id="src_pages_ProductsPage_hu6t" className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            id="src_pages_ProductsPage_ast3" initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <h2 id="src_pages_ProductsPage_dw6k" className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something Powerful Together
            </h2>
            <p id="src_pages_ProductsPage_wdl9" className="text-xl text-white/90 mb-10">
              Start your digital transformation with industry-leading experts
            </p>
            <motion.button
              id="src_pages_ProductsPage_1amo" whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/50 group relative overflow-hidden"
            >
              <motion.div
                id="src_pages_ProductsPage_rye2" animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 blur-xl"
              />
              <span id="src_pages_ProductsPage_0oeg" className="relative">Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
