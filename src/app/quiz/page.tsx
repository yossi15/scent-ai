'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Search, Check, Flame, Droplets, Moon, Flower, Leaf, HelpCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { fragrances } from '@/data/fragrances';
import { rankCandidates, buildTasteVector, signatureNotes } from '@/lib/fragrance-match';

/* ─── Types ─────────────────────────────────────────────────────── */
type SingleAnswer = string;
type MultiAnswer  = string[];
type Answers = {
  family?:    SingleAnswer;
  taste?:     SingleAnswer;
  sillage?:   SingleAnswer;
  longevity?: SingleAnswer;
  occasions?: MultiAnswer;
  seasons?:   MultiAnswer;
  budget?:    SingleAnswer;
  gender?:    SingleAnswer;
  known?:     number[];
};

interface Question {
  id: keyof Answers;
  label: string;
  text: string;
  sub?: string;
  type: 'single' | 'multi' | 'search' | 'family';
  maxSelect?: number;
  canSkip?: boolean;
  options?: { value: string; label: string; sub?: string; color?: string; icon?: React.ReactNode }[];
}

/* ─── Scent family icons ─────────────────────────────────────────── */
const FAMILY_OPTIONS = [
  { value: 'warm',   label: 'חמים ועוטף',      notes: 'אמברה · ונילה · עורות', examples: 'Tobacco Vanille, Oud Wood',     color: '#c9a961', icon: <Flame size={18} /> },
  { value: 'fresh',  label: 'רענן ונקי',         notes: 'הדרים · מים · עשבים',   examples: 'Sauvage, Light Blue',          color: '#6a8a9a', icon: <Droplets size={18} /> },
  { value: 'dark',   label: 'אפל ומסתורי',       notes: 'עשן · עוד · שרפים',     examples: 'Black Orchid, Encre Noire',    color: '#9a7a9a', icon: <Moon size={18} /> },
  { value: 'floral', label: 'פרחוני ורומנטי',    notes: 'ורד · יסמין · אדמונית', examples: 'Miss Dior, Chanel No.5',       color: '#c98aa3', icon: <Flower size={18} /> },
  { value: 'green',  label: 'ירוק וטבעי',        notes: 'עץ · אזוב · עלים',      examples: 'Polo Green, Vetiver',          color: '#8a9a6a', icon: <Leaf size={18} /> },
  { value: 'unsure', label: 'לא בטוח',           notes: 'תן ל-AI לזהות לבד',     examples: '',                              color: '#888',    icon: <HelpCircle size={18} /> },
];

