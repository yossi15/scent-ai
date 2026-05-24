'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Search, Check } from 'lucide-react';
import Link from 'next/link';
import { fragrances } from '@/data/fragrances';
import { rankCandidates, buildTasteVector, signatureNotes } from '@/lib/fragrance-match';

/* ─── Types ─────────────────────────────────────────────────────── */
type SingleAnswer = string;
type MultiAnswer  = string[];
type Answers = {
  family?:     SingleAnswer;
  taste?:      SingleAnswer;
  sillage?:    SingleAnswer;
  longevity?:  SingleAnswer;
  occasions?:  MultiAnswer;
  seasons?:    MultiAnswer;
  budget?:     SingleAnswer;
  gender?:     SingleAnswer;
  known?:      number[];   // fragrance IDs
  dislikes?:   MultiAnswer; // disliked scent categories
};

interface Question {
  id: keyof Answers;
  label: string;
  text: string;
  sub?: string;
  type: 'single' | 'multi' | 'search';
  maxSelect?: number;
  canSkip?: boolean;
  options?: { value: string; label: string; sub?: string }[];
}

/* ─── Questions ─────────────────────────────────────────────────── */
const QUESTIONS: Question[] = [
  {
    id: 'family',
    label: 'משפחת ריח',
    text: 'איזה סוג ריח מושך אותך?',
    sub: 'כל אופציה כוללת דוגמאות אמיתיות',
    type: 'single',
    options: [
      { value: 'warm',    label: 'חמים ועוטף',      sub: 'אמברה · ונילה · עורות — Tobacco Vanille, Oud Wood' },
      { value: 'fresh',   label: 'רענן ונקי',        sub: 'הדרים · מים · עשבים — Sauvage, Light Blue' },
      { value: 'dark',    label: 'אפל ומסתורי',      sub: 'עשן · עוד · שרפים — Black Orchid, Encre Noire' },
      { value: 'floral',  label: 'פרחוני ורומנטי',   sub: 'ורד · יסמין · אדמונית — Miss Dior, Chanel No.5' },
      { value: 'green',   label: 'ירוק וטבעי',       sub: 'עץ · אזוב · עלים — Polo Green, Vetiver' },
      { value: 'unsure',  label: 'לא בטוח',          sub: 'תן ל-AI לזהות לבד לפי האוסף שלי' },
    ],
  },
  {
    id: 'taste',
    label: 'כיוון טעם',
    text: 'מתוק, יבש, או משולב?',
    sub: 'על הפלטה הבסיסית של הריח שלך',
    type: 'single',
    options: [
      { value: 'sweet',   label: 'מתוק',     sub: 'Gourmand, ונילה, קרמל — Baccarat Rouge, Angel' },
      { value: 'dry',     label: 'יבש',      sub: 'Woody, עשן, אדמה — Oud Wood, Terre d\'Hermes' },
      { value: 'balanced',label: 'משולב',    sub: 'קצת מכל אחד — Aventus, Bleu de Chanel' },
    ],
  },
  {
    id: 'sillage',
    label: 'עוצמת הקרנה',
    text: 'כמה חזק אתה רוצה שיהיה?',
    type: 'single',
    options: [
      { value: 'discrete', label: 'דיסקרטי',  sub: 'רק מי שקרוב מריח אותך' },
      { value: 'moderate', label: 'מאוזן',     sub: 'קיים אבל לא דומיננטי' },
      { value: 'strong',   label: 'בולט',      sub: 'אנשים מסתובבים לראות מי אתה' },
    ],
  },
  {
    id: 'longevity',
    label: 'עמידות',
    text: 'כמה זמן צריך להחזיק?',
    type: 'single',
    options: [
      { value: '4-6h',  label: '4-6 שעות',   sub: 'ליום עבודה רגיל' },
      { value: '6-10h', label: '6-10 שעות',  sub: 'לאירוע ארוך' },
      { value: '10h+',  label: '10+ שעות',   sub: 'Performer — מתעורר איתי בבוקר' },
    ],
  },
  {
    id: 'occasions',
    label: 'רגעי שימוש',
    text: 'מתי תשתמש בו?',
    sub: 'בחר עד 3 — אפשר כמה',
    type: 'multi',
    maxSelect: 3,
    options: [
      { value: 'daily',    label: 'יומיומי / משרד' },
      { value: 'evening',  label: 'ערב / דייט' },
      { value: 'events',   label: 'חגיגות ואירועים' },
      { value: 'casual',   label: 'קז\'ואל סוף שבוע' },
      { value: 'sport',    label: 'ספורט וכושר' },
    ],
  },
  {
    id: 'seasons',
    label: 'עונות מועדפות',
    text: 'באיזו עונה תשתמש בו בעיקר?',
    sub: 'אפשר לבחור כמה',
    type: 'multi',
    options: [
      { value: 'spring', label: 'אביב' },
      { value: 'summer', label: 'קיץ' },
      { value: 'fall',   label: 'סתיו' },
      { value: 'winter', label: 'חורף' },
    ],
  },
  {
    id: 'budget',
    label: 'טווח מחירים',
    text: 'כמה נוח לך להשקיע?',
    sub: 'לבקבוק מלא',
    type: 'single',
    options: [
      { value: 'under500',   label: 'עד 500',    sub: '₪' },
      { value: '500-1000',   label: '500-1,000',  sub: '₪' },
      { value: '1000-2000',  label: '1,000-2,000',sub: '₪' },
      { value: 'above2000',  label: 'מעל 2,000', sub: '₪ — Collector level' },
    ],
  },
  {
    id: 'gender',
    label: 'כיוון מגדרי',
    text: 'איזה כיוון מגדרי?',
    type: 'single',
    options: [
      { value: 'masculine', label: 'גברי' },
      { value: 'feminine',  label: 'נשי' },
      { value: 'unisex',    label: 'יוניסקס' },
      { value: 'any',       label: 'לא משנה לי' },
    ],
  },
  {
    id: 'known',
    label: 'בשמים שאהבת',
    text: 'בשמים שאתה כבר אוהב',
    sub: 'חפש וסמן 3-10 בשמים — AI ילמד מהם את הטעם שלך',
    type: 'search',
    canSkip: true,
  },
  {
    id: 'dislikes',
    label: 'אסורים עליי',
    text: 'מה אתה ממש לא אוהב?',
    sub: 'AI ידלג על כל הבשמים שמכילים אלה — אפשר לבחור כמה',
    type: 'multi',
    canSkip: true,
    options: [
      { value: 'sweet',     label: 'מתוק / גורמה',    sub: 'ונילה, קרמל, שוקולד' },
      { value: 'oud',       label: 'עוד / קטרן',       sub: 'כבד, בוהק, Bakhoor' },
      { value: 'smoky',     label: 'מעושן / טבק',      sub: 'עשן, עור שרוף, מוקטר' },
      { value: 'fresh',     label: 'ים / אוזון',       sub: 'מרין, אלדהיד, נקי מדי' },
      { value: 'floral',    label: 'פרחוני כבד',        sub: 'ורד, יסמין, אדמונית' },
      { value: 'detergent', label: 'סבוני / כביסה',    sub: 'מוסק לבן, clean musk' },
      { value: 'animalic',  label: 'אנימאלי',           sub: 'ציבט, מוסק חי, עור' },
      { value: 'powdery',   label: 'פודרי / טאלק',     sub: 'איריס, סיגל, אבקה' },
    ],
  },
];

