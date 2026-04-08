'use client';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const sizes = {
  sm: { svg: 32, title: 'text-lg', sub: 'text-[9px]' },
  md: { svg: 40, title: 'text-2xl', sub: 'text-[10px]' },
  lg: { svg: 52, title: 'text-3xl', sub: 'text-[11px]' },
  xl: { svg: 72, title: 'text-5xl', sub: 'text-xs' },
};

export default function Logo({ size = 'md', showText = true }: Props) {
  const s = sizes[size];

  return (
    <div className="flex items-center gap-3" dir="ltr">
      <svg
        width={s.svg}
        height={s.svg}
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer elegant ring */}
        <circle cx="36" cy="36" r="34" stroke="url(#lg)" strokeWidth="0.8" opacity="0.4" />
        <circle cx="36" cy="36" r="28" stroke="url(#lg)" strokeWidth="0.5" opacity="0.2" />

        {/* Stylized S — fragrance drop flowing */}
        <path
          d="M36 12 C36 12 24 22 24 30 C24 35 28 38 32 39 C36 40 40 43 40 48 C40 54 36 60 36 60"
          stroke="url(#lg)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Molecule dots */}
        <circle cx="24" cy="30" r="2.5" fill="url(#lg)" opacity="0.6" />
        <circle cx="40" cy="48" r="2.5" fill="url(#lg)" opacity="0.5" />
        <circle cx="36" cy="12" r="2" fill="url(#lg)" opacity="0.7" />

        {/* Small sparkle at top */}
        <line x1="36" y1="8" x2="36" y2="5" stroke="url(#lg)" strokeWidth="1" opacity="0.3" />
        <line x1="33" y1="9" x2="31" y2="7" stroke="url(#lg)" strokeWidth="0.8" opacity="0.2" />
        <line x1="39" y1="9" x2="41" y2="7" stroke="url(#lg)" strokeWidth="0.8" opacity="0.2" />

        <defs>
          <linearGradient id="lg" x1="20" y1="8" x2="52" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c9a85c" />
            <stop offset="0.5" stopColor="#96793a" />
            <stop offset="1" stopColor="#c9a85c" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <div className="flex flex-col leading-none gap-0.5">
          <span className={`font-serif ${s.title} tracking-[0.08em] text-ink font-semibold`}>
            SCENT
          </span>
          <span className={`${s.sub} tracking-[0.4em] uppercase font-sans font-medium text-gold`}>
            AI
          </span>
        </div>
      )}
    </div>
  );
}
