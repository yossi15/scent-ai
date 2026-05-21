'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Flame, Wind, Moon, Flower2, Trees, Leaf, Coffee, Star,
  Briefcase, Heart, Volume1, Volume2, Waves,
  Crown, Zap, Minus, Users, User, Gem, Sun, Clock,
  Sparkles, Layers, Radio, Share2, RotateCcw, ChevronRight, Check,
  Snowflake,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fragrances, type Fragrance } from '@/data/fragrances';

/* ─── Types ─────────────────────────────────────────────── */
interface Option {
  value: string;
  label: string;
  desc: string;
  examples: string;
  icon: LucideIcon;
  scores: Partial<Record<string, number>>;
}
interface Question {
  id: string;
  label: string;
  text: string;
  subtitle?: string;
  canSkip?: boolean;
  options: Option[];
}
type Scores = Record<string, number>;
type SavedQuiz = { step: number; scores: Scores; answers: Record<string, string> };

/* ─── Quiz Data ──────────────────────────────────────────── */
const QUESTIONS: Question[] = [
  {
    id: 'mood', label: 'הריח שמייצג אותך',
    text: 'מה מרגיש לך הכי טבעי?',
    subtitle: 'בחר את האווירה שמדברת אליך — אין תשובה נכונה',
    options: [
      { value: 'warm',  label: 'חמים ועוטף',      desc: 'אמברה, ונילה, עורות',      examples: 'Tobacco Vanille · Oud Wood',     icon: Flame,  scores: { oriental: 3, gourmand: 2 } },
      { value: 'fresh', label: 'רענן ונקי',         desc: 'הדרים, מים, עשבים',        examples: 'Sauvage · Light Blue',            icon: Wind,   scores: { fresh: 3, woody: 1 } },
      { value: 'dark',  label: 'אפל ומסתורי',      desc: 'עשן, עוד, שרפים',          examples: 'Black Orchid · Encre Noire',      icon: Moon,   scores: { animalic: 2, oriental: 2, woody: 2 } },
      { value: 'light', label: 'פרחוני ורומנטי',   desc: 'ורד, יסמין, אדמונית',      examples: 'Miss Dior · Chanel No.5',         icon: Flower2, scores: { floral: 3, fresh: 1 } },
    ],
  },
  {
    id: 'season', label: 'הזמן שלך',
    text: 'באיזו עונה תשתמש בבושם הזה?',
    options: [
      { value: 'summer', label: 'קיץ',   desc: 'קל, מרענן, אקוואטי',        examples: 'Acqua di Gio · Chrome',          icon: Sun,       scores: { fresh: 3 } },
      { value: 'winter', label: 'חורף',  desc: 'עמוק, חם, עוטף',            examples: 'Tom Ford Noir · Spicebomb',      icon: Snowflake, scores: { oriental: 3, gourmand: 2 } },
      { value: 'spring', label: 'אביב',  desc: 'פרחוני, קליל, חי',          examples: 'Chance · Flowerbomb',            icon: Leaf,      scores: { floral: 3 } },
      { value: 'fall',   label: 'סתיו',  desc: 'עצי, ארומטי, מעושן',        examples: 'Aventus · Dior Homme',           icon: Trees,     scores: { woody: 3, oriental: 1 } },
    ],
  },
  {
    id: 'occasion', label: 'ההזדמנות שלך',
    text: 'לאיזו הזדמנות הבושם?',
    subtitle: 'הבושם הנכון מגביר ביטחון בכל הקשר',
    options: [
      { value: 'daily',    label: 'יומיומי',    desc: 'נוח, אינטגרטיבי, לא מוגזם', examples: 'Sauvage EDT · Bleu de Chanel', icon: Coffee,    scores: { fresh: 2, woody: 1 } },
      { value: 'evening',  label: 'ערב ואירועים', desc: 'נוכח, מרשים, בלתי נשכח',    examples: 'Aventus · Y EDP',             icon: Star,      scores: { oriental: 2, gourmand: 2 } },
      { value: 'office',   label: 'עסקי',        desc: 'מקצועי, נעים, שקט',          examples: 'Terre d\'Hermès · Dior Homme', icon: Briefcase, scores: { fresh: 1, floral: 1, woody: 2 } },
      { value: 'romantic', label: 'רומנטי',      desc: 'חושני, מפתה, ייחודי',        examples: 'La Vie est Belle · Coco Mademoiselle', icon: Heart, scores: { floral: 2, oriental: 2, animalic: 1 } },
    ],
  },
  {
    id: 'intensity', label: 'העוצמה שלך',
    text: 'איזו עוצמת ריח מתאימה לך?',
    options: [
      { value: 'subtle',   label: 'עדין ואינטימי', desc: 'רק אתה יכול להריח אותו',   examples: 'Molecule 01 · Sel de Vétiver',  icon: Volume1, scores: { fresh: 2 } },
      { value: 'moderate', label: 'מאוזן',           desc: 'קיים אך לא דומיננטי',      examples: 'Bleu de Chanel · Dior Homme',   icon: Volume2, scores: { floral: 1, woody: 1 } },
      { value: 'strong',   label: 'חזק ונוכח',      desc: 'מרחיב את הנוכחות שלך',    examples: 'Baccarat Rouge · Y EDP',         icon: Waves,   scores: { oriental: 2, animalic: 1 } },
      { value: 'beast',    label: 'מקסימום',        desc: 'כניסה לחדר לפניך',         examples: 'Oud Wood · Spicebomb Extreme',   icon: Flame,   scores: { animalic: 2, oriental: 3 } },
    ],
  },
  {
    id: 'notes', label: 'הנוטות שלך',
    text: 'אילו תווים מדברים אליך?',
    subtitle: 'הנוטות הן הבסיס לזהות הריחנית שלך',
    canSkip: true,
    options: [
      { value: 'wood',   label: 'עצים וענבר',      desc: 'סנדלווד, וטיבר, ארז',    examples: 'Oud Wood · Santal 33',        icon: Trees,   scores: { woody: 3, oriental: 1 } },
      { value: 'flower', label: 'פרחים ועלי ורד',  desc: 'ורד, יסמין, אורכידאה',   examples: 'Miss Dior · Flowerbomb',      icon: Flower2, scores: { floral: 3 } },
      { value: 'citrus', label: 'הדרים ומינטה',    desc: 'ברגמוט, לימון, מינטה',   examples: 'Acqua di Gio · Chrome',       icon: Leaf,    scores: { fresh: 3 } },
      { value: 'spice',  label: 'תבלינים ועשן',   desc: 'ענבר, עוד, קנמון',        examples: 'Black Orchid · Spicebomb',    icon: Flame,   scores: { oriental: 2, animalic: 2 } },
    ],
  },
  {
    id: 'style', label: 'הסגנון שלך',
    text: 'איך תתאר את הסגנון האישי שלך?',
    options: [
      { value: 'classic',  label: 'קלאסי ואלגנטי',   desc: 'ימי, בוגר, נצחי',       examples: 'Dior Homme · Terre d\'Hermès', icon: Crown, scores: { floral: 1, woody: 2 } },
      { value: 'bold',     label: 'נועז ובולט',        desc: 'אנרגטי, חזק, בלתי צפוי', examples: 'Oud Wood · Black Orchid',     icon: Zap,   scores: { animalic: 2, oriental: 2 } },
      { value: 'minimal',  label: 'מינימליסטי ונקי',   desc: 'פשוט, אסתטי, מדויק',    examples: 'Sauvage · Bleu de Chanel',    icon: Minus, scores: { fresh: 3 } },
      { value: 'romantic', label: 'רומנטי ורגיש',     desc: 'מעדן, כנה, מושך',        examples: 'La Vie est Belle · Mon Guerlain', icon: Heart, scores: { floral: 2, gourmand: 1 } },
    ],
  },
  {
    id: 'gender', label: 'הכיוון שלך',
    text: 'איזה כיוון מעניין אותך?',
    canSkip: true,
    options: [
      { value: 'masc',   label: 'גברי קלאסי',     desc: 'חזק, ספורטיבי, אמין',    examples: 'Sauvage · Bleu de Chanel',    icon: User,   scores: { woody: 2, fresh: 1 } },
      { value: 'fem',    label: 'נשי אלגנטי',     desc: 'פרחוני, רך, קסום',       examples: 'Miss Dior · Chanel No.5',     icon: Flower2, scores: { floral: 2, gourmand: 1 } },
      { value: 'unisex', label: 'יוניסקס מודרני', desc: 'נטרלי, מאוזן, עכשווי',   examples: 'Baccarat Rouge · Molecule 01', icon: Users, scores: { woody: 1, fresh: 1, floral: 1 } },
      { value: 'niche',  label: 'נישה ייחודי',    desc: 'פואטי, נדיר, בלתי נשכח', examples: 'Aventus · Oud Wood',          icon: Gem,   scores: { animalic: 1, oriental: 2, woody: 1 } },
    ],
  },
  {
    id: 'duration', label: 'הזמן שלך',
    text: 'כמה זמן אתה רוצה שהבושם יחזיק?',
    options: [
      { value: '1to3h',  label: '1–3 שעות',  desc: 'לשעות בוקר, קל ועדין',    examples: 'CK One · Cool Water',          icon: Clock, scores: { fresh: 2 } },
      { value: '4to6h',  label: '4–6 שעות',  desc: 'ליום עבודה מלא',           examples: 'Dior Homme · Chance',          icon: Clock, scores: { floral: 1, woody: 1 } },
      { value: '7to10h', label: '7–10 שעות', desc: 'מהבוקר עד הערב',           examples: 'Aventus · Y EDP',              icon: Clock, scores: { oriental: 2, woody: 1 } },
      { value: 'allday', label: 'כל היום',   desc: 'בשם שנשאר איתך 24 שעות',   examples: 'Oud Wood · Baccarat Rouge',    icon: Sun,   scores: { oriental: 3, animalic: 2 } },
    ],
  },
  {
    id: 'sillage', label: 'הסיומת שלך',
    text: 'מה חשוב לך יותר?',
    subtitle: 'כל בושם מתפתח — מה משפיע עליך יותר?',
    options: [
      { value: 'opening',    label: 'ריח ראשוני חד',        desc: 'הרושם הראשון — הכרישה',  examples: 'Sauvage · Chrome',           icon: Sparkles, scores: { fresh: 2, floral: 1 } },
      { value: 'drydown',    label: 'חיתום עמוק ומתפתח',   desc: 'מה שנשאר כשהכל שוקע',    examples: 'Dior Homme · Terre d\'Hermès', icon: Layers, scores: { oriental: 2, woody: 2 } },
      { value: 'projection', label: 'קרינה חזקה סביבי',    desc: 'הנוכחות שמלאה את החדר',  examples: 'Aventus · Baccarat Rouge',    icon: Radio,  scores: { animalic: 2, oriental: 1 } },
      { value: 'skin',       label: 'ריח אישי וקרוב לעור', desc: 'סוד שרק הקרובים יגלו',   examples: 'Molecule 01 · Santal 33',     icon: Heart,  scores: { fresh: 1, floral: 1, woody: 1 } },
    ],
  },
];

