'use client';

import { useEffect, useState } from 'react';
import { Loader2, Check, X, Clock } from 'lucide-react';

type SampleReq = {
  id: number;
  email: string;
  name: string | null;
  fragrance_name: string;
  brand: string | null;
  status: 'pending' | 'handled' | 'rejected';
  created_at: string;
};

const STATUS_LABEL: Record<SampleReq['status'], { text: string; cls: string }> = {
  pending:  { text: 'ממתין', cls: 'bg-amber-100 text-amber-700' },
  handled:  { text: 'טופל',  cls: 'bg-emerald-100 text-emerald-700' },
  rejected: { text: 'נדחה',  cls: 'bg-bg-secondary text-ink-muted' },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('he-IL', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function SampleRequestsTab() {
  const [list, setList] = useState<SampleReq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/admin/sample-requests');
      const d = await r.json();
      if (d.error) throw new Error(d.error);
      setList(d.requests ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'fetch failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const setStatus = async (id: number, status: SampleReq['status']) => {
    setList(prev => prev.map(r => r.id === id ? { ...r, status } : r)); // optimistic
    const res = await fetch(`/api/admin/sample-requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) { alert('Update failed'); refresh(); }
  };

  return (
    <div className="space-y-4">
      <p className="text-ink-faint text-xs font-hebrew">
        {loading ? <Loader2 className="w-3 h-3 inline animate-spin" /> : `${list.length} בקשות`}
      </p>
      {error && <p className="text-red-500 text-xs font-hebrew">{error}</p>}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" dir="rtl">
            <thead className="bg-bg-secondary border-b border-border">
              <tr className="text-right text-ink-muted text-xs font-hebrew">
                <th className="px-3 py-2.5 font-medium">בושם</th>
                <th className="px-3 py-2.5 font-medium">שם</th>
                <th className="px-3 py-2.5 font-medium">אימייל</th>
                <th className="px-3 py-2.5 font-medium">תאריך</th>
                <th className="px-3 py-2.5 font-medium">סטטוס</th>
                <th className="px-3 py-2.5 font-medium w-32"></th>
              </tr>
            </thead>
            <tbody>
              {list.map(r => {
                const st = STATUS_LABEL[r.status];
                return (
                  <tr key={r.id} className="border-b border-border hover:bg-bg-secondary/40">
                    <td className="px-3 py-2.5">
                      <div className="text-ink font-medium" dir="ltr">{r.fragrance_name}</div>
                      {r.brand && <div className="text-ink-faint text-[11px]" dir="ltr">{r.brand}</div>}
                    </td>
                    <td className="px-3 py-2.5 text-ink-secondary">{r.name ?? '-'}</td>
                    <td className="px-3 py-2.5 text-ink-secondary text-xs" dir="ltr">{r.email}</td>
                    <td className="px-3 py-2.5 text-ink-faint text-xs">{fmtDate(r.created_at)}</td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[10px] font-hebrew font-semibold px-2 py-0.5 rounded-full ${st.cls}`}>
                        {st.text}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => setStatus(r.id, 'handled')}
                          aria-label="סמן כטופל"
                          className="p-1.5 text-ink-muted hover:text-emerald-600 rounded"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setStatus(r.id, 'pending')}
                          aria-label="החזר להמתנה"
                          className="p-1.5 text-ink-muted hover:text-amber-600 rounded"
                        >
                          <Clock className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setStatus(r.id, 'rejected')}
                          aria-label="דחה"
                          className="p-1.5 text-ink-muted hover:text-red-500 rounded"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!loading && list.length === 0 && (
                <tr><td colSpan={6} className="px-3 py-10 text-center text-ink-faint text-sm">אין בקשות דגימה</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
