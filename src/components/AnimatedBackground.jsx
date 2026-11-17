// Decorative section background. Pure CSS animations (transform/opacity only) so they run on the
// compositor instead of the main thread — the old framer-motion version kept JavaScript busy on every
// frame in all six home sections. Positions are fixed (no Math.random) so server and client HTML match.
// Respects prefers-reduced-motion (see .ab-* rules in globals.css).

const PARTICLES = [
  [8, 12, 3.2, 0.4], [22, 68, 4.1, 1.2], [35, 25, 3.6, 0.2], [47, 82, 4.6, 1.8], [58, 15, 3.9, 0.9],
  [66, 52, 4.3, 0.1], [74, 34, 3.4, 1.5], [83, 76, 4.8, 0.6], [91, 20, 3.7, 1.1], [14, 44, 4.4, 1.9],
  [28, 90, 3.3, 0.7], [41, 58, 4.0, 1.4], [53, 40, 3.8, 0.3], [62, 88, 4.5, 1.6], [78, 62, 3.5, 0.8],
  [87, 46, 4.2, 1.3], [5, 72, 3.9, 0.5], [96, 84, 4.7, 1.7], [33, 6, 3.6, 1.0], [70, 8, 4.1, 0.2],
];

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Animated gradient orbs */}
      <div className="ab-orb-1 absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary-500/30 to-primary-700/20 rounded-full blur-3xl" />
      <div className="ab-orb-2 absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-primary-600/25 to-red-500/15 rounded-full blur-3xl" />

      {/* Floating geometric shapes */}
      <div className="ab-spin absolute top-1/4 right-1/4 w-32 h-32 border-2 border-primary-500/20 rounded-lg" />
      <div className="ab-spin-float absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-primary-400/15 rounded-full" />

      {/* Particle dots */}
      {PARTICLES.map(([left, top, duration, delay], i) => (
        <div
          key={i}
          className="ab-particle absolute w-1 h-1 bg-primary-500 rounded-full"
          style={{ left: `${left}%`, top: `${top}%`, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
        />
      ))}

      {/* Wave */}
      <svg
        className="ab-wave absolute bottom-0 left-0 w-full h-64 opacity-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="currentColor"
          className="text-primary-600"
        />
      </svg>
    </div>
  );
}
