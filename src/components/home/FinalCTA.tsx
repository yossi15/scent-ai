'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import LiveCounter from './LiveCounter';

const ease = [0.22, 1, 0.36, 1] as const;

export default function FinalCTA() {
  return (
    <section
      style={{
        padding: 'clamp(48px, 7vw, 60px) clamp(20px, 4vw, 32px)',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, #0f0a05 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease }}
        style={{
          maxWidth: 560,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Live counter - renders only when real data exists */}
        <LiveCounter />

        <h2
          style={{
            fontSize: 'clamp(22px, 4vw, 28px)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            letterSpacing: '-0.5px',
            margin: 0,
          }}
        >
          מצא את{' '}
          <span style={{ color: 'var(--gold)' }}>הריח שלך</span>
          <br />
          ב-3 דקות.
        </h2>

        <p
          style={{
            fontSize: 13,
            color: 'var(--text-tertiary)',
            margin: 0,
          }}
        >
          תשע שאלות. ניתוח AI. עשר התאמות.
        </p>

        <Link
          href="/quiz"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 600,
            padding: '14px 32px',
            borderRadius: 8,
            background: 'var(--gold)',
            color: '#050505',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.87')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          התחל את השאלון &#8592;
        </Link>

        <p
          style={{
            fontSize: 11,
            color: 'var(--text-faint)',
            margin: 0,
          }}
        >
          ללא כרטיס אשראי · 7 ימי ניסיון · ביטול בכל עת
        </p>
      </motion.div>
    </section>
  );
}
