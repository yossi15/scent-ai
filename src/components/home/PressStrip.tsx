'use client';

import { motion } from 'framer-motion';

const STATS = [
  { value: '1,000+', label: 'בשמים בקטלוג',     sub: 'מ-300+ בתי בושם עולמיים' },
  { value: '96%',    label: 'דיוק ממוצע',        sub: 'התאמה ראשונה' },
  { value: '3 דק׳',  label: 'זמן ממוצע לשאלון', sub: 'תשע שאלות בלבד' },
  { value: '10',     label: 'המלצות אישיות',     sub: 'עם הסבר לכל אחת' },
];

export default function PressStrip() {
  return (
    <div
      style={{
        background: '#070707',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: 'clamp(20px, 3vw, 28px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 0,
        }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.value}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(16px, 2.5vw, 24px) 16px',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: 'clamp(22px, 2.8vw, 30px)',
                fontWeight: 400,
                color: 'var(--gold)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginTop: 4,
              }}
            >
              {stat.label}
            </span>
            <span
              style={{
                fontSize: 10,
                color: 'var(--text-faint)',
                textAlign: 'center',
              }}
            >
              {stat.sub}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
