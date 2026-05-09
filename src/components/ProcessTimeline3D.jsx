import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We learn about your business, goals, and target audience to create the perfect strategy.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Our designers craft beautiful mockups that align with your brand identity.',
  },
  {
    number: '03',
    title: 'Development',
    description:
      'Expert developers bring the design to life with clean, efficient code.',
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'We deploy your website and provide training and ongoing support.',
  },
];

export default function ProcessTimeline3D() {
  const sectionRef = useRef(null);
  const cardRefs   = useRef([]);
  const ribbonRef  = useRef(null);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    const localTriggers = [];

    // Ribbon draw-in — resets when scrolled back above
    const ribbonST = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(
          ribbonRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.2, ease: 'power3.out' }
        );
      },
      onLeaveBack: () => {
        gsap.set(ribbonRef.current, { scaleX: 0, transformOrigin: 'left center' });
      },
    });
    localTriggers.push(ribbonST);

    // Card initial hidden state
    const initialState = (i) => ({
      rotateY: i % 2 === 0 ? -35 : 35,
      z: i % 2 === 0 ? 80 : -80,
      y: 40,
      opacity: 0,
    });

    cards.forEach((card, i) => {
      gsap.set(card, initialState(i));

      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        onEnter: () => {
          gsap.to(card, {
            rotateY: 0,
            z: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.18,
            ease: 'power3.out',
          });
        },
        // Reset to initial 3D state so the animation replays on re-entry
        onLeaveBack: () => {
          gsap.set(card, initialState(i));
        },
      });
      localTriggers.push(st);
    });

    return () => localTriggers.forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ perspective: '1200px', perspectiveOrigin: '50% 30%' }}
    >
      {/* Ribbon connecting line */}
      <div className="hidden md:block absolute top-[calc(2rem+48px)] left-[12%] right-[12%] pointer-events-none">
        <div
          ref={ribbonRef}
          className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent"
          style={{ opacity: 0.5, transform: 'scaleX(0)', transformOrigin: 'left center' }}
        />
        <div className="absolute inset-0 h-[3px] -mt-[1px] bg-gradient-to-r from-transparent via-primary-400/30 to-transparent blur-sm" />
      </div>

      <div
        className="grid md:grid-cols-4 gap-6 relative z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {steps.map((step, idx) => (
          <div
            key={step.number}
            ref={(el) => { cardRefs.current[idx] = el; }}
            className="relative text-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Floating number badge */}
            <div className="relative inline-block mb-6">
              <div
                className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl font-bold text-2xl text-white shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  boxShadow: '0 8px 24px rgba(220,38,38,0.35), 0 2px 8px rgba(220,38,38,0.2)',
                  transform: `translateZ(${idx % 2 === 0 ? 12 : -8}px)`,
                }}
              >
                {step.number}
              </div>
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'rgba(220,38,38,0.15)',
                  transform: 'translateZ(-4px) scale(1.15)',
                  filter: 'blur(8px)',
                }}
              />
            </div>

            {/* Card body */}
            <div
              className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translateZ(${idx % 2 === 0 ? 6 : -6}px)`,
                boxShadow:
                  idx % 2 === 0
                    ? '0 12px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(220,38,38,0.06)'
                    : '0 4px 16px rgba(0,0,0,0.06)',
              }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Dot on ribbon */}
            <div
              className="hidden md:block absolute top-[calc(2rem+48px)] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-600 ring-2 ring-primary-200 dark:ring-primary-800 -mt-[26px] z-20"
              style={{ transform: 'translateX(-50%) translateZ(20px)' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
