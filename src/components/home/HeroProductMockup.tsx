'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

/* ─── Bottle SVGs ────────────────────────────────────────────────── */
const BottleLg = () => (
  <svg width="22" height="36" viewBox="0 0 22 36" fill="none" aria-hidden="true">
    <rect x="7.5" y="0" width="7" height="4" rx="1.5" fill="rgba(201,169,97,0.6)" />
    <rect x="4.5" y="3.5" width="13" height="1.5" rx="0.75" fill="rgba(201,169,97,0.35)" />
    <rect x="2" y="5" width="18" height="28" rx="3" fill="rgba(201,169,97,0.18)" />
    <rect x="2" y="5" width="18" height="28" rx="3" stroke="rgba(201,169,97,0.3)" strokeWidth="0.75" />
    <rect x="5" y="8" width="12" height="3.5" rx="1" fill="rgba(201,169,97,0.38)" />
    <rect x="6" y="14" width="10" height="0.75" rx="0.375" fill="rgba(201,169,97,0.18)" />
    <rect x="6" y="17" width="10" height="0.75" rx="0.375" fill="rgba(201,169,97,0.13)" />
    <rect x="6" y="20" width="7"  height="0.75" rx="0.375" fill="rgba(201,169,97,0.1)" />
  </svg>
);

const BottleSm = () => (
  <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true">
    <rect x="4.5" y="0" width="5" height="3" rx="1" fill="rgba(201,169,97,0.55)" />
    <rect x="1.5" y="3" width="11" height="17" rx="2.5" fill="rgba(201,169,97,0.16)" />
    <rect x="1.5" y="3" width="11" height="17" rx="2.5" stroke="rgba(201,169,97,0.25)" strokeWidth="0.6" />
    <rect x="3.5" y="5" width="7" height="2.5" rx="0.8" fill="rgba(201,169,97,0.35)" />
  </svg>
);

/* ─── Animation presets ──────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease },
});

/* ─── Animated bar ───────────────────────────────────────────────── */
function DnaBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ fontSize: 9, color: 'var(--gold)', fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))' }}
        />
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function HeroProductMockup() {
  return (
    <div style={{ position: 'relative', userSelect: 'none', width: '100%', maxWidth: 340 }}>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -48,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,169,97,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(2px)',
        }}
      />

      {/* Floating pill — top */}
      <motion.div
        {...fadeUp(0.15)}
        style={{
          position: 'absolute',
          top: -14,
          right: -10,
          zIndex: 20,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          borderRadius: 100,
          background: 'var(--bg-card)',
          border: '1px solid rgba(201,169,97,0.35)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
        }}
      >
        <span
          className="animate-gold-pulse"
          style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }}
        />
        <Sparkles size={9} color="var(--gold)" />
        <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontWeight: 500 }}>ניתוח AI הושלם</span>
      </motion.div>

      {/* Main card shell */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        style={{
          position: 'relative',
          borderRadius: 18,
          overflow: 'hidden',
          background: 'linear-gradient(160deg, #111 0%, #0a0a0a 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          padding: 16,
          boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Subtle top-edge gold shimmer */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent 5%, rgba(201,169,97,0.4) 40%, rgba(201,169,97,0.4) 60%, transparent 95%)',
          }}
        />

        {/* Mini nav row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, padding: '0 2px' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#3d3d3d', '#3d3d3d', '#3d3d3d'].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 10, letterSpacing: 3, color: 'var(--gold)' }}>
            SCENTORY
          </span>
          <div style={{ width: 38 }} />
        </div>

        {/* ── DNA Card ─────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            background: 'linear-gradient(135deg, rgba(201,169,97,0.12) 0%, rgba(201,169,97,0.04) 100%)',
            border: '1px solid rgba(201,169,97,0.18)',
            borderRadius: 12,
            padding: '12px 14px',
            marginBottom: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <Brain size={11} color="var(--gold)" />
            <span style={{ fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
              ה-DNA הריחני שלך
            </span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.2 }}>
            אספן של ניחוחות חמים
          </p>
          <DnaBar label="אמברה"  pct={92} delay={0.6} />
          <DnaBar label="עץ / עוד" pct={78} delay={0.75} />
        </motion.div>

        {/* ── Match #1 — Featured ───────────────────────────── */}
        <motion.div
          {...fadeUp(0.45)}
          style={{
            position: 'relative',
            border: '1.5px solid var(--gold)',
            borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(201,169,97,0.08) 0%, var(--bg-card) 60%)',
            padding: '11px 12px',
            marginBottom: 8,
            overflow: 'hidden',
          }}
        >
          {/* Gold edge shimmer */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(201,169,97,0.6), transparent)',
            }}
          />

          {/* Match % badge */}
          <div style={{
            position: 'absolute', top: 10, left: 10,
            background: 'var(--gold)', color: '#050505',
            fontSize: 8, fontWeight: 700,
            padding: '2px 7px', borderRadius: 100, lineHeight: 1.5,
          }}>
            96%
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 58, flexShrink: 0, borderRadius: 8,
              background: 'linear-gradient(155deg, rgba(201,169,97,0.3) 0%, rgba(201,169,97,0.08) 100%)',
              border: '1px solid rgba(201,169,97,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BottleLg />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 3, letterSpacing: '0.05em' }}>MFK</p>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 6 }}>
                Baccarat Rouge 540
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold)' }}>1,580&#8362;</span>
                <span style={{ fontSize: 9, color: 'var(--text-faint)', textDecoration: 'line-through' }}>1,890&#8362;</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Compact match cards ───────────────────────────── */}
        {[
          { pct: '94%', house: 'Tom Ford', name: 'Tobacco Vanille', price: '1,500' },
          { pct: '91%', house: 'Tom Ford', name: 'Oud Wood',        price: '1,500' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            {...fadeUp(0.55 + i * 0.12)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 10, padding: '8px 10px',
              marginBottom: i === 0 ? 6 : 0,
            }}
          >
            <div style={{
              width: 30, height: 40, flexShrink: 0, borderRadius: 6,
              background: 'linear-gradient(155deg, rgba(201,169,97,0.14) 0%, rgba(201,169,97,0.03) 100%)',
              border: '1px solid rgba(201,169,97,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BottleSm />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 8, color: 'var(--text-faint)', marginBottom: 2 }}>{item.house}</p>
              <p style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.name}
              </p>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'left' }}>
              <p style={{ fontSize: 8, fontWeight: 700, color: 'var(--gold)', marginBottom: 2 }}>{item.pct}</p>
              <p style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-primary)' }}>{item.price}&#8362;</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating pill — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9, ease }}
        style={{
          position: 'absolute',
          bottom: -12,
          left: 0,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 10px',
          borderRadius: 100,
          background: 'var(--bg-card)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}
      >
        <span style={{ fontSize: 9, color: 'var(--text-faint)' }}>מתוך</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)' }}>מעל 1,000 בשמים</span>
      </motion.div>
    </div>
  );
}
