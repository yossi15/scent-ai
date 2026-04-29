'use client';

import { useEffect, useState } from 'react';
import { Loader2, Search } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  lastSignInAt: string | null;
  tier: string | null;
  subStatus: string | null;
};

const TIER_HE: Record<string, string> = { discovery: 'גילוי', collector: 'אספן', expert: 'מומחה' };

function fmtDate(iso: string | null) {
  if (!iso) return '-';
  return new Date(iso).toLocaleDateString('he-IL', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error);
        setUsers(d.users ?? []);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const q = search.trim().toLowerCase();
  const filtered = users.filter(u => !q || `${u.name} ${u.email}`.toLowerCase().includes(q));

  return (
    <div className="space-y-4">
      <div className="card !p-3 flex items-center gap-2">
        <Search className="w-4 h-4 text-ink-faint" />
        <input
          type="search"
          placeholder="חיפוש לפי שם או אימייל..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-ink text-sm font-hebrew focus:outline-none py-1.5"
        />
      </div>

      <p className="text-ink-faint text-xs font-hebrew">
        {loading ? <Loader2 className="w-3 h-3 inline animate-spin" /> : `${filtered.length} משתמשים`}
      </p>

      {error && <p className="text-red-500 text-xs font-hebrew">{error}</p>}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" dir="rtl">
            <thead className="bg-bg-secondary border-b border-border">
              <tr className="text-right text-ink-muted text-xs font-hebrew">
                <th className="px-3 py-2.5 font-medium">שם</th>
                <th className="px-3 py-2.5 font-medium">אימייל</th>
                <th className="px-3 py-2.5 font-medium">תאריך הרשמה</th>
                <th className="px-3 py-2.5 font-medium">כניסה אחרונה</th>
                <th className="px-3 py-2.5 font-medium">מנוי</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-b border-border hover:bg-bg-secondary/40">
                  <td className="px-3 py-2.5 text-ink font-medium">{u.name}</td>
                  <td className="px-3 py-2.5 text-ink-secondary" dir="ltr">{u.email}</td>
                  <td className="px-3 py-2.5 text-ink-faint text-xs">{fmtDate(u.createdAt)}</td>
                  <td className="px-3 py-2.5 text-ink-faint text-xs">{fmtDate(u.lastSignInAt)}</td>
                  <td className="px-3 py-2.5">
                    {u.tier ? (
                      <span className="text-[10px] font-hebrew font-semibold px-2 py-0.5 rounded-full bg-gold-faint text-gold">
                        {TIER_HE[u.tier] ?? u.tier} · {u.subStatus}
                      </span>
                    ) : (
                      <span className="text-ink-faint text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={5} className="px-3 py-10 text-center text-ink-faint text-sm">אין משתמשים</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
