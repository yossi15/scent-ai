'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Logo from './Logo';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Soft ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-gold/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex justify-center mb-8">
            <Logo size="xl" />
          </div>

          <div className="gold-line max-w-[120px] mx-auto mb-6" />

          <p className="font-serif text-xl md:text-2xl text-ink-muted italic mb-4">
            הבושם הבא שלך, מפוענח.
          </p>

          <p className="font-hebrew text-sm md:text-base text-ink-muted/60 max-w-xl mx-auto leading-relaxed mb-12 font-light">
            פלטפורמת קיור חכמה שמנתחת את העדפות הריח שלך
            ומגלה את יצירת המופת הבאה — מבתי הבושם הנישתיים ביותר בעולם.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-3.5 gold-gradient-bg text-white font-hebrew font-medium text-sm tracking-wide hover:opacity-90 transition-opacity duration-500 rounded-sm">
            גלה את החתימה שלך
          </button>
          <button className="px-8 py-3.5 border border-gold/30 text-gold font-hebrew font-light text-sm tracking-wide hover:bg-gold/5 transition-colors duration-500 rounded-sm">
            חקור את הקולקציה
          </button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5 text-gold/40" />
      </motion.div>
    </section>
  );
}
