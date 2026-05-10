'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Loader2, Save } from 'lucide-react';
import type { Fragrance } from '@/data/fragrances';

type AdminFragrance = Fragrance & { _source: 'static' | 'override' | 'new' };

type SortKey = 'house' | 'family' | 'price' | 'name';
type Editable = Partial<Fragrance> & { id?: number };

const SOURCE_LABEL: Record<AdminFragrance['_source'], { text: string; cls: string }> = {
  static:   { text: 'קטלוג',  cls: 'bg-bg-secondary text-ink-muted' },
  override: { text: 'עודכן',  cls: 'bg-amber-100 text-amber-700' },
  new:      { text: 'חדש',    cls: 'bg-emerald-100 text-emerald-700' },
};

export default function FragrancesTab() {
  const [list, setList] = useState<AdminFragrance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('house');
  const [houseFilter, setHouseFilter] = useState('');
  const [familyFilter, setFamilyFilter] = useState('');
  const [editing, setEditing] = useState<Editable | null>(null);
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/fragrances');
      const data = await res.json();
      setList(data.fragrances ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'fetch failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const houses = useMemo(() =>
    Array.from(new Set(list.map(f => f.house))).sort(),
    [list]);
  const families = useMemo(() =>
    Array.from(new Set(list.map(f => f.family))).sort(),
    [list]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return list
      .filter(f => !houseFilter || f.house === houseFilter)
      .filter(f => !familyFilter || f.family === familyFilter)
      .filter(f => !q || `${f.name} ${f.house} ${f.family}`.toLowerCase().includes(q))
      .sort((a, b) => {
        if (sortKey === 'price') return a.price - b.price;
        return String(a[sortKey] ?? '').localeCompare(String(b[sortKey] ?? ''));
      });
  }, [list, search, sortKey, houseFilter, familyFilter]);

  const startCreate = () => setEditing({});
  const startEdit = (f: Fragrance) => setEditing({ ...f });

  const remove = async (id: number) => {
    if (!confirm('למחוק את הבושם הזה?')) return;
    const res = await fetch(`/api/admin/fragrances/${id}`, { method: 'DELETE' });
    if (!res.ok) { alert('Delete failed'); return; }
    refresh();
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing.id;
    const url = isNew ? '/api/admin/fragrances' : `/api/admin/fragrances/${editing.id}`;
    const method = isNew ? 'POST' : 'PATCH';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'save failed');
      setEditing(null);
      refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="card !p-3 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-ink-faint" />
          <input
            type="search"
            placeholder="חיפוש: שם, בית, משפחה..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-ink text-sm font-hebrew focus:outline-none py-1.5"
          />
        </div>

        <select
          value={houseFilter}
          onChange={(e) => setHouseFilter(e.target.value)}
          className="bg-bg-secondary border border-border rounded-lg px-2.5 py-1.5 text-xs font-hebrew text-ink"
        >
          <option value="">כל הבתים</option>
          {houses.map(h => <option key={h} value={h}>{h}</option>)}
        </select>

        <select
          value={familyFilter}
          onChange={(e) => setFamilyFilter(e.target.value)}
          className="bg-bg-secondary border border-border rounded-lg px-2.5 py-1.5 text-xs font-hebrew text-ink"
        >
          <option value="">כל המשפחות</option>
          {families.map(f => <option key={f} value={f}>{f}</option>)}
        </select>

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="bg-bg-secondary border border-border rounded-lg px-2.5 py-1.5 text-xs font-hebrew text-ink"
        >
          <option value="house">מיון: בית בושם</option>
          <option value="family">מיון: משפחה</option>
          <option value="price">מיון: מחיר</option>
          <option value="name">מיון: שם</option>
        </select>

        <button
          onClick={startCreate}
          className="flex items-center gap-1.5 bg-[#0D0D0D] text-white text-xs font-hebrew font-semibold px-3 py-2 rounded-lg hover:bg-[#1a1a1a]"
        >
          <Plus className="w-3.5 h-3.5" /> בושם חדש
        </button>
      </div>

      {/* Stats */}
      <p className="text-ink-faint text-xs font-hebrew">
        {loading ? 'טוען...' : `מציג ${filtered.length} מתוך ${list.length}`}
      </p>

      {error && <p className="text-red-500 text-xs font-hebrew">{error}</p>}

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" dir="rtl">
            <thead className="bg-bg-secondary border-b border-border">
              <tr className="text-right text-ink-muted text-xs font-hebrew">
                <th className="px-3 py-2.5 font-medium">מקור</th>
                <th className="px-3 py-2.5 font-medium">שם</th>
                <th className="px-3 py-2.5 font-medium">בית בושם</th>
                <th className="px-3 py-2.5 font-medium">משפחה</th>
                <th className="px-3 py-2.5 font-medium">מחיר</th>
                <th className="px-3 py-2.5 font-medium">שנה</th>
                <th className="px-3 py-2.5 font-medium w-24"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => {
                const src = SOURCE_LABEL[f._source];
                return (
                  <tr key={f.id} className="border-b border-border hover:bg-bg-secondary/40">
                    <td className="px-3 py-2.5">
                      <span className={`text-[10px] font-hebrew font-semibold px-2 py-0.5 rounded-full ${src.cls}`}>
                        {src.text}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-ink font-medium" dir="ltr">{f.name}</td>
                    <td className="px-3 py-2.5 text-ink-secondary" dir="ltr">{f.house}</td>
                    <td className="px-3 py-2.5 text-ink-secondary text-xs" dir="ltr">{f.family}</td>
                    <td className="px-3 py-2.5 text-gold font-semibold" dir="ltr">₪{f.price.toLocaleString()}</td>
                    <td className="px-3 py-2.5 text-ink-faint text-xs" dir="ltr">{f.year}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => startEdit(f)} aria-label="ערוך" className="p-1.5 text-ink-muted hover:text-gold rounded">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => remove(f.id)} aria-label="מחק" className="p-1.5 text-ink-muted hover:text-red-500 rounded">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      {editing && (
        <EditModal
          value={editing}
          onChange={setEditing}
          onSave={save}
          onClose={() => setEditing(null)}
          saving={saving}
        />
      )}
    </div>
  );
}

