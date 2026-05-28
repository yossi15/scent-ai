'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import LiveCounter from '@/components/home/LiveCounter';

export default function FinalCTA() {
  return (
    <section
      id="start"
      style={{
        position: 'relative',
        padding: 'var(--s7) var(--s3)',
        textAlign: 'center',
        background: `radial-gradient(60% 60% at 50% 50%, var(--gold-soft) 0%, transparent 70%)`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: 720, margin: '0 auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--s3)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--s3)', width: '100%' }}
        >
          {/* Live counter badge — shows only if count ≥ 10 */}
          <LiveCounter />

          {/* Headline */}
          <h2 style={{
            fontWeight: 700,
            fontSize: 'clamp(32px, 5vw, 56px)',
            lineHeight: 1.1, letterSpacing: '-0.035em', margin: 0,
            color: 'var(--text-primary)', maxWidth: 620,
          }}>
            מצא את הריח שלך
            <span style={{ color: 'var(--gold-text)' }}> ב-3 דקות</span>.
          </h2>

          {/* Sub */}
          <p style={{ fontSize: 15.5, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
            ללא כרטיס אשראי. ללא התחייבות. תוצאות מיידיות.
          </p>

          {/* CTA */}
          <Link
            href="/quiz"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 16, fontWeight: 600,
              padding: '18px 36px', borderRadius: 12,
              background: 'var(--gold)', color: '#1a1410',
              textDecoration: 'none',
              border: '1px solid var(--gold)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.2) inset, 0 16px 40px -12px var(--gold-soft)',
              transition: 'all 200ms cubic-bezier(.4,0,.2,1)',
              marginTop: 'var(--s1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--gold-strong)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--gold)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            התחל את השאלון ←
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