/* ─── Questions (9 total) ────────────────────────────────────────── */
const QUESTIONS: Question[] = [
  {
    id: 'family', label: 'משפחת ריח', text: 'איזה סוג ריח מושך אותך?',
    sub: 'כל אופציה כוללת דוגמאות אמיתיות', type: 'family',
  },
  {
    id: 'taste', label: 'כיוון טעם', text: 'מתוק, יבש, או משולב?',
    sub: 'על הפלטה הבסיסית של הריח שלך', type: 'single',
    options: [
      { value: 'sweet',    label: 'מתוק',   sub: 'Gourmand, ונילה, קרמל - Baccarat Rouge, Angel' },
      { value: 'dry',      label: 'יבש',    sub: "Woody, עשן, אדמה - Oud Wood, Terre d'Hermes" },
      { value: 'balanced', label: 'משולב',  sub: 'קצת מכל אחד - Aventus, Bleu de Chanel' },
    ],
  },
  {
    id: 'sillage', label: 'עוצמת הקרנה', text: 'כמה חזק אתה רוצה שיהיה?',
    type: 'single',
    options: [
      { value: 'discrete', label: 'דיסקרטי', sub: 'רק מי שקרוב מריח אותך' },
      { value: 'moderate', label: 'מאוזן',   sub: 'קיים אבל לא דומיננטי' },
      { value: 'strong',   label: 'בולט',    sub: 'אנשים מסתובבים לראות מי אתה' },
    ],
  },
  {
    id: 'longevity', label: 'עמידות', text: 'כמה זמן צריך להחזיק?',
    type: 'single',
    options: [
      { value: '4-6h',  label: '4-6 שעות',  sub: 'ליום עבודה רגיל' },
      { value: '6-10h', label: '6-10 שעות', sub: 'לאירוע ארוך' },
      { value: '10h+',  label: '10+ שעות',  sub: 'Performer - מתעורר איתי בבוקר' },
    ],
  },
  {
    id: 'occasions', label: 'רגעי שימוש', text: 'מתי תשתמש בו?',
    sub: 'בחר עד 3', type: 'multi', maxSelect: 3,
    options: [
      { value: 'daily',   label: 'יומיומי / משרד' },
      { value: 'evening', label: "ערב / דייט" },
      { value: 'events',  label: 'חגיגות ואירועים' },
      { value: 'casual',  label: "קז'ואל סוף שבוע" },
      { value: 'sport',   label: 'ספורט וכושר' },
    ],
  },
  {
    id: 'seasons', label: 'עונות מועדפות', text: 'באיזו עונה תשתמש בו בעיקר?',
    sub: 'אפשר לבחור כמה', type: 'multi',
    options: [
      { value: 'spring', label: 'אביב' },
      { value: 'summer', label: 'קיץ' },
      { value: 'fall',   label: 'סתיו' },
      { value: 'winter', label: 'חורף' },
    ],
  },
  {
    id: 'budget', label: 'טווח מחירים', text: 'כמה נוח לך להשקיע?',
    sub: 'לבקבוק מלא', type: 'single',
    options: [
      { value: 'under500',  label: 'עד 500',     sub: '₪' },
      { value: '500-1000',  label: '500-1,000',  sub: '₪' },
      { value: '1000-2000', label: '1,000-2,000',sub: '₪' },
      { value: 'above2000', label: 'מעל 2,000',  sub: '₪ - Collector level' },
    ],
  },
  {
    id: 'gender', label: 'כיוון מגדרי', text: 'איזה כיוון מגדרי?',
    type: 'single',
    options: [
      { value: 'masculine', label: 'גברי' },
      { value: 'feminine',  label: 'נשי' },
      { value: 'unisex',    label: 'יוניסקס' },
      { value: 'any',       label: 'לא משנה לי' },
    ],
  },
  {
    id: 'known', label: 'האוסף הקיים', text: 'בשמים שאתה כבר אוהב',
    sub: 'חפש וסמן 3-10 בשמים - AI ילמד מהם את הטעם שלך', type: 'search', canSkip: true,
  },
];

const TOTAL = QUESTIONS.length; // 9
const SS_KEY = 'scentory-quiz-state';

/* ─── Map answers → API format ───────────────────────────────────── */
function mapAnswers(ans: Answers, knownNames: string[]) {
  const familyMap: Record<string, string> = { warm: 'oriental', fresh: 'fresh', dark: 'woody', floral: 'floral', green: 'fresh', unsure: '' };
  const tasteMap:  Record<string, string> = { sweet: 'gourmand', dry: 'minimal', balanced: 'modern' };
  const budgetMap: Record<string, string> = { under500: 'under500', '500-1000': '500-1000', '1000-2000': 'above1000', above2000: 'above1000' };
  const lonMap:    Record<string, string> = { '4-6h': '3-5h', '6-10h': '6-8h', '10h+': '10h+' };
  return {
    scentType:         familyMap[ans.family ?? ''] ?? '',
    season:            (ans.seasons ?? []).join(', ') || '',
    occasion:          (ans.occasions ?? []).join(', ') || '',
    longevity:         lonMap[ans.longevity ?? ''] ?? '',
    style:             tasteMap[ans.taste ?? ''] ?? '',
    budget:            budgetMap[ans.budget ?? ''] ?? '',
    previousFragrance: knownNames.join(', '),
    gender:            ans.gender ?? '',
    sillage:           ans.sillage ?? '',
  };
}

/* ─── Pill option ────────────────────────────────────────────────── */
function Pill({ label, sub, selected, onClick, disabled }: {
  label: string; sub?: string; selected: boolean; onClick: () => void; disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      style={{
        width: '100%', textAlign: 'right', padding: '14px 18px',
        border: selected ? '1.5px solid var(--gold)' : '1px solid var(--border-default)',
        background: selected ? 'rgba(201,169,97,0.07)' : 'var(--bg-card)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'all 0.15s',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        borderRadius: 8,
      }}
    >
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: selected ? 'var(--gold)' : 'var(--text-primary)', marginBottom: sub ? 3 : 0, lineHeight: 1.3 }}>
          {label}
        </p>
        {sub && <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{sub}</p>}
      </div>
      {selected && <Check size={14} color="var(--gold)" style={{ flexShrink: 0 }} />}
    </button>
  );
}

