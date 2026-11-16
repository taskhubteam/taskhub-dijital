"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Their managed services have been a game-changer for our organization. Reliable, efficient, and always available when we need support. Truly a trusted partner.",
    client: "VisionSpring",
    rating: 5,
  },
  {
    id: 2,
    quote: "Outstanding service and exceptional results. The team's expertise and dedication have transformed our digital presence beyond our expectations.",
    client: "TechCorp Solutions",
    rating: 5,
  },
  {
    id: 3,
    quote: "Professional, innovative, and results-driven. Working with this team has been one of the best decisions we've made for our business growth.",
    client: "Global Innovations",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-gray-950">
      {/* Geometric Neural Network Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#dc2626" />
              <circle cx="10" cy="10" r="1.5" fill="#dc2626" />
              <circle cx="90" cy="20" r="1.5" fill="#dc2626" />
              <circle cx="20" cy="80" r="1.5" fill="#dc2626" />
              <circle cx="80" cy="90" r="1.5" fill="#dc2626" />
              <line x1="50" y1="50" x2="10" y2="10" stroke="#dc2626" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="90" y2="20" stroke="#dc2626" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="20" y2="80" stroke="#dc2626" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="80" y2="90" stroke="#dc2626" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">Client </span>
            <span className="text-primary-600 dark:text-primary-500">Reviews</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear what our clients have to say about their experience working with us
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
          </button>

          <button onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
          </button>

          {/* Testimonial Cards Stack */}
          <div className="relative h-[500px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((testimonial) => (
                <motion.div key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{
                    opacity: testimonial.position === 0 ? 1 : 0.3 - testimonial.position * 0.15,
                    scale: 1 - testimonial.position * 0.1,
                    y: testimonial.position * 30,
                    zIndex: 10 - testimonial.position,
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute w-full max-w-2xl"
                  style={{
                    pointerEvents: testimonial.position === 0 ? "auto" : "none",
                  }}
                >
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-100 dark:border-gray-700">
                    {/* Star Rating */}
                    <div className="flex justify-center gap-2 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-center mb-8">
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic">
                        "{testimonial.quote}"
                      </p>
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {testimonial.client.charAt(0)}
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {testimonial.client}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary-600 dark:bg-primary-500 w-8"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
