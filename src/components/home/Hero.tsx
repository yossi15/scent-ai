'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import HeroProductMockup from './HeroProductMockup';

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
});

const TRUST = ['ללא כרטיס אשראי', 'תוצאות מיידיות', 'ממשק בעברית'];

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 57px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 40px)',
      }}
    >
      {/* Background radial */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 55% at 65% 40%, rgba(201,169,97,0.055) 0%, transparent 65%)',
        }}
      />
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.018,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Bottom fade — bridges into PressStrip */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 120, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(7,7,7,0.6) 70%, #070707 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}
      >
        {/* ── Right col (RTL): Text ─────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Live badge */}
          <motion.div {...fadeUp(0.1)} style={{ display: 'inline-flex' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 100,
              background: 'rgba(201,169,97,0.07)',
              border: '1px solid rgba(201,169,97,0.22)',
            }}>
              <span
                className="animate-gold-pulse"
                style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }}
              />
              <span style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 500, letterSpacing: '0.02em' }}>
                מקבל את 500 הראשונים
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div {...fadeUp(0.2)}>
            <h1
              style={{
                fontSize: 'clamp(28px, 4.2vw, 46px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              בושם שמתאים לך באמת.
              <br />
              <span style={{ color: 'var(--gold)' }}>בפעם הראשונה.</span>
            </h1>
          </motion.div>

          {/* Sub */}
          <motion.p
            {...fadeUp(0.3)}
            style={{
              fontSize: 15,
              color: 'var(--text-tertiary)',
              lineHeight: 1.7,
              maxWidth: 360,
              margin: 0,
            }}
          >
            תשע שאלות. ניתוח AI מתוך מעל 1,000 בשמים. עשר התאמות
            אישיות עם הסבר למה כל אחת מתאימה לך.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="/quiz"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 14, fontWeight: 600,
                padding: '13px 24px', borderRadius: 8,
                background: 'var(--gold)', color: '#050505',
                textDecoration: 'none', whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(201,169,97,0.3)',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              התחל שאלון · 3 דקות
              <ArrowLeft size={15} />
            </Link>

            <button
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 13, padding: '13px 20px', borderRadius: 8,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'var(--text-secondary)',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; }}
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play size={13} style={{ flexShrink: 0 }} />
              צפה בדמו
            </button>
          </motion.div>

          {/* Trust pills */}
          <motion.div {...fadeUp(0.5)} style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            {TRUST.map(item => (
              <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-faint)' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <circle cx="6" cy="6" r="5.5" stroke="rgba(201,169,97,0.35)" />
                  <path d="M3.5 6L5.2 7.8L8.5 4.2" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Left col (RTL): Mockup ────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 24 }}>
          <HeroProductMockup />
        </div>
      </div>
    </section>
  );
}
