'use client';

const TESTIMONIALS = [
  {
    name: 'דניאל מ., תל אביב',
    text: 'מצאתי דרך SCENTORY את Kirke — חיפשתי אותו שנתיים.',
    stars: 5,
  },
  {
    name: 'יעל ר., חיפה',
    text: 'השאלון תפס בדיוק את הסגנון שלי — Molecule 01 היה פגיעה ישירה.',
    stars: 5,
  },
  {
    name: 'נועם ב., פתח תקווה',
    text: 'יש לי 40 בשמים — SCENTORY עזרה לי למצוא מה חסר.',
    stars: 5,
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

const quoteStyle: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 400,
  fontStyle: 'italic',
  fontSize: '22px',
  lineHeight: 1.5,
  color: '#000',
  letterSpacing: '-0.005em',
};

const nameStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: '#999',
};

export default function Testimonials() {
  return (
    <section
      className="py-32 px-6"
      style={{ background: '#FFFFFF' }}
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p style={eyebrow} className="mb-4">Testimonials</p>
          <h2 id="testimonials-heading" style={heading}>קולות מהקהילה</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {TESTIMONIALS.map(({ name, text, stars }) => (
            <blockquote key={name} className="text-center">
              <p style={{ ...nameStyle, color: 'var(--gold)', letterSpacing: '3px', marginBottom: '20px' }}>
                {'★'.repeat(stars)}
              </p>
              <p style={quoteStyle} className="mb-8">&ldquo;{text}&rdquo;</p>
              <footer style={nameStyle}>— {name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
