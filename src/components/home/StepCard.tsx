import { ReactNode } from 'react';

interface Props {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  mockup: ReactNode;
  highlighted?: boolean;
}

export default function StepCard({
  number,
  eyebrow,
  title,
  description,
  mockup,
  highlighted = false,
}: Props) {
  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{
        border: highlighted
          ? '1px solid rgba(201,169,97,0.22)'
          : '1px solid rgba(255,255,255,0.06)',
        background: 'var(--bg-card)',
      }}
    >
      {/* Mockup area */}
      <div
        className="flex items-center justify-center"
        style={{
          background: 'var(--bg-tertiary)',
          minHeight: 190,
          padding: 20,
        }}
      >
        {mockup}
      </div>

      {/* Content */}
      <div
        style={{
          padding: '16px 18px',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <div
          className="flex items-center gap-2"
          style={{ marginBottom: 8 }}
        >
          <span
            style={{
              fontSize: 8,
              color: 'var(--text-faint)',
              fontWeight: 500,
            }}
          >
            {number}
          </span>
          <span
            style={{
              fontSize: 8,
              color: 'var(--gold)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            {eyebrow}
          </span>
        </div>

        <h3
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: 6,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: 11,
            color: 'var(--text-tertiary)',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
