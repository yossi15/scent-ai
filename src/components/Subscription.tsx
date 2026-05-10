'use client';

const TIERS = [
  {
    id: 'discovery',
    name: 'Discovery',
    nameHe: 'גילוי',
    price: 179,
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
    price: 549,
    features: [
      'כל יתרונות Discovery',
      'המלצות מותאמות',
      'יומן ריחות אישי',
      'פרופיל ריח מפורט',
    ],
  },
  {
    id: 'expert',
    name: 'Expert',
    nameHe: 'מומחה',
    price: 1459,
    features: [
      'כל יתרונות Collector',
      'ייעוץ אישי',
      'גישה מוקדמת',
      'הנחות בלעדיות',
    ],
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

const tierName: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 500,
  fontSize: '28px',
  color: '#000',
  letterSpacing: '-0.005em',
};

const tierLabel: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '10px',
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: '#999',
};

const priceStyle: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 400,
  fontSize: '44px',
  color: '#000',
  letterSpacing: '-0.02em',
};

const ctaStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500,
  fontSize: '12px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
};

const featureStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 300,
  fontSize: '13px',
  color: '#666',
  lineHeight: 1.7,
};

export default function Subscription() {
  return (
    <section
      id="subscription"
      className="py-32 px-6"
      style={{ background: '#FFFFFF' }}
      aria-labelledby="subscription-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p style={eyebrow} className="mb-4">Membership</p>
          <h2 id="subscription-heading" style={heading}>תוכניות מנוי</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: '1px solid #eee' }}>
          {TIERS.map((t, i) => (
            <div
              key={t.id}
              className="p-12"
              style={{
                borderBottom: '1px solid #eee',
                borderRight: i < TIERS.length - 1 ? '1px solid #eee' : 'none',
              }}
            >
              <p style={tierLabel} className="mb-3" dir="ltr">{t.name}</p>
              <h3 style={tierName} className="mb-8">{t.nameHe}</h3>

              <div className="mb-10" dir="ltr">
                <span style={priceStyle}>₪{t.price}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#999', letterSpacing: '1px', marginRight: '8px' }}>
                  / month
                </span>
              </div>

              <ul className="mb-12 space-y-3" role="list">
                {t.features.map(f => (
                  <li key={f} style={featureStyle}>— {f}</li>
                ))}
              </ul>

              <a
                href="/subscribe"
                className="inline-block px-8 py-4 bg-black text-white"
                style={ctaStyle}
              >
                Subscribe
              </a>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-12"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#999', letterSpacing: '1px' }}
        >
          Cancel anytime · No commitment
        </p>
      </div>
    </section>
  );
}
