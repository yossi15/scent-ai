'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fragrances } from '@/data/fragrances';

export default function QuickMatch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof fragrances>([]);
  const router = useRouter();

  const search = (q: string) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }
    const norm = q.toLowerCase();
    const found = fragrances
      .filter(f =>
        f.name.toLowerCase().includes(norm) ||
        f.house.toLowerCase().includes(norm) ||
        f.family.toLowerCase().includes(norm) ||
        f.notes.some(n => n.name.toLowerCase().includes(norm))
      )
      .slice(0, 5);
    setResults(found);
  };

  return (
    <section className="py-20 px-4" aria-labelledby="quickmatch-heading">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            חיפוש מהיר
          </p>
          <h2 id="quickmatch-heading" className="font-serif text-3xl md:text-4xl gold-text font-bold mb-3">
            מצא בושם עכשיו
          </h2>
          <p className="text-ink-muted text-sm font-hebrew font-light">
            חפש לפי שם, בית בושם, משפחה או תו ריח
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="card !p-0 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3">
              <Search className="w-4 h-4 text-ink-faint shrink-0" />
              <input
                type="search"
                value={query}
                onChange={(e) => search(e.target.value)}
                placeholder="נסה: Aventus, Vanilla, Rose, Byredo..."
                className="flex-1 bg-transparent text-ink text-sm font-hebrew placeholder:text-ink-faint/60 focus:outline-none py-1"
                aria-label="חיפוש מהיר בשמים"
              />
              <Sparkles className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
            </div>

            {results.length > 0 && (
              <ul className="border-t border-black/[0.05] divide-y divide-black/[0.04]" role="listbox">
                {results.map(f => (
                  <li key={f.id}>
                    <button
                      onClick={() => { setQuery(''); setResults([]); router.push(`/fragrance/${f.id}`); }}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gold-faint/50 transition-colors text-right focus:outline-none focus-visible:bg-gold-faint/50"
                      role="option"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-serif text-ink font-semibold truncate" dir="ltr">{f.name}</p>
                        <p className="text-[11px] text-ink-muted font-sans truncate" dir="ltr">{f.house} · {f.family}</p>
                      </div>
                      <ArrowLeft className="w-3.5 h-3.5 text-gold shrink-0 mr-2" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