/* ─── Family card grid ───────────────────────────────────────────── */
function FamilyGrid({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {FAMILY_OPTIONS.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            aria-pressed={isSelected}
            style={{
              padding: '14px 16px', textAlign: 'right',
              border: isSelected ? `1.5px solid ${opt.color}` : '1px solid var(--border-default)',
              background: isSelected ? `${opt.color}14` : 'var(--bg-card)',
              borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s',
              display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start',
            }}
          >
            <span style={{ color: isSelected ? opt.color : 'var(--text-muted)' }}>{opt.icon}</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: isSelected ? opt.color : 'var(--text-primary)', marginBottom: 3 }}>
                {opt.label}
              </p>
              <p style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.4 }}>{opt.notes}</p>
              {opt.examples && <p style={{ fontSize: 9, color: 'var(--text-faint)', marginTop: 2 }}>{opt.examples}</p>}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Search question (Q9) ───────────────────────────────────────── */
function SearchQuestion({ selected, onChange }: { selected: number[]; onChange: (ids: number[]) => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length >= 2
    ? fragrances.filter(f =>
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.house.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--border-default)', background: 'var(--bg-card)', padding: '12px 16px', marginBottom: 12, borderRadius: 8 }}>
        <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="text"
          placeholder="חפש לפי שם בושם או בית בושם..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          dir="rtl"
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: 'var(--text-primary)' }}
          autoComplete="off"
        />
        {query && (
          <button onClick={() => setQuery('')} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={14} />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div style={{ marginBottom: 16, border: '1px solid var(--border-default)', borderRadius: 8, overflow: 'hidden' }}>
          {results.map((f, i) => (
            <button
              key={f.id}
              onClick={() => toggle(f.id)}
              style={{
                width: '100%', textAlign: 'right', padding: '10px 14px',
                border: 'none', borderBottom: i < results.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                background: selected.includes(f.id) ? 'rgba(201,169,97,0.07)' : 'var(--bg-card)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
              }}
            >
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 500, fontSize: 13, color: 'var(--text-primary)' }}>{f.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', marginRight: 8 }}>{f.house}</span>
              </div>
              {selected.includes(f.id) && <Check size={13} color="var(--gold)" style={{ flexShrink: 0 }} />}
            </button>
          ))}
        </div>
      )}

      {selectedFragrances.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>
            נבחרו ({selectedFragrances.length}/10)
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedFragrances.map(f => (
              <button
                key={f.id}
                onClick={() => toggle(f.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '5px 12px',
                  border: '1px solid var(--border-gold)',
                  background: 'rgba(201,169,97,0.08)',
                  borderRadius: 100, fontSize: 12, color: 'var(--gold)', cursor: 'pointer',
                }}
              >
                {f.name} <X size={11} />
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onChange([])}
        style={{
          marginTop: 8, padding: '10px 0', width: '100%',
          border: '1px dashed var(--border-default)',
          background: 'transparent', color: 'var(--text-muted)',
          fontSize: 12, cursor: 'pointer', borderRadius: 8,
        }}
      >
        אין לי בשמים - תמליץ מאפס
      </button>
    </div>
  );
}

