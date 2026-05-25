interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function GoldBadge({ children, className = '' }: Props) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full ${className}`}
      style={{
        background: 'rgba(201,169,97,0.08)',
        border: '1px solid rgba(201,169,97,0.25)',
        padding: '6px 12px',
      }}
    >
      <span
        className="rounded-full"
        style={{
          width: 6,
          height: 6,
          background: 'var(--gold)',
          flexShrink: 0,
          animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        }}
      />
      <span
        style={{
          fontSize: '10px',
          color: 'var(--gold)',
          fontWeight: 500,
        }}
      >
        {children}
      </span>
    </div>
  );
}
