import VerifiedBadge from './shared/VerifiedBadge';
import { Star } from 'lucide-react';

export interface Testimonial {
  quote: string;
  name: string;
  city: string;
  bottles: number;
}

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: Props) {
  const { quote, name, city, bottles } = testimonial;
  const initial = name.charAt(0);

  return (
    <div
      style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 14,
        padding: 16,
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={10}
            fill="var(--gold)"
            color="var(--gold)"
          />
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          fontSize: 12,
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          marginBottom: 14,
        }}
      >
        &quot;{quote}&quot;
      </p>

      {/* Author */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          paddingTop: 12,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background:
              'linear-gradient(135deg, var(--gold-dark), var(--gold))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#050505',
            }}
          >
            {initial}
          </span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: 2,
            }}
          >
            {name}
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>
            {city} · {bottles} בשמים
          </div>
        </div>

        <VerifiedBadge />
      </div>
    </div>
  );
}
