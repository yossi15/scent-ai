'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const FEATURES = [
  { label: 'שאלון התאמה',              discovery: 'בסיסי',          collector: 'מעמיק · 9 שאלות',    expert: 'מותאם יד' },
  { label: 'התאמות לחודש',             discovery: '5',              collector: '20',                  expert: 'ללא הגבלה' },
  { label: 'הסברי "למה זה אתה"',        discovery: false,            collector: true,                  expert: 'מורחבים' },
  { label: 'השוואת מחירים',            discovery: false,            collector: true,                  expert: true },
  { label: 'חיפוש בקטלוג',             discovery: true,             collector: true,                  expert: true },
  { label: 'מעקב מלאי וטרום-שחרור',   discovery: false,            collector: 'בסיסי',               expert: 'מלא' },
  { label: 'ייעוץ אישי עם מומחה',     discovery: false,            collector: false,                  expert: 'שיחה חודשית' },
];

const PLANS = [
  { id: 'discovery', name: 'גילוי',   price: 49,  highlight: false, badge: null,      cta: 'התחל ניסיון', key: 'discovery' },
  { id: 'collector', name: 'אספן',   price: 99,  highlight: true,  badge: 'פופולרי', cta: 'התחל ניסיון', key: 'collector' },
  { id: 'expert',    name: 'מומחה',  price: 199, highlight: false, badge: null,      cta: 'התחל ניסיון', key: 'expert' },
];

type FeatureVal = boolean | string;

function FeatureCell({ val, highlight }: { val: FeatureVal; highlight: boolean }) {
  const base: React.CSSProperties = {
    padding: '18px 20px', textAlign: 'center',
    background: highlight ? 'var(--gold-faint)' : 'transparent',
    verticalAlign: 'middle', fontSize: 13.5,
  };

  if (val === true) return (
    <td style={base}>
      <span aria-hidden="true" style={{ color: 'var(--gold)', fontWeight: 600 }}>✓</span>
      <span className="sr-only">כלול</span>
    </td>
  );
  if (val === false) return (
    <td style={base}>
      <span aria-hidden="true" style={{ color: 'var(--text-dim, var(--text-faint))' }}>-</span>
      <span className="sr-only">לא כלול</span>
    </td>
  );
  return (
    <td style={base}>
      <span style={{ fontSize: 12.5, color: highlight ? 'var(--gold)' : 'var(--text-secondary)', fontWeight: highlight ? 600 : 400 }}>
        {val}
      </span>
    </td>
  );
}

