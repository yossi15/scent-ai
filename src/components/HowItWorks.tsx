'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ClipboardList, Brain, Sparkles } from 'lucide-react';

const STEPS = [
  {
    num: '1',
    icon: ClipboardList,
    title: 'בונים פרופיל',
    desc: 'שאלון של 3 דקות + הוספת הבשמים שאתה כבר אוהב. ה-AI לומד מה שאתה מביא.',
  },
  {
    num: '2',
    icon: Brain,
    title: 'AI מנתח',
    desc: 'האלגוריתם סורק 1,019 בשמים ולומד את ה-DNA הריחני שלך — עמוק מכל שאלון סגנון.',
  },
  {
    num: '3',
    icon: Sparkles,
    title: 'המלצות מדויקות',
    desc: 'תגלה בדיוק איזה בושם הוא אתה. כל המלצה עם הסבר אישי מה מחברת ביניכם.',
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28 px-6"
      style={{ background: 'var(--bg-dark, #0F0F0E)' }}
      aria-labelledby="how-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
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
            הפתרון
          </p>
          <h2
            id="how-heading"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(28px, 4vw, 42px)',
              color: '#FFFFFF',
              letterSpacing: '-0.015em',
              lineHeight: 1.1,
              marginBottom: '12px',
            }}
          >
            איך SCENTORY עובד
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '14px',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.3px',
            }}
          >
            3 שלבים פשוטים.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {STEPS.map(({ num, icon: Icon, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease }}
              style={{ textAlign: 'center' }}
            >
              {/* Numbered circle */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 400,
                    fontSize: '22px',
                    color: 'var(--accent-gold)',
                    lineHeight: 1,
                  }}
                >
                  {num}
                </span>
              </div>

              {/* Icon */}
              <div style={{ marginBottom: '16px' }}>
                <Icon size={20} style={{ color: 'rgba(201,169,97,0.6)', margin: '0 auto' }} />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'Heebo, Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '18px',
                  color: '#FFFFFF',
                  letterSpacing: '-0.01em',
                  marginBottom: '12px',
                }}
              >
                {title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: '13px',
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.5)',
                  maxWidth: '260px',
                  margin: '0 auto',
                }}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
        >
          <Link
            href="/quiz"
            style={{
              display: 'inline-block',
              padding: '13px 36px',
              border: '1px solid rgba(201,169,97,0.5)',
              color: 'var(--accent-gold)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '10px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--accent-gold)';
              (e.currentTarget as HTMLElement).style.color = '#0F0F0E';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = 'var(--accent-gold)';
            }}
          >
            התחל את השאלון
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
