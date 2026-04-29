'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, Heart } from 'lucide-react';
import { useAuth, SignInButton } from '@clerk/nextjs';
import { fragrances, type Fragrance } from '@/data/fragrances';
import FragranceCard from './FragranceCard';
import BuyOptions from './BuyOptions';

const COLLECTION_KEY = 'scent-ai-collection';
const houses = ['הכל', ...Array.from(new Set(fragrances.map((f) => f.house))).sort()];

// ── Inference helpers ──────────────────────────────────────────────────────────
function getSeasons(f: Fragrance): string[] {
  const s: string[] = [];
  const { fresh, oriental, gourmand, woody, floral } = f.radarProfile;
  const fam = f.family.toLowerCase();
  if (fresh >= 6 || fam.includes('citrus') || fam.includes('marine') || fam === 'aromatic fougère')
    s.push('summer');
  if (oriental >= 7 || gourmand >= 6 || fam.includes('leather') || fam.includes('smoky') || fam.includes('oud') || (fam.includes('oriental') && (fam.includes('spicy') || fam.includes('gourmand'))))
    s.push('winter');
  if (floral >= 5 || fam.includes('floral') || fam.includes('fresh spicy') || (fresh >= 4 && oriental <= 5 && gourmand <= 4))
    s.push('spring');
  if (woody >= 6 || fam.includes('woody') || fam.includes('amber') || (oriental >= 5 && oriental < 8))
    s.push('fall');
  return s.length ? s : ['spring', 'fall'];
}

function getOccasions(f: Fragrance): string[] {
  const o: string[] = [];
  const tags = f.tags.map(t => t.toLowerCase());
  const { fresh, oriental, gourmand, floral } = f.radarProfile;
  if (f.sillage <= 7 && f.longevity >= 5 && (fresh >= 5 || tags.some(t => ['versatile', 'fresh', 'office', 'daily', 'elegant'].includes(t))))
    o.push('daily');
  if (f.sillage <= 6 && tags.some(t => ['elegant', 'classic', 'versatile', 'timeless', 'smooth'].includes(t)))
    o.push('business');
  if (f.sillage >= 7 && (oriental >= 6 || gourmand >= 5 || tags.some(t => ['dark', 'night', 'decadent', 'beast mode', 'power scent', 'smoky', 'addictive'].includes(t))))
    o.push('evening');
  if (floral >= 5 || oriental >= 6 || tags.some(t => ['romantic', 'sensual', 'rose', 'date', 'bohemian', 'viral', 'iconic'].includes(t)))
    o.push('romantic');
  if (fresh >= 6 && f.sillage <= 6)
    o.push('sport');
  if (f.rating >= 4.7 && f.sillage >= 7 && f.longevity >= 8)
    o.push('special');
  return o.length ? o : ['daily'];
}

// ── Filter config ──────────────────────────────────────────────────────────────
const SEASON_OPTIONS = [
  { value: 'spring', label: 'אביב 🌸' },
  { value: 'summer', label: 'קיץ ☀️' },
  { value: 'fall',   label: 'סתיו 🍂' },
  { value: 'winter', label: 'חורף ❄️' },
];

const OCCASION_OPTIONS = [
  { value: 'daily',    label: 'יומיומי' },
  { value: 'business', label: 'עסקי' },
  { value: 'evening',  label: 'ערב' },
  { value: 'romantic', label: 'רומנטי' },
  { value: 'sport',    label: 'ספורט' },
  { value: 'special',  label: 'מיוחד' },
];

const GENDER_OPTIONS = [
  { value: 'masculine', label: 'גברי' },
  { value: 'feminine',  label: 'נשי' },
  { value: 'unisex',    label: 'יוניסקס' },
];

const PRICE_OPTIONS = [
  { value: 'under500',   label: 'עד ₪500' },
  { value: '500to1000',  label: '₪500-1000' },
  { value: 'over1000',   label: 'מעל ₪1000' },
];

type FilterGroup = { season: string[]; occasion: string[]; gender: string[]; price: string[] };
const EMPTY_FILTERS: FilterGroup = { season: [], occasion: [], gender: [], price: [] };

function Pill({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`whitespace-nowrap shrink-0 px-3.5 py-1.5 text-xs font-sans border rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
        active
          ? 'bg-gold text-white border-gold shadow-sm'
          : 'bg-bg-card border-black/[0.06] text-ink-muted hover:border-gold-border hover:text-gold'
      }`}
    >
      {label}
    </button>
  );
}