/* ── Desktop table ──────────────────────────────────────────── */
function DesktopTable() {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-2, var(--border-default))',
        borderRadius: 3, overflow: 'hidden',
      }}
      className="table-wrap"
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <caption className="sr-only">השוואת מסלולי המנוי של SCENTORY - גילוי, אספן ומומחה</caption>
        <thead>
          <tr>
            <th scope="col" style={{
              padding: 'var(--s3) 20px', textAlign: 'right',
              fontSize: 13.5, color: 'var(--text-muted)', fontWeight: 400,
              borderBottom: '1px solid var(--border-default)',
            }}>תכונה</th>
            {PLANS.map(p => (
              <th key={p.id} scope="col" style={{
                padding: 'var(--s3) 20px', textAlign: 'center',
                borderBottom: '1px solid var(--border-default)',
                background: p.highlight ? 'var(--gold-faint)' : 'transparent',
                position: 'relative',
              }}>
                {p.badge && (
                  <span style={{
                    display: 'inline-block', marginBottom: 6,
                    fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--gold)', fontWeight: 600,
                  }}>
                    {p.badge}
                  </span>
                )}
                <div style={{ paddingTop: p.badge ? 0 : 8 }}>
                  <p style={{
                    fontFamily: 'var(--serif, Georgia, serif)',
                    fontSize: 14, letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'var(--text-primary)', margin: '0 0 10px',
                  }}>{p.name}</p>
                  <p style={{
                    fontSize: 30, fontWeight: 700, color: 'var(--text-primary)',
                    margin: 0, lineHeight: 1, letterSpacing: '-0.02em',
                  }}>
                    {p.price}
                    <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--text-muted)', marginRight: 2 }}>
                      &#8362;/חודש
                    </span>
                  </p>
                  <div style={{ marginTop: 'var(--s2)' }}>
                    <Link
                      href="/quiz"
                      style={{
                        display: 'inline-block',
                        fontSize: 13, fontWeight: 500,
                        padding: '10px 18px', borderRadius: 2,
                        background: p.highlight ? 'var(--gold)' : 'transparent',
                        color: p.highlight ? '#1a1410' : 'var(--text-secondary)',
                        border: p.highlight ? '1px solid var(--gold)' : '1px solid var(--border-strong, var(--border-default))',
                        textDecoration: 'none',
                        transition: 'all 200ms',
                      }}
                    >
                      {p.cta}
                    </Link>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((feat, fi) => (
            <tr key={feat.label} style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <th scope="row" style={{ padding: '18px 20px', fontSize: 13.5, color: 'var(--text-primary)', fontWeight: 500, textAlign: 'right' }}>
                {feat.label}
              </th>
              <FeatureCell val={feat.discovery} highlight={false} />
              <FeatureCell val={feat.collector} highlight={true} />
              <FeatureCell val={feat.expert}    highlight={false} />
            </tr>
          ))}
        </tbody>
      </table>

      {/* Trial row */}
      <div style={{
        textAlign: 'center', padding: 18,
        fontSize: 12.5, color: 'var(--text-muted)',
        background: 'var(--bg-card-2, var(--bg-elevated))',
        letterSpacing: '0.01em',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>7 ימי ניסיון חינם.</strong>
        {' '}בלי כרטיס אשראי. בלי התחייבות.
      </div>
    </div>
  );
}

/* ── Mobile cards ───────────────────────────────────────────── */
function MobileCards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {PLANS.map(p => (
        <div
          key={p.id}
          style={{
            borderRadius: 3, padding: 20,
            border: p.highlight ? '1.5px solid var(--gold-soft)' : '1px solid var(--border-2, var(--border-default))',
            background: p.highlight ? 'var(--gold-faint)' : 'var(--bg-card)',
            position: 'relative',
          }}
        >
          {p.badge && (
            <span style={{
              position: 'absolute', top: -10, right: 16,
              background: 'var(--gold)', color: '#1a1410',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '3px 8px',
            }}>
              {p.badge}
            </span>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <p style={{
                fontFamily: 'var(--serif)', fontSize: 15,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--text-primary)', margin: '0 0 4px',
              }}>{p.name}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>7 ימי ניסיון חינם</p>
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>{p.price}&#8362;</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>/חודש</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {FEATURES.map(f => {
              const val = f[p.key as keyof typeof f] as FeatureVal;
              if (val === false) return null;
              return (
                <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span aria-hidden="true" style={{ color: 'var(--gold)', fontSize: 12, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
                    {f.label}{val !== true ? `: ${val}` : ''}
                  </span>
                </div>
              );
            })}
          </div>
          <Link
            href="/quiz"
            style={{
              display: 'block', textAlign: 'center',
              fontSize: 13, fontWeight: 500,
              padding: '11px 0', borderRadius: 2,
              background: p.highlight ? 'var(--gold)' : 'transparent',
              color: p.highlight ? '#1a1410' : 'var(--text-secondary)',
              border: p.highlight ? 'none' : '1px solid var(--border-2, var(--border-default))',
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
    <section
      id="pricing"
      style={{ padding: 'var(--s7) var(--s3)' }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>

        {/* Section head */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--s7)', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          <span style={{
            fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'var(--gold)', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span aria-hidden="true" style={{ width: 18, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
            מסלולים
          </span>
          <h2 className="ed-h" style={{ fontSize: 'clamp(26px, 3vw, 40px)' }}>
            בחר את הרמה שלך.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15.5, maxWidth: 540, margin: 0, lineHeight: 1.65 }}>
            7 ימי ניסיון חינם. ללא כרטיס אשראי. ניתן לבטל בכל רגע.
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