const TOTAL = QUESTIONS.length;
const SS_KEY = 'scentory-quiz-answers';

/* ─── Map new answers → API format ──────────────────────────────── */
function mapAnswers(ans: Answers, knownNames: string[]) {
  const familyToScent: Record<string, string> = {
    warm: 'oriental', fresh: 'fresh', dark: 'woody',
    floral: 'floral', green: 'fresh', unsure: '',
  };
  const tasteToStyle: Record<string, string> = {
    sweet: 'gourmand', dry: 'minimal', balanced: 'modern',
  };
  const budgetMap: Record<string, string> = {
    under500: 'under500', '500-1000': '500-1000',
    '1000-2000': 'above1000', above2000: 'above1000',
  };
  const longevityMap: Record<string, string> = {
    '4-6h': '3-5h', '6-10h': '6-8h', '10h+': '10h+',
  };
  return {
    scentType:          familyToScent[ans.family ?? ''] ?? '',
    season:             (ans.seasons ?? []).join(', ') || '',
    occasion:           (ans.occasions ?? []).join(', ') || '',
    longevity:          longevityMap[ans.longevity ?? ''] ?? '',
    style:              tasteToStyle[ans.taste ?? ''] ?? '',
    budget:             budgetMap[ans.budget ?? ''] ?? '',
    previousFragrance:  knownNames.join(', '),
    gender:             ans.gender ?? '',
    sillage:            ans.sillage ?? '',
  };
}

