'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Clock, Wind, Plus, Check, ShoppingBag, Tag } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth, SignInButton } from '@clerk/nextjs';
import { fragrances, type Fragrance } from '@/data/fragrances';

// ── Family gradients (mirrors FragranceCard) ──────────────────────────────────
const familyGradients: Record<string, string> = {
  'Fruity Chypre':    'from-amber-200/80 via-yellow-100/60 to-lime-100/50',
  'Oriental Spicy':   'from-red-200/70 via-orange-100/60 to-amber-100/50',
  'Oriental Gourmand':'from-amber-200/80 via-orange-100/60 to-yellow-100/50',
  'Aromatic Citrus':  'from-teal-200/60 via-cyan-100/50 to-blue-100/40',
  'Oriental Floral':  'from-purple-200/60 via-pink-100/50 to-rose-100/50',
  'Woody Aromatic':   'from-emerald-200/60 via-green-100/50 to-lime-100/50',
  'Woody Oriental':   'from-stone-300/60 via-amber-100/50 to-orange-100/50',
  'Floral Woody':     'from-rose-200/60 via-pink-100/50 to-amber-100/50',
  'Citrus Aromatic':  'from-yellow-200/70 via-lime-100/60 to-green-100/50',
  'Aromatic Fougère': 'from-green-200/60 via-emerald-100/50 to-teal-100/50',
  'Oriental Woody':   'from-amber-300/60 via-stone-100/50 to-orange-100/50',
  'Woody Spicy':      'from-stone-300/60 via-red-100/50 to-amber-100/50',
  'Green Aromatic':   'from-green-200/60 via-emerald-100/50 to-lime-100/50',
  'Musky Woody':      'from-stone-300/60 via-neutral-100/50 to-stone-100/50',
  'Leather':          'from-stone-400/60 via-amber-200/50 to-stone-100/50',
  'Smoky Woody':      'from-gray-300/60 via-stone-100/50 to-amber-100/50',
  'Amber Woody':      'from-amber-300/60 via-yellow-100/50 to-orange-100/50',
  'Floral':           'from-pink-200/60 via-rose-100/50 to-fuchsia-100/50',
  'Oud':              'from-amber-300/70 via-yellow-200/50 to-stone-200/50',
  'Gourmand':         'from-amber-200/70 via-orange-100/50 to-yellow-100/50',
  'Fresh Spicy':      'from-teal-100/60 via-emerald-100/50 to-amber-100/40',
  'Woody':            'from-stone-200/60 via-amber-100/40 to-emerald-100/40',
  'Marine':           'from-blue-200/60 via-cyan-100/50 to-teal-100/50',
};
const getGradient = (family: string) =>
  familyGradients[family] ?? 'from-stone-200/60 via-amber-100/50 to-stone-100/50';

// ── Season / occasion inference (mirrors Collection.tsx) ─────────────────────
function getSeasons(f: Fragrance): string[] {
  const s: string[] = [];
  const { fresh, oriental, gourmand, woody, floral } = f.radarProfile;
  const fam = f.family.toLowerCase();
  if (fresh >= 6 || fam.includes('citrus') || fam.includes('marine') || fam === 'aromatic fougère') s.push('summer');
  if (oriental >= 7 || gourmand >= 6 || fam.includes('leather') || fam.includes('smoky') || fam.includes('oud') ||
     (fam.includes('oriental') && (fam.includes('spicy') || fam.includes('gourmand')))) s.push('winter');
  if (floral >= 5 || fam.includes('floral') || fam.includes('fresh spicy') || (fresh >= 4 && oriental <= 5 && gourmand <= 4)) s.push('spring');
  if (woody >= 6 || fam.includes('woody') || fam.includes('amber') || (oriental >= 5 && oriental < 8)) s.push('fall');
  return s.length ? s : ['spring', 'fall'];
}

