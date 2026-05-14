'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fragrances } from '@/data/fragrances';

const TOTAL = fragrances.length;

const AMBIENT = fragrances
  .filter(f => f.image)
  .slice(0, 5);

const floatPositions = [
  { top: '12%', right: '6%',  size: 110, delay: 0 },
  { top: '55%', right: '3%',  size: 80,  delay: 0.15 },
  { top: '20%', left: '5%',   size: 90,  delay: 0.1 },
  { top: '62%', left: '7%',   size: 70,  delay: 0.25 },
  { top: '38%', right: '10%', size: 65,  delay: 0.2 },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function Hero() {
  return (
    <section
      className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
      aria-labelledby="hero-heading"
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(196,168,130,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Floating fragrance bottles — desktop only */}
      {AMBIENT.map((f, i) => {
        const pos = floatPositions[i];
        return (
          <motion.div
            key={f.id}
            className="absolute hidden lg:block pointer-events-none select-none"
            style={{ ...pos, width: pos.size, height: pos.size * 1.35 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.22, y: 0 }}
            transition={{ duration: 1.2, delay: pos.delay, ease: 'easeOut' }}
          >
            <Image
              src={f.image}
              alt=""
              fill
              sizes="120px"
              className="object-contain"
            />
          </motion.div>
        );
      })}

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={fadeUp}
          className="mb-10"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize: '10px',
            letterSpacing: '3.5px',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}
        >
          ריחות נישה · {TOTAL} בשמים · 63 בתי בושם
        </motion.p>

        <motion.h1
          id="hero-heading"
          variants={fadeUp}
          className="max-w-4xl"
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 'clamp(40px, 7vw, 68px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            marginBottom: '24px',
          }}
        >
          גלה את חתימת הריח שלך.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="max-w-lg"
          style={{
            fontFamily: 'var(--font-hebrew)',
            fontWeight: 300,
            fontSize: '15px',
            lineHeight: 1.75,
            color: 'var(--ink-muted)',
            marginBottom: '52px',
          }}
          dir="rtl"
        >
          {TOTAL} בשמים נבחרים. שאלון AI. המלצות מדויקות.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#quiz"
            className="inline-flex items-center justify-center transition-all duration-300 active:scale-[0.97]"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              minWidth: '196px',
              padding: '16px 36px',
              background: 'var(--ink)',
              color: 'var(--bg-primary)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--gold-dark)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(139,115,85,0.28)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--ink)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            התחל את השאלון
          </a>
          <a
            href="#collection"
            className="inline-flex items-center justify-center transition-all duration-300"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '4px',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--gold)';
              (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--border)';
              (e.currentTarget as HTMLElement).style.color = 'var(--ink)';
            }}
          >
            חקור את הקולקציה
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 divider" />
    </section>
  );
}
