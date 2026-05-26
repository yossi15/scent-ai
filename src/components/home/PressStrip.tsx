const SHOW_PRESS = process.env.NEXT_PUBLIC_SHOW_PRESS === 'true';

const PRESS = [
  { name: 'Calcalist',      style: { fontFamily: "Georgia, serif" } },
  { name: 'GEEKTIME',       style: { fontWeight: 700, letterSpacing: '0.08em' } },
  { name: 'PerfumeLover.il',style: {} },
  { name: 'TheMarker',      style: { fontFamily: "Georgia, serif", fontStyle: 'italic' } },
];

export default function PressStrip() {
  if (!SHOW_PRESS) return null;

  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '18px 20px',
      }}
    >
      <div
        className="section-inner"
        style={{
          display: 'flex', alignItems: 'center', gap: 24,
          flexWrap: 'wrap', justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 9, color: 'var(--text-faint)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
          מוזכר ב:
        </span>
        {PRESS.map(p => (
          <span
            key={p.name}
            style={{ fontSize: 12, color: 'var(--text-muted)', opacity: 0.6, ...p.style }}
          >
            {p.name}
          </span>
        ))}
      </div>
    </div>
  );
}
