'use client';

import { useEffect, useState } from 'react';

interface CounterData {
  show: boolean;
  count: number;
}

export default function LiveCounter() {
  const [data, setData] = useState<CounterData | null>(null);

  useEffect(() => {
    fetch('/api/stats/weekly-signups')
      .then((r) => r.json())
      .then((d: CounterData) => setData(d))
      .catch(() => setData({ show: false, count: 0 }));
  }, []);

  if (!data?.show) return null;

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full"
      style={{
        background: 'rgba(201,169,97,0.08)',
        border: '1px solid rgba(201,169,97,0.25)',
        padding: '6px 12px',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--gold)',
          display: 'inline-block',
          animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 500 }}>
        {data.count.toLocaleString('he-IL')} הצטרפו השבוע
      </span>
    </div>
  );
}
