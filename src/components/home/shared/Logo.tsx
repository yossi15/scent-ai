interface Props {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { main: 11, spacing: '4px', sub: 5, subSpacing: '2.5px' },
  md: { main: 13, spacing: '5px', sub: 6, subSpacing: '3px' },
  lg: { main: 16, spacing: '6px', sub: 7, subSpacing: '3.5px' },
};

export default function Logo({ size = 'md', className = '' }: Props) {
  const s = sizes[size];

  return (
    <div
      className={`inline-flex flex-col items-center gap-0 ${className}`}
      style={{ lineHeight: 1 }}
    >
      <span
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: s.main,
          letterSpacing: s.spacing,
          color: 'var(--text-primary)',
          fontWeight: 400,
        }}
      >
        SCENTORY
      </span>

      <div
        style={{
          width: '70%',
          height: 1,
          background: 'var(--gold)',
          opacity: 0.6,
          marginTop: 4,
          marginBottom: 4,
        }}
      />

      <span
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: s.sub,
          letterSpacing: s.subSpacing,
          color: '#999',
          fontWeight: 400,
        }}
      >
        KNOW YOUR SCENT.
      </span>
    </div>
  );
}
