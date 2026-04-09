'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Star, Clock, Wind, Calendar, Trash2 } from 'lucide-react';
import { fragrances } from '@/data/fragrances';

interface DiaryEntry {
  id: number;
  fragranceId: number;
  date: string;
  occasion: string;
  longevityRating: number;
  sillageRating: number;
  mood: string;
  notes: string;
}

const DIARY_KEY = 'scent-ai-diary';

const sampleEntries: DiaryEntry[] = [
  { id: 1, fragranceId: 8, date: '2026-04-06', occasion: 'ארוחת ערב', longevityRating: 9, sillageRating: 8, mood: 'ביטחון', notes: 'מושלם למסעדה עם נרות. קיבלתי שני מחמאות.' },
  { id: 2, fragranceId: 1, date: '2026-04-05', occasion: 'פגישה עסקית', longevityRating: 7, sillageRating: 6, mood: 'מקצועי', notes: 'נוכחות מצוינת בחדר ישיבות. פתיחת האננס הייתה מושלמת היום.' },
];

const moods = ['ביטחון', 'רומנטי', 'מקצועי', 'רגוע', 'הרפתקני', 'מסתורי'];

export default function Diary() {
  const [entries, setEntries] = useState<DiaryEntry[]>(sampleEntries);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedFragrance, setSelectedFragrance] = useState(fragrances[0]?.id || 1);
  const [occasion, setOccasion] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [entryNotes, setEntryNotes] = useState('');

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DIARY_KEY);
      if (saved) setEntries(JSON.parse(saved));
    } catch {}
  }, []);

  const saveEntry = () => {
    if (!selectedMood && !occasion && !entryNotes) return;

    const newEntry: DiaryEntry = {
      id: Date.now(),
      fragranceId: selectedFragrance,
      date: new Date().toISOString().split('T')[0],
      occasion: occasion || 'יום רגיל',
      longevityRating: 7,
      sillageRating: 6,
      mood: selectedMood || 'רגוע',
      notes: entryNotes || '',
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem(DIARY_KEY, JSON.stringify(updated));

    // Reset form
    setOccasion('');
    setSelectedMood('');
    setEntryNotes('');
    setShowAdd(false);
  };

  const deleteEntry = (id: number) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem(DIARY_KEY, JSON.stringify(updated));
  };

  return (
    <section id="diary" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
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
          <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">
            היומן
          </h2>
          <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
            תעד את השימוש היומי, דרג ביצועים ובנה את הזיכרון הריחני שלך
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowAdd(!showAdd)}
            className={`flex items-center gap-2 px-6 py-2.5 font-hebrew text-sm rounded-lg tracking-wide transition-all ${
              showAdd ? 'btn-gold' : 'btn-outline'
            }`}
          >
            <Plus className="w-4 h-4" />
            תעד את הבושם של היום
          </button>
        </div>

        {showAdd && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 mb-8"
          >
            <h3 className="font-serif text-xl text-ink mb-4 font-semibold">רשומה חדשה</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-ink-muted text-[11px] font-hebrew block mb-1.5 font-medium">בושם</label>
                <select
                  value={selectedFragrance}
                  onChange={(e) => setSelectedFragrance(Number(e.target.value))}
                  className="w-full bg-bg-secondary border border-black/[0.06] text-ink text-sm font-hebrew rounded-lg px-3 py-2.5"
                >
                  {fragrances.map((f) => (
                    <option key={f.id} value={f.id}>{f.name} — {f.house}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-ink-muted text-[11px] font-hebrew block mb-1.5 font-medium">אירוע</label>
                <input
                  type="text"
                  placeholder="למשל, דייט"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-bg-secondary border border-black/[0.06] text-ink text-sm font-hebrew rounded-lg px-3 py-2.5 placeholder:text-ink-faint/50"
                />
              </div>
              <div>
                <label className="text-ink-muted text-[11px] font-hebrew block mb-1.5 font-medium">מצב רוח</label>
                <div className="flex flex-wrap gap-1.5">
                  {moods.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMood(selectedMood === m ? '' : m)}
                      className={`text-[11px] px-3 py-1 rounded-full transition-all cursor-pointer border ${
                        selectedMood === m
                          ? 'bg-gold text-white border-gold'
                          : 'bg-bg-card border-black/[0.06] text-ink-muted hover:border-gold-border hover:text-gold'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-ink-muted text-[11px] font-hebrew block mb-1.5 font-medium">הערות</label>
                <textarea
                  rows={2}
                  placeholder="איך הוא ביצע היום?"
                  value={entryNotes}
                  onChange={(e) => setEntryNotes(e.target.value)}
                  className="w-full bg-bg-secondary border border-black/[0.06] text-ink text-sm font-hebrew rounded-lg px-3 py-2.5 placeholder:text-ink-faint/50 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-start mt-4">
              <button
                onClick={saveEntry}
                className="btn-gold px-6 py-2.5 font-hebrew text-xs tracking-wide rounded-lg"
              >
                שמור רשומה
              </button>
            </div>
          </motion.div>
        )}

        <div className="space-y-3">
          {entries.map((entry, i) => {
            const frag = fragrances.find((f) => f.id === entry.fragranceId);
            if (!frag) return null;
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-faint flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <h4 className="font-serif text-lg text-ink font-semibold leading-tight" dir="ltr">{frag.name}</h4>
                        <p className="text-ink-faint text-[11px] font-sans" dir="ltr">{frag.house}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-ink-faint text-[11px] font-sans flex items-center gap-1 bg-bg-secondary px-2 py-0.5 rounded-full" dir="ltr">
                          <Calendar className="w-3 h-3" />
                          {entry.date}
                        </span>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="text-ink-faint/40 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 my-2.5">
                      <span className="stat-badge"><BookOpen className="w-3 h-3 text-gold/60" />{entry.occasion}</span>
                      <span className="stat-badge"><Star className="w-3 h-3 text-gold/60" />{entry.mood}</span>
                      <span className="stat-badge" dir="ltr"><Clock className="w-3 h-3 text-gold/60" />{entry.longevityRating}/10</span>
                      <span className="stat-badge" dir="ltr"><Wind className="w-3 h-3 text-gold/60" />{entry.sillageRating}/10</span>
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
      </div>
    </section>
  );
}
