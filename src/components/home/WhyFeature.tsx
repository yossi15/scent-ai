'use client';

import { motion } from 'framer-motion';

const FEATURES = [
  'ניתוח אישיות ריחנית מעמיק',
  'השוואת מחירים מ-3 חנויות',
  'עדכון ממאגר של 1,000+ בשמים',
];

/* ── Small bottle SVG ─────────────────────────────────────────── */
const Bottle = () => (
  <svg width="32" height="46" viewBox="0 0 32 46" fill="none" aria-hidden="true">
    <rect x="11" y="0" width="10" height="5" rx="1.5" fill="rgba(201,169,97,0.5)" />
    <rect x="7" y="4.5" width="18" height="1.5" rx="0.75" fill="rgba(201,169,97,0.28)" />
    <rect x="2" y="6" width="28" height="37" rx="4" fill="rgba(201,169,97,0.13)" />
    <rect x="2" y="6" width="28" height="37" rx="4" stroke="rgba(201,169,97,0.25)" strokeWidth="0.8" />
    <rect x="7" y="10" width="18" height="4" rx="1.5" fill="rgba(201,169,97,0.32)" />
  </svg>
);

export default function WhyFeature() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-inner">
        <div className="grid-2-cols" style={{ alignItems: 'center' }}>

          {/* ── Left (RTL second): Product card ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              borderRadius: 14,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* Perfume card top */}
            <div style={{
              padding: '16px',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'linear-gradient(135deg, var(--dna-gradient-start), var(--dna-gradient-end))',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 48, height: 64, borderRadius: 8, flexShrink: 0,
                  background: 'linear-gradient(155deg, rgba(201,169,97,0.28), rgba(139,90,43,0.16))',
                  border: '1px solid rgba(201,169,97,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Bottle />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center',
                    background: 'var(--gold)', color: '#050505',
                    fontSize: 8, fontWeight: 700,
                    padding: '2px 7px', borderRadius: 100, marginBottom: 6,
                  }}>
                    96% התאמה
                  </div>
                  <p style={{ fontSize: 9, color: 'var(--text-faint)', margin: '0 0 3px' }}>MFK</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                    Baccarat Rouge 540
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold-text)' }}>1,580&#8362;</span>
                    <span style={{ fontSize: 9, color: 'var(--text-faint)', textDecoration: 'line-through' }}>1,890&#8362;</span>
                  </div>
                </div>
              </div>
            </div>

            {/* "למה זה אתה" explanation card */}
            <div style={{
              padding: '14px 16px',
              borderRight: '2px solid var(--gold)',
              margin: '12px',
              background: 'rgba(201,169,97,0.04)',
              borderRadius: '0 8px 8px 0',
            }}>
              <p style={{ fontSize: 9, color: 'var(--gold-text)', fontWeight: 600, margin: '0 0 6px', letterSpacing: '0.03em' }}>
                למה זה אתה
              </p>
              <p style={{ fontSize: 11, color: 'var(--text-tertiary)', margin: 0, lineHeight: 1.6 }}>
                הפרופיל הריחני שלך מראה העדפה חזקה לאמברה חמה (92%) עם גוונים עצים. Baccarat Rouge 540 מביא בדיוק את השילוב הזה.
              </p>
            </div>

            {/* Price comparison row */}
            <div style={{
              padding: '12px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid var(--border-subtle)',
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold-text)' }}>1,580&#8362;</span>
              <button
                className="btn-ghost"
                style={{ fontSize: 11, padding: '5px 10px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4 }}
              >
                3 חנויות הושוו ←
              </button>
            </div>
          </motion.div>

          {/* ── Right (RTL first): Text ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            <p style={{ fontSize: 9, color: 'var(--gold-text)', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>
              הפיצ׳ר המוביל
            </p>
            <h2 style={{ fontSize: 26, fontWeight: 600, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
              לא רק{' '}
              <span style={{ color: 'var(--gold-text)' }}>מה</span>
              {'. גם '}
              <span style={{ color: 'var(--gold-text)' }}>למה</span>.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-tertiary)', margin: 0, lineHeight: 1.7, maxWidth: 380 }}>
              כל המלצה מגיעה עם הסבר מפורט מדוע היא מתאימה לפרופיל הריחני שלך — לא רק רשימה של בשמים.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FEATURES.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(201,169,97,0.1)',
                    border: '1px solid rgba(201,169,97,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: 'var(--gold-text)',
                  }}>✓</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
