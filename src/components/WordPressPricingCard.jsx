import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WordPressPricingCard() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const features = [
    "Custom WordPress website design",
    "Basic business websites, blogs, landing pages",
    "Mobile responsive design",
    "SEO-friendly structure",
    "Fast loading optimization",
    "Free domain for 1 year",
    "Free SSL certificate",
    "24/7 customer support",
  ];

  return (
    <motion.div
      id="src_components_WordPressPricingCard_ltp1" initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative max-w-md mx-auto"
    >
      {/* Limited Time Badge */}
      <div id="src_components_WordPressPricingCard_pvw7" className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          id="src_components_WordPressPricingCard_hd0m" initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg"
        >
          <Zap className="w-4 h-4" />
          <span id="src_components_WordPressPricingCard_s6hn" className="text-sm font-bold">Limited Time Offer</span>
        </motion.div>
      </div>

      <div id="src_components_WordPressPricingCard_2grz" className="card mt-8 border-2 border-primary-500 relative overflow-hidden">
        {/* Animated background gradient */}
        <div id="src_components_WordPressPricingCard_5dov" className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent dark:from-primary-900/20 dark:to-transparent pointer-events-none" />
        
        <div id="src_components_WordPressPricingCard_fu7y" className="relative z-10">
          {/* Countdown Timer */}
          <div id="src_components_WordPressPricingCard_9ztd" className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div id="src_components_WordPressPricingCard_9erf" className="flex items-center justify-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span id="src_components_WordPressPricingCard_6ter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Offer ends in:
              </span>
            </div>
            <div id="src_components_WordPressPricingCard_su4e" className="grid grid-cols-4 gap-2">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((item) => (
                <div id="src_components_WordPressPricingCard_fwg5" key={item.label} className="text-center">
                  <div id="src_components_WordPressPricingCard_k1tn" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div id="src_components_WordPressPricingCard_b1wp" className="text-xs text-gray-500 dark:text-gray-400">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div id="src_components_WordPressPricingCard_jwb4" className="text-center mb-6">
            <div id="src_components_WordPressPricingCard_zo1s" className="flex items-baseline justify-center gap-2">
              <span id="src_components_WordPressPricingCard_xm7w" className="text-5xl font-bold gradient-text">$49.99</span>
              <span id="src_components_WordPressPricingCard_igb8" className="text-gray-600 dark:text-gray-400">/month</span>
            </div>
          </div>

          {/* Title */}
          <h3 id="src_components_WordPressPricingCard_m6pb" className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            WordPress Website Package
          </h3>
          <p id="src_components_WordPressPricingCard_ceg1" className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Complete WordPress solution with hosting, domain, and professional design
          </p>

          {/* Features */}
          <ul id="src_components_WordPressPricingCard_n1nq" className="space-y-3 mb-8">
            {features.map((feature) => (
              <li
                id="src_components_WordPressPricingCard_w3va" key={feature}
                className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-200"
              >
                <Check className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200" />
                <span id="src_components_WordPressPricingCard_0mbm" className="text-gray-700 dark:text-gray-300 text-sm">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Get Started Button */}
          <button
            id="src_components_WordPressPricingCard_j5ys" onClick={() => navigate("/contact")}
            className="btn-primary w-full group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
