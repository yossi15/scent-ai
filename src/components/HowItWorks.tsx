'use client';

const STEPS = [
  {
    num: '01',
    title: 'השאלון האישי',
    desc: 'ענה על שאלות קצרות שיגלו את ה-DNA הריחני שלך — אורח חיים, העדפות, זכרונות.',
  },
  {
    num: '02',
    title: 'ניתוח מרושל',
    desc: 'האלגוריתם סורק את 1,019 הבשמים ולומד מה מתאים לך — עמוק מכל שאלון סגנון.',
  },
  {
    num: '03',
    title: 'דגימות עד הבית',
    desc: 'מקבל המלצות מדויקות עם אפשרות לדגום לפני קנייה — ללא הסתברות, רק ודאות.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28 px-6"
      style={{ background: '#0F0F0E' }}
      aria-labelledby="how-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24" dir="rtl">
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '9px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#C9A961',
              marginBottom: '16px',
            }}
          >
            המסע
          </p>
          <h2
            id="how-heading"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            איך זה עובד?
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16" dir="rtl">
          {STEPS.map((s) => (
            <div key={s.num}>
              {/* Number */}
              <p
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 300,
                  fontSize: '56px',
                  color: '#C9A961',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  marginBottom: '20px',
                  opacity: 0.9,
                }}
                aria-hidden="true"
              >
                {s.num}
              </p>

              {/* Divider line */}
              <div style={{ width: '32px', height: '1px', background: '#C9A961', marginBottom: '20px', opacity: 0.5 }} />

              {/* Title */}
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 400,
                  fontSize: '22px',
                  color: '#FFFFFF',
                  letterSpacing: '-0.005em',
                  lineHeight: 1.2,
                  marginBottom: '14px',
                }}
              >
                {s.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: '13px',
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24" dir="rtl">
          <a
            href="#quiz"
            style={{
              display: 'inline-block',
              padding: '13px 36px',
              border: '1px solid rgba(201,169,97,0.5)',
              color: '#C9A961',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '10px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#C9A961';
              (e.currentTarget as HTMLElement).style.color = '#0F0F0E';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = '#C9A961';
            }}
          >
            התחל את השאלון
          </a>
        </div>
      </div>
    </section>
  );
}
