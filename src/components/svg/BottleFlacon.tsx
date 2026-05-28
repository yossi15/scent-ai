/* Rectangular flacon — Baccarat Rouge 540 style */
export default function BottleFlacon({ width = 54, height = 75 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 72 100" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="flacon-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9a64a" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#a8762a" stopOpacity="0.98" />
          <stop offset="1" stopColor="#3a230f" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="flacon-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flacon-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2520" />
          <stop offset="1" stopColor="#0a0807" />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="22" y="4" width="28" height="16" rx="2" fill="url(#flacon-cap)" />
      <rect x="20" y="18" width="32" height="4" rx="1" fill="#3a3530" />
      {/* shoulder */}
      <path d="M14 28 Q14 22 22 22 L50 22 Q58 22 58 28 L60 32 L12 32 Z" fill="url(#flacon-glass)" />
      {/* body */}
      <rect x="12" y="32" width="48" height="64" rx="3" fill="url(#flacon-glass)" />
      {/* highlight */}
      <rect x="16" y="36" width="6" height="48" rx="2" fill="url(#flacon-shine)" opacity="0.7" />
      {/* side reflection */}
      <rect x="50" y="38" width="3" height="40" rx="1" fill="#fff" opacity="0.18" />
      {/* label */}
      <rect x="20" y="56" width="32" height="20" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
      <line x1="22" y1="62" x2="50" y2="62" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" />
      <line x1="26" y1="68" x2="46" y2="68" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
      <line x1="30" y1="72" x2="42" y2="72" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
    </svg>
  );
}
