'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronRight, RotateCcw, Check, Droplets, Send } from 'lucide-react';
import { fragrances, type Fragrance } from '@/data/fragrances';
import Image from 'next/image';
import SampleRequestModal from './SampleRequestModal';
import { SkeletonRecCard } from './Skeleton';

// ── Questions ──────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 1,
    key: 'scentType',
    title: 'איזה ריח תופס אותך?',
    cols: 3,
    options: [
      { value: 'woody',     emoji: '🌲', label: 'יערי/עצי' },
      { value: 'floral',    emoji: '🌸', label: 'פרחוני' },
      { value: 'fresh',     emoji: '🍊', label: 'הדרי/טרי' },
      { value: 'gourmand',  emoji: '🍯', label: 'מתוק/גורמה' },
      { value: 'oriental',  emoji: '🔥', label: 'מזרחי/עשן' },
    ],
  },
  {
    id: 2,
    key: 'season',
    title: 'באיזה עונה אתה לובש הכי הרבה?',
    cols: 2,
    options: [
      { value: 'spring', emoji: '🌸', label: 'אביב' },
      { value: 'summer', emoji: '☀️', label: 'קיץ' },
      { value: 'fall',   emoji: '🍂', label: 'סתיו' },
      { value: 'winter', emoji: '❄️', label: 'חורף' },
    ],
  },
  {
    id: 3,
    key: 'occasion',
    title: 'לאיזה אירוע?',
    cols: 2,
    options: [
      { value: 'business',  emoji: '💼', label: 'עסקי' },
      { value: 'evening',   emoji: '🌙', label: 'ערב' },
      { value: 'daily',     emoji: '☕', label: 'יומיומי' },
      { value: 'romantic',  emoji: '💕', label: 'רומנטי' },
    ],
  },
  {
    id: 4,
    key: 'longevity',
    title: 'כמה זמן אתה רוצה שיחזיק?',
    cols: 3,
    options: [
      { value: '3-5h',  emoji: '⏱️', label: '3–5 שעות' },
      { value: '6-8h',  emoji: '⌚', label: '6–8 שעות' },
      { value: '10h+',  emoji: '🔋', label: '10+ שעות' },
    ],
  },
  {
    id: 5,
    key: 'style',
    title: 'מה הסגנון שלך?',
    cols: 2,
    options: [
      { value: 'classic',    emoji: '🕯️', label: 'קלאסי ונצחי' },
      { value: 'modern',     emoji: '⚡',  label: 'מודרני ובולט' },
      { value: 'minimal',    emoji: '🌿', label: 'מינימליסטי' },
      { value: 'eccentric',  emoji: '🎭', label: 'אקסצנטרי/ייחודי' },
    ],
  },
  {
    id: 6,
    key: 'budget',
    title: 'מה התקציב לבקבוק מלא?',
    cols: 3,
    options: [
      { value: 'under500',   emoji: '💵', label: 'עד ₪500' },
      { value: '500-1000',   emoji: '💳', label: '₪500–1000' },
      { value: 'above1000',  emoji: '💎', label: 'מעל ₪1000' },
    ],
  },
];

const TOTAL_Q = 7; // 6 choice + 1 text

// ── Candidate pre-scoring (top 15 for Claude) ─────────────────────────────────

type Answers = Record<string, string>;

