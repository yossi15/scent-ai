'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { fragrances, type Fragrance } from '@/data/fragrances';
import FragranceCard from './FragranceCard';
import FragranceModal from './FragranceModal';

const houses = ['הכל', ...Array.from(new Set(fragrances.map((f) => f.house))).sort()];

export default function Collection() {
  const [search, setSearch] = useState('');
  const [houseFilter, setHouseFilter] = useState('הכל');
  const [selected, setSelected] = useState<Fragrance | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = useMemo(() => {
    return fragrances.filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.house.toLowerCase().includes(search.toLowerCase()) ||
        f.notes.some((n) => n.name.toLowerCase().includes(search.toLowerCase()));
      const matchesHouse = houseFilter === 'הכל' || f.house === houseFilter;
      return matchesSearch && matchesHouse;
    });
  }, [search, houseFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section id="collection" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            THE ARCHIVE
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">
            הקולקציה
          </h2>
          <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
            {fragrances.length} יצירות מופת מ-{houses.length - 1} בתי בושם נישתיים מובילים בעולם
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="card p-2 flex items-center gap-2 !shadow-md">
            <Search className="w-4 h-4 text-ink-faint mr-1 shrink-0" />
            <input
              type="text"
              placeholder="חיפוש לפי שם, בית בושם או תו ריח..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(12); }}
              className="flex-1 bg-transparent text-ink text-sm font-hebrew placeholder:text-ink-faint/60 focus:outline-none py-2"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-ink-faint hover:text-ink p-1">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-gold-faint text-gold' : 'text-ink-faint hover:text-gold'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex flex-wrap gap-2 justify-center"
            >
              {houses.map((h) => (
                <button
                  key={h}
                  onClick={() => { setHouseFilter(h); setVisibleCount(12); }}
                  className={`text-xs font-sans px-3 py-1.5 rounded-full transition-all duration-200 ${
                    houseFilter === h
                      ? 'bg-gold text-white shadow-sm'
                      : 'bg-bg-card border border-black/[0.06] text-ink-muted hover:border-gold-border hover:text-gold'
                  }`}
                  dir="ltr"
                >
                  {h === 'הכל' ? 'הכל' : h}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Results count */}
        {(search || houseFilter !== 'הכל') && (
          <p className="text-center text-ink-faint text-xs font-hebrew mb-6">
            {filtered.length} תוצאות
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visible.map((f, i) => (
            <FragranceCard key={f.id} fragrance={f} index={i} onClick={setSelected} />
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((v) => v + 12)}
              className="btn-outline px-8 py-3 font-hebrew text-sm rounded-lg"
            >
              הצג עוד ({filtered.length - visibleCount} נוספים)
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-ink-muted font-hebrew text-sm">לא נמצאו בשמים תואמים.</p>
            <button
              onClick={() => { setSearch(''); setHouseFilter('הכל'); }}
              className="text-gold text-xs font-hebrew mt-2 hover:underline"
            >
              נקה חיפוש
            </button>
          </div>
        )}
      </div>

      <FragranceModal fragrance={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
