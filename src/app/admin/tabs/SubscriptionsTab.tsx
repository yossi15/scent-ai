'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

type Sub = {
  id: string;
  name: string;
  email: string;
  tier: string | null;
  tierHebrew: string;
  status: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  amount: number;
  currency: string;
};

const STATUS_LABEL: Record<string, { text: string; cls: string }> = {
  active:   { text: 'פעיל',           cls: 'bg-emerald-100 text-emerald-700' },
  trialing: { text: 'ניסיון',         cls: 'bg-blue-100 text-blue-700' },
  past_due: { text: 'תשלום נכשל',     cls: 'bg-amber-100 text-amber-700' },
  canceled: { text: 'בוטל',           cls: 'bg-bg-secondary text-ink-muted' },
  incomplete: { text: 'חסר',          cls: 'bg-bg-secondary text-ink-muted' },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('he-IL', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function SubscriptionsTab() {
  const [list, setList] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/subscriptions')
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error);
        setList(d.subscriptions ?? []);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-ink-faint text-xs font-hebrew">
        {loading ? <Loader2 className="w-3 h-3 inline animate-spin" /> : `${list.length} מנויים`}
      </p>
      {error && <p className="text-red-500 text-xs font-hebrew">{error}</p>}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" dir="rtl">
            <thead className="bg-bg-secondary border-b border-border">
              <tr className="text-right text-ink-muted text-xs font-hebrew">
                <th className="px-3 py-2.5 font-medium">שם</th>
                <th className="px-3 py-2.5 font-medium">אימייל</th>
                <th className="px-3 py-2.5 font-medium">חבילה</th>
                <th className="px-3 py-2.5 font-medium">חיוב הבא</th>
                <th className="px-3 py-2.5 font-medium">סכום</th>
                <th className="px-3 py-2.5 font-medium">סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {list.map(s => {
                const st = STATUS_LABEL[s.status] ?? { text: s.status, cls: 'bg-bg-secondary text-ink-muted' };
                return (
                  <tr key={s.id} className="border-b border-border hover:bg-bg-secondary/40">
                    <td className="px-3 py-2.5 text-ink font-medium">{s.name}</td>
                    <td className="px-3 py-2.5 text-ink-secondary" dir="ltr">{s.email}</td>
                    <td className="px-3 py-2.5 text-ink-secondary">{s.tierHebrew}</td>
                    <td className="px-3 py-2.5 text-ink-faint text-xs">
                      {fmtDate(s.currentPeriodEnd)}
                      {s.cancelAtPeriodEnd && <span className="text-amber-600 mr-1">(יבוטל)</span>}
                    </td>
                    <td className="px-3 py-2.5 text-gold font-semibold" dir="ltr">
                      ₪{(s.amount / 100).toLocaleString()}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[10px] font-hebrew font-semibold px-2 py-0.5 rounded-full ${st.cls}`}>
                        {st.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {!loading && list.length === 0 && (
                <tr><td colSpan={6} className="px-3 py-10 text-center text-ink-faint text-sm">אין מנויים פעילים</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
