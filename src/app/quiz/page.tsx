'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, X, Search, Check, Ban, Lock, Sparkles,
  Trees, Droplets, Flame, Flower2, Candy, Waves,
} from 'lucide-react';
import Link from 'next/link';
import { fragrances } from '@/data/fragrances';
import { useQuizStore, type QuizAnswers } from '@/stores/quizStore';
import { rankCandidates, buildTasteVector, signatureNotes } from '@/lib/fragrance-match';

/* ─── Constants ─────────────────────────────────────────────────────── */
const TOTAL_QUESTIONS = 9;

/* ─── Q1 options ─────────────────────────────────────────────────────── */
const DIRECTION_OPTIONS = [
  { id: 'woody',    label: 'עצי',              icon: <Trees size={20} />,   desc: 'עץ, אזוב, סנדלווד' },
  { id: 'fresh',    label: 'הדרי ורענן',         icon: <Droplets size={20} />, desc: 'הדרים, מים, עשבים' },
  { id: 'warm',     label: 'חם ומתובל',          icon: <Flame size={20} />,   desc: 'אמברה, ונילה, תבלינים' },
  { id: 'floral',   label: 'פרחוני',             icon: <Flower2 size={20} />, desc: 'ורד, יסמין, אדמונית' },
  { id: 'gourmand', label: 'גורמה ומתוק',         icon: <Candy size={20} />,   desc: 'ונילה, קרמל, קקאו' },
  { id: 'aquatic',  label: 'אקווטי',             icon: <Waves size={20} />,   desc: 'מלח, ים, רוח' },
] as const;

/* ─── Q2 note chips ──────────────────────────────────────────────────── */
const LOVED_NOTES = [
  'ונילה', 'טבק', 'עוד', 'ברגמוט', 'אמברה', 'ורד', 'עור', 'סנדלווד',
  'מושק', 'קוקוס', 'קינמון', 'יסמין', 'פצ\'ולי', 'ארז', 'לבנדר', 'הל',
];

/* ─── Q3 avoided notes ───────────────────────────────────────────────── */
const AVOIDED_OPTIONS = [
  { id: 'oud',      label: 'עוד (Oud)',       desc: 'עשיר, עץ מזרחי חזק' },
  { id: 'patchouli', label: 'פצ\'ולי',        desc: 'אדמתי, חזק' },
  { id: 'musk',     label: 'מושק כבד',        desc: 'חייתי, עז' },
  { id: 'floral',   label: 'פרחוני מתוק',     desc: 'ורדים, אבקתי' },
  { id: 'gourmand', label: 'גורמה מתוק',      desc: 'מתוק מאוד, ממתקי' },
  { id: 'alcohol',  label: 'אלכוהול חזק',     desc: 'חד בהתזה' },
];

/* ─── Q6 projection ─────────────────────────────────────────────────── */
const PROJECTION_OPTIONS = [
  { id: 'intimate', label: 'קרוב לעור',       dots: 1, desc: 'אינטימי · מרחק זרוע' },
  { id: 'moderate', label: 'מורגש בסביבה',    dots: 2, desc: 'מאוזן · אנשים סביבך ירגישו' },
  { id: 'strong',   label: 'ממלא חדר',        dots: 3, desc: 'Statement · נוכחות חזקה' },
];

/* ─── Q7 longevity ───────────────────────────────────────────────────── */
const LONGEVITY_OPTIONS = [
  { id: 'light',  label: '3-5 שעות',  desc: 'קליל · לרענון' },
  { id: 'medium', label: '5-8 שעות',  desc: 'יום עבודה מלא' },
  { id: 'long',   label: '8+ שעות',   desc: 'מהבוקר עד הלילה' },
];

/* ─── Q8 budget ──────────────────────────────────────────────────────── */
const BUDGET_OPTIONS = [
  { id: 'under400', label: 'עד 400₪' },
  { id: '400-800',  label: '400-800₪' },
  { id: '800-1500', label: '800-1,500₪' },
  { id: '1500plus', label: '1,500₪+' },
  { id: 'any',      label: 'המחיר לא משנה' },
];