function getOccasions(f: Fragrance): string[] {
  const o: string[] = [];
  const tags = f.tags.map(t => t.toLowerCase());
  const { fresh, oriental, gourmand, floral } = f.radarProfile;
  if (f.sillage <= 7 && f.longevity >= 5 && (fresh >= 5 || tags.some(t => ['versatile','fresh','office','daily','elegant'].includes(t)))) o.push('daily');
  if (f.sillage <= 6 && tags.some(t => ['elegant','classic','versatile','timeless','smooth'].includes(t))) o.push('business');
  if (f.sillage >= 7 && (oriental >= 6 || gourmand >= 5 || tags.some(t => ['dark','night','decadent','beast mode','power scent','smoky','addictive'].includes(t)))) o.push('evening');
  if (floral >= 5 || oriental >= 6 || tags.some(t => ['romantic','sensual','rose','date','bohemian','viral','iconic'].includes(t))) o.push('romantic');
  return o.length ? o : ['daily'];
}

// ── Radar-based similarity ────────────────────────────────────────────────────
function getSimilar(f: Fragrance, count = 3): Fragrance[] {
  const keys = ['woody','floral','oriental','fresh','gourmand','animalic'] as const;
  return fragrances
    .filter(c => c.id !== f.id)
    .map(c => {
      let score = c.family === f.family ? 12 : 0;
      keys.forEach(k => { score -= Math.abs(c.radarProfile[k] - f.radarProfile[k]) * 1.5; });
      score += c.rating * 1.5;
      return { frag: c, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(s => s.frag);
}

// ── Bottle silhouette (fallback) ──────────────────────────────────────────────
function BottleSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="38" y="8"  width="24" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="36" y="18" width="28" height="6"  rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M44 24 L44 32 L56 32 L56 24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30 34 Q22 36 22 48 L22 118 Q22 128 32 128 L68 128 Q78 128 78 118 L78 48 Q78 36 70 34 L30 34 Z"
            stroke="currentColor" strokeWidth="1.5" />
      <rect x="32" y="60" width="36" height="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
      <line x1="30" y1="50" x2="30" y2="100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

// ── Notes pyramid ─────────────────────────────────────────────────────────────
function NotesPyramid({ notes }: { notes: Fragrance['notes'] }) {
  const tiers = [
    { key: 'top'   as const, label: 'ראש',  sub: 'Top Notes',   emoji: '🌿', style: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    { key: 'heart' as const, label: 'לב',   sub: 'Heart Notes', emoji: '🌸', style: 'bg-rose-50 text-rose-700 border border-rose-200' },
    { key: 'base'  as const, label: 'בסיס', sub: 'Base Notes',  emoji: '🪵', style: 'bg-amber-50 text-amber-700 border border-amber-200' },
  ];
  return (
    <div className="space-y-5">
      {tiers.map((tier, i) => {
        const tierNotes = notes.filter(n => n.type === tier.key);
        if (!tierNotes.length) return null;
        return (
          <motion.div
            key={tier.key}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-lg leading-none">{tier.emoji}</span>
              <span className="font-serif text-base text-ink font-semibold">{tier.label}</span>
              <span className="text-[10px] text-ink-faint font-sans tracking-wider" dir="ltr">{tier.sub}</span>
            </div>
            <div className="flex flex-wrap gap-1.5" dir="ltr">
              {tierNotes.map(n => (
                <span key={n.name} className={`text-[11px] font-sans px-2.5 py-1 rounded-full ${tier.style}`}>
                  {n.name}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Animated performance bar ──────────────────────────────────────────────────
function StatBar({ label, icon: Icon, value }: { label: string; icon: LucideIcon; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5 text-gold/70 shrink-0" />
          <span className="text-[12px] font-hebrew text-ink-muted">{label}</span>
        </div>
        <span className="text-gold text-xs font-sans font-bold tabular-nums">{value} / 10</span>
      </div>
      <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(to right, #96793a, #c9a85c)' }}
          initial={{ width: 0 }}
          animate={{ width: `${(value / 10) * 100}%` }}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
        />
      </div>
      <div className="flex justify-between mt-1.5 px-0.5">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
          <span
            key={n}
            className={`text-[9px] font-sans transition-colors ${n <= value ? 'text-gold/50' : 'text-ink-faint/25'}`}
          >
            {n === 1 || n === 5 || n === 10 ? n : '·'}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Similar fragrance card ────────────────────────────────────────────────────
function SimilarCard({ fragrance, index }: { fragrance: Fragrance; index: number }) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/fragrance/${fragrance.id}`} className="block group">
        <div className="card overflow-hidden group-hover:shadow-[0_20px_40px_-12px_rgba(150,121,58,0.18)] group-hover:border-gold-border group-hover:-translate-y-1 transition-all duration-500">
          {/* Gradient header */}
          <div className={`h-36 bg-gradient-to-br ${getGradient(fragrance.family)} relative flex items-center justify-center overflow-hidden`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.5),transparent_70%)] pointer-events-none" />
            {!imgError && fragrance.image ? (
              <div className="relative w-16 h-24 z-10">
                <Image
                  src={fragrance.image}
                  alt={fragrance.name}
                  fill
                  sizes="96px"
                  className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              <BottleSilhouette className="w-14 h-20 text-ink opacity-20 z-10" />
            )}
            <div className="absolute top-2.5 right-2.5">
              <span className="text-[9px] font-sans bg-white/90 backdrop-blur-sm text-ink-muted px-2 py-0.5 rounded-full" dir="ltr">
                {fragrance.family}
              </span>
            </div>
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5">
              <Star className="w-2.5 h-2.5 text-gold fill-gold" />
              <span className="text-[10px] font-sans font-semibold text-ink">{fragrance.rating}</span>
            </div>
          </div>
          {/* Body */}
          <div className="p-4">
            <p className="text-gold text-[9px] tracking-[0.2em] uppercase font-sans font-semibold mb-0.5" dir="ltr">
              {fragrance.house}
            </p>
            <h3 className="font-serif text-base text-ink group-hover:text-gold transition-colors duration-300 font-semibold leading-tight mb-1 truncate" dir="ltr">
              {fragrance.name}
            </h3>
            <p className="text-ink-faint text-[10px] font-sans mb-3" dir="ltr">
              {fragrance.year} · {fragrance.concentration}
            </p>
            <div className="flex items-center justify-between pt-2.5 border-t border-black/[0.05]" dir="ltr">
              <span className="gold-text font-serif text-lg font-bold">
                ₪{fragrance.price.toLocaleString()}
              </span>
              <span className="text-[10px] font-sans bg-gold-faint text-gold px-2 py-0.5 rounded-full border border-gold-border/50" dir="ltr">
                {fragrance.concentration}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function FragrancePage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params.id;
  const id = Array.isArray(rawId) ? Number(rawId[0]) : Number(rawId);
  const fragrance = fragrances.find(f => f.id === id);

  const { isSignedIn, isLoaded } = useAuth();
  const [inCollection, setInCollection] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetch('/api/collection')
      .then(r => r.json())
      .then(data => {
        if (data.ids) setInCollection((data.ids as number[]).includes(id));
      })
      .catch(() => {});
  }, [isLoaded, isSignedIn, id]);

  if (!fragrance) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-bg-primary px-4">
        <p className="text-ink-muted font-hebrew text-sm">הבושם לא נמצא</p>
        <Link href="/#collection" className="btn-gold px-6 py-2.5 rounded-xl font-hebrew text-sm">
          חזרה לקולקציה
        </Link>
      </div>
    );
  }

  const toggleCollection = async () => {
    if (!isSignedIn) return;
    const newState = !inCollection;
    setInCollection(newState);
    if (newState) {
      await fetch('/api/collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fragranceId: id, name: fragrance.name, house: fragrance.house }),
      }).catch(() => setInCollection(!newState));
    } else {
      await fetch(`/api/collection?fragranceId=${id}`, { method: 'DELETE' })
        .catch(() => setInCollection(!newState));
    }
  };

  const similar   = getSimilar(fragrance);
  const seasons   = getSeasons(fragrance);
  const occasions = getOccasions(fragrance);
  const gradient  = getGradient(fragrance.family);
  const showImage = !!fragrance.image && !imgError;

  const SEASON_LABELS: Record<string, string> = {
    spring: 'אביב 🌸', summer: 'קיץ ☀️', fall: 'סתיו 🍂', winter: 'חורף ❄️',
  };
  const OCCASION_LABELS: Record<string, string> = {
    daily: 'יומיומי', business: 'עסקי', evening: 'ערב', romantic: 'רומנטי', sport: 'ספורט', special: 'מיוחד',
  };

  return (
    <div className="min-h-screen bg-bg-primary" dir="rtl">

      {/* ── Sticky nav bar ──────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-md border-b border-black/[0.05]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-ink-muted hover:text-gold transition-colors text-sm font-hebrew group"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            <span>חזרה לקולקציה</span>
          </button>
          <p className="hidden sm:block font-sans text-[10px] tracking-[0.18em] uppercase text-ink-faint" dir="ltr">
            {fragrance.house} — {fragrance.name}
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-24">

        {/* ── Hero: bottle + key info ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 mb-14">

          {/* LEFT — Bottle on gradient bg */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center min-h-[300px] md:min-h-[480px]`}
          >
            {/* Decorative rings */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
              <div className="absolute top-8 right-8 w-56 h-56 rounded-full border border-current" />
              <div className="absolute top-16 right-16 w-36 h-36 rounded-full border border-current" />
              <div className="absolute bottom-10 left-10 w-28 h-28 rounded-full border border-current" />
            </div>
            {/* Radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(255,255,255,0.65),transparent_65%)] pointer-events-none" />

            {/* Bottle */}
            {showImage ? (
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-44 h-64 sm:w-56 sm:h-80 drop-shadow-2xl z-10"
              >
                <Image
                  src={fragrance.image}
                  alt={`${fragrance.name} by ${fragrance.house}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-contain"
                  onError={() => setImgError(true)}
                  priority
                />
              </motion.div>
            ) : (
              <BottleSilhouette className="w-36 h-52 text-ink opacity-20 z-10" />
            )}

            {/* Rating */}
            <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-md border border-white/60">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              <span className="text-ink text-sm font-sans font-bold" dir="ltr">{fragrance.rating}</span>
            </div>

            {/* Concentration */}
            <div className="absolute bottom-5 right-5">
              <span className="text-[10px] font-sans bg-ink/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full" dir="ltr">
                {fragrance.concentration}
              </span>
            </div>

            {/* Family */}
            <div className="absolute bottom-5 left-5">
              <span className="text-[10px] font-sans bg-white/90 backdrop-blur-md text-ink-muted px-3 py-1.5 rounded-full border border-white/60" dir="ltr">
                {fragrance.family}
              </span>
            </div>
          </motion.div>

          {/* RIGHT — Info panel */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            {/* House */}
            <p className="text-gold text-[11px] tracking-[0.25em] uppercase font-sans font-semibold mb-3" dir="ltr">
              {fragrance.house}
            </p>

            {/* Name */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink font-bold leading-[0.93] mb-3" dir="ltr">
              {fragrance.name}
            </h1>

            {/* Meta */}
            <p className="text-ink-faint text-sm font-sans mb-6" dir="ltr">
              {fragrance.year} · {fragrance.gender} · {fragrance.concentration} · {fragrance.size}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="gold-text font-serif text-4xl font-bold">
                ₪{fragrance.price.toLocaleString()}
              </span>
              <span className="text-ink-faint text-sm font-sans">/ {fragrance.size}</span>
            </div>

            {/* Description */}
            <p className="text-ink-secondary text-sm font-hebrew leading-relaxed font-light mb-8 max-w-md">
              {fragrance.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {isLoaded && !isSignedIn ? (
                <SignInButton mode="modal">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-hebrew text-sm font-medium btn-gold"
                  >
                    <Plus className="w-4 h-4" />
                    כנס להוספה לאוסף
                  </motion.button>
                </SignInButton>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={toggleCollection}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-hebrew text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    inCollection
                      ? 'bg-gold-faint text-gold border border-gold-border hover:bg-gold/10'
                      : 'btn-gold'
                  }`}
                >
                  {inCollection ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {inCollection ? 'באוסף שלי ✓' : 'הוסף לאוסף שלי'}
                </motion.button>
              )}

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(`${fragrance.name} ${fragrance.house} perfume`)}`,
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-hebrew text-sm font-medium btn-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <ShoppingBag className="w-4 h-4" />
                השווה מחירים
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ── Details: pyramid + performance + tags ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">

          {/* Fragrance pyramid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gold-faint flex items-center justify-center shrink-0">
                <span className="text-base">🌸</span>
              </div>
              <div>
                <h2 className="font-serif text-xl text-ink font-semibold leading-tight">פירמידת הריח</h2>
                <p className="text-ink-faint text-[10px] font-sans" dir="ltr">Fragrance Pyramid</p>
              </div>
            </div>
            <NotesPyramid notes={fragrance.notes} />
          </motion.div>

          {/* Right col: performance + tags stacked */}
          <div className="flex flex-col gap-6">

            {/* Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="card p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gold-faint flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-ink font-semibold leading-tight">ביצועים</h2>
                  <p className="text-ink-faint text-[10px] font-sans" dir="ltr">Performance</p>
                </div>
              </div>
              <div className="space-y-6">
                <StatBar label="עמידות" icon={Clock} value={fragrance.longevity} />
                <StatBar label="הקרנה (Sillage)" icon={Wind} value={fragrance.sillage} />
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="card p-6 md:p-8 flex-1"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gold-faint flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-ink font-semibold leading-tight">תגיות</h2>
                  <p className="text-ink-faint text-[10px] font-sans" dir="ltr">Tags & Attributes</p>
                </div>
              </div>

              <div className="space-y-4">
                {seasons.length > 0 && (
                  <div>
                    <p className="text-[10px] text-ink-faint font-hebrew uppercase tracking-wider mb-2">עונה מומלצת</p>
                    <div className="flex flex-wrap gap-1.5">
                      {seasons.map(s => (
                        <span key={s} className="tag">{SEASON_LABELS[s]}</span>
                      ))}
                    </div>
                  </div>
                )}
                {occasions.length > 0 && (
                  <div>
                    <p className="text-[10px] text-ink-faint font-hebrew uppercase tracking-wider mb-2">אירוע</p>
                    <div className="flex flex-wrap gap-1.5">
                      {occasions.map(o => (
                        <span key={o} className="tag">{OCCASION_LABELS[o]}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-ink-faint font-hebrew uppercase tracking-wider mb-2">קטגוריה ומאפיינים</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="tag font-semibold" dir="ltr">{fragrance.family}</span>
                    {fragrance.tags.slice(0, 6).map(t => (
                      <span key={t} className="tag" dir="ltr">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Similar fragrances ────────────────────────────────────────────── */}
        {similar.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
                DISCOVER MORE
              </p>
              <h2 className="font-serif text-3xl md:text-4xl gold-text font-bold">
                בשמים דומים
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {similar.map((f, i) => (
                <SimilarCard key={f.id} fragrance={f} index={i} />
              ))}
            </div>

            {/* Back to collection */}
            <div className="text-center mt-10">
              <Link
                href="/#collection"
                className="btn-outline inline-flex items-center gap-2 px-8 py-3 font-hebrew text-sm rounded-xl"
              >
                <ArrowRight className="w-4 h-4" />
                חזרה לכל הקולקציה
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
