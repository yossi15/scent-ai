'use client';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const sizes = {
  sm: { title: 'text-base', sub: 'text-[8px]', line: 'h-px', gap: 'gap-1' },
  md: { title: 'text-xl',  sub: 'text-[10px]', line: 'h-px', gap: 'gap-1.5' },
  lg: { title: 'text-3xl', sub: 'text-xs',     line: 'h-[1.5px]', gap: 'gap-2' },
  xl: { title: 'text-3xl sm:text-5xl md:text-6xl', sub: 'text-[11px] sm:text-sm', line: 'h-[1.5px]', gap: 'gap-2 sm:gap-3' },
};

export default function Logo({ size = 'md', showText = true }: Props) {
  const s = sizes[size];

  if (!showText) return null;

  return (
    <div className={`flex flex-col items-center ${s.gap}`} dir="ltr">
      <span
        className={`font-serif ${s.title} font-medium text-ink leading-none`}
        style={{ letterSpacing: '0.45em', paddingRight: '0', paddingLeft: '0.45em' }}
      >
        SCENTORY
      </span>
      <span
        className={`${s.line} w-full bg-gold/60 dark:bg-gold/70`}
        aria-hidden
      />
      <span
        className={`${s.sub} font-sans text-ink-muted uppercase`}
        style={{ letterSpacing: '0.3em' }}
      >
        Know your scent.
      </span>
    </div>
  );
}
