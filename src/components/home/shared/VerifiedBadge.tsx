import { Check } from 'lucide-react';

export default function VerifiedBadge() {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full"
      style={{
        background: 'rgba(201,169,97,0.08)',
        border: '1px solid rgba(201,169,97,0.2)',
        padding: '2px 8px',
      }}
    >
      <Check size={7} color="var(--gold)" strokeWidth={2.5} />
      <span style={{ fontSize: 8, color: 'var(--gold)', fontWeight: 500 }}>
        מאומת
      </span>
    </div>
  );
}
