/* Round vintage flask — Tobacco Vanille style */
export default function BottleRound({ width = 54, height = 75 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 72 100" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="round-glass" cx="0.4" cy="0.4" r="0.8">
          <stop offset="0" stopColor="#7d4a1a" />
          <stop offset="0.6" stopColor="#3e2a14" />
          <stop offset="1" stopColor="#1a0e07" />
        </radialGradient>
        <linearGradient id="round-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2520" />
          <stop offset="1" stopColor="#0a0807" />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="26" y="4" width="20" height="18" rx="1" fill="url(#round-cap)" />
      <rect x="22" y="20" width="28" height="6" rx="1" fill="#2a2520" />
      {/* body */}
      <path d="M16 32 Q12 36 12 50 Q12 72 22 86 Q28 96 36 96 Q44 96 50 86 Q60 72 60 50 Q60 36 56 32 Z" fill="url(#round-glass)" />
      {/* highlight */}
      <ellipse cx="22" cy="46" rx="4" ry="14" fill="#fff" opacity="0.18" />
      <ellipse cx="50" cy="80" rx="2" ry="6" fill="#fff" opacity="0.12" />
      {/* label */}
      <rect x="22" y="58" width="28" height="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <line x1="24" y1="64" x2="48" y2="64" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
      <line x1="26" y1="70" x2="46" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
    </svg>
  );
}
