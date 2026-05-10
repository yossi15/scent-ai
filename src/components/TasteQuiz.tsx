'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fragrances } from '@/data/fragrances';

const TOTAL = fragrances.length;

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string; scores: Partial<Record<string, number>> }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'mood',
    text: 'מה מרגיש לך הכי טבעי?',
    options: [
      { value: 'warm',  label: 'חמים ועוטף',  scores: { oriental: 3, gourmand: 2 } },
      { value: 'fresh', label: 'רענן ונקי',   scores: { fresh: 3, woody: 1 } },
      { value: 'dark',  label: 'אפל ומסתורי', scores: { animalic: 2, oriental: 2, woody: 2 } },
      { value: 'light', label: 'קליל ופרחוני', scores: { floral: 3, fresh: 1 } },
    ],
  },
  {
    id: 'season',
    text: 'באיזו עונה הבושם הזה ישמש אותך?',
    options: [
      { value: 'summer', label: 'קיץ',  scores: { fresh: 3 } },
      { value: 'winter', label: 'חורף', scores: { oriental: 3, gourmand: 2 } },
      { value: 'spring', label: 'אביב', scores: { floral: 3 } },
      { value: 'fall',   label: 'סתיו', scores: { woody: 3, oriental: 1 } },
    ],
  },
  {
    id: 'occasion',
    text: 'לאיזה אירוע/הזדמנות?',
    options: [
      { value: 'daily',   label: 'יומיומי',  scores: { fresh: 2, woody: 1 } },
      { value: 'evening', label: 'ערב/מסיבה', scores: { oriental: 2, gourmand: 2 } },
      { value: 'office',  label: 'עסקי',     scores: { fresh: 1, floral: 1, woody: 2 } },
      { value: 'romantic',label: 'רומנטי',   scores: { floral: 2, oriental: 2, animalic: 1 } },
    ],
  },
  {
    id: 'intensity',
    text: 'איזו עוצמת ריח מתאימה לך?',
    options: [
      { value: 'subtle',  label: 'עדין ואינטימי',    scores: { fresh: 2 } },
      { value: 'moderate',label: 'מאוזן',            scores: { floral: 1, woody: 1 } },
      { value: 'strong',  label: 'נוכח וחזק',       scores: { oriental: 2, animalic: 1 } },
      { value: 'beast',   label: 'ביסט מוד — אנשים יעצרו', scores: { animalic: 2, oriental: 3 } },
    ],
  },
];

type Scores = Record<string, number>;

function computeMatches(scores: Scores) {
  const keys = Object.keys(scores) as Array<keyof typeof scores>;
  return fragrances
    .map(f => {
      let score = 0;
      keys.forEach(k => {
        const val = f.radarProfile[k as keyof typeof f.radarProfile] ?? 0;
        score += val * (scores[k] ?? 0);
      });
      return { f, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.f);
}

export default function TasteQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({});
  const [done, setDone] = useState(false);
  const router = useRouter();

  const matches = done ? computeMatches(scores) : [];

  const answer = (opt: Question['options'][0]) => {
    const next = { ...scores };
    Object.entries(opt.scores).forEach(([k, v]) => { next[k] = (next[k] ?? 0) + (v ?? 0); });
    setScores(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(s => s + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => { setStep(0); setScores({}); setDone(false); };

  const q = QUESTIONS[step];

  return (
    <section id="quiz" className="py-28 px-4 section-accent" aria-labelledby="quiz-heading">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">שאלון טעמים</p>
          <h2 id="quiz-heading" className="font-serif text-4xl md:text-5xl gold-text font-bold mb-3">
            מה הריח שלך?
          </h2>
          <p className="text-ink-muted text-sm font-hebrew font-light">
            4 שאלות — ונמצא לך את ה{TOTAL} הנכון
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="card p-8"
            >
              {/* Progress */}
              <div className="flex gap-1.5 mb-6">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-gold' : 'bg-bg-secondary'}`}
                  />
                ))}
              </div>

              <p className="text-ink-faint text-xs font-sans mb-2">שאלה {step + 1} מתוך {QUESTIONS.length}</p>
              <h3 className="font-serif text-2xl text-ink font-semibold mb-6">{q.text}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map(opt => (
                  <motion.button
                    key={opt.value}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => answer(opt)}
                    className="p-4 text-right rounded-xl border border-black/[0.06] bg-bg-card hover:border-gold-border hover:bg-gold-faint transition-all duration-200 font-hebrew text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    {opt.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card p-8"
            >
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-5 h-5 text-gold" />
                <h3 className="font-serif text-2xl text-ink font-semibold">ההמלצות שלנו</h3>
              </div>

              <div className="space-y-3 mb-6">
                {matches.map((f, i) => (
                  <motion.button
                    key={f.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => router.push(`/fragrance/${f.id}`)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border border-black/[0.06] hover:border-gold-border hover:bg-gold-faint transition-all duration-200 text-right group"
                  >
                    <div>
                      <p className="font-serif text-base text-ink font-semibold group-hover:text-gold-dark" dir="ltr">{f.name}</p>
                      <p className="text-xs text-ink-muted font-sans" dir="ltr">{f.house} · {f.family}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-gold font-serif text-lg font-bold">₪{f.price.toLocaleString()}</span>
                      <ChevronRight className="w-4 h-4 text-gold" />
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/[0.06] text-sm font-hebrew text-ink-muted hover:border-gold-border hover:text-gold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  שאלון מחדש
                </button>
                <a
                  href="#collection"
                  className="flex-1 text-center px-5 py-2.5 rounded-xl btn-gold text-sm font-hebrew font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  לכל הקולקציה ←
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
