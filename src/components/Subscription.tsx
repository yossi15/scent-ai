'use client';

import { motion } from 'framer-motion';

const TIERS = [
  {
    id: 'discovery',
    name: 'Discovery',
    nameHe: 'גילוי',
    price: 49,
    recommended: false,
    features: [
      'גישה לכל הקולקציה',
      'שאלון טעמים',
      'אוסף אישי',
      'השוואת מחירים',
    ],
  },
  {
    id: 'collector',
    name: 'Collector',
    nameHe: 'אספן',
    price: 99,
    recommended: true,
    features: [
      'כל יתרונות גילוי',
      'המלצות AI מותאמות',
      'יומן ריחות אישי',
      'פרופיל ריח מפורט',
    ],
  },
  {
    id: 'expert',
    name: 'Expert',
    nameHe: 'מומחה',
    price: 199,
    recommended: false,
    features: [
      'כל יתרונות אספן',
      'ייעוץ אישי חודשי',
      'גישה מוקדמת לבשמים',
      'הנחות בלעדיות',
    ],
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function Subscription() {
  return (
    <section
      id="subscription"
      className="py-32 px-6"
      style={{ background: 'var(--bg-secondary)' }}
      aria-labelledby="subscription-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="mb-4"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              fontSize: '10px',
              letterSpacing: '3.5px',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}
          >
            מנוי
          </p>
          <h2
            id="subscription-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}
          >
            בחר את המסלול שלך
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderTop: '1px solid var(--border)' }}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {TIERS.map((t, i) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              className="relative flex flex-col"
              style={{
                padding: '48px',
                borderBottom: '1px solid var(--border)',
                borderRight: i < TIERS.length - 1 ? '1px solid var(--border)' : 'none',
                background: t.recommended ? '#0F0F0E' : 'transparent',
                ...(t.recommended
                  ? {
                      border: 'none',
                    }
                  : {}),
              }}
            >
              {t.recommended && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1"
                  style={{
                    background: '#C9A961',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    fontSize: '9px',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: 'var(--bg-primary)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  מומלץ
                </div>
              )}

              <h3
                className="mb-8"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 500,
                  fontSize: '28px',
                  color: t.recommended ? '#FFFFFF' : 'var(--ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                {t.nameHe}
              </h3>

              <div className="mb-10 flex items-baseline gap-2" dir="ltr">
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 400,
                    fontSize: '44px',
                    color: t.recommended ? '#C9A961' : 'var(--ink)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  ₪{t.price}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    color: t.recommended ? 'rgba(255,255,255,0.4)' : 'var(--ink-faint)',
                    letterSpacing: '1px',
                  }}
                >
                  / חודש
                </span>
              </div>

              <ul className="mb-12 space-y-3 flex-1" role="list">
                {t.features.map(f => (
                  <li
                    key={f}
                    style={{
                      fontFamily: 'var(--font-hebrew)',
                      fontWeight: 300,
                      fontSize: '13px',
                      color: t.recommended ? 'rgba(255,255,255,0.65)' : 'var(--ink-secondary)',
                      lineHeight: 1.7,
                    }}
                  >
                    — {f}
                  </li>
                ))}
              </ul>

              <a
                href="/sign-up"
                className="inline-block text-center transition-all duration-300 active:scale-[0.97]"
                style={{
                  padding: '14px 32px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  background: t.recommended ? '#C9A961' : 'transparent',
                  color: t.recommended ? '#0F0F0E' : 'var(--ink)',
                  border: t.recommended ? 'none' : '1px solid var(--border)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  if (t.recommended) {
                    el.style.opacity = '0.85';
                  } else {
                    el.style.borderColor = '#C9A961';
                    el.style.color = '#C9A961';
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  if (t.recommended) {
                    el.style.opacity = '1';
                  } else {
                    el.style.borderColor = 'var(--border)';
                    el.style.color = 'var(--ink)';
                  }
                }}
              >
                {t.recommended ? 'הצטרף עכשיו' : 'הצטרף'}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <p
          className="text-center mt-10"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            color: 'var(--ink-faint)',
            letterSpacing: '1px',
          }}
        >
          ביטול בכל עת · ללא התחייבות
        </p>
      </div>
    </section>
  );
}
