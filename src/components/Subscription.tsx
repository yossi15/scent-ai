'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const TIERS = [
  {
    id: 'discovery',
    name: 'גילוי',
    price: 49,
    popular: false,
    features: [
      'גישה לכל הקולקציה',
      'שאלון טעמים',
      'אוסף אישי',
      'השוואת מחירים',
    ],
  },
  {
    id: 'collector',
    name: 'אספן',
    price: 99,
    popular: true,
    features: [
      'כל יתרונות גילוי',
      'המלצות AI מותאמות',
      'יומן ריחות אישי',
      'פרופיל ריח מפורט',
    ],
  },
  {
    id: 'expert',
    name: 'מומחה',
    price: 199,
    popular: false,
    features: [
      'כל יתרונות אספן',
      'ייעוץ אישי חודשי',
      'גישה מוקדמת לבשמים',
      'הנחות בלעדיות',
    ],
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Subscription() {
  return (
    <section
      id="subscription"
      className="py-32 px-6"
      style={{ background: 'var(--bg-secondary)' }}
      aria-labelledby="subscription-heading"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
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
            המסלולים
          </p>
          <h2
            id="subscription-heading"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: 'var(--ink)',
              marginBottom: '12px',
            }}
          >
            בחר את הרמה שלך
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 300,
              color: 'var(--ink-muted)',
              letterSpacing: '0.5px',
            }}
          >
            7 ימי ניסיון חינם &nbsp;·&nbsp; ללא כרטיס אשראי &nbsp;·&nbsp; ביטול בכל עת
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              style={{
                position: 'relative',
                background: 'var(--bg-card)',
                border: tier.popular
                  ? '2px solid var(--accent-gold)'
                  : '1px solid var(--border)',
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-13px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--accent-gold)',
                    color: '#0a0a0a',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '9px',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    padding: '4px 14px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  הכי פופולרי
                </div>
              )}

              {/* Plan name */}
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 400,
                  fontSize: '24px',
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                  marginBottom: '20px',
                }}
              >
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-8 flex items-baseline gap-1.5" dir="ltr">
                <span
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 300,
                    fontSize: '44px',
                    color: tier.popular ? 'var(--accent-gold)' : 'var(--ink)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  &#8362;{tier.price}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    color: 'var(--ink-muted)',
                    letterSpacing: '0.5px',
                  }}
                >
                  / חודש
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-10" role="list">
                {tier.features.map(f => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      fontFamily: 'Heebo, Inter, sans-serif',
                      fontWeight: 300,
                      fontSize: '13px',
                      color: 'var(--ink-secondary)',
                      lineHeight: 1.6,
                    }}
                  >
                    <Check
                      size={13}
                      style={{
                        color: 'var(--accent-gold)',
                        flexShrink: 0,
                        marginTop: '3px',
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/sign-up"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '13px 24px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  background: tier.popular ? 'var(--accent-gold)' : 'transparent',
                  color: tier.popular ? '#0a0a0a' : 'var(--ink)',
                  border: tier.popular ? 'none' : '1px solid var(--border)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  if (!tier.popular) {
                    el.style.borderColor = 'var(--accent-gold)';
                    el.style.color = 'var(--accent-gold)';
                  } else {
                    el.style.opacity = '0.85';
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  if (!tier.popular) {
                    el.style.borderColor = 'var(--border)';
                    el.style.color = 'var(--ink)';
                  } else {
                    el.style.opacity = '1';
                  }
                }}
              >
                {tier.popular ? 'הצטרף עכשיו' : 'הצטרף'}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
