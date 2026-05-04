'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Logo from './Logo';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      data-hero-bg
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      style={{ background: '#FAF8F5' }}
    >
      {/* Decorative rings — minimal, no glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-[#C4A882]/[0.12]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-[#C4A882]/[0.08]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-[#C4A882]/[0.05]" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5EDE3] border border-[#C4A882]/25 mb-8"
          >
            <span className="text-[#8B7355] text-xs font-hebrew font-medium tracking-wide">גילוי בשמים חכם</span>
          </motion.div>

          {/* Logo */}
          <div className="flex justify-center mb-6 max-w-full overflow-hidden">
            <Logo size="xl" />
          </div>

          <p className="font-hebrew text-xl sm:text-2xl md:text-3xl mb-4 font-light text-ink tracking-tight px-2">
            גלה את חתימת הריח שלך
          </p>

          <p className="font-hebrew text-[13px] sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-10 font-light text-ink-secondary px-3">
            ענה על 7 שאלות קצרות — ה-AI ימצא את הבשמים שמדברים אליך מתוך 745 יצירות מובחרות.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
        >
          <button
            data-hero-cta
            onClick={() => scrollTo('quiz')}
            className="w-full sm:w-auto px-8 py-4 font-hebrew text-sm tracking-wide font-semibold transition-all duration-300 hover:-translate-y-0.5 min-h-[48px]"
            style={{ background: '#0D0D0D', color: '#FFFFFF', borderRadius: '4px', boxShadow: '0 2px 8px rgba(13,13,13,0.14)' }}
          >
            התחל את השאלון — 2 דקות
          </button>
          <button
            onClick={() => scrollTo('collection')}
            className="w-full sm:w-auto px-8 py-4 font-hebrew text-sm tracking-wide border transition-all duration-300 hover:bg-[#8B7355]/8 min-h-[48px]"
            style={{ borderRadius: '4px', borderColor: '#8B7355', color: '#8B7355' }}
          >
            חקור את הקולקציה
          </button>
        </motion.div>

        {/* Social hint — no stats duplication with StatsBar below */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-[12px] font-hebrew text-[#9A9A9A] font-light"
        >
          שאלון קצר · המלצות AI · אוסף אישי
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <button
          onClick={() => scrollTo('collection')}
          aria-label="גלול לקולקציה"
          className="hover:text-[#0D0D0D] transition-colors"
          style={{ color: '#8B7355', opacity: 0.7 }}
        >
          <ChevronDown className="w-5 h-5" aria-hidden />
        </button>
      </motion.div>
    </section>
  );
}
