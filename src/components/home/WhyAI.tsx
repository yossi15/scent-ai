'use client';

import { motion } from 'framer-motion';

const SALESPERSON = [
  'ממליץ על מה שיש במלאי',
  'רוצה למכור עכשיו',
  'מכיר אותך חמש דקות',
  <><em>״זה הכי נמכר״</em></>,
];

const SCENTORY_ITEMS = [
  'מכיר מעל 1,000 בשמים',
  'אין אינטרס מסחרי',
  'לומד את כל הטעם שלך',
  <><em>״זה מתאים לך כי…״</em></>,
];

export default function WhyAI() {
  return (
    <section style={{ padding: 'var(--s10) var(--s3)', position: 'relative' }}>
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>

        {/* Section head */}
        <motion.div
          className="ed-vs-head"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            <span aria-hidden="true" style={{ width: 18, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
            למה לסמוך עלינו
          </span>
          <h2 className="ed-h">
            למה <bdi>AI</bdi> ולא{' '}
            <em style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'var(--gold)' }}>
              מוכר בחנות?
            </em>
          </h2>
          <p className="ed-vs-sub">
            אותה שאלה, שתי גישות. ההבדל הוא במי שבאמת עובד בשבילך.
          </p>
        </motion.div>

        {/* Two columns split by a single hairline rule */}
        <div className="ed-vs-grid">
          {/* Muted column — salesperson */}
          <motion.div
            className="ed-vs-col ed-vs-col--old"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ed-vs-tag">הדרך הישנה</div>
            <h3 className="ed-vs-name">מוכר בחנות</h3>
            <ul className="ed-vs-list">
              {SALESPERSON.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>

          {/* Hairline divider */}
          <div className="ed-vs-rule" aria-hidden="true" />

          {/* Gold column — SCENTORY */}
          <motion.div
            className="ed-vs-col ed-vs-col--us"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ed-vs-tag">הדרך שלנו</div>
            <h3 className="ed-vs-name">SCENTORY</h3>
            <ul className="ed-vs-list">
              {SCENTORY_ITEMS.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
