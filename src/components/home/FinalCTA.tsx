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
        overflow: 'hidden',
      }}
    >
      {/* Gold glow — separate from section bg so it composites correctly over any theme */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(60% 60% at 50% 50%, var(--gold-soft) 0%, transparent 70%)',
      }} />
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
            fontFamily: "Georgia, 'Frank Ruhl Libre', serif", fontWeight: 400,
            fontSize: 'clamp(32px, 5vw, 56px)',
            lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0,
            color: 'var(--text-primary)', maxWidth: 620,
          }}>
            מצא את הריח שלך
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}> ב-3 דקות</em>.
          </h2>

          {/* Sub */}
          <p style={{ fontSize: 15.5, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
            ללא כרטיס אשראי. ללא התחייבות. תוצאות מיידיות.
          </p>

          {/* CTA */}
          <Link href="/quiz" className="quiz-cta" style={{ fontSize: 14, padding: '18px 40px', marginTop: 'var(--s1)', textDecoration: 'none' }}>
            התחל את השאלון ←
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
