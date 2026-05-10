'use client';

import { useState } from 'react';
import { fragrances } from '@/data/fragrances';

const TOTAL = fragrances.length;

const FAQS = [
  {
    q: 'כמה בשמים יש בקולקציה?',
    a: `הקולקציה כוללת ${TOTAL} בשמים מ-46 בתי בושם נישתיים נבחרים. אנחנו מוסיפים בשמים חדשים באופן שוטף.`,
  },
  {
    q: 'האם הבשמים מקוריים?',
    a: 'כל הבשמים מקוריים 100%. אנחנו מקשרים רק לחנויות מורשות ומספקים השוואת מחירים שקופה.',
  },
  {
    q: 'איך השאלון עובד?',
    a: 'השאלון מנתח את העדפות הריח שלך ומצליב אותן עם פרופילי הבשמים בקולקציה.',
  },
  {
    q: 'האם אפשר לבטל מנוי?',
    a: 'כן. ביטול בכל עת, בלי התחייבות, מיידי.',
  },
  {
    q: 'מה ההבדל בין EDP ל-EDT?',
    a: 'EDP מכיל ריכוז גבוה של חומרי ריח — מחזיק יותר זמן ומורגש יותר. EDT קליל וטרי, מתאים ליומיום.',
  },
  {
    q: 'איך שומרים בשמים?',
    a: 'הוסף לאוסף האישי. הנתונים נשמרים בחשבון ונגישים מכל מכשיר.',
  },
];

const eyebrow: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: '#999',
};

const heading: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 600,
  fontSize: 'clamp(32px, 5vw, 48px)',
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
  color: '#000',
};

const qStyle: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 500,
  fontSize: '20px',
  color: '#000',
  letterSpacing: '-0.005em',
};

const aStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 300,
  fontSize: '14px',
  lineHeight: 1.7,
  color: '#666',
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      className="py-32 px-6"
      style={{ background: '#FAF8F4' }}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <p style={eyebrow} className="mb-4">FAQ</p>
          <h2 id="faq-heading" style={heading}>שאלות נפוצות</h2>
        </div>

        <dl>
          {FAQS.map(({ q, a }, i) => (
            <div key={i} style={{ borderTop: i === 0 ? '1px solid #eee' : 'none', borderBottom: '1px solid #eee' }}>
              <dt>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-right"
                  aria-expanded={open === i}
                >
                  <span style={qStyle}>{q}</span>
                  <span
                    className="text-2xl shrink-0 mr-4 transition-transform"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 300,
                      color: '#000',
                      transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                      transitionDuration: '200ms',
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
              </dt>
              {open === i && (
                <dd className="pb-6">
                  <p style={aStyle}>{a}</p>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