function FilterRow({ label, options, active, onToggle }: {
  label: string;
  options: { value: string; label: string }[];
  active: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <span className="shrink-0 text-[10px] font-hebrew text-ink-faint uppercase tracking-wider w-12 text-left">{label}</span>
      <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
        {options.map(o => (
          <Pill key={o.value} label={o.label} active={active.includes(o.value)} onClick={() => onToggle(o.value)} />
        ))}
      </div>
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function Collection() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [search, setSearch] = useState('');
  const [houseFilter, setHouseFilter] = useState('הכל');
  const [filters, setFilters] = useState<FilterGroup>(EMPTY_FILTERS);
  const [showHouseFilters, setShowHouseFilters] = useState(false);
  const [showSmartFilters, setShowSmartFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [collection, setCollection] = useState<Set<number>>(new Set());
  const [showMyCollection, setShowMyCollection] = useState(false);
  const [buyTarget, setBuyTarget] = useState<Fragrance | null>(null);

  // Load collection from DB (if signed in) or localStorage (fallback)
  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      fetch('/api/collection')
        .then(r => r.json())
        .then(data => { if (data.ids) setCollection(new Set(data.ids as number[])); })
        .catch(() => {});
    } else {
      try {
        const saved = localStorage.getItem(COLLECTION_KEY);
        if (saved) setCollection(new Set(JSON.parse(saved)));
      } catch {}
    }
  }, [isLoaded, isSignedIn]);

  // Listen for fragrances added from TasteQuiz modal
  useEffect(() => {
    const handler = (e: Event) => {
      const frag = fragrances.find(f => f.id === (e as CustomEvent<number>).detail);
      if (!frag) return;
      setCollection(prev => {
        if (prev.has(frag.id)) return prev;
        const next = new Set(prev);
        next.add(frag.id);
        if (isSignedIn) {
          fetch('/api/collection', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fragranceId: frag.id, name: frag.name, house: frag.house }),
          }).catch(() => {});
        } else {
          localStorage.setItem(COLLECTION_KEY, JSON.stringify([...next]));
        }
        return next;
      });
    };
    window.addEventListener('scent:collection-add', handler);
    return () => window.removeEventListener('scent:collection-add', handler);
  }, [isSignedIn]);

  const toggleCollection = useCallback((f: Fragrance) => {
    if (!isSignedIn) return; // handled by FragranceCard sign-in prompt
    setCollection(prev => {
      const next = new Set(prev);
      const removing = next.has(f.id);
      if (removing) {
        next.delete(f.id);
        fetch(`/api/collection?fragranceId=${f.id}`, { method: 'DELETE' }).catch(() => {});
      } else {
        next.add(f.id);
        fetch('/api/collection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fragranceId: f.id, name: f.name, house: f.house }),
        }).catch(() => {});
      }
      return next;
    });
  }, [isSignedIn]);

  const toggleFilter = useCallback((group: keyof FilterGroup, value: string) => {
    setFilters(prev => {
      const cur = prev[group];
      return {
        ...prev,
        [group]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value],
      };
    });
    setVisibleCount(12);
  }, []);

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0) || houseFilter !== 'הכל';

  const clearAllFilters = () => {
    setFilters(EMPTY_FILTERS);
    setHouseFilter('הכל');
    setVisibleCount(12);
  };

  const filtered = useMemo(() => {
    const normalize = (s: string) =>
      s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[''`]/g, '').replace(/\s+/g, ' ').trim();
    const q = normalize(search);
    const terms = q.split(' ').filter(Boolean);

    return fragrances.filter((f) => {
      if (showMyCollection && !collection.has(f.id)) return false;

      // Text search
      if (terms.length > 0) {
        const blob = normalize([f.name, f.house, f.family, f.gender, f.concentration, ...f.tags, ...f.notes.map(n => n.name), String(f.year)].join(' '));
        if (!terms.every(t => blob.includes(t))) return false;
      }

      // House filter
      if (houseFilter !== 'הכל' && f.house !== houseFilter) return false;

      // Season filter
      if (filters.season.length > 0) {
        const seasons = getSeasons(f);
        if (!filters.season.some(s => seasons.includes(s))) return false;
      }

      // Occasion filter
      if (filters.occasion.length > 0) {
        const occasions = getOccasions(f);
        if (!filters.occasion.some(o => occasions.includes(o))) return false;
      }

      // Gender filter
      if (filters.gender.length > 0) {
        const g = f.gender.toLowerCase();
        const matchGender = filters.gender.some(gv =>
          gv === 'masculine' ? (g.includes('masculine') || g === 'men') :
          gv === 'feminine'  ? (g.includes('feminine')  || g === 'women') :
          g.includes('unisex')
        );
        if (!matchGender) return false;
      }

      // Price filter
      if (filters.price.length > 0) {
        const matchPrice = filters.price.some(pv =>
          pv === 'under500'  ? f.price <= 500 :
          pv === '500to1000' ? f.price > 500 && f.price <= 1000 :
          f.price > 1000
        );
        if (!matchPrice) return false;
      }

      return true;
    });
  }, [search, houseFilter, filters, showMyCollection, collection]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const activeFilterCount = Object.values(filters).flat().length + (houseFilter !== 'הכל' ? 1 : 0);

  return (
    <section id="collection" className="py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">THE ARCHIVE</p>
          <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">הקולקציה</h2>
          <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
            {fragrances.length} יצירות מופת מ-{houses.length - 1} בתי בושם נישתיים מובילים בעולם
          </p>
        </motion.div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-4">
          <div className="card p-2 flex items-center gap-2 !shadow-md">
            <Search className="w-4 h-4 text-ink-faint mr-1 shrink-0" aria-hidden="true" />
            <label htmlFor="fragrance-search" className="sr-only">חיפוש בשמים</label>
            <input
              id="fragrance-search"
              type="search"
              placeholder="חיפוש: Aventus, Creed, Oud, Vanilla..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(12); }}
              className="flex-1 bg-transparent text-ink text-sm font-hebrew placeholder:text-ink-faint/60 focus:outline-none py-2"
            />
            {search && (
              <button onClick={() => setSearch('')} aria-label="נקה חיפוש" className="text-ink-faint hover:text-ink p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded">
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
            <button
              onClick={() => { setShowSmartFilters(v => !v); setShowHouseFilters(false); }}
              aria-label={showSmartFilters ? 'הסתר פילטרים' : 'הצג פילטרים'}
              aria-expanded={showSmartFilters}
              className={`relative p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${showSmartFilters ? 'bg-gold-faint text-gold' : 'text-ink-faint hover:text-gold'}`}
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-[9px] font-sans font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Smart filter bar */}
        <AnimatePresence>
          {showSmartFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto overflow-hidden mb-4"
            >
              <div className="card !p-4 space-y-3">
                <FilterRow label="עונה" options={SEASON_OPTIONS} active={filters.season} onToggle={v => toggleFilter('season', v)} />
                <FilterRow label="אירוע" options={OCCASION_OPTIONS} active={filters.occasion} onToggle={v => toggleFilter('occasion', v)} />
                <FilterRow label="מגדר" options={GENDER_OPTIONS} active={filters.gender} onToggle={v => toggleFilter('gender', v)} />
                <FilterRow label="מחיר" options={PRICE_OPTIONS} active={filters.price} onToggle={v => toggleFilter('price', v)} />

                {/* House filter toggle inside smart panel */}
                <div className="flex items-center gap-3 pt-1 border-t border-black/[0.05]">
                  <span className="shrink-0 text-[10px] font-hebrew text-ink-faint uppercase tracking-wider w-12 text-left">בית</span>
                  <button
                    onClick={() => setShowHouseFilters(v => !v)}
                    className={`text-xs font-sans px-3 py-1.5 border rounded-full transition-all duration-200 ${showHouseFilters ? 'bg-gold-faint text-gold border-gold-border' : 'bg-bg-card border-black/[0.06] text-ink-muted hover:border-gold-border hover:text-gold'}`}
                  >
                    {houseFilter === 'הכל' ? 'כל הבתים' : houseFilter}
                  </button>
                </div>

                {showHouseFilters && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {houses.map(h => (
                      <Pill key={h} label={h === 'הכל' ? 'הכל' : h} active={houseFilter === h} onClick={() => { setHouseFilter(h); setVisibleCount(12); }} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* My Collection Toggle + clear */}
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <button
            onClick={() => { setShowMyCollection(!showMyCollection); setVisibleCount(12); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-hebrew font-medium transition-all duration-200 ${
              showMyCollection ? 'bg-gold text-white shadow-sm' : 'bg-bg-card border border-black/[0.06] text-ink-muted hover:border-gold-border hover:text-gold'
            }`}
          >
            <Heart className={`w-4 h-4 ${showMyCollection ? 'fill-white' : ''}`} aria-hidden="true" />
            האוסף שלי {collection.size > 0 && `(${collection.size})`}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-hebrew font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-all duration-200"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              נקה הכל
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-center text-ink-faint text-xs font-hebrew mb-6">
          מציג <span className="text-gold font-semibold">{Math.min(visibleCount, filtered.length)}</span> מתוך <span className="text-ink font-semibold">{filtered.length}</span> בשמים
          {hasActiveFilters && <span className="text-ink-faint"> (מסונן מתוך {fragrances.length})</span>}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visible.map((f, i) => (
            <FragranceCard
              key={f.id} fragrance={f} index={i}
              onClick={(f) => router.push(`/fragrance/${f.id}`)}
              inCollection={collection.has(f.id)}
              onToggleCollection={toggleCollection}
              onBuy={setBuyTarget}
            />
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount(v => v + 12)}
              className="px-8 py-3 font-hebrew text-sm font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: '#0D0D0D', color: '#FFFFFF', boxShadow: '0 4px 16px rgba(13,13,13,0.18)' }}
            >
              טען עוד 12 ({filtered.length - visibleCount} נוספים)
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-ink-faint/40 mx-auto mb-3" aria-hidden="true" />
            <p className="text-ink-muted font-hebrew text-sm">לא נמצאו בשמים תואמים.</p>
            <button
              onClick={() => { setSearch(''); setHouseFilter('הכל'); setFilters(EMPTY_FILTERS); setShowMyCollection(false); }}
              className="text-gold text-xs font-hebrew mt-2 hover:underline"
            >
              נקה חיפוש
            </button>
          </div>
        )}
      </div>

      <BuyOptions fragrance={buyTarget} onClose={() => setBuyTarget(null)} />
    </section>
  );
}