const TOTAL_Q = QUESTIONS.length;
const LS_KEY = 'scentory-quiz-v2';

/* ─── Helpers ────────────────────────────────────────────── */
function computeMatches(scores: Scores): Fragrance[] {
  return fragrances
    .filter(f => f.image)
    .map(f => {
      let score = 0;
      Object.entries(scores).forEach(([k, v]) => {
        const val = f.radarProfile?.[k as keyof typeof f.radarProfile] ?? 0;
        score += (val as number) * v;
      });
      return { f, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.f);
}

const PROFILES: Record<string, { name: string; desc: string }> = {
  oriental: { name: 'אורינטל-מיסטי',    desc: 'חם, מסתורי ועמוק — ריחות שמספרים סיפור עתיק' },
  floral:   { name: 'פרחוני-רומנטי',   desc: 'עדין, נשי וקסום — ריחות שמזכירים גן בשיא פריחתו' },
  fresh:    { name: 'עכשווי-אקוואטי',  desc: 'נקי, ספורטיבי ואנרגטי — ריחות שמרעננים בכל שעה' },
  woody:    { name: 'עצי-אלגנטי',      desc: 'קלאסי, בוגר ובטוח — ריחות שמייצגים אדם שיודע מה הוא רוצה' },
  animalic: { name: 'חיוני-נועז',      desc: 'אינטנסיבי, ייחודי ובלתי נשכח — ריחות שאי אפשר להתעלם מהם' },
  gourmand: { name: 'גורמה-מפנק',      desc: 'מתוק, מפתה ועוטף — ריחות שמביאים תחושת נחמה' },
};

function getProfile(scores: Scores) {
  const top = Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] ?? 'woody';
  return PROFILES[top] ?? { name: 'אוניברסלי-מאוזן', desc: 'מאוזן ורבגוני — ריח מושלם לכל הזדמנות' };
}

function getExplanation(f: Fragrance, profileName: string): string {
  const baseNotes = (f.notes ?? []).filter(n => n.type === 'base').slice(0, 2).map(n => n.name).join(' ו-');
  return `${f.name} מתאים לפרופיל ה${profileName} שלך — הוא משלב ${f.family?.toLowerCase() ?? 'ניחוחות ייחודיים'} ${baseNotes ? `עם נוטות בסיס של ${baseNotes}` : ''}, שמהדהדות בדיוק עם ה-DNA הריחני שגילינו.`;
}

function saveState(data: SavedQuiz) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
}
function loadState(): SavedQuiz | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function clearState() {
  try { localStorage.removeItem(LS_KEY); } catch {}
}

