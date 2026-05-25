const SHOW = process.env.NEXT_PUBLIC_SHOW_PRESS === 'true';

const OUTLETS = ['Calcalist', 'GEEKTIME', 'PerfumeLover.il', 'TheMarker'];

export default function PressStrip() {
  if (!SHOW) return null;

  return (
    <div
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        padding: '18px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.3)',
          whiteSpace: 'nowrap',
        }}
      >
        מוזכר ב:
      </span>
      {OUTLETS.map((outlet) => (
        <span
          key={outlet}
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            fontWeight: 500,
            letterSpacing: '0.03em',
          }}
        >
          {outlet}
        </span>
      ))}
    </div>
  );
}
