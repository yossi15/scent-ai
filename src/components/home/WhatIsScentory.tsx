'use client';

import { motion } from 'framer-motion';

const PILLARS = [
  { num: '01', label: 'מכיר אותך' },
  { num: '02', label: 'מכיר 1,000+ בשמים' },
  { num: '03', label: 'מסביר למה' },
];

export default function WhatIsScentory() {
  return (
    <section
      style={{
        background: 'var(--bg-elev)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: 'var(--s10) var(--s3)',
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          alignItems: 'center',
          maxWidth: 720,
          margin: '0 auto',
        }}
      >
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
          <span
            aria-hidden="true"
            style={{ width: 18, height: 1, background: 'var(--gold)', display: 'inline-block' }}
          />
          מה זה SCENTORY
        </span>

        <h2
          style={{
            fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            margin: 0,
            color: 'var(--text-primary)',
          }}
        >
          היועץ האישי שלך לבשמים.
        </h2>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.75,
            color: 'var(--text-secondary)',
            maxWidth: 600,
            margin: 0,
          }}
        >
          לא חנות. לא מאגר ביקורות.{' '}
          <bdi>SCENTORY</bdi> הוא{' '}
          <bdi>AI</bdi> שמכיר אותך — ומעל 1,000 בשמים — ומסביר בדיוק
          למה כל בושם מתאים לך. כמו יועץ בבוטיק נישה, רק שהוא זמין תמיד
          ולא מנסה למכור לך כלום.
        </p>
      </motion.div>

      {/* Pillars */}
      <div
        style={{
          maxWidth: 820,
          margin: 'var(--s7) auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--s3)',
        }}
        className="pillars-responsive"
      >
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              textAlign: 'center',
              padding: 'var(--s3) var(--s2)',
              borderTop: '1px solid var(--border-default)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 11,
                color: 'var(--gold)',
                letterSpacing: '0.22em',
              }}
            >
              {p.num}
            </span>
            <span
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 18,
                fontWeight: 400,
                color: 'var(--text-primary)',
                letterSpacing: '0.01em',
              }}
            >
              {p.label}
            </span>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pillars-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