function getTopCandidates(answers: Answers): Fragrance[] {
  return fragrances
    .map(f => {
      let s = f.rating * 2;
      const st = answers.scentType;
      if (st === 'woody')    s += f.radarProfile.woody * 2.5;
      if (st === 'floral')   s += f.radarProfile.floral * 2.5;
      if (st === 'fresh')    s += f.radarProfile.fresh * 2.5;
      if (st === 'gourmand') s += f.radarProfile.gourmand * 2.5;
      if (st === 'oriental') s += f.radarProfile.oriental * 2.5;
      const b = answers.budget;
      if (b === 'under500'  && f.price <= 500)               s += 8;
      if (b === '500-1000'  && f.price > 500 && f.price <= 1000) s += 8;
      if (b === 'above1000' && f.price > 1000)               s += 8;
      if (b === 'under500'  && f.price > 900)                s -= 10;
      const lg = answers.longevity;
      if (lg === '3-5h' && f.longevity <= 5)                 s += 4;
      if (lg === '6-8h' && f.longevity >= 6 && f.longevity <= 7) s += 4;
      if (lg === '10h+' && f.longevity >= 8)                 s += 5;
      return { f, s };
    })
    .sort((a, b) => b.s - a.s)
    .slice(0, 15)
    .map(x => x.f);
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface AIRec {
  id: number | null;
  name: string;
  house: string;
  family: string;
  reason: string;
  inCatalog: boolean;
}

const COLLECTION_KEY = 'scent-ai-collection';

// ── Sub-components ────────────────────────────────────────────────────────────

function OptionTile({
  emoji, label, selected, onClick,
}: { emoji: string; label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-pressed={selected}
      className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
        selected
          ? 'border-gold bg-gradient-to-br from-[#c9a84c]/10 to-[#c9a84c]/5 shadow-md'
          : 'border-black/[0.08] bg-white/60 hover:border-gold/40 hover:bg-white/80'
      }`}
    >
      {selected && (
        <span className="absolute top-2 right-2 w-4 h-4 bg-gold rounded-full flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-white" />
        </span>
      )}
      <span className="text-2xl">{emoji}</span>
      <span className={`text-xs font-hebrew font-medium text-center leading-tight ${selected ? 'text-gold' : 'text-ink'}`}>
        {label}
      </span>
    </motion.button>
  );
}

function FragranceResultCard({
  rec, fragrance, added, onAdd, onRequestSample,
}: {
  rec: AIRec;
  fragrance?: Fragrance;
  added: boolean;
  onAdd: () => void;
  onRequestSample: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const inCatalog = rec.inCatalog && !!fragrance;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 rounded-2xl border border-black/[0.06] p-4 shadow-sm"
    >
      <div className="flex gap-4">
        {/* Image */}
        <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-black/[0.05]">
          {fragrance?.image && !imgError ? (
            <Image
              src={fragrance.image}
              alt={fragrance.name}
              width={64}
              height={80}
              className="object-contain w-full h-full"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Droplets className="w-7 h-7 text-gold/30" />
            </div>
          )}
        </div>

        {/* Info */}
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

          {inCatalog ? (
            <button
              onClick={onAdd}
              disabled={added}
              className={`inline-flex items-center gap-1.5 text-xs font-hebrew px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                added
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-green-50 border-green-300 text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600'
              }`}
            >
              {added ? (
                <><Check className="w-3 h-3" /> נוסף לאוסף!</>
              ) : (
                <><span className="text-base leading-none">+</span> הוסף לאוסף</>
              )}
            </button>
          ) : (
            <button
              onClick={onRequestSample}
              className="inline-flex items-center gap-1.5 text-xs font-hebrew px-3 py-1.5 rounded-lg border bg-gold-faint border-gold/30 text-gold hover:bg-gold hover:text-white transition-all duration-200"
            >
              <Send className="w-3 h-3" /> בקש דגימה
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function TasteQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep]     = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [prevFragrance, setPrevFragrance] = useState('');
  const [aiRecs, setAiRecs] = useState<AIRec[]>([]);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [sampleModal, setSampleModal] = useState<{ name: string; brand: string } | null>(null);

  // ESC to close + body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectAnswer = (key: string, value: string) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    setTimeout(() => setStep(s => s + 1), 260);
  };

  const submitQuiz = async () => {
    setStep(8); // loading
    setIsLoading(true);
    const candidates = getTopCandidates(answers);
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: { ...answers, previousFragrance: prevFragrance },
          candidates: candidates.map(f => ({
            id: f.id, name: f.name, house: f.house, family: f.family,
            price: f.price, concentration: f.concentration, tags: f.tags,
            longevity: f.longevity, sillage: f.sillage, radarProfile: f.radarProfile,
            notes: f.notes, gender: f.gender, year: f.year,
          })),
        }),
      });
      const data = await res.json();
      setAiRecs(data.recommendations ?? []);
    } catch {
      // Fallback to local top 3
      setAiRecs(candidates.slice(0, 3).map(f => ({
        id: f.id,
        name: f.name,
        house: f.house,
        family: f.family,
        inCatalog: true,
        reason: `${f.name} של ${f.house} הוא התאמה מושלמת — ${f.family} עם תגיות ${f.tags.slice(0, 2).join(' ו')} שמתאימות בדיוק לפרופיל שלך.`,
      })));
    } finally {
      setIsLoading(false);
      setStep(9);
    }
  };

  const addToCollection = (fragranceId: number) => {
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

  const reset = () => {
    setStep(1);
    setAnswers({});
    setPrevFragrance('');
    setAiRecs([]);
    setAddedIds(new Set());
    setIsLoading(false);
  };

  const close = () => { setIsOpen(false); setTimeout(reset, 300); };

  const currentQ = step >= 1 && step <= 6 ? QUESTIONS[step - 1] : null;
  const progressWidth = step <= TOTAL_Q ? `${(step / TOTAL_Q) * 100}%` : '100%';

  const matchedRecs = aiRecs.map(rec => ({
    rec,
    fragrance: rec.id != null
      ? fragrances.find(f => f.id === rec.id)
      : fragrances.find(f => f.name.toLowerCase() === rec.name.toLowerCase()),
  }));

  return (
    <>
      {/* ── Section ── */}
      <section id="quiz" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
              TASTE QUIZ
            </p>
            <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">
              שאלון ריחות
            </h2>
            <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
              ענה על 7 שאלות קצרות וגלה אילו בשמים מתאימים בדיוק לך
            </p>
          </motion.div>

          <div className="card p-8 flex flex-col items-center text-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gold-faint flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-gold" />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-ink mb-2 font-semibold">
                גלה את הבושם המושלם עבורך
              </h3>
              <p className="text-ink-muted text-sm font-hebrew max-w-sm mx-auto font-light leading-relaxed">
                האלגוריתם שלנו בשילוב AI מנתח את ההעדפות שלך ומתאים לך בשמים מתוך מאגר של 100 יצירות מ-35 בתי בישום
              </p>
            </div>
            <div className="flex items-center gap-6 text-xs text-ink-muted font-hebrew">
              <span>⏱ כ-2 דקות</span>
              <span>·</span>
              <span>7 שאלות</span>
              <span>·</span>
              <span>3 המלצות AI</span>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="btn-gold px-10 py-3.5 font-hebrew text-sm rounded-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              בוא נתחיל
            </button>
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={close}
            />

            {/* Modal card */}
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="relative w-full sm:max-w-lg bg-[#FAF8F4] sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[88vh]"
              role="dialog"
              aria-modal="true"
              aria-label="שאלון ריחות"
            >
              {/* Progress bar */}
              <div className="h-1 bg-black/[0.06] shrink-0">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#b8962e] to-[#d4af4f]"
                  animate={{ width: progressWidth }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/[0.06] shrink-0">
                <div className="flex items-center gap-2">
                  {step >= 9 ? (
                    <>
                      <Sparkles className="w-4 h-4 text-gold" />
                      <span className="text-sm font-serif text-ink font-semibold">ההמלצות שלנו עבורך</span>
                    </>
                  ) : step === 8 ? (
                    <span className="text-xs text-ink-muted font-hebrew">Claude AI מנתח את הטעמים שלך...</span>
                  ) : (
                    <span className="text-xs font-hebrew text-ink-muted">
                      שאלה <span className="font-semibold text-gold">{step}</span>
                      <span className="text-ink-faint"> מתוך {TOTAL_Q}</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {step >= 2 && step <= 7 && (
                    <button
                      onClick={() => setStep(s => s - 1)}
                      className="text-ink-muted hover:text-gold transition-colors flex items-center gap-1 text-xs font-hebrew"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                      חזור
                    </button>
                  )}
                  {step >= 9 && (
                    <button
                      onClick={reset}
                      className="text-ink-muted hover:text-gold transition-colors flex items-center gap-1 text-xs font-hebrew mr-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      מחדש
                    </button>
                  )}
                  <button
                    onClick={close}
                    aria-label="סגור"
                    className="w-7 h-7 flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-black/[0.06] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5">
                <AnimatePresence mode="wait">

                  {/* Questions 1–6 */}
                  {currentQ && step <= 6 && (
                    <motion.div
                      key={`q${step}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.22 }}
                    >
                      <h3 className="font-serif text-xl text-ink font-semibold text-center mb-6">
                        {currentQ.title}
                      </h3>
                      <div
                        className="grid gap-3"
                        style={{ gridTemplateColumns: `repeat(${currentQ.cols}, 1fr)` }}
                      >
                        {currentQ.options.map(opt => (
                          <OptionTile
                            key={opt.value}
                            emoji={opt.emoji}
                            label={opt.label}
                            selected={answers[currentQ.key] === opt.value}
                            onClick={() => selectAnswer(currentQ.key, opt.value)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Question 7 — free text */}
                  {step === 7 && (
                    <motion.div
                      key="q7"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.22 }}
                      className="flex flex-col gap-4"
                    >
                      <h3 className="font-serif text-xl text-ink font-semibold text-center">
                        בושם שאהבת בעבר?
                      </h3>
                      <p className="text-xs text-ink-muted font-hebrew text-center -mt-2">
                        אופציונלי — עוזר לנו להבין את הטעם שלך טוב יותר
                      </p>
                      <input
                        type="text"
                        value={prevFragrance}
                        onChange={e => setPrevFragrance(e.target.value)}
                        placeholder="למשל: Sauvage, Bleu de Chanel..."
                        dir="auto"
                        className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-white/80 text-ink placeholder-ink-faint text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                      />
                      <button
                        onClick={submitQuiz}
                        className="btn-gold py-3.5 rounded-xl font-hebrew text-sm flex items-center justify-center gap-2 mt-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        קבל המלצות AI
                      </button>
                      <button
                        onClick={submitQuiz}
                        className="text-xs text-ink-muted font-hebrew text-center hover:text-gold transition-colors"
                      >
                        דלג ← קדמה ללא תשובה
                      </button>
                    </motion.div>
                  )}

                  {/* Loading — skeleton cards */}
                  {step === 8 && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="flex gap-1">
                          {[0, 1, 2].map(i => (
                            <motion.span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-gold"
                              animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1, 0.7] }}
                              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-ink-muted font-hebrew">
                          Claude AI מנתח את הטעמים שלך...
                        </p>
                      </div>
                      <SkeletonRecCard delay={0} />
                      <SkeletonRecCard delay={0.1} />
                      <SkeletonRecCard delay={0.2} />
                    </motion.div>
                  )}

                  {/* Results */}
                  {step === 9 && !isLoading && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4"
                    >
                      <p className="text-xs text-ink-muted font-hebrew text-center">
                        בחרנו את 3 הבשמים שמתאימים ביותר לפרופיל שלך
                      </p>
                      {matchedRecs.map(({ rec, fragrance }, i) => (
                        <motion.div
                          key={`${rec.id ?? 'ext'}-${i}`}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.12 }}
                        >
                          <FragranceResultCard
                            rec={rec}
                            fragrance={fragrance}
                            added={rec.id != null && addedIds.has(rec.id)}
                            onAdd={() => rec.id != null && addToCollection(rec.id)}
                            onRequestSample={() => setSampleModal({ name: rec.name, brand: rec.house })}
                          />
                        </motion.div>
                      ))}
                      <button
                        onClick={() => {
                          close();
                          setTimeout(() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }), 350);
                        }}
                        className="w-full mt-2 py-3 rounded-xl border border-black/[0.08] text-sm font-hebrew text-ink-muted hover:text-gold hover:border-gold/30 transition-all"
                      >
                        צפה בקולקציה המלאה ←
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SampleRequestModal
        open={!!sampleModal}
        onClose={() => setSampleModal(null)}
        fragranceName={sampleModal?.name ?? ''}
        brand={sampleModal?.brand ?? ''}
      />
    </>
  );
}
