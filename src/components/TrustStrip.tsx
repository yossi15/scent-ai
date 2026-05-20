'use client';

const ITEMS = [
  'בשמים אותנטיים בלבד',
  'תשלום מאובטח',
  'ביטול בכל עת',
  'ביקורות מאומתות',
];

const itemStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: '#999',
};

export default function TrustStrip() {
  return (
    <aside
      className="py-10 px-6"
      style={{ background: '#FFFFFF', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}
      aria-label="Trust signals"
    >
      <ul className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-4" role="list">
        {ITEMS.map((label) => (
          <li key={label} style={itemStyle}>{label}</li>
        ))}
      </ul>
    </aside>
  );
}