/* ─── Intro Screen ───────────────────────────────────────────────── */
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center', gap: 28 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 14px', borderRadius: 100,
        background: 'rgba(201,169,97,0.08)', border: '1px solid var(--border-gold)',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} className="animate-gold-pulse" />
        <span style={{ fontSize: 11, color: 'var(--gold)' }}>9 שאלות · 3 דקות</span>
      </div>

      <div>
        <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 'clamp(26px, 5vw, 36px)', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 14 }}>
          בוא נכיר את הריח שלך.
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-tertiary)', lineHeight: 1.65, maxWidth: 340, margin: '0 auto' }}>
          9 שאלות מדויקות. ניתוח AI. 5 התאמות אישיות מ-70+ בשמים מובחרים.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 10, padding: '14px 18px' }}>
        {['משפחת ריח', 'עוצמה ועמידות', 'האוסף הקיים שלך'].map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Check size={13} color="var(--gold)" />
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <button
          onClick={onStart}
          style={{
            fontSize: 14, fontWeight: 600, padding: '14px 40px', borderRadius: 8,
            background: 'var(--gold)', color: '#050505', border: 'none', cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.87')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          בוא נתחיל &#8592;
        </button>
        <p style={{ fontSize: 11, color: 'var(--text-faint)' }}>בלי הרשמה. בלי כרטיס.</p>
      </div>
    </div>
  );
}

/* ─── Email Gate ─────────────────────────────────────────────────── */
function EmailGate({ onSubmit, onSkip }: { onSubmit: (email: string, marketing: boolean) => void; onSkip: () => void }) {
  const [email, setEmail] = useState('');
  const [marketing, setMarketing] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    onSubmit(email, marketing);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', maxWidth: 420, margin: '0 auto', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{
          width: 64, height: 64, margin: '0 auto 16px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(201,169,97,0.25), rgba(201,169,97,0.08))',
          border: '1px solid var(--border-gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 24px rgba(201,169,97,0.2)',
        }}>
          <Sparkles size={26} color="var(--gold)" />
        </div>
        <p style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
          הניתוח שלך מוכן
        </p>
        <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 10 }}>
          5 ההתאמות שלך מוכנות.
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
          ניתוח ה-DNA הריחני שלך הושלם. השאר אימייל לקבלת כל 5 ההמלצות האישיות.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        <input
          type="email"
          placeholder="האימייל שלך"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          dir="rtl"
          style={{
            width: '100%', padding: '13px 16px', borderRadius: 8,
            border: '1px solid var(--border-default)', background: 'var(--bg-card)',
            color: 'var(--text-primary)', fontSize: 14, boxSizing: 'border-box',
          }}
        />
        <button
          type="submit"
          disabled={loading || !email.includes('@')}
          style={{
            padding: '13px', borderRadius: 8,
            background: email.includes('@') ? 'var(--gold)' : 'var(--border-default)',
            color: email.includes('@') ? '#050505' : 'var(--text-muted)',
            border: 'none', fontSize: 14, fontWeight: 600,
            cursor: email.includes('@') && !loading ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'מנתח...' : 'חשוף את ההתאמות &#8592;'}
        </button>
      </form>

      <div style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '12px 14px', marginBottom: 14 }}>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>תקבל גם:</p>
        {['פרופיל ה-DNA הריחני שלך', 'הסבר אישי לכל המלצה', 'עדכונים שבועיים על בשמים חדשים'].map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <Check size={11} color="var(--gold)" />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item}</span>
          </div>
        ))}
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 6 }}>
        <input type="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)} style={{ accentColor: 'var(--gold)' }} />
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>מסכים לקבלת עדכונים. ביטול בכל עת.</span>
      </label>

      <p style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 20 }}>בלי spam. בלי שיתוף עם צד שלישי.</p>

      <button
        onClick={onSkip}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: 'var(--text-faint)' }}
      >
        המשך ללא אימייל &#8592;
      </button>
    </div>
  );
}

