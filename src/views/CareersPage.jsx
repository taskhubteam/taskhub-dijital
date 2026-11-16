"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Lightbulb, 
  Heart, 
  DollarSign, 
  Calendar,
  BookOpen,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send,
  FileText,
  MessageSquare,
  Award,
  Briefcase
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import PlexusBackground from "../components/PlexusBackground.jsx";
import { EMAIL } from "@/lib/site";

// No form on this page: general applications go straight to the team inbox.
const applyByEmail = () => {
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("General application — TaskHub Dijital")}`;
};

export default function CareersPage() {
  const scrollToPositions = () => {
    document.querySelector("#open-positions")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCulture = () => {
    document.querySelector("#working-here")?.scrollIntoView({ behavior: "smooth" });
  };

  const workingHereFeatures = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Every project we undertake is driven by a clear mission to create meaningful impact through technology."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We embrace cutting-edge technologies and encourage creative problem-solving at every level."
    },
    {
      icon: Users,
      title: "Team Excellence",
      description: "Collaborate with talented professionals who are passionate about building the future of digital solutions."
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Industry-leading salaries with performance bonuses and equity options"
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs"
    },
    {
      icon: Calendar,
      title: "Flexible Time Off",
      description: "Unlimited PTO policy with encouraged work-life balance"
    },
    {
      icon: BookOpen,
      title: "Learning & Development",
      description: "Annual learning budget, conference attendance, and skill development programs"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Clear career paths with mentorship and leadership development opportunities"
    },
    {
      icon: Sparkles,
      title: "Collaborative Culture",
      description: "Open communication, team events, and a supportive work environment"
    }
  ];

  const applicationSteps = [
    {
      icon: FileText,
      title: "Apply",
      description: "Submit your application and resume"
    },
    {
      icon: MessageSquare,
      title: "Screen",
      description: "Initial conversation with our team"
    },
    {
      icon: Users,
      title: "Interview",
      description: "Technical and cultural fit interviews"
    },
    {
      icon: Award,
      title: "Offer",
      description: "Welcome to the team!"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/20 dark:to-gray-950">
          <PlexusBackground />
          
          <div className="max-w-6xl mx-auto relative z-10 text-center pt-32 pb-20">
            <motion.div initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div initial={false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block mb-6"
              >
                <span className="px-6 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-wide">
                  CAREERS AT TASKHUB DIJITAL
                </span>
              </motion.div>

              <h1 className="hero-rise text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Join Our{' '}
                <span className="text-primary-600 dark:text-primary-500">
                  Team
                </span>
              </h1>

              <motion.p initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto font-light"
              >
                Shape the future of AI and data-driven innovation. Work with talented teams on cutting-edge projects that make a real impact.
              </motion.p>

              <motion.div initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.button whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToPositions}
                  className="btn-primary text-lg px-10 py-5"
                >
                  Send Your Résumé
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToCulture}
                  className="btn-secondary text-lg px-10 py-5"
                >
                  Learn About Our Culture
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Working Here Section */}
        <section id="working-here" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 overflow-hidden">
          <AnimatedBackground />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 className="section-title mb-6">
                Working Here
              </h2>
              <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-600 dark:text-gray-400">
                <p>
                  We're building the future of AI-powered solutions, and we're looking for passionate individuals who want to be part of something extraordinary.
                </p>
                <p>
                  At TaskHub Dijital, you'll work on challenging projects that push the boundaries of technology while collaborating with some of the brightest minds in the industry.
                </p>
                <p>
                  Our culture is built on innovation, collaboration, and a shared commitment to excellence. We believe in empowering our team members to do their best work and grow their careers.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {workingHereFeatures.map((feature, idx) => (
                <motion.div key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="glass-card p-8 text-center group cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 mb-6 group-hover:bg-primary-600 dark:group-hover:bg-primary-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <feature.icon className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <AnimatedBackground />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 className="section-title mb-4">
                Why Join Us
              </h2>
              <p className="section-subtitle">
                We invest in our people and their success
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <motion.div key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  className="glass-card p-8 group cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 mb-6 group-hover:bg-primary-600 dark:group-hover:bg-primary-600 transition-all duration-300 group-hover:scale-110">
                    <benefit.icon className="w-7 h-7 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section id="open-positions" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 overflow-hidden">
          <AnimatedBackground />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 className="section-title mb-4">
                Open Positions
              </h2>
              <p className="section-subtitle">
                Find your next opportunity and join our growing team
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="max-w-3xl mx-auto"
            >
              <div className="glass-card p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
                  <Briefcase className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No Open Positions Right Now
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  We're not actively hiring at the moment, but we're always interested in connecting with talented individuals. Feel free to send us your resume for future opportunities.
                </p>
                <motion.button whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={applyByEmail}
                  className="btn-primary"
                >
                  Email Your Application
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Application Process Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <AnimatedBackground />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-16"
            >
              <h2 className="section-title mb-4">
                Application Process
              </h2>
              <p className="section-subtitle">
                Our streamlined hiring process
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 relative">
                {/* Connection Line */}
                <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 dark:from-primary-800 dark:via-primary-600 dark:to-primary-800" style={{ top: '3rem' }} />
                
                {applicationSteps.map((step, idx) => (
                  <motion.div key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: idx * 0.15 }}
                    className="relative"
                  >
                    <div className="glass-card p-6 text-center group hover:shadow-xl transition-all duration-300">
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 mb-4 shadow-lg shadow-primary-500/30 relative z-10"
                      >
                        <step.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <PlexusBackground />
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Ready to Make an Impact?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Don't see a role that fits? We're always looking for exceptional talent to join our team.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToPositions}
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-semibold text-primary-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 text-lg"
                >
                  Browse Open Roles
                  <Briefcase className="w-6 h-6" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={applyByEmail}
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 transition-all duration-300 text-lg"
                >
                  Email Your Application
                  <Send className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="mt-12 flex items-center justify-center gap-8 text-white/80 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Remote-Friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Competitive Benefits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Growth Opportunities</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
