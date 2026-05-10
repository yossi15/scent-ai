'use client';

import { motion } from 'framer-motion';
import { fragrances } from '@/data/fragrances';

const TOTAL = fragrances.length; // 138

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden bg-bg-primary"
      aria-labelledby="hero-heading"
      data-hero-bg
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(196,168,130,0.09),transparent_65%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        {/* Eyebrow */}
        <p className="text-gold text-[11px] tracking-[0.3em] uppercase font-sans font-medium mb-6">
          הקולקציה
        </p>

        {/* Main heading */}
        <h1
          id="hero-heading"
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink font-bold leading-[0.9] mb-6"
        >
          Know your
          <br />
          <span className="gold-text italic">scent.</span>
        </h1>

        {/* Sub-heading */}
        <p className="text-ink-muted font-hebrew text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed mb-3">
          {TOTAL} בשמים נישתיים מהמובחרים בעולם — גלה את זהות הריח שלך
        </p>

        {/* Stats strip */}
        <div className="flex items-center justify-center gap-8 mb-10 mt-2">
          {[
            { num: String(TOTAL), label: 'בשמים' },
            { num: '46+', label: 'בתי בושם' },
            { num: 'AI', label: 'מותאם אישית' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="font-serif text-2xl font-bold text-gold">{num}</p>
              <p className="text-[10px] font-hebrew text-ink-faint uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <motion.a
            href="#quiz"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-gold px-8 py-3.5 rounded-xl font-hebrew text-sm font-semibold min-w-[160px] text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            data-hero-cta
          >
            שאלון טעמים
          </motion.a>
          <motion.a
            href="#collection"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline px-8 py-3.5 rounded-xl font-hebrew text-sm font-medium min-w-[160px] text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            לכל הקולקציה ←
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-gold/40" />
        <span className="text-[9px] font-sans text-ink-faint tracking-[0.2em] uppercase">scroll</span>
      </motion.div>
    </section>
  );
}
