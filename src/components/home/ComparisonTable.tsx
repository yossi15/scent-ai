'use client';

import { motion } from 'framer-motion';

const ROWS = [
  { feature: 'המלצות מותאמות אישית', scentory: true,  fragrantica: false, store: 'דעת המוכר' },
  { feature: 'הסבר "למה" לכל בושם',  scentory: true,  fragrantica: false, store: false },
  { feature: 'השוואת מחירים',         scentory: true,  fragrantica: false, store: false },
  { feature: 'קטלוג בעברית',          scentory: true,  fragrantica: false, store: true },
];

function Cell({ val }: { val: boolean | string }) {
  if (typeof val === 'string') {
    return <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{val}</span>;
  }
  return val
    ? <span style={{ color: 'var(--gold)', fontSize: 14 }}>✓</span>
    : <span style={{ color: 'var(--text-faint)', fontSize: 14 }}>✗</span>;
}

const TH = ({ children, gold }: { children: React.ReactNode; gold?: boolean }) => (
  <th style={{
    padding: '12px 16px', textAlign: 'center',
    fontSize: 11, fontWeight: 600,
    color: gold ? 'var(--gold)' : 'var(--text-tertiary)',
    borderBottom: '1px solid var(--border-default)',
    background: gold ? 'rgba(201,169,97,0.04)' : 'transparent',
    whiteSpace: 'nowrap',
  }}>
    {children}
  </th>
);

export default function ComparisonTable() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-primary)' }}>
      <div className="section-inner">

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            SCENTORY מול האלטרנטיבות<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </div>

        {/* Scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="table-wrap"
        >
          <table style={{
            width: '100%', minWidth: 480,
            borderCollapse: 'collapse',
            borderRadius: 12, overflow: 'hidden',
            border: '1px solid var(--border-default)',
            background: 'var(--bg-card)',
          }}>
            <thead>
              <tr>
                <TH>פיצ׳ר</TH>
                <TH gold>SCENTORY</TH>
                <TH>Fragrantica</TH>
                <TH>חנות בקניון</TH>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.feature} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td style={{
                    padding: '12px 16px', fontSize: 12,
                    color: 'var(--text-secondary)',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                  }}>
                    {row.feature}
                  </td>
                  <td style={{
                    padding: '12px 16px', textAlign: 'center',
                    background: 'rgba(201,169,97,0.04)',
                  }}>
                    <Cell val={row.scentory} />
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <Cell val={row.fragrantica} />
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <Cell val={row.store} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
