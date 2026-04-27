'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Droplets, AlertCircle, Check, Send } from 'lucide-react';
import Image from 'next/image';
import { fragrances, type Fragrance } from '@/data/fragrances';
import SampleRequestModal from './SampleRequestModal';
import { SkeletonRecCard } from './Skeleton';

const quickSelectOptions = [
  { id: 1, label: 'Aventus' },
  { id: 8, label: 'BR540' },
  { id: 9, label: 'Tobacco Vanille' },
  { id: 7, label: 'Oud Wood' },
  { id: 5, label: 'Portrait of a Lady' },
  { id: 11, label: 'Layton' },
  { id: 3, label: 'Naxos' },
  { id: 23, label: 'Hacivat' },
  { id: 49, label: 'Santal 33' },
  { id: 28, label: 'Pegasus' },
  { id: 35, label: 'Green Irish Tweed' },
  { id: 43, label: "Bal d'Afrique" },
];

interface AIRec {
  id: number | null;
  name: string;
  house: string;
  family: string;
  reason: string;
  inCatalog: boolean;
}

interface Props {
  onCollectionChange?: (collection: Fragrance[]) => void;
}

const COLLECTION_KEY = 'scent-ai-collection';

export default function SignatureMatch({ onCollectionChange }: Props) {
  const [myCollection, setMyCollection] = useState<Fragrance[]>([]);
  const [recs, setRecs] = useState<AIRec[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const [sampleModal, setSampleModal] = useState<{ name: string; brand: string } | null>(null);

  useEffect(() => {
    onCollectionChange?.(myCollection);
  }, [myCollection, onCollectionChange]);

  const toggleInCollection = (id: number) => {
    const frag = fragrances.find((f) => f.id === id);
    if (!frag) return;
    setMyCollection((prev) =>
      prev.find((f) => f.id === id) ? prev.filter((f) => f.id !== id) : [...prev, frag]
    );
    setRecs([]);
    setError(null);
  };

  const analyze = async () => {
    setIsAnalyzing(true);
    setRecs([]);
    setError(null);

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collection: myCollection.map(f => ({
            id: f.id, name: f.name, house: f.house, family: f.family, tags: f.tags,
            notes: f.notes, year: f.year, gender: f.gender,
            longevity: f.longevity, sillage: f.sillage,
          })),
          catalog: fragrances
            .filter(f => !myCollection.find(c => c.id === f.id))
            .slice(0, 60)
            .map(f => ({
              id: f.id, name: f.name, house: f.house, family: f.family,
              notes: f.notes, year: f.year, gender: f.gender,
              longevity: f.longevity, sillage: f.sillage,
            })),
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setRecs(data.recommendations ?? []);
    } catch {
      setError('משהו השתבש, נסה שוב');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addToCollectionStorage = (fragranceId: number) => {
    try {
      const saved = localStorage.getItem(COLLECTION_KEY);
      const ids: number[] = saved ? JSON.parse(saved) : [];
      if (!ids.includes(fragranceId)) {
        ids.push(fragranceId);
        localStorage.setItem(COLLECTION_KEY, JSON.stringify(ids));
        window.dispatchEvent(new CustomEvent('scent:collection-add', { detail: fragranceId }));
      }
    } catch {}
    setAddedIds(prev => new Set([...prev, fragranceId]));
  };

  return (
    <section id="match" className="py-20 px-4 section-accent">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            AI INTELLIGENCE
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">
            התאמת חתימה
          </h2>
          <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
            בחר את הבשמים שבאוסף שלך ותן ל-AI לגלות 3 יצירות מופת שמתאימות לך
          </p>
        </motion.div>

        <div className="card p-6 md:p-8 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gold-faint flex items-center justify-center">
              <Brain className="w-4 h-4 text-gold" />
            </div>
            <h3 className="font-serif text-xl text-ink font-semibold">האוסף שלך</h3>
          </div>
          <p className="text-ink-muted text-xs font-hebrew mb-4 font-light">
            בחר את הבשמים שאתה מחזיק כרגע:
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {quickSelectOptions.map((opt) => {
              const isSelected = myCollection.find((f) => f.id === opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleInCollection(opt.id)}
                  aria-pressed={!!isSelected}
                  className={`px-4 py-2 text-xs font-sans border rounded-full transition-all duration-200 ${
                    isSelected
                      ? 'bg-gold text-white border-gold shadow-sm'
                      : 'bg-bg-card border-black/[0.06] text-ink-muted hover:border-gold-border hover:text-gold'
                  }`}
                  dir="ltr"
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={analyze}
            disabled={myCollection.length < 2 || isAnalyzing}
            className="btn-gold w-full py-3.5 font-hebrew text-sm tracking-wide rounded-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2.5 relative overflow-hidden"
          >
            {isAnalyzing && (
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            {isAnalyzing ? (
              <>
                <span className="flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-current"
                      animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
                    />
                  ))}
                </span>
                ה-AI מנתח את האוסף שלך...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                מצא 3 יצירות מופת עבורי
              </>
            )}
          </button>

          {myCollection.length < 2 && myCollection.length > 0 && (
            <p className="text-ink-faint text-xs font-hebrew text-center mt-2">
              בחר לפחות 2 בשמים לניתוח
            </p>
          )}
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 mb-4 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-xs font-hebrew"
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="flex-1">{error}</span>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 transition-colors ml-1" aria-label="סגור">✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAnalyzing && recs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="card-gold p-6 md:p-8 mb-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-gold" />
                <p className="text-gold text-xs font-hebrew font-medium">
                  Claude AI חושב על 3 יצירות מופת עבורך...
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <SkeletonRecCard delay={0} />
                <SkeletonRecCard delay={0.1} />
                <SkeletonRecCard delay={0.2} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {recs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="card-gold p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-gold" />
                <p className="text-gold text-xs font-hebrew font-medium">
                  3 יצירות מופת עבורך — ניתוח Claude AI
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {recs.map((rec, i) => {
                  const fragrance = rec.id != null
                    ? fragrances.find(f => f.id === rec.id)
                    : undefined;
                  const inCatalog = rec.inCatalog && !!fragrance;
                  return (
                    <motion.div
                      key={`${rec.id ?? 'ext'}-${i}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                      className="bg-white/80 rounded-2xl border border-black/[0.06] p-4 shadow-sm"
                    >
                      <div className="flex gap-4">
                        <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-black/[0.05]">
                          {fragrance?.image ? (
                            <Image
                              src={fragrance.image}
                              alt={fragrance.name}
                              width={64}
                              height={80}
                              className="object-contain w-full h-full"
                            />
                          ) : (
                            <Droplets className="w-7 h-7 text-gold/30" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="min-w-0">
                              <p className="font-serif text-base text-ink font-semibold" dir="ltr">{rec.name}</p>
                              <p className="text-[11px] text-ink-muted font-sans truncate" dir="ltr">
                                {rec.house} · {rec.family}
                                {fragrance?.price ? ` · ₪${fragrance.price.toLocaleString()}` : ''}
                              </p>
                            </div>
                            {inCatalog ? (
                              <span className="shrink-0 text-[10px] font-hebrew bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
                                זמין לדגימה
                              </span>
                            ) : (
                              <span className="shrink-0 text-[10px] font-hebrew bg-gold-faint text-gold border border-gold/30 px-2 py-0.5 rounded-full">
                                בקרוב
                              </span>
                            )}
                          </div>

                          <p className="text-[12px] font-hebrew text-ink-secondary leading-relaxed mt-2 mb-3">
                            <Sparkles className="w-3 h-3 text-gold inline ml-1 -mt-0.5" />
                            {rec.reason}
                          </p>

                          {inCatalog && rec.id != null ? (
                            <button
                              onClick={() => addToCollectionStorage(rec.id!)}
                              disabled={addedIds.has(rec.id)}
                              className={`inline-flex items-center gap-1.5 text-xs font-hebrew px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                                addedIds.has(rec.id)
                                  ? 'bg-green-50 border-green-200 text-green-700'
                                  : 'bg-green-50 border-green-300 text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600'
                              }`}
                            >
                              {addedIds.has(rec.id) ? (
                                <><Check className="w-3 h-3" /> נוסף לאוסף!</>
                              ) : (
                                <><span className="text-base leading-none">+</span> הוסף לאוסף</>
                              )}
                            </button>
                          ) : (
                            <button
                              onClick={() => setSampleModal({ name: rec.name, brand: rec.house })}
                              className="inline-flex items-center gap-1.5 text-xs font-hebrew px-3 py-1.5 rounded-lg border bg-gold-faint border-gold/30 text-gold hover:bg-gold hover:text-white transition-all duration-200"
                            >
                              <Send className="w-3 h-3" /> בקש דגימה
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SampleRequestModal
        open={!!sampleModal}
        onClose={() => setSampleModal(null)}
        fragranceName={sampleModal?.name ?? ''}
        brand={sampleModal?.brand ?? ''}
      />
    </section>
  );
}
