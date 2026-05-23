'use client';

import { Shield, CheckCircle, X, Star } from 'lucide-react';

const ITEMS = [
  { label: 'בשמים אותנטיים בלבד', icon: Shield },
  { label: 'תשלום מאובטח',        icon: CheckCircle },
  { label: 'ביטול בכל עת',        icon: X },
  { label: 'ביקורות מאומתות',     icon: Star },
];

export default function TrustStrip() {
  return (
    <aside
      className="py-10 px-6"
      style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
      aria-label="Trust signals"
    >
      <ul
        className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-4"
        role="list"
      >
        {ITEMS.map(({ label, icon: Icon }) => (
          <li
            key={label}
            className="flex items-center gap-2"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
            }}
          >
            <Icon className="w-3 h-3 text-gold/60 shrink-0" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