// ── Edit modal ───────────────────────────────────────────────────────────────
function EditModal({
  value, onChange, onSave, onClose, saving,
}: {
  value: Editable;
  onChange: (v: Editable) => void;
  onSave: () => void;
  onClose: () => void;
  saving: boolean;
}) {
  const set = <K extends keyof Editable>(k: K, v: Editable[K]) => onChange({ ...value, [k]: v });
  const isNew = !value.id;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bg-card rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-border"
        dir="rtl"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl text-ink font-semibold">
            {isNew ? 'בושם חדש' : `עריכה: ${value.name}`}
          </h2>
          <button onClick={onClose} className="p-1 text-ink-muted hover:text-ink rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="שם" value={value.name ?? ''} onChange={v => set('name', v)} />
          <Field label="בית בושם" value={value.house ?? ''} onChange={v => set('house', v)} />
          <Field label="שנה" type="number" value={String(value.year ?? '')} onChange={v => set('year', parseInt(v) || 0)} />
          <Field label="ריכוז" value={value.concentration ?? ''} onChange={v => set('concentration', v)} placeholder="EDP / EDT / Parfum" />
          <Field label="מחיר (₪)" type="number" value={String(value.price ?? '')} onChange={v => set('price', parseInt(v) || 0)} />
          <Field label="גודל" value={value.size ?? ''} onChange={v => set('size', v)} placeholder="100ml" />
          <Field label="משפחה" value={value.family ?? ''} onChange={v => set('family', v)} />
          <Field label="מגדר" value={value.gender ?? ''} onChange={v => set('gender', v)} placeholder="Masculine / Feminine / Unisex" />
          <Field label="עמידות (1-10)" type="number" value={String(value.longevity ?? '')} onChange={v => set('longevity', parseInt(v) || 0)} />
          <Field label="הקרנה (1-10)" type="number" value={String(value.sillage ?? '')} onChange={v => set('sillage', parseInt(v) || 0)} />
          <Field label="דירוג (0-5)" type="number" value={String(value.rating ?? '')} onChange={v => set('rating', parseFloat(v) || 0)} />
          <Field label="URL תמונה" value={value.image ?? ''} onChange={v => set('image', v)} className="sm:col-span-2" />
          <Field label="תיאור" value={value.description ?? ''} onChange={v => set('description', v)} className="sm:col-span-2" textarea />
          <Field
            label="תגיות (מופרדות בפסיק)"
            value={(value.tags ?? []).join(', ')}
            onChange={v => set('tags', v.split(',').map(s => s.trim()).filter(Boolean))}
            className="sm:col-span-2"
          />
        </div>

        <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-border">
          <button onClick={onClose} className="text-ink-muted text-sm font-hebrew px-4 py-2 hover:text-ink">
            ביטול
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-1.5 bg-[#0D0D0D] text-white text-sm font-hebrew font-semibold px-4 py-2 rounded-lg hover:bg-[#1a1a1a] disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            שמור
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = 'text', placeholder, textarea, className = '',
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; textarea?: boolean; className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-ink-muted text-[11px] font-hebrew mb-1 block">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm font-hebrew text-ink focus:outline-none focus:border-gold"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm font-hebrew text-ink focus:outline-none focus:border-gold"
          dir={type === 'number' ? 'ltr' : 'auto'}
        />
      )}
    </label>
  );
}
