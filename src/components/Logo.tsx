'use client';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const sizes = {
  sm: { svg: 28, text: 'text-base' },
  md: { svg: 36, text: 'text-xl' },
  lg: { svg: 48, text: 'text-3xl' },
  xl: { svg: 64, text: 'text-5xl' },
};

export default function Logo({ size = 'md', showText = true }: Props) {
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5" dir="ltr">
      <svg
        width={s.svg}
        height={s.svg}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="url(#goldGrad)"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <path
          d="M32 10C32 10 22 18 22 26C22 30.5 25 33 28 34C31 35 34 37 34 41C34 46 32 50 32 54"
          stroke="url(#goldGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="22" cy="26" r="2" fill="#9a7b3f" opacity="0.6" />
        <circle cx="34" cy="41" r="2" fill="#b8944f" opacity="0.6" />
        <circle cx="32" cy="54" r="1.5" fill="#9a7b3f" opacity="0.4" />
        <circle cx="32" cy="10" r="2" fill="#b8944f" opacity="0.7" />
        <defs>
          <linearGradient id="goldGrad" x1="16" y1="10" x2="48" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b8944f" />
            <stop offset="0.5" stopColor="#9a7b3f" />
            <stop offset="1" stopColor="#b8944f" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-serif ${s.text} tracking-wide text-ink font-medium`}>
            SCENT
          </span>
          <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-sans font-light">
            AI
          </span>
        </div>
      )}
    </div>
  );
}
