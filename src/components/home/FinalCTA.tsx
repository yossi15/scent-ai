'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const SHOW_COUNT = process.env.NEXT_PUBLIC_SHOW_CTA_COUNT !== 'false';
const COUNT = 217;

export default function FinalCTA() {
  return (
    <section
      className="section-pad"
      style={{
        background: 'var(--bg-primary)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,97,0.05), transparent 70%)',
      }} />

      <div className="section-inner" style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        >
          {/* Live badge */}
          {SHOW_COUNT && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(201,169,97,0.08)',
              border: '1px solid var(--border-gold-strong)',
              padding: '6px 14px', borderRadius: 100,
            }}>
              <span
                className="animate-gold-pulse"
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }}
              />
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                {COUNT} הצטרפו השבוע
              </span>
            </div>
          )}

          <h2 style={{
            fontSize: 'clamp(22px, 4vw, 28px)',
            fontWeight: 600, letterSpacing: '-0.5px',
            color: 'var(--text-primary)', margin: 0, lineHeight: 1.25,
          }}>
            מצא את הריח שלך ב-3 דקות<span style={{ color: 'var(--gold-text)' }}>.</span>
          </h2>

          <p style={{ fontSize: 13, color: 'var(--text-tertiary)', margin: 0 }}>
            תשע שאלות. ניתוח AI. עשר התאמות.
          </p>

          <Link
            href="/quiz"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 14, fontWeight: 600,
              padding: '13px 28px', borderRadius: 8,
              background: 'var(--gold)', color: '#050505',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(201,169,97,0.28)',
              transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            התחל את השאלון ←
          </Link>

          <p style={{ fontSize: 11, color: 'var(--text-faint)', margin: 0 }}>
            ללא כרטיס אשראי · 7 ימי ניסיון · ביטול בכל עת
          </p>
        </motion.div>
      </div>
    </section>
  );
}
