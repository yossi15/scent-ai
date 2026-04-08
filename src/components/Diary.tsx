'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Star, Clock, Wind, Calendar } from 'lucide-react';
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

const sampleEntries: DiaryEntry[] = [
  {
    id: 1,
    fragranceId: 8,
    date: '2026-04-06',
    occasion: 'ארוחת ערב',
    longevityRating: 9,
    sillageRating: 8,
    mood: 'ביטחון',
    notes: 'מושלם למסעדה עם נרות. קיבלתי שני מחמאות.',
  },
  {
    id: 2,
    fragranceId: 1,
    date: '2026-04-05',
    occasion: 'פגישה עסקית',
    longevityRating: 7,
    sillageRating: 6,
    mood: 'מקצועי',
    notes: 'נוכחות מצוינת בחדר ישיבות. פתיחת האננס הייתה מושלמת היום.',
  },
  {
    id: 3,
    fragranceId: 3,
    date: '2026-04-04',
    occasion: 'סוף שבוע',
    longevityRating: 9,
    sillageRating: 7,
    mood: 'רגוע',
    notes: 'חום של דבש וטבק בערב קריר. נוחות טהורה בבקבוק.',
  },
];

const moods = ['ביטחון', 'רומנטי', 'מקצועי', 'רגוע', 'הרפתקני', 'מסתורי'];

export default function Diary() {
  const [entries] = useState<DiaryEntry[]>(sampleEntries);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <section id="diary" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold/60 text-[10px] tracking-[0.3em] uppercase font-sans mb-2">
            PERSONAL ARCHIVE
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-gradient mb-3">
            היומן
          </h2>
          <p className="text-ink-muted/60 text-sm font-hebrew max-w-md mx-auto font-light">
            תעד את השימוש היומי, דרג ביצועים ובנה את הזיכרון הריחני שלך
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-2 px-6 py-2.5 border border-gold/25 text-gold text-xs font-hebrew tracking-wide hover:bg-gold/5 transition-colors duration-300 rounded-sm"
          >
            <Plus className="w-3 h-3" />
            תעד את הבושם של היום
          </button>
        </div>

        {showAdd && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 mb-8"
          >
            <h3 className="font-serif text-lg text-ink mb-4">רשומה חדשה</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-ink-muted/50 text-[10px] tracking-wider font-hebrew block mb-1">
                  בושם
                </label>
                <select className="w-full bg-shell-light border border-gold/10 text-ink text-sm font-hebrew rounded-lg px-3 py-2 focus:outline-none focus:border-gold/30">
                  {fragrances.map((f) => (
                    <option key={f.id} value={f.id}>{f.name} — {f.house}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-ink-muted/50 text-[10px] tracking-wider font-hebrew block mb-1">
                  אירוע
                </label>
                <input
                  type="text"
                  placeholder="למשל, דייט"
                  className="w-full bg-shell-light border border-gold/10 text-ink text-sm font-hebrew rounded-lg px-3 py-2 focus:outline-none focus:border-gold/30 placeholder:text-ink-muted/25"
                />
              </div>
              <div>
                <label className="text-ink-muted/50 text-[10px] tracking-wider font-hebrew block mb-1">
                  מצב רוח
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {moods.map((m) => (
                    <button
                      key={m}
                      className="text-[10px] px-2.5 py-1 border border-ink/8 text-ink-muted/50 font-hebrew rounded-full hover:border-gold/25 hover:text-gold transition-colors"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-ink-muted/50 text-[10px] tracking-wider font-hebrew block mb-1">
                  הערות
                </label>
                <textarea
                  rows={2}
                  placeholder="איך הוא ביצע היום?"
                  className="w-full bg-shell-light border border-gold/10 text-ink text-sm font-hebrew rounded-lg px-3 py-2 focus:outline-none focus:border-gold/30 placeholder:text-ink-muted/25 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-start mt-4">
              <button className="px-6 py-2.5 gold-gradient-bg text-white font-hebrew font-medium text-xs tracking-wide hover:opacity-90 transition-opacity rounded-sm">
                שמור רשומה
              </button>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          {entries.map((entry, i) => {
            const frag = fragrances.find((f) => f.id === entry.fragranceId);
            if (!frag) return null;
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card glass-card-hover rounded-xl p-5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0">{frag.image}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h4 className="font-serif text-lg text-ink" dir="ltr">{frag.name}</h4>
                        <p className="text-ink-muted/40 text-xs font-sans" dir="ltr">{frag.house}</p>
                      </div>
                      <div className="flex items-center gap-1 text-ink-muted/40 text-xs font-sans shrink-0" dir="ltr">
                        <Calendar className="w-3 h-3" />
                        {entry.date}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 my-3">
                      <span className="flex items-center gap-1 text-xs font-hebrew text-ink-muted/60">
                        <BookOpen className="w-3 h-3 text-gold/50" />
                        {entry.occasion}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-hebrew text-ink-muted/60">
                        <Star className="w-3 h-3 text-gold/50" />
                        {entry.mood}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-hebrew text-ink-muted/60" dir="ltr">
                        <Clock className="w-3 h-3 text-gold/50" />
                        {entry.longevityRating}/10
                      </span>
                      <span className="flex items-center gap-1 text-xs font-hebrew text-ink-muted/60" dir="ltr">
                        <Wind className="w-3 h-3 text-gold/50" />
                        {entry.sillageRating}/10
                      </span>
                    </div>

                    <p className="text-ink-muted text-sm font-hebrew leading-relaxed italic font-light">
                      &ldquo;{entry.notes}&rdquo;
                    </p>
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
