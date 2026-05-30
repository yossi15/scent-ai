'use client';

import { motion } from 'framer-motion';
import BottleFlacon from '@/components/svg/BottleFlacon';

const BULLETS = [
  'כל המלצה מגיעה עם פירוק תווים מלא - ראש, לב, בסיס - ואחוז התאמה לפרופיל שלך.',
  'הסבר ריחני בשפה ברורה: בלי ז\'רגון תעשייתי, בלי מלל שיווקי.',
  'השוואת מחירים בזמן אמת מול ארבעה ספקים בישראל ובחו"ל.',
  'היסטוריית התאמות שלומדת ומשתפרת ככל שמסמנים מה אהבת ומה לא.',
];

export default function WhyFeature() {
  return (
    <section
      style={{
        padding: 'var(--s7) var(--s3)',
        background: 'var(--bg-elev, var(--bg-secondary))',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div
        style={{ maxWidth: 'var(--maxw)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s8)', alignItems: 'center' }}
        className="feat-grid-responsive"
      >
        {/* ── Text (RTL: right column first) ─────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s2)' }}
        >
          <span style={{
            fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'var(--gold)', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span aria-hidden="true" style={{ width: 18, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
            השכבה החסרה
          </span>

          <h2 style={{
            fontWeight: 700, fontSize: 'clamp(26px, 3.2vw, 40px)',
            lineHeight: 1.15, letterSpacing: '-0.025em', margin: 0,
            color: 'var(--text-primary)',
          }}>
            לא רק <span style={{ color: 'var(--gold)' }}>מה</span>. גם{' '}
            <span style={{ color: 'var(--gold)' }}>למה</span>.
          </h2>

          <p style={{ fontSize: 14.5, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7, maxWidth: 480 }}>
            רוב האפליקציות יזרקו לך רשימה. סנטורי מסבירה כל המלצה: למה היא תיאם דווקא
            אותך, איך תווי הלב משתלבים עם הטעם שלך, ומה צפוי להישאר על העור אחרי שש
            שעות. בלי קסם - רק שקיפות.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 'var(--s2)' }}>
            {BULLETS.map(b => (
              <div key={b} style={{ display: 'flex', gap: 12, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <span style={{
                  flexShrink: 0, marginTop: 8,
                  width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)',
                }} />
                {b}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Why card — decorative UI mockup ─────────────── */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-2, var(--border-default))',
            borderRadius: 18, padding: 20,
            display: 'flex', flexDirection: 'column', gap: 14,
            boxShadow: 'var(--shadow-mockup)',
          }}
        >
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--serif, Georgia, serif)',
              fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}>המלצה #2</span>
            <span style={{
              background: 'var(--gold)', color: '#1a1410',
              fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
            }}>94% התאמה</span>
          </div>

          {/* Match strip */}
          <div style={{
            background: 'var(--bg-card-2, var(--bg-elevated))',
            border: '1px solid var(--border-subtle)',
            borderRadius: 12, padding: 14,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ flexShrink: 0 }}>
              <BottleFlacon width={32} height={44} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: 'var(--serif)', fontSize: 9,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--text-muted)', margin: '0 0 2px',
              }}>Tom Ford</p>
              <p style={{
                fontFamily: 'var(--serif)', fontSize: 16,
                color: 'var(--text-primary)', margin: '0 0 4px', fontWeight: 400,
              }}>Tobacco Vanille</p>
              <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', fontSize: 12 }}>
                <span style={{ color: 'var(--gold)', fontWeight: 600 }}>1,500&#8362;</span>
                <span style={{ color: 'var(--text-muted)' }}>· EDP · 50ml · השארות 7-9 שעות</span>
              </div>
            </div>
          </div>

          {/* Explanation block */}
          <div style={{
            background: 'var(--bg-card-2, var(--bg-elevated))',
            borderRight: '3px solid var(--gold)',
            borderRadius: '4px 12px 12px 4px',
            padding: '14px 16px',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <p style={{
              fontSize: 10.5, color: 'var(--gold)',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              fontWeight: 600, margin: 0,
            }}>למה זה אתה</p>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              הפרופיל שלך מציג העדפה חזקה ל
              <span style={{
                display: 'inline-block', padding: '2px 7px', borderRadius: 4, margin: '0 4px',
                background: 'var(--gold-faint)', color: 'var(--gold)', fontSize: 11.5, fontWeight: 600,
              }}>אמברה</span>
              ול
              <span style={{
                display: 'inline-block', padding: '2px 7px', borderRadius: 4, margin: '0 4px',
                background: 'var(--gold-faint)', color: 'var(--gold)', fontSize: 11.5, fontWeight: 600,
              }}>תווי גורמה</span>
              - בדיוק העמוד השדרה של הבושם הזה.
            </p>
            <p style={{
              margin: 0, fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.55,
              paddingTop: 8, borderTop: '1px solid var(--border-subtle)',
            }}>
              הסבר זה נוצר לפי 9 התשובות שלך והקטלוג. ניתן לבקש פירוט נוסף.
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .feat-grid-responsive { grid-template-columns: 1fr !important; gap: var(--s7) !important; }
        }
      `}</style>
    </section>
  );
}
