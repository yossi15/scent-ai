'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FinalCTA() {
  return (
    <section
      className="py-32 px-6 text-center"
      style={{
        background: 'var(--bg-dark, #0F0F0E)',
        borderTop: '1px solid rgba(201,169,97,0.15)',
      }}
      aria-labelledby="final-cta-heading"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '9px',
              fontWeight: 400,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              marginBottom: '24px',
            }}
          >
            מוכן?
          </p>

          {/* Heading */}
          <h2
            id="final-cta-heading"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(32px, 5vw, 52px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: '20px',
            }}
          >
            מצא את הריח שלך ב-3 דקות
          </h2>

          {/* Sub */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '14px',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '44px',
            }}
          >
            הצטרף ל-15,000 אספני בשמים שכבר גילו את ה-DNA הריחני שלהם
          </p>

          {/* CTA */}
          <Link
            href="/quiz"
            style={{
              display: 'inline-block',
              padding: '16px 44px',
              background: 'var(--accent-gold)',
              color: '#0a0a0a',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
            className="transition-opacity hover:opacity-85 active:scale-[0.97]"
          >
            התחל שאלון חינם ←
          </Link>

          {/* Trust line */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '1.5px',
              marginTop: '20px',
            }}
          >
            ללא כרטיס אשראי &nbsp;·&nbsp; 7 ימי ניסיון &nbsp;·&nbsp; ביטול בכל עת
          </p>
        </motion.div>
      </div>
    </section>
  );
}
