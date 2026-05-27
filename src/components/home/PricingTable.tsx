'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const FEATURES = [
  'שאלון טעמים מלא',
  'ניתוח AI מתוך 1,000+ בשמים',
  'עשר המלצות אישיות',
  'השוואת מחירים',
  'היסטוריית חיפושים',
];

const PLANS = [
  {
    id: 'discovery', name: 'גילוי', price: 49,
    features: [true, true, false, false, false],
    highlight: false,
    cta: 'התחל',
  },
  {
    id: 'collector', name: 'אספן', price: 99,
    features: [true, true, true, true, false],
    highlight: true,
    badge: 'פופולרי',
    cta: 'בחר אספן',
  },
  {
    id: 'expert', name: 'מומחה', price: 199,
    features: [true, true, true, true, true],
    highlight: false,
    cta: 'בחר מומחה',
  },
];

/* ── Desktop table layout ────────────────────────────────────── */
function DesktopTable() {
  return (
    <div className="table-wrap">
      <table style={{
        width: '100%', minWidth: 540,
        borderCollapse: 'collapse', borderRadius: 12,
        border: '1px solid var(--border-default)',
        background: 'var(--bg-card)', overflow: 'hidden',
      }}>
        <thead>
          <tr>
            <th style={{ padding: '14px 16px', fontSize: 11, color: 'var(--text-faint)', fontWeight: 400, borderBottom: '1px solid var(--border-default)', textAlign: 'right' }}>
              פיצ׳ר
            </th>
            {PLANS.map(p => (
              <th key={p.id} style={{
                padding: '14px 16px', textAlign: 'center',
                borderBottom: '1px solid var(--border-default)',
                background: p.highlight ? 'rgba(201,169,97,0.06)' : 'transparent',
                position: 'relative',
              }}>
                {p.badge && (
                  <div style={{
                    position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--gold)', color: '#050505',
                    fontSize: 8, fontWeight: 700, padding: '2px 8px', borderRadius: 100,
                  }}>
                    {p.badge}
                  </div>
                )}
                <div style={{ paddingTop: p.badge ? 8 : 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: p.highlight ? 'var(--gold)' : 'var(--text-primary)', margin: '0 0 2px' }}>
                    {p.name}
                  </p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: p.highlight ? 'var(--gold)' : 'var(--text-primary)', margin: 0 }}>
                    {p.price}&#8362;
                    <span style={{ fontSize: 10, fontWeight: 400, color: 'var(--text-faint)' }}>/חודש</span>
                  </p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((feat, fi) => (
            <tr key={feat} style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '11px 16px', fontSize: 12, color: 'var(--text-secondary)' }}>
                {feat}
              </td>
              {PLANS.map(p => (
                <td key={p.id} style={{
                  padding: '11px 16px', textAlign: 'center',
                  background: p.highlight ? 'rgba(201,169,97,0.04)' : 'transparent',
                }}>
                  {p.features[fi]
                    ? <span style={{ color: 'var(--gold-text)', fontSize: 14 }}>✓</span>
                    : <span style={{ color: 'var(--text-faint)', fontSize: 14 }}>✗</span>
                  }
                </td>
              ))}
            </tr>
          ))}
          {/* CTA row */}
          <tr style={{ borderTop: '1px solid var(--border-default)' }}>
            <td style={{ padding: '14px 16px' }} />
            {PLANS.map(p => (
              <td key={p.id} style={{
                padding: '14px 16px', textAlign: 'center',
                background: p.highlight ? 'rgba(201,169,97,0.04)' : 'transparent',
              }}>
                <Link
                  href="/quiz"
                  style={{
                    display: 'inline-block',
                    fontSize: 12, fontWeight: 500,
                    padding: '8px 16px', borderRadius: 6,
                    background: p.highlight ? 'var(--gold)' : 'transparent',
                    color: p.highlight ? '#050505' : 'var(--text-secondary)',
                    border: p.highlight ? 'none' : '1px solid var(--border-default)',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                >
                  {p.cta}
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ── Mobile card layout ──────────────────────────────────────── */
function MobileCards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {PLANS.map(p => (
        <div
          key={p.id}
          style={{
            borderRadius: 12, padding: '20px',
            border: p.highlight ? '1.5px solid var(--gold)' : '1px solid var(--border-default)',
            background: p.highlight ? 'rgba(201,169,97,0.04)' : 'var(--bg-card)',
            position: 'relative',
          }}
        >
          {p.badge && (
            <div style={{
              position: 'absolute', top: -10, right: 16,
              background: 'var(--gold)', color: '#050505',
              fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
            }}>
              {p.badge}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, color: p.highlight ? 'var(--gold)' : 'var(--text-primary)', margin: '0 0 2px' }}>
                {p.name}
              </p>
              <p style={{ fontSize: 11, color: 'var(--text-faint)', margin: 0 }}>7 ימי ניסיון חינם</p>
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: p.highlight ? 'var(--gold)' : 'var(--text-primary)' }}>
                {p.price}&#8362;
              </span>
              <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>/חודש</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {FEATURES.map((f, fi) => p.features[fi] && (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--gold-text)', fontSize: 11, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{f}</span>
              </div>
            ))}
          </div>
          <Link
            href="/quiz"
            style={{
              display: 'block', textAlign: 'center',
              fontSize: 13, fontWeight: 500,
              padding: '11px 0', borderRadius: 8,
              background: p.highlight ? 'var(--gold)' : 'transparent',
              color: p.highlight ? '#050505' : 'var(--text-secondary)',
              border: p.highlight ? 'none' : '1px solid var(--border-default)',
              textDecoration: 'none',
            }}
          >
            {p.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function PricingTable() {
  return (
    <section id="pricing" className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-inner">

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px' }}>
            בחר את הרמה שלך<span style={{ color: 'var(--gold-text)' }}>.</span>
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text-faint)', margin: 0 }}>
            7 ימי ניסיון · ללא כרטיס אשראי
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hide-mobile"><DesktopTable /></div>
          <div className="hide-desktop"><MobileCards /></div>
        </motion.div>
      </div>
    </section>
  );
}
