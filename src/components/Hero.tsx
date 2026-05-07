'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      data-hero-bg
      className="pt-28 pb-20 md:pt-36 md:pb-28 px-6 text-center"
      style={{ background: '#FAFAF7' }}
    >
      <div className="max-w-3xl mx-auto">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#999] mb-10"
        >
          Fragrance Discovery · 745+ Curated Scents
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif font-light text-[#1a1a1a] leading-[0.95] mb-8"
          style={{ fontSize: 'clamp(52px, 9vw, 108px)' }}
        >
          גלה את חתימת<br />הריח שלך.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-hebrew text-sm text-[#666] font-light max-w-xs mx-auto mb-6 leading-relaxed"
        >
          שבע שאלות קצרות. המלצות מדויקות מתוך 745+ בשמים.
        </motion.p>

        {/* Live counter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[11px] font-hebrew text-[#8B7355] mb-8"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5 align-middle" />
          127 אנשים גילו בושם חדש השבוע
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              data-hero-cta
              onClick={() => scrollTo('quiz')}
              className="btn-dark"
            >
              התחל את השאלון
            </button>
            <button
              onClick={() => scrollTo('collection')}
              className="btn-outline-dark"
            >
              חקור הקולקציה
            </button>
          </div>

          {/* Lead magnet */}
          <button
            onClick={() => scrollTo('quiz')}
            className="text-[12px] font-hebrew text-[#C4A882] hover:text-[#8B7355] transition-colors underline underline-offset-2"
          >
            או קבל 3 המלצות חינם בלי התחייבות ←
          </button>
        </motion.div>

      </div>
    </section>
  );
}
