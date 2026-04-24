'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Droplets } from 'lucide-react';
import Image from 'next/image';
import Logo from './Logo';

const stats = [
  { value: '100', label: 'בשמי נישה' },
  { value: '18', label: 'בתי בושם' },
  { value: 'AI', label: 'התאמה חכמה' },
];

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Hero photo background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=2400&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 dark:opacity-20"
        />
      </div>

      {/* Elegant gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0e8]/85 via-[#faf8f5]/80 to-[#f0ebe0]/85 dark:from-[#0e0c0a]/90 dark:via-[#16130f]/85 dark:to-[#1c1814]/90" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#96793a]/[0.04] to-transparent blur-3xl" />
        <div className="absolute bottom-[15%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#96793a]/[0.06] to-transparent blur-3xl" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-[#96793a]/[0.06]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#96793a]/[0.04]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#96793a]/[0.02]" />

        {/* Floating scent drops */}
        <motion.div
          className="absolute top-[20%] right-[20%]"
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Droplets className="w-6 h-6 text-gold/10" />
        </motion.div>
        <motion.div
          className="absolute bottom-[30%] left-[15%]"
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Droplets className="w-8 h-8 text-gold/[0.07]" />
        </motion.div>
        <motion.div
          className="absolute top-[60%] right-[12%]"
          animate={{ y: [-5, 15, -5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-5 h-5 text-gold/[0.08]" />
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-gold-border mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-xs font-hebrew font-medium">שירות מנוי לבשמי נישה מבוסס AI</span>
          </motion.div>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo size="xl" />
          </div>

          <p className="font-serif text-2xl md:text-3xl text-ink-secondary italic mb-4 font-light">
            הבושם הבא שלך, מפוענח.
          </p>

          <p className="font-hebrew text-sm md:text-base text-ink-muted max-w-lg mx-auto leading-relaxed mb-10 font-light">
            שירות מנוי לבשמי נישה מבוסס AI שמנתח את העדפות הריח שלך ומגלה את יצירת המופת הבאה — מבתי הבושם הנישתיים ביותר בעולם.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
        >
          <button
            onClick={() => scrollTo('quiz')}
            className="btn-gold px-8 py-3.5 font-hebrew text-sm tracking-wide rounded-lg"
          >
            גלה את הבושם שלך
          </button>
          <button
            onClick={() => scrollTo('collection')}
            className="btn-outline px-8 py-3.5 font-hebrew text-sm tracking-wide rounded-lg bg-white/60 backdrop-blur-sm"
          >
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
            <div key={i} className="text-center bg-white/50 backdrop-blur-sm rounded-xl px-5 py-3">
              <p className="font-serif text-2xl md:text-3xl text-gold font-semibold">{stat.value}</p>
              <p className="text-ink-muted text-xs font-hebrew font-light mt-1">{stat.label}</p>
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
          className="text-ink-faint hover:text-gold transition-colors"
        >
          <ChevronDown className="w-5 h-5" aria-hidden />
        </button>
      </motion.div>
    </section>
  );
}