/* ─── Option pill ───────────────────────────────────────────────── */
function Pill({
  label, sub, selected, onClick, disabled,
}: {
  label: string; sub?: string; selected: boolean;
  onClick: () => void; disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      style={{
        width: '100%',
        textAlign: 'right',
        padding: '16px 20px',
        border: selected
          ? '1.5px solid var(--accent-gold)'
          : '1px solid var(--border)',
        background: selected ? 'rgba(201,169,97,0.07)' : 'var(--bg-card)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'all 0.15s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        borderRadius: '2px',
      }}
      onMouseEnter={e => {
        if (!selected && !disabled)
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold-border)';
      }}
      onMouseLeave={e => {
        if (!selected)
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
      }}
    >
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: 'Heebo, Inter, sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          color: selected ? 'var(--accent-gold)' : 'var(--ink)',
          marginBottom: sub ? '3px' : 0,
          lineHeight: 1.3,
        }}>
          {label}
        </p>
        {sub && (
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: '11px',
            color: 'var(--ink-muted)',
            letterSpacing: '0.2px',
            lineHeight: 1.5,
          }}>
            {sub}
          </p>
        )}
      </div>
      {selected && (
        <Check
          size={14}
          style={{ color: 'var(--accent-gold)', flexShrink: 0 }}
        />
      )}
    </button>
  );
}

