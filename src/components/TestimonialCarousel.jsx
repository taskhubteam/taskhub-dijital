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
    <section id="src_components_TestimonialCarousel_qa4q" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-gray-950">
      {/* Geometric Neural Network Background Pattern */}
      <div id="src_components_TestimonialCarousel_1rrk" className="absolute inset-0 opacity-5">
        <svg id="src_components_TestimonialCarousel_qs2s" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs id="src_components_TestimonialCarousel_hv5j">
            <pattern id="neural-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle id="src_components_TestimonialCarousel_ojc6" cx="50" cy="50" r="2" fill="#dc2626" />
              <circle id="src_components_TestimonialCarousel_9fry" cx="10" cy="10" r="1.5" fill="#dc2626" />
              <circle id="src_components_TestimonialCarousel_7wdg" cx="90" cy="20" r="1.5" fill="#dc2626" />
              <circle id="src_components_TestimonialCarousel_vuw0" cx="20" cy="80" r="1.5" fill="#dc2626" />
              <circle id="src_components_TestimonialCarousel_v3yu" cx="80" cy="90" r="1.5" fill="#dc2626" />
              <line id="src_components_TestimonialCarousel_eof9" x1="50" y1="50" x2="10" y2="10" stroke="#dc2626" strokeWidth="0.5" />
              <line id="src_components_TestimonialCarousel_kl3h" x1="50" y1="50" x2="90" y2="20" stroke="#dc2626" strokeWidth="0.5" />
              <line id="src_components_TestimonialCarousel_9xnm" x1="50" y1="50" x2="20" y2="80" stroke="#dc2626" strokeWidth="0.5" />
              <line id="src_components_TestimonialCarousel_1llz" x1="50" y1="50" x2="80" y2="90" stroke="#dc2626" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect id="src_components_TestimonialCarousel_e2xf" width="100%" height="100%" fill="url(#neural-pattern)" />
        </svg>
      </div>

      <div id="src_components_TestimonialCarousel_rw6p" className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          id="src_components_TestimonialCarousel_3pcz" initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="src_components_TestimonialCarousel_ts6o" className="text-4xl md:text-5xl font-bold mb-4">
            <span id="src_components_TestimonialCarousel_p4it" className="text-gray-900 dark:text-white">Client </span>
            <span id="src_components_TestimonialCarousel_bi2q" className="text-primary-600 dark:text-primary-500">Reviews</span>
          </h2>
          <p id="src_components_TestimonialCarousel_sly9" className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear what our clients have to say about their experience working with us
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div id="src_components_TestimonialCarousel_9rjc" className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            id="src_components_TestimonialCarousel_yw1x" onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
          </button>

          <button
            id="src_components_TestimonialCarousel_tnh1" onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
          </button>

          {/* Testimonial Cards Stack */}
          <div id="src_components_TestimonialCarousel_5vgx" className="relative h-[500px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((testimonial) => (
                <motion.div
                  id="src_components_TestimonialCarousel_9cxh" key={testimonial.id}
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
                  <div id="src_components_TestimonialCarousel_x5bl" className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-100 dark:border-gray-700">
                    {/* Star Rating */}
                    <div id="src_components_TestimonialCarousel_gn8b" className="flex justify-center gap-2 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote id="src_components_TestimonialCarousel_e0ce" className="text-center mb-8">
                      <p id="src_components_TestimonialCarousel_er2y" className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic">
                        "{testimonial.quote}"
                      </p>
                    </blockquote>

                    {/* Client Info */}
                    <div id="src_components_TestimonialCarousel_hu3a" className="flex flex-col items-center gap-4">
                      <div id="src_components_TestimonialCarousel_h5dt" className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                        <span id="src_components_TestimonialCarousel_0vmh" className="text-2xl font-bold text-white">
                          {testimonial.client.charAt(0)}
                        </span>
                      </div>
                      <p id="src_components_TestimonialCarousel_jty0" className="text-lg font-semibold text-gray-900 dark:text-white">
                        {testimonial.client}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div id="src_components_TestimonialCarousel_6bpc" className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                id="src_components_TestimonialCarousel_qqq3" key={index}
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
