/* Photographic-feel avatar SVGs for testimonials */

export function Avatar1({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <defs>
        <linearGradient id="a1g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a1a0a" />
          <stop offset="1" stopColor="#0f0805" />
        </linearGradient>
      </defs>
      <rect width="80" height="80" fill="url(#a1g)" />
      <ellipse cx="40" cy="28" rx="16" ry="18" fill="#c49a78" opacity="0.92" />
      <ellipse cx="40" cy="80" rx="30" ry="24" fill="#a87a58" opacity="0.85" />
      <circle cx="34" cy="26" r="1.5" fill="#1a1008" />
      <circle cx="46" cy="26" r="1.5" fill="#1a1008" />
      <path d="M35 33 Q40 37 45 33" stroke="#8a5c3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Avatar2({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <defs>
        <linearGradient id="a2g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a2010" />
          <stop offset="1" stopColor="#12090a" />
        </linearGradient>
      </defs>
      <rect width="80" height="80" fill="url(#a2g)" />
      <ellipse cx="40" cy="24" rx="20" ry="8" fill="#3a2418" opacity="0.9" />
      <circle cx="40" cy="36" r="15" fill="#b8957a" opacity="0.92" />
      <ellipse cx="40" cy="80" rx="30" ry="24" fill="#9a785a" opacity="0.85" />
      <circle cx="34" cy="34" r="1.5" fill="#1a1008" />
      <circle cx="46" cy="34" r="1.5" fill="#1a1008" />
      <path d="M35 41 Q40 44 45 41" stroke="#7a4c2a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Avatar3({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <defs>
        <linearGradient id="a3g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a2c1a" />
          <stop offset="1" stopColor="#15100a" />
        </linearGradient>
      </defs>
      <rect width="80" height="80" fill="url(#a3g)" />
      <path d="M12 30 Q12 12 40 12 Q68 12 68 30 L68 50 L12 50 Z" fill="#2a1810" opacity="0.95" />
      <circle cx="40" cy="36" r="14" fill="#d4b094" opacity="0.92" />
      <ellipse cx="40" cy="80" rx="28" ry="22" fill="#b88c70" opacity="0.85" />
      <circle cx="34" cy="34" r="1.5" fill="#1a1008" />
      <circle cx="46" cy="34" r="1.5" fill="#1a1008" />
      <path d="M35 40 Q40 43 45 40" stroke="#8a5c3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
