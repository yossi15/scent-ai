'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Share2 } from 'lucide-react';
import BottleFlacon from '@/components/svg/BottleFlacon';
import BottleRound from '@/components/svg/BottleRound';
import BottleFaceted from '@/components/svg/BottleFaceted';

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease },
});

function DnaBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontSize: 11.5, color: 'var(--gold)', fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 999, background: 'var(--border-default)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%', borderRadius: 999,
            background: 'linear-gradient(90deg, var(--gold) 0%, var(--gold-strong) 100%)',
          }}
        />
      </div>
    </div>
  );
}

export default function HeroProductMockup() {
  return (
    <div className="hero-mockup-wrap" style={{ width: '100%', maxWidth: 340, position: 'relative' }}>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: -60, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(60% 60% at 50% 40%, var(--gold-soft) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Floating top pill */}
      <motion.div
        {...fadeUp(0.15)}
        className="hero-mockup-inner"
        style={{
          position: 'absolute', top: -16, right: 24, zIndex: 10,
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '7px 13px', borderRadius: 999,
          background: 'var(--bg-elev, var(--bg-secondary))',
          border: '1px solid var(--gold-soft)',
          fontSize: 11.5, color: 'var(--gold)', fontWeight: 500,
          boxShadow: '0 12px 30px -10px rgba(0,0,0,0.6)',
        }}
      >
        <Sparkles size={10} color="var(--gold)" />
        ניתוח <bdi>AI</bdi> הושלם
      </motion.div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        className="hero-mockup-inner"
        style={{
          position: 'relative', zIndex: 1,
          borderRadius: 20,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-2, var(--border-default))',
          padding: 'var(--s3)',
          display: 'flex', flexDirection: 'column', gap: 14,
          boxShadow: 'var(--shadow-mockup)',
        }}
      >
        {/* Glossy top edge */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: '12%', right: '12%', height: 1,
            background: 'linear-gradient(90deg, transparent 0%, var(--border-strong, rgba(255,255,255,0.18)) 50%, transparent 100%)',
            borderRadius: '20px 20px 0 0',
          }}
        />

        {/* Mini header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)',
        }}>
          <Share2 size={11} color="var(--text-faint)" />
          <span style={{
            fontFamily: 'var(--serif, Georgia, serif)',
            fontSize: 10, letterSpacing: 3, color: 'var(--gold)',
          }}>
            SCENTORY
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i === 0 ? 'var(--gold)' : 'var(--border-2, var(--border-default))',
              }} />
            ))}
          </div>
        </div>

        {/* DNA card */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            background: 'var(--bg-card-2, var(--bg-elevated))',
            border: '1px solid var(--border-subtle)',
            borderRadius: 14, padding: 16,
            display: 'grid', gridTemplateColumns: '1fr', gap: 10,
          }}
        >
          <div>
            <p style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 4px', fontFamily: 'var(--sans)' }}>
              ה-<bdi>DNA</bdi> הריחני שלך
            </p>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              אספן של ניחוחות חמים
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <DnaBar label="אמברה" pct={92} delay={0.6} />
            <DnaBar label="עץ / עוד" pct={78} delay={0.75} />
          </div>
        </motion.div>

        {/* Top match — Baccarat Rouge */}
        <motion.div
          {...fadeUp(0.45)}
          style={{
            position: 'relative',
            borderRadius: 14, padding: 14,
            border: '1px solid var(--gold-soft)',
            background: 'linear-gradient(180deg, var(--gold-faint) 0%, var(--bg-card-2, var(--bg-elevated)) 100%)',
            overflow: 'hidden',
          }}
        >
          {/* Match badge — inside the card bounds (top: 8 avoids overflow:hidden clip) */}
          <div style={{
            position: 'absolute', top: 8, right: 14,
            background: 'var(--gold)', color: '#1a1410',
            padding: '4px 11px', borderRadius: 999,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
            boxShadow: '0 6px 16px -6px var(--gold-soft)',
          }}>
            96% התאמה
          </div>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 26 }}>
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BottleFlacon width={38} height={52} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 10, color: 'var(--text-muted)', margin: '0 0 3px', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--serif)' }}>
                MFK
              </p>
              <p style={{
                fontFamily: 'var(--serif, Georgia, serif)',
                fontSize: 15, color: 'var(--text-primary)', fontWeight: 400,
                letterSpacing: '0.01em', margin: '0 0 4px',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                Baccarat Rouge 540
              </p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold)' }}>1,580&#8362;</span>
                <span style={{ fontSize: 11, color: 'var(--text-faint)', textDecoration: 'line-through' }}>1,890&#8362;</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>· EDP · 70ml</span>
              </div>
            </div>
          </div>

          {/* Note pyramid */}
          <div style={{
            marginTop: 10, paddingTop: 10,
            borderTop: '1px dashed var(--border-default)',
            display: 'flex', flexDirection: 'column', gap: 3,
            fontSize: 10.5,
          }}>
            {[
              { label: 'ראש', notes: 'זעפרן · יסמין' },
              { label: 'לב',  notes: 'עץ עמברה · ארז' },
              { label: 'בסיס', notes: 'מושק לבן · ענבר' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontFamily: 'var(--serif)', fontStyle: 'italic',
                  color: 'var(--text-muted)', width: 38, fontSize: 10,
                }}>
                  {row.label}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{row.notes}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 2 smaller matches */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { pct: '94%', house: 'Tom Ford', name: 'Tobacco Vanille', price: '1,500', Bottle: BottleRound },
            { pct: '91%', house: 'Tom Ford', name: 'Oud Wood',        price: '1,500', Bottle: BottleFaceted },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              {...fadeUp(0.55 + i * 0.1)}
              style={{
                background: 'var(--bg-card-2, var(--bg-elevated))',
                border: '1px solid var(--border-subtle)',
                borderRadius: 14, padding: 12,
                display: 'flex', gap: 12, alignItems: 'center',
              }}
            >
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <item.Bottle width={22} height={30} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontFamily: 'var(--serif)', fontSize: 8.5,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'var(--text-muted)', margin: '0 0 2px',
                }}>
                  {item.house}
                </p>
                <p style={{
                  fontSize: 13.5, color: 'var(--text-primary)', margin: '0 0 2px',
                  fontFamily: 'var(--serif)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {item.name}
                </p>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>{item.pct}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.price}&#8362;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom pill */}
        <div style={{
          alignSelf: 'center',
          background: 'var(--bg-card-2, var(--bg-elevated))',
          border: '1px solid var(--border-subtle)',
          borderRadius: 999, padding: '6px 14px',
          fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.02em',
        }}>
          מתוך מעל 1,000 בשמים בקטלוג
        </div>
      </motion.div>
    </div>
  );
}