/* ─── Option Card ────────────────────────────────────────── */
function OptionCard({
  opt, selected, onSelect, idx, totalInGroup,
}: {
  opt: Option; selected: boolean; onSelect: () => void;
  idx: number; totalInGroup: number;
}) {
  const Icon = opt.icon;
  return (
    <button
      role="radio"
      aria-checked={selected}
      aria-label={`${opt.label}: ${opt.desc}`}
      aria-setsize={totalInGroup}
      aria-posinset={idx + 1}
      onClick={onSelect}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } }}
      style={{
        height: '280px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '28px 24px',
        border: `1px solid ${selected ? '#C9A961' : '#E8E4DC'}`,
        borderRadius: '2px',
        background: selected ? '#1C1C1A' : '#FFFFFF',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'right',
        direction: 'rtl',
        outline: 'none',
        position: 'relative',
        transform: selected ? 'scale(1.02)' : 'scale(1)',
      }}
      onMouseEnter={e => {
        if (!selected) {
          (e.currentTarget as HTMLElement).style.borderColor = '#C9A961';
          (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
        }
      }}
      onMouseLeave={e => {
        if (!selected) {
          (e.currentTarget as HTMLElement).style.borderColor = '#E8E4DC';
          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        }
      }}
      className="focus-visible:outline-none focus-visible:[outline:2px_solid_#C9A961] focus-visible:[outline-offset:4px]"
    >
      {/* Check badge */}
      {selected && (
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          width: '20px', height: '20px', borderRadius: '50%',
          background: '#C9A961', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Check size={11} color="#0F0F0E" strokeWidth={2.5} />
        </div>
      )}

      {/* Icon */}
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%',
        background: selected ? 'rgba(201,169,97,0.15)' : '#FAF8F3',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon size={18} color={selected ? '#C9A961' : '#6B6560'} />
      </div>

      {/* Text */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%' }}>
        <p style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 400, fontSize: '18px', lineHeight: 1.2,
          color: selected ? '#FFFFFF' : '#1C1C1A',
          marginBottom: '8px', letterSpacing: '-0.005em',
        }}>
          {opt.label}
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '12px', lineHeight: 1.5,
          color: selected ? 'rgba(255,255,255,0.6)' : '#6B6560', marginBottom: '12px',
        }}>
          {opt.desc}
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '10px',
          letterSpacing: '1.5px', textTransform: 'uppercase',
          color: selected ? '#C9A961' : '#9E9B98',
        }}>
          {opt.examples}
        </p>
      </div>
    </button>
  );
}

