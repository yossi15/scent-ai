'use client';

import { motion } from 'framer-motion';

export default function WhatIsScentory() {
  return (
    <section
      style={{
        background: 'var(--bg-elev)',
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
        padding: 'var(--s10) var(--s3)',
        position: 'relative',
      }}
    >
      <motion.div
        className="ed-intro-grid"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Lead — headline anchored right in RTL */}
        <div className="ed-intro-lead">
          <span
            style={{
              fontSize: 10.5,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span aria-hidden="true" style={{ width: 18, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
            מה זה SCENTORY
          </span>
          <h2 className="ed-h">היועץ האישי שלך לבשמים.</h2>
        </div>

        {/* Body drops down for editorial tension */}
        <div className="ed-intro-body">
          <p>
            לא חנות. לא מאגר ביקורות.{' '}
            <bdi>SCENTORY</bdi> הוא{' '}
            <bdi>AI</bdi> שמכיר אותך — ומעל 1,000 בשמים — ומסביר בדיוק
            למה כל בושם מתאים לך. כמו יועץ בבוטיק נישה, רק שהוא זמין תמיד
            ולא מנסה למכור לך כלום. אתה עדיין תריח לפני שתקנה —
            רק לא תנחש איפה להתחיל.
          </p>
        </div>
      </motion.div>

      {/* Pillars — numbered index row divided by hairline rules */}
      <ol className="ed-pillars">
        {[
          { num: '01', label: 'מכיר אותך' },
          { num: '02', label: 'מכיר 1,000+ בשמים' },
          { num: '03', label: 'מסביר למה' },
        ].map((p, i) => (
          <motion.li
            key={p.num}
            className="ed-pillar"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="ed-pillar-num">{p.num}</span>
            <span className="ed-pillar-label">{p.label}</span>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
