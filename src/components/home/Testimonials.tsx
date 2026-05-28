'use client';

import { motion } from 'framer-motion';
import { Avatar1, Avatar2, Avatar3 } from '@/components/svg/Avatars';

const SHOW_TESTIMONIALS = process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === 'true';

const REVIEWS = [
  {
    quote: 'אחרי שנים של ניחושים בקניון ובקבוקים שנשארו עומדים - סוף סוף בושם שהוא באמת אני. ההסבר על למה הוא מתאים זה מה ששינה הכל.',
    name: 'דניאל ל.',
    city: 'תל אביב',
    detail: '14 בשמים בספרייה',
    Avatar: Avatar1,
  },
  {
    quote: 'שאלות מדויקות, תוצאות מפתיעות. הבושם הראשון שקניתי דרך סנטורי הפך לחתימה שלי. אנשים עוצרים אותי ברחוב לשאול מה אני שמה.',
    name: 'עידן ש.',
    city: 'חיפה',
    detail: '8 בשמים בספרייה',
    Avatar: Avatar2,
  },
  {
    quote: 'הסבר ברור על למה כל בושם מתאים - הרבה יותר מועיל מהמלצות אקראיות של חברה או מוכרת בקניון. סוף סוף קונים בלי לפחד מטעות.',
    name: 'מיכל ב.',
    city: 'רעננה',
    detail: '5 בשמים בספרייה',
    Avatar: Avatar3,
  },
];

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 2, color: 'var(--gold)', letterSpacing: 2, fontSize: 13 }}>
      {'★★★★★'}
    </div>
  );
}

export default function Testimonials() {
  if (!SHOW_TESTIMONIALS) return null;

  return (
    <section style={{ padding: 'var(--s7) var(--s3)' }}>
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>

        {/* Section head */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--s7)', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          <span style={{
            fontSize: 10.5, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'var(--gold)', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 18, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
            קהילה מ-500 הראשונים
          </span>
          <h2 style={{
            fontWeight: 700, fontSize: 'clamp(24px, 3vw, 40px)',
            lineHeight: 1.15, letterSpacing: '-0.025em', margin: 0,
            color: 'var(--text-primary)',
          }}>
            דברים שאמרו לנו אחרי שמצאו את הניחוח שלהם.
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s3)' }}
          className="testi-grid-responsive"
        >
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-2, var(--border-default))',
                borderRadius: 16, padding: 'var(--s3)',
                display: 'flex', flexDirection: 'column', gap: 16,
                boxShadow: 'var(--shadow-card)',
                transition: 'transform 280ms, border-color 280ms',
              }}
              whileHover={{ y: -3 }}
            >
              <Stars />

              <p style={{
                fontFamily: 'var(--serif, Georgia, serif)',
                fontSize: 15, lineHeight: 1.65,
                color: 'var(--text-primary)', margin: 0, flex: 1,
                fontStyle: 'italic', letterSpacing: '0.005em',
              }}>
                &ldquo;{r.quote}&rdquo;
              </p>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Photographic avatar */}
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    overflow: 'hidden', flexShrink: 0, position: 'relative',
                  }}>
                    <r.Avatar size={42} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                      {r.name}
                    </p>
                    <p style={{ fontSize: 11.5, color: 'var(--text-muted)', margin: '2px 0 0' }}>
                      {r.city} · {r.detail}
                    </p>
                  </div>

                  <span style={{
                    fontSize: 10, color: 'var(--gold)', fontWeight: 600,
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                    padding: '3px 8px', borderRadius: 999,
                    background: 'var(--gold-faint)',
                    border: '1px solid var(--gold-soft)',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}>
                    ✓ מאומת
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testi-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