/* ─── Main Quiz Page ─────────────────────────────────────────────── */
export default function QuizPage() {
  const router = useRouter();
  // step: 0=intro, 1-9=questions, 10=email gate
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDir]   = useState(1);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { step: number; answers: Answers };
        setStep(parsed.step ?? 0);
        setAnswers(parsed.answers ?? {});
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem(SS_KEY, JSON.stringify({ step, answers })); } catch {}
  }, [step, answers]);

  const q = step >= 1 && step <= TOTAL ? QUESTIONS[step - 1] : null;
  const progress = step === 0 ? 0 : (step / (TOTAL + 1)) * 100;

  const isAnswered = () => {
    if (!q) return false;
    const a = answers[q.id];
    if (q.type === 'single' || q.type === 'family') return typeof a === 'string' && a.length > 0;
    if (q.type === 'multi') return Array.isArray(a) && (a as string[]).length > 0;
    if (q.type === 'search') return true;
    return false;
  };

  const goBack = useCallback(() => {
    if (step <= 1) { router.push('/'); return; }
    setDir(-1);
    setStep(s => s - 1);
  }, [step, router]);

  const goNext = useCallback(() => {
    setDir(1);
    setStep(s => s + 1);
  }, []);

  const handleEmailSubmit = async (email: string, marketing: boolean) => {
    const knownIds   = (answers.known ?? []) as number[];
    const knownNames = fragrances
      .filter(f => knownIds.includes(f.id))
      .map(f => `${f.name} (${f.house})`);

    const tasteVec  = buildTasteVector(knownIds, fragrances);
    const sigNotes  = signatureNotes(knownIds, fragrances);
    const candidates = rankCandidates(fragrances, tasteVec, [], answers);

    try {
      sessionStorage.setItem('scentory-quiz-payload', JSON.stringify({
        answers: mapAnswers(answers, knownNames),
        candidates,
        tasteVector: tasteVec,
        sigNotes,
        email,
        marketing,
        knownNames,
      }));
    } catch {}

    router.push('/quiz/loading');
  };

  const handleSkipEmail = () => {
    const knownIds   = (answers.known ?? []) as number[];
    const knownNames = fragrances
      .filter(f => knownIds.includes(f.id))
      .map(f => `${f.name} (${f.house})`);

    const tasteVec  = buildTasteVector(knownIds, fragrances);
    const sigNotes  = signatureNotes(knownIds, fragrances);
    const candidates = rankCandidates(fragrances, tasteVec, [], answers);

    try {
      sessionStorage.setItem('scentory-quiz-payload', JSON.stringify({
        answers: mapAnswers(answers, knownNames),
        candidates,
        tasteVector: tasteVec,
        sigNotes,
        email: null,
        marketing: false,
        knownNames,
      }));
    } catch {}

    router.push('/quiz/loading');
  };

  const slideVariants = {
    enter:  (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };

  // Intro screen
  if (step === 0) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 10, letterSpacing: 4, color: 'var(--gold)' }}>SCENTORY</span>
          <Link href="/" aria-label="חזור לדף הבית" style={{ color: 'var(--text-muted)', display: 'flex' }}>
            <X size={18} />
          </Link>
        </header>
        <IntroScreen onStart={() => setStep(1)} />
      </div>
    );
  }

  // Email gate
  if (step === TOTAL + 1) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ height: 3, background: 'var(--border-subtle)' }}>
            <div style={{ width: '100%', height: '100%', background: 'var(--gold)', transition: 'width 0.4s ease' }} />
          </div>
        </header>
        <EmailGate onSubmit={handleEmailSubmit} onSkip={handleSkipEmail} />
      </div>
    );
  }

  if (!q) return null;

  // Question screens
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ height: 3, background: 'var(--border-subtle)' }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ height: '100%', background: 'var(--gold)' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px' }} dir="rtl">
          <button
            onClick={goBack}
            aria-label="חזור"
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 12 }}
          >
            <ArrowRight size={16} />
            חזור
          </button>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: 1 }}>{step} / {TOTAL}</span>
          <Link href="/" aria-label="סגור שאלון" style={{ color: 'var(--text-muted)', display: 'flex' }}>
            <X size={18} />
          </Link>
        </div>
      </header>

      {/* Question body */}
      <div
        style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 600, width: '100%', margin: '0 auto', padding: '40px 20px 140px' }}
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
              {q.label}
            </p>
            <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, fontSize: 'clamp(22px, 4vw, 30px)', color: 'var(--text-primary)', letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: q.sub ? 8 : 28 }}>
              {q.text}
            </h1>
            {q.sub && (
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>{q.sub}</p>
            )}

            {q.type === 'family' && (
              <FamilyGrid
                selected={(answers.family as string | undefined) ?? ''}
                onSelect={val => setAnswers(prev => ({ ...prev, family: val }))}
              />
            )}

            {q.type === 'single' && q.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {q.options.map(opt => (
                  <Pill
                    key={opt.value}
                    label={opt.label}
                    sub={opt.sub}
                    selected={(answers[q.id] as string | undefined) === opt.value}
                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt.value }))}
                  />
                ))}
              </div>
            )}

            {q.type === 'multi' && q.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                      disabled={maxReached}
                      onClick={() => {
                        if (sel) {
                          setAnswers(prev => ({ ...prev, [q.id]: cur.filter(x => x !== opt.value) }));
                        } else if (!maxReached) {
                          setAnswers(prev => ({ ...prev, [q.id]: [...cur, opt.value] }));
                        }
                      }}
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

      {/* Footer */}
      <div
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)', padding: '16px 20px 24px', zIndex: 40 }}
        dir="rtl"
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <button
            onClick={goNext}
            disabled={!isAnswered()}
            style={{
              width: '100%', padding: '15px',
              background: isAnswered() ? 'var(--gold)' : 'var(--border-subtle)',
              color: isAnswered() ? '#050505' : 'var(--text-muted)',
              fontWeight: 600, fontSize: 13, border: 'none',
              cursor: isAnswered() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s', marginBottom: 10, borderRadius: 8,
            }}
          >
            {step === TOTAL ? 'המשך לתוצאות ←' : 'המשך ←'}
          </button>

          {(q.canSkip || q.type === 'multi') && (
            <button
              onClick={goNext}
              style={{ display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', padding: '4px 0' }}
            >
              {step === TOTAL ? 'דלג וקבל המלצות' : 'דלג'}
            </button>
          )}

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 14 }}>
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i + 1 === step ? 18 : 5, height: 5, borderRadius: 3,
                  background: i + 1 < step ? 'var(--gold)' : i + 1 === step ? 'var(--gold)' : 'var(--border-default)',
                  transition: 'all 0.3s', opacity: i + 1 < step ? 0.5 : 1,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
