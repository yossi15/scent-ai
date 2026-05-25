'use client';

import { motion } from 'framer-motion';
import EyebrowText from './shared/EyebrowText';
import TestimonialCard, { type Testimonial } from './TestimonialCard';

const ease = [0.22, 1, 0.36, 1] as const;

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'חיפשתי Kirke שנתיים. SCENTORY הצליחה לזהות שאני רוצה אותו, בלי שאמרתי את השם.',
    name: 'דניאל מ.',
    city: 'תל אביב',
    bottles: 14,
  },
  {
    quote:
      'השאלון תפס בדיוק את הסגנון שלי. ההסבר "למה זה אתה" מצוין - הרגשתי שמישהו הבין אותי.',
    name: 'יעל ר.',
    city: 'חיפה',
    bottles: 28,
  },
  {
    quote:
      'השוואת המחירים לבדה חסכה לי 320&#8362; על הבקבוק האחרון. שווה את זה כבר בגלל זה.',
    name: 'נועם ב.',
    city: 'פתח תקווה',
    bottles: 41,
  },
];

export default function Testimonials() {
  return (
    <section
      style={{
        background: 'var(--bg-primary)',
        padding: 'clamp(36px, 5vw, 52px) clamp(20px, 4vw, 32px)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease }}
          style={{ textAlign: 'center', marginBottom: 32 }}
        >
          <EyebrowText>מה אספנים אומרים</EyebrowText>
          <h2
            style={{
              fontSize: 'clamp(20px, 3vw, 24px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginTop: 10,
              letterSpacing: '-0.3px',
            }}
          >
            מ-500 הראשונים
            <span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 14,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1, ease }}
            >
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
