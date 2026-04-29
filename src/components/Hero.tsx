'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Droplets } from 'lucide-react';
import Logo from './Logo';

const stats = [
  { value: '342', label: 'בשמים מובחרים' },
  { value: '70', label: 'בתי בושם' },
  { value: 'AI', label: 'התאמה חכמה' },
];

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      data-hero-bg
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      style={{ background: 'linear-gradient(135deg, #F5F3EE 0%, #ECEAE4 100%)' }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#C4A882]/[0.18] to-transparent blur-3xl" />
        <div className="absolute bottom-[15%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#C4A882]/[0.14] to-transparent blur-3xl" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-[#C4A882]/[0.20]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#C4A882]/[0.14]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#C4A882]/[0.08]" />

        {/* Floating scent drops */}
        <motion.div
          className="absolute top-[20%] right-[20%]"
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Droplets className="w-6 h-6 text-[#C4A882]/40" />
        </motion.div>
        <motion.div
          className="absolute bottom-[30%] left-[15%]"
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Droplets className="w-8 h-8 text-[#C4A882]/35" />
        </motion.div>
        <motion.div
          className="absolute top-[60%] right-[12%]"
          animate={{ y: [-5, 15, -5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-5 h-5 text-[#C4A882]/40" />
        </motion.div>
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4A882]/10 backdrop-blur-sm border border-[#C4A882]/30 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C4A882]" />
            <span className="text-[#C4A882] text-xs font-hebrew font-medium">פלטפורמת AI לגילוי בשמים</span>
          </motion.div>

          {/* Logo */}
          <div className="flex justify-center mb-6 max-w-full overflow-hidden">
            <Logo size="xl" />
          </div>

          <p className="font-hebrew text-xl sm:text-2xl md:text-3xl mb-4 font-light text-ink tracking-tight px-2">
            גלה את חתימת הריח שלך
          </p>

          <p className="font-hebrew text-[13px] sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-10 font-light text-ink-secondary px-3">
            פלטפורמת AI לגילוי בשמים - שמור את האוסף שלך, קבל המלצות חכמות, וקנה דרכנו.
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
            onClick={() => scrollTo('quickmatch')}
            className="w-full sm:w-auto px-8 py-4 font-hebrew text-sm tracking-wide rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 min-h-[48px]"
            style={{ background: '#0D0D0D', color: '#FFFFFF', boxShadow: '0 4px 16px rgba(13,13,13,0.18)' }}
          >
            גלה את הבושם שלך
          </button>
          <button
            onClick={() => scrollTo('collection')}
            className="w-full sm:w-auto px-8 py-4 font-hebrew text-sm tracking-wide rounded-lg border-2 transition-all duration-300 hover:bg-[#8B7355]/10 min-h-[48px]"
            style={{ borderColor: '#8B7355', color: '#8B7355' }}
          >
            חקור את הקולקציה
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-center gap-3 sm:gap-8 md:gap-16"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center bg-bg-card/70 backdrop-blur-sm rounded-xl px-3 sm:px-5 py-3 border border-border min-w-[80px]">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-gold">{stat.value}</p>
              <p className="text-[11px] sm:text-xs font-hebrew font-light mt-1 text-ink-secondary">{stat.label}</p>
            </div>
          ))}
        </motion.div>
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
