'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Clock, Wind, Calendar, X, Droplets, LogIn } from 'lucide-react';
import { useAuth, SignInButton } from '@clerk/nextjs';
import { fragrances, type Fragrance } from '@/data/fragrances';

// ── Types ─────────────────────────────────────────────────────────────────────
interface DiaryEntry {
  id: string;          // UUID from DB  (or temp string for optimistic)
  fragranceId: number | null;
  fragranceName: string;
  brand: string;
  date: string;
  occasion: string;
  longevityRating: number;
  sillageRating: number;
  notes: string;
}

const COLLECTION_KEY = 'scent-ai-collection';

const occasions = [
  { value: 'daily',    label: 'יומיומי', emoji: '☀️' },
  { value: 'evening',  label: 'ערב',     emoji: '🌙' },
  { value: 'business', label: 'עסקי',    emoji: '💼' },
  { value: 'romantic', label: 'רומנטי',  emoji: '❤️' },
];

// ── Rating slider ─────────────────────────────────────────────────────────────
function RatingSlider({ value, onChange, label }: {
  value: number; onChange: (v: number) => void; label: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-ink-muted text-[11px] font-hebrew font-medium">{label}</span>
        <span className="text-gold text-xs font-sans font-semibold tabular-nums">{value} / 10</span>
      </div>
      <input
        type="range" min={1} max={10} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full cursor-pointer accent-[#B8965E]"
        style={{ background: `linear-gradient(to right, #B8965E ${(value - 1) / 9 * 100}%, #e5e0d8 ${(value - 1) / 9 * 100}%)` }}
      />
      <div className="flex justify-between text-ink-faint/40 text-[9px] font-sans mt-1 px-0.5">
        <span>1</span><span>5</span><span>10</span>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Diary() {
  const { isSignedIn, isLoaded } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [availableFragrances, setAvailableFragrances] = useState<Fragrance[]>(fragrances);
  const [fromCollection, setFromCollection] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [selectedFragId, setSelectedFragId] = useState<number>(fragrances[0]?.id ?? 1);
  const [occasion, setOccasion] = useState('daily');
  const [longevity, setLongevity] = useState(7);
  const [sillage, setSillage] = useState(6);
  const [notes, setNotes] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [saving, setSaving] = useState(false);

  // Map DB row → DiaryEntry
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowToEntry = (row: any): DiaryEntry => ({
    id:              row.id,
    fragranceId:     row.fragrance_id ?? null,
    fragranceName:   row.fragrance_name,
    brand:           row.brand,
    date:            row.date,
    occasion:        row.occasion,
    longevityRating: row.longevity,
    sillageRating:   row.projection,
    notes:           row.review ?? '',
  });

  // Load entries from API (signed in) or localStorage (fallback)
  const loadEntries = useCallback(async () => {
    if (!isLoaded) return;
    if (isSignedIn) {
      setLoading(true);
      try {
        const res = await fetch('/api/diary');
        const data = await res.json();
        if (data.entries) setEntries((data.entries as unknown[]).map(rowToEntry));
      } catch {}
      setLoading(false);
    }
    // not signed in → nothing to show (diary is auth-gated)
  }, [isLoaded, isSignedIn]);

  // Load collection for fragrance dropdown
  useEffect(() => {
    if (!isLoaded) return;
    loadEntries();

    if (isSignedIn) {
      fetch('/api/collection')
        .then(r => r.json())
        .then(data => {
          if (data.ids?.length) {
            const collFrags = fragrances.filter(f => (data.ids as number[]).includes(f.id));
            if (collFrags.length) {
              setAvailableFragrances(collFrags);
              setSelectedFragId(collFrags[0].id);
              setFromCollection(true);
              return;
            }
          }
          setAvailableFragrances(fragrances);
        })
        .catch(() => setAvailableFragrances(fragrances));
    } else {
      // fallback: read collection from localStorage
      try {
        const saved = localStorage.getItem(COLLECTION_KEY);
        if (saved) {
          const ids: number[] = JSON.parse(saved);
          const collFrags = fragrances.filter(f => ids.includes(f.id));
          if (collFrags.length) {
            setAvailableFragrances(collFrags);
            setSelectedFragId(collFrags[0].id);
            setFromCollection(true);
            return;
          }
        }
      } catch {}
      setAvailableFragrances(fragrances);
    }
  }, [isLoaded, isSignedIn, loadEntries]);

  const openModal = () => {
    setEntryDate(new Date().toISOString().split('T')[0]);
    setOccasion('daily');
    setLongevity(7);
    setSillage(6);
    setNotes('');
    setShowModal(true);
  };

  const saveEntry = async () => {
    const frag = fragrances.find(f => f.id === selectedFragId);
    if (!frag) return;
    setSaving(true);
    try {
      const res = await fetch('/api/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fragranceId:   frag.id,
          fragranceName: frag.name,
          brand:         frag.house,
          occasion,
          longevity,
          projection:    sillage,
          review:        notes.trim(),
          date:          entryDate || new Date().toISOString().split('T')[0],
        }),
      });
      const data = await res.json();
      if (data.id) {
        const newEntry: DiaryEntry = {
          id:              data.id,
          fragranceId:     frag.id,
          fragranceName:   frag.name,
          brand:           frag.house,
          date:            entryDate || new Date().toISOString().split('T')[0],
          occasion,
          longevityRating: longevity,
          sillageRating:   sillage,
          notes:           notes.trim(),
        };
        setEntries(prev =>
          [newEntry, ...prev].sort((a, b) => b.date.localeCompare(a.date))
        );
      }
    } catch {}
    setSaving(false);
    setShowModal(false);
  };

  const deleteEntry = async (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
    try {
      await fetch(`/api/diary?id=${id}`, { method: 'DELETE' });
    } catch {}
  };

  // ── Auth gate ──────────────────────────────────────────────────────────────
  if (isLoaded && !isSignedIn) {
    return (
      <section id="diary" className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
              PERSONAL ARCHIVE
            </p>
            <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">היומן</h2>
            <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
              תעד את השימוש היומי, דרג ביצועים ובנה את הזיכרון הריחני שלך
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-gold p-10 max-w-md mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-gold-faint flex items-center justify-center mx-auto mb-5">
              <BookOpen className="w-8 h-8 text-gold/60" />
            </div>
            <h3 className="font-serif text-2xl text-ink font-semibold mb-2">
              היומן שלך מחכה
            </h3>
            <p className="text-ink-muted text-sm font-hebrew font-light mb-6 leading-relaxed">
              כנס לחשבון כדי לתעד בשמים, לדרג ביצועים ולשמור את הזיכרונות הריחניים שלך בענן
            </p>
            <SignInButton mode="modal">
              <button className="btn-gold flex items-center gap-2 px-6 py-3 font-hebrew text-sm rounded-lg mx-auto">
                <LogIn className="w-4 h-4" />
                כניסה / הרשמה חינם
              </button>
            </SignInButton>
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Full diary UI (signed in) ──────────────────────────────────────────────
  return (
    <section id="diary" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            PERSONAL ARCHIVE
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">היומן</h2>
          <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
            תעד את השימוש היומי, דרג ביצועים ובנה את הזיכרון הריחני שלך
          </p>
        </motion.div>

        {/* CTA button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={openModal}
            className="btn-gold flex items-center gap-2 px-6 py-3 font-hebrew text-sm rounded-lg tracking-wide"
          >
            <Plus className="w-4 h-4" />
            תעד את הבושם של היום
          </button>
        </div>

        {/* ── Modal ── */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              key="diary-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(10,8,5,0.6)', backdropFilter: 'blur(6px)' }}
              onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
            >
              <motion.div
                key="diary-modal-panel"
                initial={{ opacity: 0, y: 48, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg bg-[#FAF8F4] sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-black/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gold-faint flex items-center justify-center">
                      <BookOpen className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <h3 className="font-serif text-lg text-ink font-semibold">רשומה חדשה</h3>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-bg-secondary text-ink-muted hover:text-ink transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Modal body */}
                <div className="px-6 py-5 space-y-5 max-h-[72vh] overflow-y-auto">

                  {/* Date + Fragrance */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-ink-muted text-[11px] font-hebrew block mb-1.5 font-medium">תאריך</label>
                      <input
                        type="date"
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
                        className="w-full bg-bg-secondary border border-black/[0.06] text-ink text-sm rounded-lg px-3 py-2.5 font-sans focus:outline-none focus:border-gold-border transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-ink-muted text-[11px] font-hebrew block mb-1.5 font-medium">
                        בושם{fromCollection && <span className="text-gold/70 mr-1">(מהאוסף שלך)</span>}
                      </label>
                      <select
                        value={selectedFragId}
                        onChange={(e) => setSelectedFragId(Number(e.target.value))}
                        dir="ltr"
                        className="w-full bg-bg-secondary border border-black/[0.06] text-ink text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-gold-border transition-colors"
                      >
                        {availableFragrances.map((f) => (
                          <option key={f.id} value={f.id}>{f.name} - {f.house}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Occasion tiles */}
                  <div>
                    <label className="text-ink-muted text-[11px] font-hebrew block mb-2 font-medium">אירוע</label>
                    <div className="grid grid-cols-4 gap-2">
                      {occasions.map((occ) => (
                        <button
                          key={occ.value}
                          onClick={() => setOccasion(occ.value)}
                          className={`flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl border transition-all duration-150 ${
                            occasion === occ.value
                              ? 'bg-gold-faint border-gold-border text-gold shadow-sm'
                              : 'bg-bg-secondary border-black/[0.06] text-ink-muted hover:border-gold-border hover:text-gold'
                          }`}
                        >
                          <span className="text-xl leading-none">{occ.emoji}</span>
                          <span className="text-[10px] font-hebrew font-medium">{occ.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="bg-bg-secondary rounded-xl px-4 py-4 space-y-4">
                    <RatingSlider value={longevity} onChange={setLongevity} label="⏱ עמידות" />
                    <div className="border-t border-black/[0.04]" />
                    <RatingSlider value={sillage} onChange={setSillage} label="💨 הקרנה" />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-ink-muted text-[11px] font-hebrew block mb-1.5 font-medium">הערה חופשית</label>
                    <textarea
                      rows={3}
                      placeholder="איך הוא ביצע היום? קיבלת מחמאות? איפה לבשת?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-bg-secondary border border-black/[0.06] text-ink text-sm font-hebrew rounded-lg px-3 py-2.5 placeholder:text-ink-faint/50 resize-none focus:outline-none focus:border-gold-border transition-colors leading-relaxed"
                    />
                  </div>
                </div>

                {/* Modal footer */}
                <div className="px-6 py-4 border-t border-black/[0.06] flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 font-hebrew text-sm text-ink-muted border border-black/[0.06] rounded-lg hover:bg-bg-secondary transition-colors"
                  >
                    ביטול
                  </button>
                  <button
                    onClick={saveEntry}
                    disabled={saving}
                    className="flex-1 btn-gold py-2.5 font-hebrew text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'שומר...' : 'שמור רשומה'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Entry list ── */}
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="card p-5 h-24 animate-pulse bg-bg-secondary" />
              ))}
            </motion.div>
          ) : entries.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold-faint flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gold/30" />
              </div>
              <p className="text-ink-muted text-sm font-hebrew font-light">היומן שלך ריק עדיין</p>
              <p className="text-ink-faint text-xs font-hebrew font-light mt-1 opacity-60">
                לחץ על הכפתור למעלה כדי לתעד את הבושם הראשון שלך
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, i) => {
                const frag = entry.fragranceId
                  ? fragrances.find(f => f.id === entry.fragranceId)
                  : null;
                const occ = occasions.find(o => o.value === entry.occasion);
                const displayName = frag?.name ?? entry.fragranceName;
                const displayHouse = frag?.house ?? entry.brand;
                const imgSrc = frag?.image ?? null;

                return (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -24, scale: 0.97 }}
                    transition={{ duration: 0.32, delay: Math.min(i * 0.05, 0.25) }}
                    className="card p-5"
                  >
                    <div className="flex items-start gap-4">
                      {/* Bottle thumbnail */}
                      <div className="w-11 h-14 rounded-xl overflow-hidden bg-gold-faint shrink-0 flex items-center justify-center">
                        {imgSrc ? (
                          <img src={imgSrc} alt={displayName} className="w-full h-full object-cover object-top" />
                        ) : (
                          <Droplets className="w-5 h-5 text-gold/30" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Name row */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div>
                            <h4 className="font-serif text-base text-ink font-semibold leading-tight" dir="ltr">
                              {displayName}
                            </h4>
                            <p className="text-ink-faint text-[11px] font-sans" dir="ltr">{displayHouse}</p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-ink-faint text-[11px] font-sans flex items-center gap-1 bg-bg-secondary px-2 py-0.5 rounded-full">
                              <Calendar className="w-3 h-3 shrink-0" />
                              <span dir="ltr">{entry.date}</span>
                            </span>
                            <button
                              onClick={() => deleteEntry(entry.id)}
                              className="w-6 h-6 flex items-center justify-center rounded-full text-ink-faint/40 hover:text-red-400 hover:bg-red-50 transition-all"
                              aria-label="מחק רשומה"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 my-2">
                          {occ && (
                            <span className="stat-badge">
                              <span className="text-xs">{occ.emoji}</span>
                              {occ.label}
                            </span>
                          )}
                          <span className="stat-badge">
                            <Clock className="w-3 h-3 text-gold/60 shrink-0" />
                            <span dir="ltr">עמידות {entry.longevityRating}/10</span>
                          </span>
                          <span className="stat-badge">
                            <Wind className="w-3 h-3 text-gold/60 shrink-0" />
                            <span dir="ltr">הקרנה {entry.sillageRating}/10</span>
                          </span>
                        </div>

                        {entry.notes && (
                          <p className="text-ink-muted text-sm font-hebrew leading-relaxed font-light">
                            &ldquo;{entry.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