/* ─── Analyzing Animation ────────────────────────────────── */
function Analyzing({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="flex flex-col items-center justify-center" style={{ minHeight: '50vh' }}>
      <p style={{
        fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300,
        fontSize: 'clamp(22px, 3vw, 28px)', color: '#1C1C1A', marginBottom: '24px', textAlign: 'center',
      }}>
        מנתח את ה-DNA הריחני שלך...
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, delay: i * 0.3, repeat: Infinity }}
            style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C9A961' }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Results ────────────────────────────────────────────── */
function Results({ scores, onReset }: { scores: Scores; onReset: () => void }) {
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(true);
  const matches = computeMatches(scores);
  const profile = getProfile(scores);

  const shareWhatsApp = () => {
    const text = `גיליתי שהפרופיל הריחני שלי הוא "${profile.name}" — גלה את שלך ב-SCENTORY 👇\nhttps://scentory.co.il/#quiz`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (analyzing) return <Analyzing onDone={() => setAnalyzing(false)} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      dir="rtl"
    >
      {/* Profile card */}
      <div style={{
        background: '#1C1C1A', padding: '40px', marginBottom: '48px',
        border: '1px solid rgba(201,169,97,0.2)',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '9px',
          letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A961', marginBottom: '12px',
        }}>
          הפרופיל הריחני שלך
        </p>
        <h3 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300,
          fontSize: 'clamp(28px, 5vw, 44px)', color: '#FFFFFF', letterSpacing: '-0.02em',
          marginBottom: '12px', lineHeight: 1.1,
        }}>
          {profile.name}
        </h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
          {profile.desc}
        </p>
      </div>

      {/* Matches */}
      <p style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '9px',
        letterSpacing: '4px', textTransform: 'uppercase', color: '#6B6560', marginBottom: '20px',
      }}>
        3 בשמים מומלצים עבורך
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
        {matches.map((f, i) => (
          <motion.button
            key={f.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => router.push(`/fragrance/${f.id}`)}
            style={{
              display: 'flex', alignItems: 'center', gap: '20px',
              padding: '20px', border: '1px solid #E8E4DC',
              background: '#FFFFFF', cursor: 'pointer', textAlign: 'right', width: '100%',
            }}
            className="hover:border-[#C9A961] transition-colors group"
          >
            {/* Image */}
            <div style={{ width: '64px', height: '80px', position: 'relative', flexShrink: 0, background: '#FAF8F3' }}>
              {f.image && (
                <Image
                  src={f.image}
                  alt={`${f.name} מאת ${f.house}`}
                  fill sizes="64px"
                  className="object-contain"
                />
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '3px',
                textTransform: 'uppercase', color: '#6B6560', marginBottom: '6px',
              }}>
                {f.house}
              </p>
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 400,
                fontSize: '18px', color: '#1C1C1A', marginBottom: '8px', letterSpacing: '-0.005em',
              }}>
                {f.name}
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '11px',
                color: '#6B6560', lineHeight: 1.6,
              }}>
                {getExplanation(f, profile.name)}
              </p>
            </div>

            <ChevronRight size={16} color="#C9A961" style={{ flexShrink: 0 }} />
          </motion.button>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <a
          href="/sign-up"
          style={{
            display: 'inline-block', padding: '13px 28px',
            background: '#1C1C1A', color: '#FFFFFF',
            fontFamily: 'Inter, sans-serif', fontSize: '10px',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}
          className="hover:opacity-75 transition-opacity"
        >
          שמור את הפרופיל שלך
        </a>
        <button
          onClick={shareWhatsApp}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '13px 28px', border: '1px solid #E8E4DC', background: 'transparent',
            color: '#1C1C1A', fontFamily: 'Inter, sans-serif', fontSize: '10px',
            letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer',
          }}
          className="hover:border-[#C9A961] transition-colors"
        >
          <Share2 size={13} />
          שתף ב-WhatsApp
        </button>
        <button
          onClick={onReset}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontSize: '10px',
            letterSpacing: '2px', textTransform: 'uppercase', color: '#6B6560',
          }}
          className="hover:opacity-50 transition-opacity"
        >
          <RotateCcw size={12} />
          שאלון חדש
        </button>
      </div>

      <p
        style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#9E9B98' }}
        aria-live="polite"
      >
        הפרופיל נשמר אוטומטית · <a href="#collection" style={{ color: '#6B6560', textDecoration: 'underline' }}>לכל הקולקציה</a>
      </p>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function TasteQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [resumed, setResumed] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);

  // Load saved state on mount
  useEffect(() => {
    const saved = loadState();
    if (saved && saved.step > 0) {
      setStep(saved.step);
      setScores(saved.scores);
      setAnswers(saved.answers);
      setResumed(true);
    }
  }, []);

  const q = QUESTIONS[step];
  const progress = ((step) / TOTAL_Q) * 100;

  // Auto-advance after selection
  const selectOption = useCallback((opt: Option) => {
    if (selected) return; // prevent double-tap
    setSelected(opt.value);

    const newScores = { ...scores };
    Object.entries(opt.scores).forEach(([k, v]) => { newScores[k] = (newScores[k] ?? 0) + (v ?? 0); });
    const newAnswers = { ...answers, [q.id]: opt.value };

    setTimeout(() => {
      setScores(newScores);
      setAnswers(newAnswers);
      setSelected(null);
      if (step + 1 < QUESTIONS.length) {
        const nextStep = step + 1;
        setStep(nextStep);
        saveState({ step: nextStep, scores: newScores, answers: newAnswers });
      } else {
        setDone(true);
        clearState();
      }
    }, 380);
  }, [selected, scores, answers, step, q]);

  const skip = () => {
    const nextStep = step + 1;
    setStep(nextStep);
    saveState({ step: nextStep, scores, answers });
  };

  const goBack = () => {
    if (step === 0) return;
    const prevStep = step - 1;
    // Remove scores from previous answer
    const prevQ = QUESTIONS[prevStep];
    const prevAnswer = answers[prevQ.id];
    if (prevAnswer) {
      const prevOpt = prevQ.options.find(o => o.value === prevAnswer);
      if (prevOpt) {
        const newScores = { ...scores };
        Object.entries(prevOpt.scores).forEach(([k, v]) => {
          newScores[k] = Math.max(0, (newScores[k] ?? 0) - (v ?? 0));
        });
        const newAnswers = { ...answers };
        delete newAnswers[prevQ.id];
        setScores(newScores);
        setAnswers(newAnswers);
        setStep(prevStep);
        saveState({ step: prevStep, scores: newScores, answers: newAnswers });
        return;
      }
    }
    setStep(prevStep);
    saveState({ step: prevStep, scores, answers });
  };

  const reset = () => {
    setStep(0); setScores({}); setAnswers({});
    setDone(false); setSelected(null); setResumed(false);
    clearState();
  };

  // Keyboard navigation on card group
  const handleGroupKey = (e: React.KeyboardEvent) => {
    if (!groupRef.current) return;
    const cards = Array.from(groupRef.current.querySelectorAll('button[role="radio"]')) as HTMLElement[];
    const ci = cards.findIndex(c => c === document.activeElement);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      cards[(ci + 1) % cards.length]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      cards[(ci - 1 + cards.length) % cards.length]?.focus();
    } else if (e.key === 'Escape') {
      if (step > 0) goBack();
    }
  };

  return (
    <section
      id="quiz"
      className="py-24 px-6"
      style={{ background: '#FAF8F3' }}
      aria-labelledby="quiz-heading"
    >
      <div className="max-w-5xl mx-auto">

        {!done ? (
          <>
            {/* ── Progress ── */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                {/* Back */}
                <button
                  onClick={goBack}
                  disabled={step === 0}
                  aria-label="חזור לשאלה הקודמת"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontFamily: 'Inter, sans-serif', fontSize: '11px',
                    letterSpacing: '1.5px', textTransform: 'uppercase',
                    color: step === 0 ? '#D4D0C8' : '#6B6560',
                    background: 'none', border: 'none', cursor: step === 0 ? 'default' : 'pointer',
                  }}
                >
                  ← חזור
                </button>

                {/* Counter */}
                <p
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '2px', color: '#6B6560' }}
                  aria-live="polite"
                  aria-label={`שאלה ${step + 1} מתוך ${TOTAL_Q}`}
                >
                  שאלה {step + 1} מתוך {TOTAL_Q}
                </p>

                {/* Time estimate */}
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '1px', color: '#9E9B98' }}>
                  עוד ~{Math.ceil(((TOTAL_Q - step) * 15) / 60)} דקות
                </p>
              </div>

              {/* Progress bar */}
              <div style={{ height: '2px', background: '#E8E4DC', borderRadius: '1px', overflow: 'hidden' }}>
                <motion.div
                  style={{ height: '100%', background: '#C9A961', borderRadius: '1px' }}
                  initial={{ width: `${((step - 1) / TOTAL_Q) * 100}%` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* ── Resumed notice ── */}
            {resumed && (
              <p
                role="status"
                aria-live="polite"
                style={{
                  textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '11px',
                  color: '#C9A961', letterSpacing: '1px', marginBottom: '20px',
                }}
              >
                השאלון נשמר אוטומטית — ממשיך מאיפה שעצרת
              </p>
            )}

            {/* ── Question ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="text-center mb-14" dir="rtl">
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '9px',
                    letterSpacing: '4px', textTransform: 'uppercase', color: '#6B6560', marginBottom: '14px',
                  }}>
                    {q.label}
                  </p>
                  <h2
                    id="quiz-heading"
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300,
                      fontSize: 'clamp(28px, 4vw, 42px)', color: '#1C1C1A',
                      letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: q.subtitle ? '12px' : 0,
                    }}
                  >
                    {q.text}
                  </h2>
                  {q.subtitle && (
                    <p style={{
                      fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px',
                      color: '#6B6560', lineHeight: 1.7,
                    }}>
                      {q.subtitle}
                    </p>
                  )}
                </div>

                {/* ── Options grid ── */}
                <div
                  ref={groupRef}
                  role="radiogroup"
                  aria-label={q.text}
                  onKeyDown={handleGroupKey}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  style={{ marginBottom: '28px' }}
                >
                  {q.options.map((opt, idx) => (
                    <OptionCard
                      key={opt.value}
                      opt={opt}
                      selected={selected === opt.value}
                      onSelect={() => selectOption(opt)}
                      idx={idx}
                      totalInGroup={q.options.length}
                    />
                  ))}
                </div>

                {/* Skip */}
                {q.canSkip && (
                  <div className="text-center">
                    <button
                      onClick={skip}
                      style={{
                        fontFamily: 'Inter, sans-serif', fontSize: '10px',
                        letterSpacing: '2px', textTransform: 'uppercase',
                        color: '#9E9B98', background: 'none', border: 'none', cursor: 'pointer',
                      }}
                      className="hover:opacity-50 transition-opacity"
                    >
                      דלג על שאלה זו
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <Results scores={scores} onReset={reset} />
        )}
      </div>
    </section>
  );
}