/* ─── Search question (Q9) ──────────────────────────────────────── */
function SearchQuestion({
  selected, onChange,
}: { selected: number[]; onChange: (ids: number[]) => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length >= 2
    ? fragrances.filter(f =>
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.house.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const toggle = (id: number) => {
    if (selected.includes(id)) {
      onChange(selected.filter(x => x !== id));
    } else if (selected.length < 10) {
      onChange([...selected, id]);
    }
  };

  const selectedFragrances = fragrances.filter(f => selected.includes(f.id));

  return (
    <div>
      {/* Search input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          padding: '12px 16px',
          marginBottom: '12px',
        }}
      >
        <Search size={16} style={{ color: 'var(--ink-muted)', flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="text"
          placeholder="חפש לפי שם בושם או בית בושם..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          dir="rtl"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'Heebo, Inter, sans-serif',
            fontSize: '14px',
            color: 'var(--ink)',
          }}
          aria-label="חיפוש בשמים"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="נקה חיפוש"
            style={{ color: 'var(--ink-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Search results */}
      {results.length > 0 && (
        <div style={{ marginBottom: '16px', maxHeight: '240px', overflowY: 'auto' }}>
          {results.map(f => (
            <button
              key={f.id}
              onClick={() => toggle(f.id)}
              style={{
                width: '100%',
                textAlign: 'right',
                padding: '11px 16px',
                border: 'none',
                borderBottom: '1px solid var(--border)',
                background: selected.includes(f.id) ? 'rgba(201,169,97,0.07)' : 'var(--bg-card)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: 'Heebo, Inter, sans-serif', fontWeight: 500, fontSize: '13px', color: 'var(--ink)' }}>
                  {f.name}
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--ink-muted)', marginRight: '8px' }}>
                  {f.house}
                </span>
              </div>
              {selected.includes(f.id) && <Check size={13} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />}
            </button>
          ))}
        </div>
      )}

      {/* Selected tags */}
      {selectedFragrances.length > 0 && (
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '2px', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
            נבחרו ({selectedFragrances.length}/10)
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {selectedFragrances.map(f => (
              <button
                key={f.id}
                onClick={() => toggle(f.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  border: '1px solid var(--gold-border)',
                  background: 'rgba(201,169,97,0.08)',
                  borderRadius: '100px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: 'var(--accent-gold)',
                  cursor: 'pointer',
                }}
                aria-label={`הסר ${f.name}`}
              >
                {f.name}
                <X size={11} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Quiz Page ─────────────────────────────────────────────── */
export default function QuizPage() {
  const router = useRouter();
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDir]   = useState(1); // 1=forward, -1=back
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  // Restore from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SS_KEY);
      if (saved) {
        const { step: s, answers: a } = JSON.parse(saved) as { step: number; answers: Answers };
        setStep(s ?? 0);
        setAnswers(a ?? {});
      }
    } catch {}
  }, []);

  // Save on change
  useEffect(() => {
    try { sessionStorage.setItem(SS_KEY, JSON.stringify({ step, answers })); } catch {}
  }, [step, answers]);

  const q = QUESTIONS[step];
  const progress = ((step) / TOTAL) * 100;
  const minutesLeft = Math.ceil(((TOTAL - step) * 20) / 60);

  const getAnswer = () => answers[q.id];

  const isAnswered = () => {
    const a = getAnswer();
    if (q.type === 'single')  return typeof a === 'string' && a.length > 0;
    if (q.type === 'multi')   return Array.isArray(a) && (a as string[]).length > 0;
    if (q.type === 'search')  return true; // always skippable
    return false;
  };

  const goBack = useCallback(() => {
    if (step === 0) { router.push('/'); return; }
    setDir(-1);
    setStep(s => s - 1);
  }, [step, router]);

  const goNext = useCallback(async () => {
    if (step < TOTAL - 1) {
      setDir(1);
      setStep(s => s + 1);
      return;
    }
    // Last step — submit
    setLoading(true);
    setError(null);
    try {
      const knownIds   = (answers.known ?? []) as number[];
      const knownNames = fragrances
        .filter(f => knownIds.includes(f.id))
        .map(f => `${f.name} (${f.house})`);

      const dislikes  = (answers.dislikes ?? []) as string[];
      const tasteVec  = buildTasteVector(knownIds, fragrances);
      const sigNotes  = signatureNotes(knownIds, fragrances);
      const candidates = rankCandidates(fragrances, tasteVec, dislikes, answers);

      const mapped    = mapAnswers(answers, knownNames);

      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: mapped,
          candidates,
          tasteVector: tasteVec,
          sigNotes,
          dislikes,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      sessionStorage.setItem('scentory-quiz-results', JSON.stringify({
        recommendations: data.recommendations,
        answers,
        knownNames,
      }));
      sessionStorage.removeItem(SS_KEY);
      router.push('/quiz/results');
    } catch (e) {
      console.error(e);
      setError('אירעה שגיאה. נסה שוב.');
      setLoading(false);
    }
  }, [step, answers, router]);

  const selectSingle = (val: string) => {
    setAnswers(prev => ({ ...prev, [q.id]: val }));
  };

  const toggleMulti = (val: string) => {
    const current = (answers[q.id] as MultiAnswer | undefined) ?? [];
    const max = q.maxSelect ?? 99;
    if (current.includes(val)) {
      setAnswers(prev => ({ ...prev, [q.id]: current.filter(x => x !== val) }));
    } else if (current.length < max) {
      setAnswers(prev => ({ ...prev, [q.id]: [...current, val] }));
    }
  };

  const slideVariants = {
    enter:  (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Header ──────────────────────────────────────────────── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Progress bar */}
        <div style={{ height: '3px', background: 'var(--border)' }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ height: '100%', background: 'var(--accent-gold)' }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
          }}
          dir="rtl"
        >
          {/* Back */}
          <button
            onClick={goBack}
            aria-label="חזור לשאלה הקודמת"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ink-muted)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
            }}
          >
            <ArrowRight size={16} />
            חזור
          </button>

          {/* Counter + time */}
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--ink-muted)', letterSpacing: '1px' }}>
              שאלה {step + 1} מתוך {TOTAL}
            </span>
          </div>

          {/* Time + close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--ink-muted)' }}>
              ~{minutesLeft} דק'
            </span>
            <Link
              href="/"
              aria-label="סגור שאלון"
              style={{ color: 'var(--ink-muted)', display: 'flex' }}
            >
              <X size={18} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Question body ────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '600px',
          width: '100%',
          margin: '0 auto',
          padding: '40px 20px 120px',
        }}
        dir="rtl"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '9px',
              letterSpacing: '3.5px',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              marginBottom: '12px',
            }}>
              {q.label}
            </p>

            {/* Question */}
            <h1 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(24px, 4vw, 36px)',
              color: 'var(--ink)',
              letterSpacing: '-0.015em',
              lineHeight: 1.15,
              marginBottom: q.sub ? '8px' : '32px',
            }}>
              {q.text}
            </h1>

            {q.sub && (
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '13px',
                color: 'var(--ink-muted)',
                marginBottom: '28px',
                lineHeight: 1.6,
              }}>
                {q.sub}
              </p>
            )}

            {/* Options */}
            {q.type === 'single' && q.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.options.map(opt => (
                  <Pill
                    key={opt.value}
                    label={opt.label}
                    sub={opt.sub}
                    selected={(answers[q.id] as string | undefined) === opt.value}
                    onClick={() => selectSingle(opt.value)}
                  />
                ))}
              </div>
            )}

            {q.type === 'multi' && q.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.options.map(opt => {
                  const cur = (answers[q.id] as MultiAnswer | undefined) ?? [];
                  const sel = cur.includes(opt.value);
                  const maxReached = !sel && q.maxSelect != null && cur.length >= q.maxSelect;
                  return (
                    <Pill
                      key={opt.value}
                      label={opt.label}
                      sub={opt.sub}
                      selected={sel}
                      onClick={() => toggleMulti(opt.value)}
                      disabled={maxReached}
                    />
                  );
                })}
              </div>
            )}

            {q.type === 'search' && (
              <SearchQuestion
                selected={(answers.known as number[] | undefined) ?? []}
                onChange={ids => setAnswers(prev => ({ ...prev, known: ids }))}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Footer actions ───────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'var(--bg-primary)',
          borderTop: '1px solid var(--border)',
          padding: '16px 20px 20px',
          zIndex: 40,
        }}
        dir="rtl"
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Error */}
          {error && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#e05252', marginBottom: '10px', textAlign: 'center' }}>
              {error}
            </p>
          )}

          {/* Continue button */}
          <button
            onClick={goNext}
            disabled={!isAnswered() || loading}
            style={{
              width: '100%',
              padding: '15px',
              background: isAnswered() ? 'var(--accent-gold)' : 'var(--border)',
              color: isAnswered() ? '#0a0a0a' : 'var(--ink-muted)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              border: 'none',
              cursor: isAnswered() && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              marginBottom: '10px',
            }}
          >
            {loading
              ? 'מנתח...'
              : step === TOTAL - 1
                ? 'סיים וקבל המלצות ←'
                : 'המשך לשאלה הבאה ←'}
          </button>

          {/* Skip */}
          {(q.canSkip || q.type === 'multi') && (
            <button
              onClick={goNext}
              style={{
                display: 'block',
                width: '100%',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                color: 'var(--ink-muted)',
                textAlign: 'center',
                padding: '4px 0',
              }}
            >
              {step === TOTAL - 1 ? 'דלג וקבל המלצות' : 'דלג על שאלה זו'}
            </button>
          )}

          {/* Dots progress */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '14px' }}>
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === step ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i < step
                    ? 'var(--accent-gold)'
                    : i === step
                      ? 'var(--accent-gold)'
                      : 'var(--border)',
                  transition: 'all 0.3s ease',
                  opacity: i < step ? 0.5 : 1,
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
