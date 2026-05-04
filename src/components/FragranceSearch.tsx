'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft } from 'lucide-react';
import { fragrances } from '@/data/fragrances';

const FAMILY_LABELS: Record<string, string> = {
  'Floral': 'פרחוני',
  'Oriental': 'אוריינטלי',
  'Woody': 'עצי',
  'Fresh': 'רענן',
  'Citrus': 'הדרי',
  'Aromatic': 'ארומטי',
  'Chypre': 'שיפרה',
  'Fougère': 'פוז\'ר',
  'Gourmand': 'גורמנד',
};

function familyLabel(family: string) {
  for (const [en, he] of Object.entries(FAMILY_LABELS)) {
    if (family.toLowerCase().includes(en.toLowerCase())) return he;
  }
  return family.split(' ')[0];
}

export default function FragranceSearch() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return fragrances
      .filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.house.toLowerCase().includes(q) ||
        f.tags.some(t => t.toLowerCase().includes(q)) ||
        f.family.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const showDropdown = focused && query.trim().length >= 2;

  return (
    <section id="collection" className="py-28 px-4" style={{ background: '#FAF8F5' }}>
      <div className="max-w-2xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#C4A882] mb-3">
            THE COLLECTION
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0D0D0D] mb-4 font-light">
            חפש בין 745 בשמים
          </h2>
          <p className="font-hebrew text-sm text-[#8B7355] font-light leading-relaxed">
            הקלד שם, בית בשמים, או מאפיין — ומצא את הבושם שלך
          </p>
        </motion.div>

        {/* Search box */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          {/* Input */}
          <div
            className="relative flex items-center"
            style={{
              border: focused ? '1.5px solid #C4A882' : '1.5px solid #E0D8CC',
              borderRadius: '4px',
              background: '#FFFFFF',
              transition: 'border-color 0.25s',
              boxShadow: focused ? '0 4px 20px rgba(196,168,130,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <Search
              className="absolute right-4 w-4 h-4 pointer-events-none"
              style={{ color: focused ? '#C4A882' : '#BFBAB4' }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="Creed Aventus, Tom Ford, פרחוני..."
              dir="auto"
              className="w-full py-4 pr-11 pl-4 text-sm font-sans text-[#0D0D0D] placeholder:text-[#C0B8AF] bg-transparent outline-none"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                className="absolute left-4 text-[#BFBAB4] hover:text-[#8B7355] transition-colors"
                aria-label="נקה חיפוש"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            )}
          </div>

          {/* Dropdown results */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E8E4DC] shadow-lg overflow-hidden z-30"
                style={{ borderRadius: '4px' }}
              >
                {results.length === 0 ? (
                  <div className="px-5 py-5 text-center">
                    <p className="text-sm font-hebrew text-[#9A9A9A]">לא נמצאו תוצאות עבור "{query}"</p>
                    <p className="text-xs font-hebrew text-[#C0B8AF] mt-1">נסה לחפש לפי שם, בית בשמים, או סגנון</p>
                  </div>
                ) : (
                  <>
                    {results.map((f, i) => (
                      <motion.a
                        key={f.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        href={`https://www.google.com/search?q=${encodeURIComponent(f.house + ' ' + f.name + ' perfume')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-5 py-3.5 hover:bg-[#FAF8F5] transition-colors group border-b border-[#F0EDE8] last:border-0"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-sans font-medium text-[#0D0D0D] group-hover:text-[#8B7355] transition-colors" dir="ltr">
                            {f.house} — {f.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-hebrew text-[#BFBAB4]">{familyLabel(f.family)}</span>
                            {f.gender === 'masculine' && <span className="text-[10px] text-[#BFBAB4]">גברי</span>}
                            {f.gender === 'feminine' && <span className="text-[10px] text-[#BFBAB4]">נשי</span>}
                            {f.gender === 'unisex' && <span className="text-[10px] text-[#BFBAB4]">יוניסקס</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[11px] font-hebrew text-[#C4A882]">פרטים</span>
                          <ArrowLeft className="w-3 h-3 text-[#C4A882]" />
                        </div>
                      </motion.a>
                    ))}

                    {/* Footer row */}
                    <div className="px-5 py-3 bg-[#FAF8F5] border-t border-[#ECEAE6] flex items-center justify-between">
                      <span className="text-[11px] font-hebrew text-[#BFBAB4]">
                        מציג {results.length} מתוך {fragrances.filter(f => {
                          const q = query.toLowerCase();
                          return f.name.toLowerCase().includes(q) || f.house.toLowerCase().includes(q) || f.family.toLowerCase().includes(q);
                        }).length} תוצאות
                      </span>
                      <a
                        href="#quiz"
                        onClick={() => { setFocused(false); setQuery(''); }}
                        className="text-[11px] font-hebrew text-[#8B7355] hover:text-[#0D0D0D] transition-colors"
                      >
                        גלה מה מתאים לך ←
                      </a>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hint tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          {['Creed', 'Tom Ford', 'Dior', 'פרחוני', 'עצי', 'MFK'].map(tag => (
            <button
              key={tag}
              onClick={() => { setQuery(tag); setFocused(true); inputRef.current?.focus(); }}
              className="px-3.5 py-1.5 text-[11px] font-sans border border-[#E0D8CC] text-[#8B7355] hover:border-[#C4A882] hover:bg-white transition-all duration-200"
              style={{ borderRadius: '2px' }}
              dir="auto"
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Bottom line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-[11px] font-hebrew text-[#C0B8AF] mt-8"
        >
          745 בשמים · 120+ בתי בשמים · מעודכן 2025
        </motion.p>
      </div>
    </section>
  );
}
