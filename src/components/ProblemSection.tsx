'use client';

import { motion } from 'framer-motion';

const STATS = [
  {
    num: '1,500+',
    unit: '₪',
    label: 'עלות ממוצעת לבקבוק נישה',
    sub: 'על בושם אחד בלבד',
  },
  {
    num: '60%',
    unit: '',
    label: 'מהבקבוקים מאכזבים',
    sub: 'אחרי הקנייה הביתה',
  },
  {
    num: '0',
    unit: '',
    label: 'דרך לדעת מראש',
    sub: 'אם הוא יתאים לך — עד עכשיו',
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ProblemSection() {
  return (
    <section
      className="py-28 px-6"
      style={{ background: 'var(--bg-secondary)' }}
      aria-labelledby="problem-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '9px',
              fontWeight: 400,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              marginBottom: '16px',
            }}
          >
            הבעיה
          </p>
          <h2
            id="problem-heading"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: 'var(--ink)',
            }}
          >
            כסף שהולך לאיבוד במגירה
          </h2>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ border: '1px solid var(--border)' }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12, ease }}
              style={{
                background: 'var(--bg-dark, #0F0F0E)',
                padding: '48px 40px',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              {/* Big number */}
              <div
                className="mb-4 flex items-start gap-1"
                dir="ltr"
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
              >
                {s.unit && (
                  <span
                    style={{
                      fontSize: '22px',
                      fontWeight: 300,
                      color: 'var(--accent-gold)',
                      lineHeight: 1,
                      paddingTop: '10px',
                    }}
                  >
                    {s.unit}
                  </span>
                )}
                <span
                  style={{
                    fontSize: 'clamp(52px, 6vw, 72px)',
                    fontWeight: 300,
                    color: 'var(--accent-gold)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {s.num}
                </span>
              </div>

              {/* Label */}
              <p
                style={{
                  fontFamily: 'Heebo, Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '15px',
                  color: '#FFFFFF',
                  marginBottom: '6px',
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.3px',
                }}
              >
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
