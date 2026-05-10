'use client';

const TESTIMONIALS = [
  {
    name: 'ניר כהן',
    text: 'מצאתי את הבושם המושלם אחרי שנים של חיפוש. הפלטפורמה מעוצבת בטעם ובלי הסחות.',
  },
  {
    name: 'מיכל לוי',
    text: 'הפירמידות, הביצועים, השוואת המחירים — הכל במקום אחד, נקי וברור.',
  },
  {
    name: 'יובל אברהם',
    text: 'נכנסתי לשאלון, קיבלתי שלוש המלצות, קניתי את הראשונה. אני מרוצה מאוד.',
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
          {TESTIMONIALS.map(({ name, text }) => (
            <blockquote key={name} className="text-center">
              <p style={quoteStyle} className="mb-8">&ldquo;{text}&rdquo;</p>
              <footer style={nameStyle}>— {name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
