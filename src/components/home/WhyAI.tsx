'use client';

import { motion } from 'framer-motion';

const SALESPERSON_ITEMS = [
  'ממליץ על מה שיש במלאי',
  'רוצה למכור עכשיו',
  'מכיר אותך 5 דקות',
  '״זה הכי נמכר״',
];

const SCENTORY_ITEMS = [
  'מכיר מעל 1,000 בשמים',
  'אין אינטרס מסחרי',
  'לומד את כל הטעם שלך',
  '״זה מתאים לך כי...״',
];

export default function WhyAI() {
  return (
    <section style={{ padding: 'var(--s10) var(--s3)', position: 'relative' }}>
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>

        {/* Section head */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'var(--s7)',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 10.5,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              aria-hidden="true"
              style={{ width: 18, height: 1, background: 'var(--gold)', display: 'inline-block' }}
            />
            למה לסמוך עלינו
          </span>

          <h2
            style={{
              fontWeight: 700,
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--text-primary)',
              maxWidth: 720,
            }}
          >
            למה <bdi>AI</bdi> ולא{' '}
            <span
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--gold)',
              }}
            >
              מוכר בחנות?
            </span>
          </h2>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: 15.5,
              maxWidth: 540,
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            אותה שאלה, שתי גישות. ההבדל הוא במי שבאמת עובד בשבילך.
          </p>
        </div>

        {/* Two-column comparison */}
        <div
          style={{
            maxWidth: 940,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--s3)',
            alignItems: 'stretch',
          }}
          className="vs-grid-responsive"
        >
          {/* Muted column — salesperson */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 18,
              padding: 'var(--s4) var(--s4) var(--s5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--s3)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 19,
                  letterSpacing: '0.04em',
                  color: 'var(--text-muted)',
                }}
              >
                מוכר בחנות
              </span>
              <span
                style={{
                  fontSize: 9.5,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                }}
              >
                הדרך הישנה
              </span>
            </div>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {SALESPERSON_ITEMS.map(item => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    gap: 11,
                    alignItems: 'flex-start',
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: 1,
                      fontSize: 12,
                      color: 'var(--text-muted)',
                    }}
                    aria-hidden="true"
                  >
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Gold column — SCENTORY */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'linear-gradient(180deg, var(--gold-faint) 0%, var(--bg-card) 60%)',
              border: '1px solid var(--gold-soft)',
              borderRadius: 18,
              padding: 'var(--s4) var(--s4) var(--s5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--s3)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 19,
                  letterSpacing: '0.22em',
                  color: 'var(--gold)',
                }}
              >
                SCENTORY
              </span>
              <span
                style={{
                  fontSize: 9.5,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  fontWeight: 600,
                  padding: '3px 9px',
                  borderRadius: 999,
                  background: 'var(--gold-faint)',
                  border: '1px solid var(--gold-soft)',
                }}
              >
                הדרך שלנו
              </span>
            </div>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {SCENTORY_ITEMS.map(item => (
                <li
                  key={item}
                  style={{
                    display: 'flex',
                    gap: 11,
                    alignItems: 'flex-start',
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: 'var(--text-primary)',
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: 1,
                      fontSize: 12,
                      color: 'var(--gold)',
                      fontWeight: 700,
                    }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .vs-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