/* ─── Slide animation ────────────────────────────────────────────────── */
const slideVariants = {
  enter:  (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
};

/* ─── Pill component ─────────────────────────────────────────────────── */
function Pill({
  label, desc, selected, onClick, disabled,
}: {
  label: string; desc?: string; selected: boolean;
  onClick: () => void; disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`quiz-option${selected ? ' quiz-option--selected' : ''}`}
      style={{ opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <div style={{ flex: 1 }}>
        <p className="quiz-option-label" style={{ fontSize: 15 }}>{label}</p>
        {desc && <p className="quiz-option-desc">{desc}</p>}
      </div>
      <Check size={15} className="quiz-option-check" />
    </button>
  );
}

/* ─── Q1: Direction grid ─────────────────────────────────────────────── */
function DirectionGrid({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {DIRECTION_OPTIONS.map(opt => {
        const isSel = selected === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            aria-pressed={isSel}
            className={`quiz-option-tile${isSel ? ' quiz-option-tile--selected' : ''}`}
          >
            <span aria-hidden="true" className="quiz-option-tile-icon" style={{ display: 'flex', lineHeight: 0 }}>{opt.icon}</span>
            <div>
              <p className="quiz-option-tile-label">{opt.label}</p>
              <p className="quiz-option-tile-desc">{opt.desc}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Q2: Note chips ─────────────────────────────────────────────────── */
function NoteChips({ selected, onChange }: { selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (note: string) => {
    if (selected.includes(note)) onChange(selected.filter(n => n !== note));
    else onChange([...selected, note]);
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {LOVED_NOTES.map(note => {
        const isSel = selected.includes(note);
        return (
          <button
            key={note}
            onClick={() => toggle(note)}
            aria-pressed={isSel}
            className={`quiz-chip${isSel ? ' quiz-chip--selected' : ''}`}
          >
            {isSel && <Check size={11} />}
            {note}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Q3: Avoided notes ──────────────────────────────────────────────── */
function AvoidedGrid({ selected, onChange }: { selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (id: string) => {
    if (selected.includes(id)) onChange(selected.filter(x => x !== id));
    else onChange([...selected, id]);
  };
  return (
    <div className="quiz-option-list">
      {AVOIDED_OPTIONS.map(opt => {
        const isSel = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => toggle(opt.id)}
            aria-pressed={isSel}
            className={`quiz-option${isSel ? ' quiz-option--reject-selected' : ''}`}
          >
            <div style={{ flex: 1 }}>
              <p className="quiz-option-label" style={{ fontSize: 15 }}>{opt.label}</p>
              <p className="quiz-option-desc">{opt.desc}</p>
            </div>
            <Ban size={15} className="quiz-option-check" />
          </button>
        );
      })}
      <button
        onClick={() => onChange([])}
        style={{
          marginTop: 16, padding: '12px', width: '100%',
          border: '1px dashed var(--border-default)',
          background: 'transparent', color: 'var(--text-muted)',
          fontSize: 13, cursor: 'pointer', borderRadius: 3, minHeight: 44,
        }}
      >
        אין לי תווים בעייתיים
      </button>
    </div>
  );
}

/* ─── Q6: Projection dots ────────────────────────────────────────────── */
function ProjectionCards({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div className="quiz-option-list">
      {PROJECTION_OPTIONS.map(opt => {
        const isSel = selected === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            aria-pressed={isSel}
            className={`quiz-option${isSel ? ' quiz-option--selected' : ''}`}
          >
            <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
              {[1, 2, 3].map(d => (
                <div
                  key={d}
                  style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: d <= opt.dots
                      ? (isSel ? 'var(--gold)' : 'var(--text-muted)')
                      : 'var(--border-default)',
                    transition: 'background 150ms ease',
                  }}
                />
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <p className="quiz-option-label" style={{ fontSize: 15 }}>{opt.label}</p>
              <p className="quiz-option-desc">{opt.desc}</p>
            </div>
            <Check size={15} className="quiz-option-check" />
          </button>
        );
      })}
    </div>
  );
}

/* ─── Q9: Collection search ──────────────────────────────────────────── */
function CollectionSearch({ selected, onChange }: { selected: string[]; onChange: (v: string[]) => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length >= 2
    ? fragrances.filter(f =>
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.house.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const toggle = (id: string) => {
    if (selected.includes(id)) onChange(selected.filter(x => x !== id));
    else if (selected.length < 10) onChange([...selected, id]);
  };

  const selectedFragrances = fragrances.filter(f => selected.includes(String(f.id)));

  return (
    <div>
      {/* Chips of selected */}
      {selectedFragrances.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {selectedFragrances.map(f => (
            <button
              key={f.id}
              onClick={() => toggle(String(f.id))}
              aria-label={`הסר ${f.name}`}
              className="quiz-chip quiz-chip--selected"
            >
              {f.name} <X size={11} />
            </button>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className="quiz-search-field">
        <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="text"
          placeholder="חפש לפי שם בושם או בית בושם..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          dir="rtl"
          aria-label="חיפוש בשמים"
          autoComplete="off"
        />
        {query && (
          <button onClick={() => setQuery('')} aria-label="נקה חיפוש" className="quiz-search-clear">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {results.length > 0 && (
        <div className="quiz-dropdown">
          {results.map(f => {
            const isSel = selected.includes(String(f.id));
            return (
              <button
                key={f.id}
                onClick={() => toggle(String(f.id))}
                className={`quiz-dropdown-item${isSel ? ' quiz-dropdown-item--selected' : ''}`}
              >
                <div>
                  <span className="quiz-dropdown-item-name">{f.name}</span>
                  <span className="quiz-dropdown-item-house">{f.house}</span>
                </div>
                {isSel && <Check size={13} />}
              </button>
            );
          })}
        </div>
      )}

      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, textAlign: 'right' }}>
        {selected.length === 0 ? 'מינימום מומלץ: 3 בשמים' : `נבחרו ${selected.length}/10`}
      </p>

      <button
        onClick={() => onChange([])}
        style={{
          padding: '12px 0', width: '100%',
          border: '1px dashed var(--border-default)',
          background: 'transparent', color: 'var(--text-muted)',
          fontSize: 13, cursor: 'pointer', borderRadius: 3, minHeight: 44,
        }}
      >
        אין לי בשמים עדיין - תמליץ מאפס
      </button>
    </div>
  );
}

/* ─── Email Gate ─────────────────────────────────────────────────────── */
function computeTopCandidate(answers: QuizAnswers): { name: string; house: string; score: number } {
  const knownIds = answers.collection.map(Number).filter(Boolean);
  const tasteVec = buildTasteVector(knownIds, fragrances);
  const lonMap: Record<string, string> = { light: '4-6h', medium: '6-10h', long: '10h+' };
  const silMap: Record<string, string> = { intimate: 'discrete', moderate: 'moderate', strong: 'strong' };
  const budMap: Record<string, string> = { under400: 'under500', '400-800': '500-1000', '800-1500': '1000-2000' };
  const avoidedIds = answers.avoidedNotes.map(note => {
    const map: Record<string, string> = { oud: 'oud', patchouli: 'fresh', musk: 'animalic', floral: 'floral', gourmand: 'sweet', alcohol: 'fresh' };
    return map[note] ?? note;
  });
  const candidates = rankCandidates(fragrances, tasteVec, avoidedIds, {
    budget: budMap[answers.budget ?? ''] ?? '',
    longevity: lonMap[answers.longevity ?? ''] ?? '',
    sillage: silMap[answers.projection ?? ''] ?? '',
    seasons: answers.seasons,
    occasions: answers.occasions,
  }, 1);
  if (!candidates.length) return { name: 'Baccarat Rouge 540', house: 'Maison Francis Kurkdjian', score: 96 };
  const top = candidates[0];
  return { name: top.name, house: top.house, score: Math.min(97, Math.round(60 + top.similarityScore * 40)) };
}

function EmailGate({ onSubmit, onSkip, topFragrance }: {
  onSubmit: (email: string, marketing: boolean) => void;
  onSkip: () => void;
  topFragrance?: { name: string; house: string; score: number };
}) {
  const [email, setEmail] = useState('');
  const [marketing, setMarketing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    onSubmit(email, marketing);
  };

  const displayTop = topFragrance ?? { name: 'Baccarat Rouge 540', house: 'Maison Francis Kurkdjian', score: 96 };

  return (
    <div style={{ flex: 1, padding: '32px 20px 80px', maxWidth: 480, margin: '0 auto', width: '100%' }} dir="rtl">
      {/* Eyebrow */}
      <p style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', textAlign: 'center', marginBottom: 10 }}>
        ההתאמות שלך מוכנות
      </p>
      <h1 style={{
        fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 'clamp(24px, 5vw, 32px)',
        fontWeight: 400, color: 'var(--text-primary)', textAlign: 'center', lineHeight: 1.2, marginBottom: 24,
      }}>
        10 בשמים שנבחרו בשבילך.
      </h1>

      {/* Preview card - #1 visible */}
      <div className="rec-card rec-card--top" style={{ marginBottom: 10 }}>
        <div className="rec-card-head">
          <p className="rec-card-house">{displayTop.house}</p>
          <span className="rec-card-score">{displayTop.score}<small>ציון</small></span>
        </div>
        <h2 className="rec-card-name" style={{ marginBottom: 0 }}>{displayTop.name}</h2>
      </div>

      {/* Blurred preview cards */}
      {[0, 1].map(i => (
        <div
          key={i}
          aria-hidden="true"
          className="rec-card"
          style={{ marginBottom: 10, filter: 'blur(4px)', opacity: 0.45, userSelect: 'none' }}
        >
          <div style={{ height: 8, width: '35%', background: 'var(--border-default)', marginBottom: 10 }} />
          <div style={{ height: 15, width: '60%', background: 'var(--border-default)' }} />
        </div>
      ))}

      {/* Lock label */}
      <p style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        fontSize: 11, letterSpacing: 1, color: 'var(--gold)', marginBottom: 24,
      }}>
        <Lock size={11} />
        עוד 9 התאמות נעולות
      </p>

      {/* Email form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
        <input
          type="email"
          placeholder="האימייל שלך"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          dir="rtl"
          aria-label="כתובת אימייל"
          style={{
            padding: '14px 16px', borderRadius: 3,
            border: '1px solid var(--border-default)', background: 'var(--bg-card)',
            color: 'var(--text-primary)', fontSize: 14,
            width: '100%', boxSizing: 'border-box',
          }}
        />
        <button
          type="submit"
          disabled={loading || !email.includes('@')}
          className="quiz-cta"
          style={{ width: '100%' }}
        >
          {loading ? 'מנתח...' : 'חשוף את כל ה-10'}
        </button>
      </form>

      {/* Marketing checkbox */}
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 6, justifyContent: 'center' }}>
        <input
          type="checkbox"
          checked={marketing}
          onChange={e => setMarketing(e.target.checked)}
          style={{ accentColor: 'var(--gold)' }}
        />
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>שלחו לי גם עדכונים שבועיים</span>
      </label>
      <p style={{ fontSize: 10, color: 'var(--text-faint)', textAlign: 'center', marginBottom: 28 }}>
        בלי spam · ביטול בכל עת
      </p>

      {/* Soft escape */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onSkip}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 11, color: 'var(--text-faint)',
          }}
        >
          הצג 3 התאמות בלבד
        </button>
      </div>
    </div>
  );
}

/* ─── Intro Screen ───────────────────────────────────────────────────── */
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center', gap: 28 }}>
      {/* Icon */}
      <div style={{
        width: 64, height: 64,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(201,169,97,0.25), rgba(201,169,97,0.08))',
        border: '1px solid var(--border-gold)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 28px rgba(201,169,97,0.18)',
      }}>
        <Sparkles size={28} color="var(--gold)" />
      </div>

      <div>
        <p style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
          ברוך הבא ל-SCENTORY
        </p>
        <h1 style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 'clamp(24px, 5vw, 34px)', fontWeight: 400,
          color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 14,
        }}>
          נמצא את הבושם שנולד בשבילך.
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-tertiary)', lineHeight: 1.65, maxWidth: 340, margin: '0 auto' }}>
          תשע שאלות קצרות. ללא תשובות נכונות או שגויות — רק אתה, הטעם שלך, ויועץ שמקשיב.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button onClick={onStart} data-quiz-start className="quiz-cta">
          בוא נתחיל את המסע
        </button>
        <p style={{ fontSize: 11, color: 'var(--text-faint)' }}>3 דקות · ללא הרשמה · מיידי</p>
      </div>
    </div>
  );
}

/* ─── Question metadata ──────────────────────────────────────────────── */
const Q_META = [
  { category: 'כיוון ריחני',                      title: 'לאיזה עולם ריחני אתה נמשך?',                              subtitle: 'אין נכון או לא נכון - רק מה שמושך אותך',              canSkip: false },
  { category: 'תווים אהובים',                      title: 'אילו תווים מדברים אליך?',                                 subtitle: 'בחר כמה שתרצה - או דלג',                                canSkip: true  },
  { category: 'תווים להימנע · חשוב',               title: 'יש תו שאתה פשוט לא סובל?',                               subtitle: 'עדיף שנדע - לא נמליץ על משהו שתשנא',                   canSkip: true  },
  { category: 'רגע השימוש',                         title: 'מתי תלבש אותו בעיקר?',                                   subtitle: 'אפשר לבחור כמה',                                        canSkip: true  },
  { category: 'עונה',                               title: 'באיזו עונה תלבש אותו?',                                  subtitle: 'בשמים מתנהגים שונה בחום ובקור',                         canSkip: true  },
  { category: 'עוצמת נוכחות (Sillage)',             title: 'כמה אתה רוצה שירגישו אותך?',                             subtitle: 'מ\'רק אתה יודע\' עד \'כל החדר יודע\'',                  canSkip: false },
  { category: 'עמידות',                             title: 'כמה שעות הוא צריך להחזיק?',                              subtitle: 'ככל שיותר עמיד, בדרך כלל יותר עוצמתי',                  canSkip: false },
  { category: 'תקציב',                              title: 'מה טווח המחיר הנוח לך?',                                 subtitle: 'נמליץ בתוך התקציב שלך',                                 canSkip: false },
  { category: 'השאלה האחרונה · החשובה ביותר',       title: 'אילו בשמים אתה כבר אוהב?',                               subtitle: 'זה מה שהופך את ההתאמות למדויקות באמת',                  canSkip: true  },
];

const OCCASIONS_OPTIONS = ['יומיומי', 'עבודה', 'ערב ויציאות', 'אירועים מיוחדים', 'דייטים', 'ספורט ופנאי'];
const SEASONS_OPTIONS   = ['אביב', 'קיץ', 'סתיו', 'חורף', 'כל השנה'];

/* ─── Main Quiz Page ─────────────────────────────────────────────────── */
export default function QuizPage() {
  const router = useRouter();
  const {
    step, answers, setAnswer, setStep, setEmail, setMarketingConsent,
    next, back, reset,
  } = useQuizStore();
  const [direction, setDir] = useState(1);

  const progress = step === 0 ? 0 : (step / (TOTAL_QUESTIONS + 1)) * 100;

  const isAnswered = useCallback(() => {
    if (step === 0 || step > TOTAL_QUESTIONS) return true;
    const q = Q_META[step - 1];
    switch (step) {
      case 1: return !!answers.scentDirection;
      case 2: return true; // can skip
      case 3: return true; // can skip
      case 4: return true; // can skip
      case 5: return true; // can skip
      case 6: return !!answers.projection;
      case 7: return !!answers.longevity;
      case 8: return !!answers.budget;
      case 9: return true; // can skip
      default: return false;
    }
    void q;
  }, [step, answers]);

  const goNext = useCallback(() => {
    setDir(1);
    next();
  }, [next]);

  const goBack = useCallback(() => {
    if (step <= 1) { router.push('/'); return; }
    setDir(-1);
    back();
  }, [step, back, router]);

  const buildPayload = (email: string | null, marketing: boolean, previewMode: boolean) => {
    const knownIds   = answers.collection.map(Number).filter(Boolean);
    const knownNames = fragrances.filter(f => knownIds.includes(f.id)).map(f => `${f.name} (${f.house})`);
    const tasteVec   = buildTasteVector(knownIds, fragrances);
    const sigNotes   = signatureNotes(knownIds, fragrances);

    const lonMap: Record<string, string> = { light: '4-6h', medium: '6-10h', long: '10h+' };
    const silMap: Record<string, string> = { intimate: 'discrete', moderate: 'moderate', strong: 'strong' };
    const budMap: Record<string, string> = { under400: 'under500', '400-800': '500-1000', '800-1500': '1000-2000' };

    const rankedAnswers = {
      budget:    budMap[answers.budget ?? ''] ?? '',
      longevity: lonMap[answers.longevity ?? ''] ?? '',
      sillage:   silMap[answers.projection ?? ''] ?? '',
      seasons:   answers.seasons,
      occasions: answers.occasions,
    };

    const avoidedIds = answers.avoidedNotes.map(note => {
      const map: Record<string, string> = { oud: 'oud', patchouli: 'fresh', musk: 'animalic', floral: 'floral', gourmand: 'sweet', alcohol: 'fresh' };
      return map[note] ?? note;
    });

    const candidates = rankCandidates(fragrances, tasteVec, avoidedIds, rankedAnswers);

    return {
      answers: buildApiAnswers(answers, knownNames),
      candidates,
      tasteVector: tasteVec,
      sigNotes,
      email,
      marketing,
      knownNames,
      previewMode,
    };
  };

  const handleEmailSubmit = (email: string, marketing: boolean) => {
    setEmail(email);
    setMarketingConsent(marketing);
    try { sessionStorage.setItem('scentory-quiz-payload', JSON.stringify(buildPayload(email, marketing, false))); } catch {}
    router.push('/quiz/loading');
  };

  const handleSkip = () => {
    try { sessionStorage.setItem('scentory-quiz-payload', JSON.stringify(buildPayload(null, false, true))); } catch {}
    router.push('/quiz/loading');
  };

  /* Intro */
  if (step === 0) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
        <header style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)',
          padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 10, letterSpacing: 4, color: 'var(--gold)' }}>SCENTORY</span>
          <Link href="/" aria-label="חזור לדף הבית" style={{ color: 'var(--text-muted)', display: 'flex', minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </Link>
        </header>
        <IntroScreen onStart={() => { setDir(1); setStep(1); }} />
      </div>
    );
  }

  /* Email gate */
  if (step === TOTAL_QUESTIONS + 1) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ height: 3, background: 'var(--border-subtle)' }}>
            <div style={{ width: '100%', height: '100%', background: 'var(--gold)', transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => { setDir(-1); back(); }}
              aria-label="חזור"
              dir="ltr"
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 12 }}
            >
              <ArrowLeft size={16} />
              חזור
            </button>
            <Link href="/" aria-label="סגור שאלון" style={{ color: 'var(--text-muted)', display: 'flex' }}>
              <X size={18} />
            </Link>
          </div>
        </header>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <EmailGate onSubmit={handleEmailSubmit} onSkip={handleSkip} topFragrance={computeTopCandidate(answers)} />
        </div>
      </div>
    );
  }

  const q = Q_META[step - 1];
  if (!q) return null;

  const canSkip = q.canSkip;

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ height: 3, background: 'var(--border-subtle)' }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg, var(--gold), var(--gold-light))' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px' }} dir="rtl">
          <button
            onClick={goBack}
            aria-label="חזור"
            dir="ltr"
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 12, minHeight: 44, minWidth: 44 }}
          >
            <ArrowLeft size={16} />
            חזור
          </button>
          <span dir="ltr" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1 }}>{step} / {TOTAL_QUESTIONS}</span>
          <Link href="/" aria-label="סגור שאלון" style={{ color: 'var(--text-muted)', display: 'flex', minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </Link>
        </div>
      </header>

      {/* Body */}
      <div
        style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 600, width: '100%', margin: '0 auto', padding: '28px 20px 140px', overflow: 'hidden' }}
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
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
              {q.category}
            </p>
            <h1 style={{
              fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400,
              fontSize: 'clamp(20px, 4vw, 28px)', color: 'var(--text-primary)',
              lineHeight: 1.2, marginBottom: 8,
            }}>
              {q.title}
            </h1>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 28, lineHeight: 1.6 }}>
              {q.subtitle}
            </p>

            {/* Q1 */}
            {step === 1 && (
              <DirectionGrid
                selected={answers.scentDirection ?? ''}
                onSelect={v => setAnswer('scentDirection', v)}
              />
            )}

            {/* Q2 */}
            {step === 2 && (
              <NoteChips
                selected={answers.lovedNotes}
                onChange={v => setAnswer('lovedNotes', v)}
              />
            )}

            {/* Q3 */}
            {step === 3 && (
              <AvoidedGrid
                selected={answers.avoidedNotes}
                onChange={v => setAnswer('avoidedNotes', v)}
              />
            )}

            {/* Q4 */}
            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {OCCASIONS_OPTIONS.map(opt => {
                  const isSel = answers.occasions.includes(opt);
                  return (
                    <Pill
                      key={opt}
                      label={opt}
                      selected={isSel}
                      onClick={() => {
                        const cur = answers.occasions;
                        setAnswer('occasions', isSel ? cur.filter(x => x !== opt) : [...cur, opt]);
                      }}
                    />
                  );
                })}
              </div>
            )}

            {/* Q5 */}
            {step === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {SEASONS_OPTIONS.map(opt => {
                  const isSel = answers.seasons.includes(opt);
                  return (
                    <Pill
                      key={opt}
                      label={opt}
                      selected={isSel}
                      onClick={() => {
                        const cur = answers.seasons;
                        setAnswer('seasons', isSel ? cur.filter(x => x !== opt) : [...cur, opt]);
                      }}
                    />
                  );
                })}
              </div>
            )}

            {/* Q6 */}
            {step === 6 && (
              <ProjectionCards
                selected={answers.projection ?? ''}
                onSelect={v => setAnswer('projection', v)}
              />
            )}

            {/* Q7 */}
            {step === 7 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {LONGEVITY_OPTIONS.map(opt => (
                  <Pill
                    key={opt.id}
                    label={opt.label}
                    desc={opt.desc}
                    selected={answers.longevity === opt.id}
                    onClick={() => setAnswer('longevity', opt.id)}
                  />
                ))}
              </div>
            )}

            {/* Q8 */}
            {step === 8 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {BUDGET_OPTIONS.map(opt => (
                  <Pill
                    key={opt.id}
                    label={opt.label}
                    selected={answers.budget === opt.id}
                    onClick={() => setAnswer('budget', opt.id)}
                  />
                ))}
              </div>
            )}

            {/* Q9 */}
            {step === 9 && (
              <CollectionSearch
                selected={answers.collection}
                onChange={v => setAnswer('collection', v)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer CTA */}
      <div
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)', padding: '16px 20px max(28px, env(safe-area-inset-bottom))', zIndex: 40 }}
        dir="rtl"
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <button
            onClick={goNext}
            disabled={!isAnswered()}
            data-quiz-next
            style={{
              width: '100%', padding: '15px',
              background: isAnswered() ? 'var(--gold)' : 'var(--border-subtle)',
              color: isAnswered() ? '#050505' : 'var(--text-muted)',
              fontWeight: 600, fontSize: 13, border: 'none',
              cursor: isAnswered() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s', marginBottom: 8, borderRadius: 8, minHeight: 48,
            }}
            aria-label={step === TOTAL_QUESTIONS ? 'גלה את ההתאמות שלי' : 'המשך לשאלה הבאה'}
          >
            {step === TOTAL_QUESTIONS ? 'גלה את ההתאמות שלי' : 'המשך'}
          </button>

          {canSkip && (
            <button
              onClick={goNext}
              style={{
                display: 'block', width: '100%', background: 'none', border: 'none',
                cursor: 'pointer', fontSize: 11, color: 'var(--text-faint)',
                textAlign: 'center', padding: '4px 0',
              }}
              aria-label="דלג על שאלה זו"
            >
              דלג
            </button>
          )}

          {/* Dot progress */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 12 }}>
            {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i + 1 === step ? 18 : 5, height: 5, borderRadius: 3,
                  background: i + 1 <= step ? 'var(--gold)' : 'var(--border-default)',
                  opacity: i + 1 < step ? 0.5 : 1,
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Map quiz answers to API format ─────────────────────────────────── */
function buildApiAnswers(answers: ReturnType<typeof useQuizStore.getState>['answers'], knownNames: string[]) {
  const dirMap: Record<string, string> = {
    woody: 'woody', fresh: 'fresh', warm: 'oriental',
    floral: 'floral', gourmand: 'gourmand', aquatic: 'fresh',
  };
  const lonMap: Record<string, string> = {
    light: '3-5h', medium: '6-8h', long: '10h+',
  };
  const budgetMap: Record<string, string> = {
    under400: 'under500', '400-800': '500-1000',
    '800-1500': 'above1000', '1500plus': 'above1000', any: '',
  };
  return {
    scentType:         dirMap[answers.scentDirection ?? ''] ?? '',
    lovedNotes:        answers.lovedNotes.join(', '),
    avoidedNotes:      answers.avoidedNotes.join(', '),
    occasions:         answers.occasions.join(', '),
    season:            answers.seasons.join(', '),
    projection:        answers.projection ?? '',
    longevity:         lonMap[answers.longevity ?? ''] ?? '',
    budget:            budgetMap[answers.budget ?? ''] ?? '',
    previousFragrance: knownNames.join(', '),
    gender:            '',
    style:             '',
    sillage:           answers.projection ?? '',
  };
}
