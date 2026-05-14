'use client';

const STEPS = [
  {
    title: 'Take the quiz',
    titleHe: 'שאלון טעמים',
    desc: 'ענה על מספר שאלות על העדפות הריח, ההזדמנויות והסגנון האישי שלך.',
  },
  {
    title: 'Receive a profile',
    titleHe: 'פרופיל מותאם',
    desc: 'אלגוריתם פנימי מנתח את הטעמים ובונה פרופיל ריח אישי.',
  },
  {
    title: 'Discover your scent',
    titleHe: 'גילוי הריח',
    desc: 'גלה את הבשמים שמתאימים לך — שמור, השווה, הזמן.',
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

const num: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 400,
  fontSize: '40px',
  color: '#000',
  letterSpacing: '-0.02em',
};

const stepTitle: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 500,
  fontSize: '24px',
  color: '#000',
  letterSpacing: '-0.005em',
  lineHeight: 1.2,
};

const body: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 300,
  fontSize: '14px',
  lineHeight: 1.7,
  color: '#666',
};

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-32 px-6"
      style={{ background: '#FAF8F4' }}
      aria-labelledby="how-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <p style={eyebrow} className="mb-4">איך זה עובד</p>
          <h2 id="how-heading" style={heading}>איך זה עובד</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {STEPS.map((s, i) => (
            <div key={s.title} className="text-center md:text-right" dir="rtl">
              <p style={num} className="mb-6">0{i + 1}</p>
              <h3 style={stepTitle} className="mb-4">{s.titleHe}</h3>
              <p style={body}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
