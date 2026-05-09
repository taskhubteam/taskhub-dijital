import React from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Zap, 
  Shield, 
  Layers, 
  TrendingUp, 
  Code, 
  Sparkles,
  ArrowRight,
  Check
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { scrollToContact } from "../utils/scrollToContact.js";

export default function AIReadinessPage() {

  const pricingPlans = [
    {
      title: "Small MERN Website",
      price: "$2.5k - $10k",
      description: "Basic but scalable web solutions for startups and individuals",
      features: [
        "Responsive Design",
        "MongoDB Database",
        "RESTful API",
        "Basic Authentication",
        "Deployment Support",
        "3 Months Support"
      ],
      popular: false
    },
    {
      title: "Business Application",
      price: "$10k - $60k",
      description: "Advanced business systems with custom features and integrations",
      features: [
        "Custom Features",
        "Third-party Integrations",
        "Advanced Security",
        "Real-time Features",
        "Analytics Dashboard",
        "6 Months Support",
        "Performance Optimization"
      ],
      popular: true
    },
    {
      title: "Full SaaS / Advanced Platform",
      price: "$60k - $150k+",
      description: "Enterprise-grade scalable SaaS platforms with AI capabilities",
      features: [
        "AI Integration",
        "Multi-tenant Architecture",
        "Advanced Analytics",
        "Custom AI Models",
        "Microservices",
        "12 Months Support",
        "DevOps & CI/CD",
        "Dedicated Team"
      ],
      popular: false
    },
    {
      title: "Hourly Development Rate",
      price: "$60 - $120/hr",
      description: "Flexible development for ongoing engineering needs",
      features: [
        "Flexible Hours",
        "Expert Developers",
        "Agile Methodology",
        "Code Reviews",
        "Documentation",
        "Direct Communication"
      ],
      popular: false
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI Integration Ready",
      description: "Seamlessly integrate AI capabilities into your MERN applications"
    },
    {
      icon: Layers,
      title: "Scalable Architecture",
      description: "Built to grow with your business from day one"
    },
    {
      icon: Code,
      title: "Modern MERN Stack Expertise",
      description: "Cutting-edge MongoDB, Express, React, and Node.js development"
    },
    {
      icon: TrendingUp,
      title: "Performance Optimized Systems",
      description: "Lightning-fast applications with optimal user experience"
    }
  ];

  return (
    <div id="src_pages_AIReadinessPage_ojv4" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section id="src_pages_AIReadinessPage_7lbx" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Gradient Background */}
        <div id="src_pages_AIReadinessPage_igl0" className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            id="src_pages_AIReadinessPage_5lno" animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary-200/30 via-purple-200/20 to-blue-200/30 dark:from-primary-900/20 dark:via-purple-900/10 dark:to-blue-900/20 blur-3xl"
          />
          <motion.div
            id="src_pages_AIReadinessPage_m1nk" animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-200/30 via-purple-200/20 to-primary-200/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-primary-900/20 blur-3xl"
          />
        </div>

        <div id="src_pages_AIReadinessPage_9ges" className="max-w-7xl mx-auto relative z-10">
          <motion.div
            id="src_pages_AIReadinessPage_cvy7" initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              id="src_pages_AIReadinessPage_6mjq" initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span id="src_pages_AIReadinessPage_buc0" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                AI-Powered Development
              </span>
            </motion.div>

            <h1 id="src_pages_AIReadinessPage_i7yp" className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              AI Readiness for Modern
              <br id="src_pages_AIReadinessPage_ei8c"/>
              <span id="src_pages_AIReadinessPage_o4kx" className="gradient-text">MERN Stack Development</span>
            </h1>

            <p id="src_pages_AIReadinessPage_wo6o" className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
              Build intelligent, scalable, and future-ready web applications powered by AI-driven architecture
            </p>

            <div id="src_pages_AIReadinessPage_df9m" className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                id="src_pages_AIReadinessPage_dgi3" whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="btn-primary group"
              >
                Get a Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                id="src_pages_AIReadinessPage_8wmk" whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-secondary"
              >
                Explore Pricing
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="src_pages_AIReadinessPage_l2yx" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div id="src_pages_AIReadinessPage_v9gb" className="max-w-7xl mx-auto">
          <div id="src_pages_AIReadinessPage_ul9b" className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              id="src_pages_AIReadinessPage_9sik" initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div id="src_pages_AIReadinessPage_fs5j" className="glass-card p-8">
                <h2 id="src_pages_AIReadinessPage_9btu" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  The Future of Web Development
                </h2>
                <p id="src_pages_AIReadinessPage_d9ex" className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Combine the power of the MERN stack with cutting-edge AI capabilities to create applications that are not just functional, but intelligent.
                </p>
                <ul id="src_pages_AIReadinessPage_yv5n" className="space-y-3">
                  {[
                    "AI-powered features and automation",
                    "Scalable cloud-native architecture",
                    "Real-time data processing",
                    "Advanced analytics and insights"
                  ].map((item, idx) => (
                    <motion.li
                      id="src_pages_AIReadinessPage_7khr" key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                    >
                      <div id="src_pages_AIReadinessPage_ujc3" className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              id="src_pages_AIReadinessPage_g0zx" initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div id="src_pages_AIReadinessPage_aqf4" className="relative overflow-hidden">
                <motion.div
                  id="src_pages_AIReadinessPage_nvs3" animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-purple-500/10 to-blue-500/10 blur-2xl pointer-events-none"
                />
                <div id="src_pages_AIReadinessPage_7rjh" className="relative z-10 grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: Brain,
                      title: "AI Integration",
                      desc: "Embed intelligent features — NLP, vision, recommendations, and agents — directly into your stack.",
                      gradient: "from-violet-500 to-purple-600",
                    },
                    {
                      icon: Zap,
                      title: "Performance First",
                      desc: "Sub-second response times with SSR, edge caching, and optimised API layers.",
                      gradient: "from-amber-400 to-orange-500",
                    },
                    {
                      icon: Shield,
                      title: "Enterprise Security",
                      desc: "JWT, OAuth 2.0, encrypted data-at-rest, and SOC 2-aligned security practices built in.",
                      gradient: "from-emerald-400 to-green-600",
                    },
                    {
                      icon: Layers,
                      title: "Scalable by Design",
                      desc: "Microservices-ready architecture that grows from MVP to millions of users without re-platforming.",
                      gradient: "from-primary-500 to-red-600",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      id="src_pages_AIReadinessPage_op7z" key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: idx * 0.12, duration: 0.5 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 p-5 shadow-md hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 cursor-default"
                    >
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} mb-3 shadow-lg`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div id="src_pages_AIReadinessPage_isb8" className="max-w-7xl mx-auto">
          <motion.div
            id="src_pages_AIReadinessPage_zf6s" initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 id="src_pages_AIReadinessPage_qjx8" className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Investment Plans
            </h2>
            <p id="src_pages_AIReadinessPage_vxx8" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the perfect plan for your AI-powered MERN application
            </p>
          </motion.div>

          <div id="src_pages_AIReadinessPage_x0kc" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                id="src_pages_AIReadinessPage_guv5" key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative"
              >
                {plan.popular && (
                  <div id="src_pages_AIReadinessPage_5zjq" className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div id="src_pages_AIReadinessPage_egv5" className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                <div id="src_pages_AIReadinessPage_eu9g" className={`glass-card h-full p-6 ${plan.popular ? 'border-2 border-primary-500/50 shadow-xl shadow-primary-500/20' : ''}`}>
                  <h3 id="src_pages_AIReadinessPage_ff3b" className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.title}
                  </h3>
                  <div id="src_pages_AIReadinessPage_3uvn" className="text-3xl font-bold gradient-text mb-3">
                    {plan.price}
                  </div>
                  <p id="src_pages_AIReadinessPage_qt8r" className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {plan.description}
                  </p>
                  <ul id="src_pages_AIReadinessPage_7sll" className="space-y-3 mb-6">
                    {plan.features.map((feature, fIdx) => (
                      <li id="src_pages_AIReadinessPage_0dce" key={fIdx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Check className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    id="src_pages_AIReadinessPage_mk5y" whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToContact}
                    className={plan.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="src_pages_AIReadinessPage_1mnt" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div id="src_pages_AIReadinessPage_qz5j" className="max-w-7xl mx-auto">
          <motion.div
            id="src_pages_AIReadinessPage_tpj4" initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 id="src_pages_AIReadinessPage_k4cj" className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <p id="src_pages_AIReadinessPage_ghp3" className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We deliver excellence in every aspect of development
            </p>
          </motion.div>

          <div id="src_pages_AIReadinessPage_frz2" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                id="src_pages_AIReadinessPage_9uhu" key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card p-6 text-center group"
              >
                <motion.div
                  id="src_pages_AIReadinessPage_1snd" whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30"
                >
                  <feature.icon id="src_pages_AIReadinessPage_4psm" className="w-8 h-8 text-white" />
                </motion.div>
                <h3 id="src_pages_AIReadinessPage_u9my" className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p id="src_pages_AIReadinessPage_qb7x" className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="src_pages_AIReadinessPage_gnt3" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div id="src_pages_AIReadinessPage_6wee" className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-gray-900" />
        <motion.div
          id="src_pages_AIReadinessPage_o3at" animate={{
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

        <div id="src_pages_AIReadinessPage_0gwj" className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            id="src_pages_AIReadinessPage_bm1o" initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <h2 id="src_pages_AIReadinessPage_f4fu" className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Your AI-Powered Web Application?
            </h2>
            <p id="src_pages_AIReadinessPage_ffh4" className="text-xl text-white/90 mb-10">
              Let's transform your vision into a cutting-edge reality
            </p>
            <motion.button
              id="src_pages_AIReadinessPage_z5um" whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/50 group"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
