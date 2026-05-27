'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroProductMockup from './HeroProductMockup';

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
});

const TRUST = ['ללא כרטיס אשראי', 'תוצאות מיידיות', 'עברית'];

export default function Hero() {
  return (
    <section
      className="section-pad"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'calc(100vh - 57px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background radial — ellipse 80% 60% at 20% 30% */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(201,169,97,0.06), transparent 60%)',
        }}
      />

      <div className="hero-grid section-inner" style={{ position: 'relative', width: '100%' }}>
        {/* ── Right column (RTL first): Text ─────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Live badge */}
          <motion.div {...fadeUp(0.1)} style={{ display: 'inline-flex' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(201,169,97,0.08)',
              border: '1px solid var(--border-gold-strong)',
              padding: '5px 11px', borderRadius: 20,
            }}>
              <span
                className="animate-gold-pulse"
                style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold-text)', flexShrink: 0 }}
              />
              <span style={{ fontSize: 10, color: 'var(--gold-text)' }}>
                מקבל את 500 הראשונים
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.2)}
            style={{
              fontSize: 36, fontWeight: 600,
              letterSpacing: '-0.8px', lineHeight: 1.2,
              color: 'var(--text-primary)', margin: 0,
            }}
          >
            בושם שמתאים לך באמת.
            <br />
            <span style={{ color: 'var(--gold-text)' }}>בפעם הראשונה.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUp(0.3)}
            style={{
              fontSize: 14, color: 'var(--text-tertiary)',
              lineHeight: 1.6, maxWidth: 320, margin: 0,
            }}
          >
            תשע שאלות. ניתוח AI מתוך מעל 1,000 בשמים. עשר התאמות
            עם הסבר למה כל אחת מתאימה לך.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.4)}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}
          >
            <Link
              href="/quiz"
              style={{
                display: 'inline-flex', alignItems: 'center',
                fontSize: 13, fontWeight: 500,
                padding: '11px 20px', borderRadius: 6,
                background: 'var(--gold)', color: '#050505',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'opacity 0.2s, transform 0.15s',
                border: '1px solid var(--gold-dark)',
                boxShadow: 'var(--shadow-gold)',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              התחל שאלון · 3 דקות
            </Link>

            <button
              className="btn-ghost"
              style={{ fontSize: 13, padding: '11px 20px', borderRadius: 6, whiteSpace: 'nowrap' }}
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              צפה בדמו ↗
            </button>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            {...fadeUp(0.5)}
            style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}
          >
            {TRUST.map(item => (
              <span
                key={item}
                style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--text-muted)' }}
              >
                <span style={{ color: 'var(--gold-text)', fontSize: 11 }}>✓</span>
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Left column (RTL second): Product Mockup ────────────── */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
          <HeroProductMockup />
        </div>
      </div>
    </section>
  );
}
