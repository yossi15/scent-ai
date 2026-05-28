/* Faceted bottle — Oud Wood style */
export default function BottleFaceted({ width = 54, height = 75 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 72 100" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="facet-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5a3a1a" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#2a1a0a" stopOpacity="0.98" />
          <stop offset="1" stopColor="#0f0805" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="facet-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3530" />
          <stop offset="1" stopColor="#0a0807" />
        </linearGradient>
      </defs>
      {/* cap — octagonal */}
      <path d="M28 4 L44 4 L50 10 L50 20 L22 20 L22 10 Z" fill="url(#facet-cap)" />
      <rect x="20" y="20" width="32" height="4" rx="1" fill="#3a3530" />
      {/* body — faceted polygon */}
      <path d="M14 28 L18 24 L54 24 L58 28 L62 50 L58 80 L54 94 L18 94 L14 80 L10 50 Z" fill="url(#facet-glass)" />
      {/* facet lines */}
      <line x1="18" y1="24" x2="14" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
      <line x1="54" y1="24" x2="58" y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <line x1="10" y1="50" x2="62" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
      {/* highlight */}
      <path d="M18 26 L14 50 L18 26 Z" fill="rgba(255,255,255,0)" />
      <rect x="15" y="30" width="5" height="40" rx="2" fill="#fff" opacity="0.14" />
      {/* label */}
      <rect x="22" y="55" width="28" height="18" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.16)" strokeWidth="0.5" />
      <line x1="24" y1="61" x2="48" y2="61" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
      <line x1="26" y1="67" x2="46" y2="67" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
    </svg>
  );
}
