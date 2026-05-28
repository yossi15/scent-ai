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

const TRUST = ['ללא כרטיס אשראי', 'תוצאות מיידיות', 'ממשק בעברית'];

const FAMILY_CHIPS = [
  { label: 'אמברה',       color: '#c9a961' },
  { label: 'גורמה',       color: '#9b7a3c' },
  { label: 'ירוקים',      color: '#6b9b5a' },
  { label: 'פרחי לבן',    color: '#c9b8a1' },
  { label: 'הדרים',       color: '#e8a84a' },
];

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'var(--s9) var(--s3) var(--s10)',
      }}
    >
      {/* Background glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(50% 60% at 70% 25%, var(--gold-soft) 0%, transparent 65%),
            radial-gradient(40% 50% at 15% 75%, var(--gold-faint) 0%, transparent 60%)
          `,
        }}
      />
      {/* Grid lines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(to right, var(--border-subtle) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          WebkitMaskImage: 'radial-gradient(80% 70% at 50% 40%, black 0%, transparent 75%)',
          maskImage: 'radial-gradient(80% 70% at 50% 40%, black 0%, transparent 75%)',
          opacity: 0.5,
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 'var(--maxw)', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: 'var(--s8)',
          alignItems: 'center',
        }}
        className="hero-inner-grid"
      >
        {/* ── Text column ─────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>

          {/* Badge */}
          <motion.div {...fadeUp(0.1)} style={{ display: 'inline-flex' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              alignSelf: 'flex-start',
              padding: '7px 13px', borderRadius: 999,
              background: 'var(--gold-faint)',
              border: '1px solid var(--gold-soft)',
              fontSize: 12, color: 'var(--gold)',
              fontWeight: 500, letterSpacing: '0.01em',
            }}>
              <span
                className="animate-gold-pulse"
                style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }}
              />
              מקבל את 500 הראשונים
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1
            {...fadeUp(0.2)}
            style={{
              fontWeight: 700,
              fontSize: 'clamp(38px, 5vw, 56px)',
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            בושם שמתאים לך באמת.
            <span style={{ color: 'var(--gold-text)', display: 'block', fontWeight: 600 }}>
              בפעם הראשונה.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUp(0.3)}
            style={{
              fontSize: 16, lineHeight: 1.7,
              color: 'var(--text-secondary)', maxWidth: 500, margin: 0,
            }}
          >
            תשע שאלות. ניתוח AI מתוך מעל 1,000 בשמים. עשר התאמות עם הסבר ריחני מדויק
            למה כל אחת מתאימה לך - לא ניחושים, לא מלל שיווקי.
          </motion.p>

          {/* Family chips */}
          <motion.div
            {...fadeUp(0.35)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}
          >
            {FAMILY_CHIPS.map(chip => (
              <span
                key={chip.label}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '5px 10px 5px 8px', borderRadius: 999,
                  background: 'var(--bg-card-2)', border: '1px solid var(--border-subtle)',
                  fontSize: 11.5, color: 'var(--text-secondary)',
                  fontFamily: 'var(--serif)', fontStyle: 'italic',
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: chip.color, flexShrink: 0 }} />
                {chip.label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.4)}
            style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'var(--s1)' }}
          >
            <Link
              href="/quiz"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 14.5, fontWeight: 500,
                padding: '14px 24px', borderRadius: 10,
                background: 'var(--gold)', color: '#1a1410',
                textDecoration: 'none', whiteSpace: 'nowrap',
                border: '1px solid var(--gold)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.2) inset, 0 10px 30px -10px var(--gold-soft)',
                transition: 'all 200ms cubic-bezier(.4,0,.2,1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--gold-strong)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--gold)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              התחל שאלון · 3 דקות
            </Link>

            <button
              className="btn-ghost"
              style={{ fontSize: 14.5, padding: '14px 24px', borderRadius: 10, whiteSpace: 'nowrap' }}
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              צפה בדמו
            </button>
          </motion.div>

          {/* Trust */}
          <motion.div
            {...fadeUp(0.5)}
            style={{ display: 'flex', gap: 'var(--s3)', flexWrap: 'wrap', marginTop: 'var(--s1)' }}
          >
            {TRUST.map(item => (
              <span
                key={item}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--text-muted)' }}
              >
                <span style={{ color: 'var(--gold-text)', fontSize: 11 }}>✓</span>
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Mockup column ────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
          <HeroProductMockup />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-inner-grid {
            grid-template-columns: 1fr !important;
            gap: var(--s7) !important;
          }
        }
      `}</style>
    </section>
  );
}
