interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function EyebrowText({ children, className = '' }: Props) {
  return (
    <p
      className={className}
      style={{
        fontSize: '9px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        fontWeight: 500,
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}
