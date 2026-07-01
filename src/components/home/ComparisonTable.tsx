'use client';

import { motion } from 'framer-motion';

const ROWS = [
  {
    feature: 'המלצות מותאמות אישית',
    scentory: { yes: true,  note: 'AI אישי' },
    fragrantica: { yes: false, note: 'דירוגי קהל' },
    store: { partial: true, note: 'ניסיון מוכר' },
  },
  {
    feature: 'הסבר "למה זה אתה"',
    scentory: { yes: true,  note: 'לכל המלצה' },
    fragrantica: { yes: false, note: '' },
    store: { yes: false, note: '' },
  },
  {
    feature: 'השוואת מחירים בין ספקים',
    scentory: { yes: true,  note: 'מספקים שונים' },
    fragrantica: { partial: true, note: 'חלקי' },
    store: { yes: false, note: '' },
  },
  {
    feature: 'קטלוג בעברית מלא',
    scentory: { yes: true,  note: '' },
    fragrantica: { yes: false, note: 'אנגלית' },
    store: { partial: true, note: 'חלקי' },
  },
  {
    feature: 'זיכרון פרופיל לאורך זמן',
    scentory: { yes: true,  note: 'לומד אותך' },
    fragrantica: { partial: true, note: 'ידני' },
    store: { yes: false, note: '' },
  },
  {
    feature: 'זמן עד להמלצה',
    scentory: { text: '3 דקות' },
    fragrantica: { text: 'שעות של גלילה' },
    store: { text: 'נסיעה לקניון' },
  },
];

type CellVal = { yes?: boolean; partial?: boolean; note?: string; text?: string };

function Cell({ val }: { val: CellVal }) {
  if (val.text) {
    return (
      <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 500 }}>
        {val.text}
      </span>
    );
  }
  if (val.partial) {
    return (
      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        <span aria-hidden="true">◐</span>
        <span className="sr-only">חלקי</span>
        {val.note ? <span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 4 }}> {val.note}</span> : null}
      </span>
    );
  }
  return val.yes
    ? (
      <span>
        <span aria-hidden="true" style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 600 }}>✓</span>
        <span className="sr-only">כלול</span>
        {val.note && <span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 6 }}> {val.note}</span>}
      </span>
    )
    : (
      <span>
        <span aria-hidden="true" style={{ color: 'var(--text-dim, var(--text-faint))', fontSize: 14 }}>✗</span>
        <span className="sr-only">לא כלול</span>
      </span>
    );
}

export default function ComparisonTable() {
  return (
    <section
      style={{
        padding: 'var(--s7) var(--s3)',
        background: 'var(--bg-elev, var(--bg-secondary))',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>

        {/* Section head */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--s7)', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          <span style={{
            fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'var(--gold)', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 18, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
            השוואה
          </span>
          <h2 className="ed-h" style={{ fontSize: 'clamp(26px, 3vw, 40px)' }}>
            SCENTORY מול האלטרנטיבות.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15.5, maxWidth: 540, margin: 0, lineHeight: 1.65 }}>
            ההבדל בין המלצות שלוקחות אותך ברצינות, לבין דירוג של 800 אנשים שלא מכירים אותך.
          </p>
        </div>

        {/* Outer wrapper handles mobile scroll; inner card handles border-radius */}
        <div className="table-wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-2, var(--border-default))',
            borderRadius: 3, overflow: 'hidden',
            minWidth: 480,
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <caption className="sr-only">השוואת תכונות בין SCENTORY, Fragrantica וחנות בקניון</caption>
            <thead>
              <tr>
                <th scope="col" style={{
                  padding: '18px 20px', textAlign: 'right',
                  fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'var(--text-muted)', fontWeight: 500,
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingTop: 'var(--s3)', paddingBottom: 'var(--s3)',
                }}>תכונה</th>
                {[
                  { label: 'SCENTORY', gold: true },
                  { label: 'Fragrantica', gold: false },
                  { label: 'חנות בקניון', gold: false },
                ].map(col => (
                  <th key={col.label} scope="col" style={{
                    padding: '18px 20px', textAlign: 'center',
                    borderBottom: '1px solid var(--border-subtle)',
                    background: col.gold ? 'var(--gold-faint)' : 'transparent',
                    paddingTop: 'var(--s3)', paddingBottom: 'var(--s3)',
                    ...(col.gold ? {
                      color: 'var(--gold)',
                      fontFamily: 'var(--serif, Georgia, serif)',
                      fontSize: 15, letterSpacing: '0.22em', fontWeight: 400,
                    } : {
                      fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase',
                      color: 'var(--text-muted)', fontWeight: 500,
                    }),
                  }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.feature} style={{ borderBottom: i < ROWS.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <th scope="row" style={{
                    padding: '18px 20px', fontSize: 14,
                    color: 'var(--text-primary)', fontWeight: 500,
                    verticalAlign: 'middle', textAlign: 'right',
                  }}>{row.feature}</th>
                  <td style={{ padding: '18px 20px', textAlign: 'center', background: 'var(--gold-faint)', verticalAlign: 'middle' }}>
                    <Cell val={row.scentory as CellVal} />
                  </td>
                  <td style={{ padding: '18px 20px', textAlign: 'center', verticalAlign: 'middle' }}>
                    <Cell val={row.fragrantica as CellVal} />
                  </td>
                  <td style={{ padding: '18px 20px', textAlign: 'center', verticalAlign: 'middle' }}>
                    <Cell val={row.store as CellVal} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        </div>{/* /table-wrap */}
      </div>{/* /maxWidth */}
    </section>
  );
}
