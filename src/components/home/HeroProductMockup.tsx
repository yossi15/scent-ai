'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, Share2, ArrowRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease },
});

/* ─── Bottle SVG (large, 38×50) ─────────────────────────────────── */
const BottleLg = () => (
  <svg width="38" height="50" viewBox="0 0 38 50" fill="none" aria-hidden="true">
    <rect x="13" y="0" width="12" height="6" rx="2" fill="rgba(201,169,97,0.55)" />
    <rect x="8" y="5.5" width="22" height="2" rx="1" fill="rgba(201,169,97,0.3)" />
    <rect x="3" y="7" width="32" height="40" rx="5" fill="rgba(201,169,97,0.15)" />
    <rect x="3" y="7" width="32" height="40" rx="5" stroke="rgba(201,169,97,0.28)" strokeWidth="1" />
    <rect x="9" y="12" width="20" height="5" rx="2" fill="rgba(201,169,97,0.35)" />
    <rect x="11" y="22" width="16" height="1" rx="0.5" fill="rgba(201,169,97,0.15)" />
    <rect x="11" y="26" width="16" height="1" rx="0.5" fill="rgba(201,169,97,0.10)" />
    <rect x="11" y="30" width="10" height="1" rx="0.5" fill="rgba(201,169,97,0.08)" />
  </svg>
);

/* ─── Bottle SVG (small) ─────────────────────────────────────────── */
const BottleSm = () => (
  <svg width="18" height="26" viewBox="0 0 18 26" fill="none" aria-hidden="true">
    <rect x="6" y="0" width="6" height="4" rx="1.2" fill="rgba(201,169,97,0.5)" />
    <rect x="2" y="3.5" width="14" height="21" rx="3" fill="rgba(201,169,97,0.14)" />
    <rect x="2" y="3.5" width="14" height="21" rx="3" stroke="rgba(201,169,97,0.22)" strokeWidth="0.7" />
    <rect x="5" y="7" width="8" height="3" rx="1" fill="rgba(201,169,97,0.32)" />
  </svg>
);

/* ─── Animated progress bar ──────────────────────────────────────── */
function DnaBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  return (
    <div style={{ marginBottom: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ fontSize: 9, color: 'var(--gold)', fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: '#2a2a2a', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', borderRadius: 2, background: 'var(--gold)' }}
        />
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function HeroProductMockup() {
  return (
    <div className="hero-mockup-wrap" style={{ width: '100%', maxWidth: 320 }}>
    <div style={{ position: 'relative', userSelect: 'none', width: '100%' }}>

      {/* Ambient glow — absolute inset -30px, blur 20px */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -30,
          background: 'radial-gradient(circle, var(--hero-glow-opacity), transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floating pill — top-left of wrapper (absolute top -8px, left -8px) */}
      <motion.div
        {...fadeUp(0.15)}
        style={{
          position: 'absolute',
          top: -8, left: -8,
          zIndex: 20,
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '6px 11px', borderRadius: 20,
          background: 'var(--hero-card-bg)',
          border: '1px solid rgba(201,169,97,0.3)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}
      >
        <Sparkles size={9} color="var(--gold)" />
        <span style={{ fontSize: 10, color: 'var(--gold)' }}>ניתוח AI הושלם</span>
      </motion.div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: 14,
          background: 'var(--hero-card-bg)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: 14,
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {/* Top edge shimmer */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent 5%, rgba(201,169,97,0.35) 40%, rgba(201,169,97,0.35) 60%, transparent 95%)',
            borderRadius: '14px 14px 0 0',
          }}
        />

        {/* ── Mini header ──────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingBottom: 10, marginBottom: 10,
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <Share2 size={11} color="var(--text-faint)" />
          <span style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 10, letterSpacing: 3, color: 'var(--gold)',
          }}>
            SCENTORY
          </span>
          <ArrowRight size={11} color="var(--text-faint)" />
        </div>

        {/* ── DNA card ─────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            background: `linear-gradient(135deg, var(--dna-gradient-start), var(--dna-gradient-end))`,
            border: '1px solid rgba(201,169,97,0.15)',
            borderRadius: 8, padding: '10px 12px', marginBottom: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
            <Brain size={13} color="var(--gold)" />
            <span style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: '0.05em' }}>
              ה-DNA הריחני שלך
            </span>
          </div>
          <p style={{
            fontSize: 12, fontWeight: 500,
            color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.2,
          }}>
            אספן של ניחוחות חמים
          </p>
          <DnaBar label="אמברה" pct={92} delay={0.6} />
          <DnaBar label="עץ / עוד" pct={78} delay={0.75} />
        </motion.div>

        {/* ── Match #1 — Featured ───────────────────────────── */}
        <motion.div
          {...fadeUp(0.45)}
          style={{
            position: 'relative',
            border: '1.5px solid var(--gold)',
            borderRadius: 10,
            background: 'linear-gradient(180deg, #1a1410, #0a0a0a)',
            padding: '10px 11px',
            marginBottom: 7,
            overflow: 'hidden',
          }}
        >
          {/* Badge top-right: "96% התאמה" */}
          <div style={{
            position: 'absolute', top: 9, left: 9,
            background: 'var(--gold)', color: '#050505',
            fontSize: 8, fontWeight: 700,
            padding: '2px 6px', borderRadius: 100, lineHeight: 1.5,
          }}>
            96% התאמה
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
            {/* Bottle 38×50 */}
            <div style={{
              width: 38, height: 50, flexShrink: 0, borderRadius: 8,
              background: 'linear-gradient(155deg, rgba(201,169,97,0.28) 0%, rgba(139,90,43,0.18) 100%)',
              border: '1px solid rgba(201,169,97,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BottleLg />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 8, color: 'var(--text-faint)', marginBottom: 3, letterSpacing: '0.05em' }}>
                MFK
              </p>
              <p style={{
                fontSize: 11, fontWeight: 700,
                color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 6,
              }}>
                Baccarat Rouge 540
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>1,580&#8362;</span>
                <span style={{ fontSize: 9, color: 'var(--text-faint)', textDecoration: 'line-through' }}>
                  1,890&#8362;
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 2 small match cards ───────────────────────────── */}
        {[
          { pct: '94%', house: 'Tom Ford', name: 'Tobacco Vanille', price: '1,500' },
          { pct: '91%', house: 'Tom Ford', name: 'Oud Wood', price: '1,500' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            {...fadeUp(0.55 + i * 0.1)}
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              background: 'var(--hero-small-card-bg)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 8, padding: '7px 9px',
              marginBottom: i === 0 ? 6 : 0,
            }}
          >
            <div style={{
              width: 28, height: 36, flexShrink: 0, borderRadius: 6,
              background: 'linear-gradient(155deg, rgba(201,169,97,0.14), rgba(201,169,97,0.04))',
              border: '1px solid rgba(201,169,97,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BottleSm />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 8, color: 'var(--text-faint)', marginBottom: 2 }}>{item.house}</p>
              <p style={{
                fontSize: 10, fontWeight: 500, color: 'var(--text-secondary)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {item.name}
              </p>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'left' }}>
              <p style={{ fontSize: 8, fontWeight: 700, color: 'var(--gold)', marginBottom: 2 }}>
                {item.pct}
              </p>
              <p style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-primary)' }}>
                {item.price}&#8362;
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
    </div>
  );
}
