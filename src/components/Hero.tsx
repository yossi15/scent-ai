'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import Logo from './Logo';

const stats = [
  { value: '200+', label: 'בשמי נישה' },
  { value: '18', label: 'בתי בושם' },
  { value: 'AI', label: 'התאמה חכמה' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 hero-pattern">
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-faint border border-gold-border mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-xs font-hebrew font-medium">פלטפורמת קיור בשמים מבוססת AI</span>
          </motion.div>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo size="xl" />
          </div>

          <p className="font-serif text-2xl md:text-3xl text-ink-secondary italic mb-4 font-light">
            הבושם הבא שלך, מפוענח.
          </p>

          <p className="font-hebrew text-sm md:text-base text-ink-muted max-w-lg mx-auto leading-relaxed mb-10 font-light">
            פלטפורמה חכמה שמנתחת את העדפות הריח שלך ומגלה את יצירת המופת הבאה — מבתי הבושם הנישתיים ביותר בעולם.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
        >
          <button className="btn-gold px-8 py-3.5 font-hebrew text-sm tracking-wide rounded-lg">
            גלה את החתימה שלך
          </button>
          <button className="btn-outline px-8 py-3.5 font-hebrew text-sm tracking-wide rounded-lg">
            חקור את הקולקציה
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-center gap-8 md:gap-16"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-serif text-2xl md:text-3xl text-gold font-semibold">{stat.value}</p>
              <p className="text-ink-muted text-xs font-hebrew font-light mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5 text-ink-faint" />
      </motion.div>
    </section>
  );
}
