'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { fragrances, type Fragrance } from '@/data/fragrances';
import FragranceCard from './FragranceCard';
import FragranceModal from './FragranceModal';

const houses = ['הכל', ...Array.from(new Set(fragrances.map((f) => f.house)))];
const families = ['הכל', ...Array.from(new Set(fragrances.map((f) => f.family)))];

export default function Collection() {
  const [search, setSearch] = useState('');
  const [houseFilter, setHouseFilter] = useState('הכל');
  const [familyFilter, setFamilyFilter] = useState('הכל');
  const [selected, setSelected] = useState<Fragrance | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return fragrances.filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.house.toLowerCase().includes(search.toLowerCase()) ||
        f.notes.some((n) => n.name.toLowerCase().includes(search.toLowerCase()));
      const matchesHouse = houseFilter === 'הכל' || f.house === houseFilter;
      const matchesFamily = familyFilter === 'הכל' || f.family === familyFilter;
      return matchesSearch && matchesHouse && matchesFamily;
    });
  }, [search, houseFilter, familyFilter]);

  return (
    <section id="collection" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold/60 text-[10px] tracking-[0.3em] uppercase font-sans mb-2">
            THE ARCHIVE
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-gradient mb-3">
            הקולקציה
          </h2>
          <p className="text-ink-muted/60 text-sm font-hebrew max-w-md mx-auto font-light">
            {fragrances.length} יצירות מופת מבתי הבושם הבלעדיים בעולם
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-10">
          <div className="glass-card rounded-xl p-3 flex items-center gap-3">
            <Search className="w-4 h-4 text-ink-muted/40 shrink-0" />
            <input
              type="text"
              placeholder="חיפוש לפי שם, בית בושם או תו ריח..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-ink text-sm font-hebrew placeholder:text-ink-muted/30 focus:outline-none"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-ink-muted/40 hover:text-gold transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 glass-card rounded-xl p-4 flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-1">
                <label className="text-ink-muted/50 text-[10px] tracking-wider font-hebrew block mb-1">
                  בית בושם
                </label>
                <select
                  value={houseFilter}
                  onChange={(e) => setHouseFilter(e.target.value)}
                  className="w-full bg-shell-light border border-gold/10 text-ink text-sm font-hebrew rounded-lg px-3 py-2 focus:outline-none focus:border-gold/30"
                >
                  {houses.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="text-ink-muted/50 text-[10px] tracking-wider font-hebrew block mb-1">
                  משפחת ריח
                </label>
                <select
                  value={familyFilter}
                  onChange={(e) => setFamilyFilter(e.target.value)}
                  className="w-full bg-shell-light border border-gold/10 text-ink text-sm font-hebrew rounded-lg px-3 py-2 focus:outline-none focus:border-gold/30"
                >
                  {families.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((f, i) => (
            <FragranceCard key={f.id} fragrance={f} index={i} onClick={setSelected} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-ink-muted/40 font-hebrew text-sm">לא נמצאו בשמים תואמים.</p>
          </div>
        )}
      </div>

      <FragranceModal fragrance={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
