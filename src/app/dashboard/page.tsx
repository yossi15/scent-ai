'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import {
  LayoutDashboard, Droplets, BookOpen, TrendingUp,
  Clock, Wind, Calendar, Plus, ArrowLeft, Star, Sparkles,
} from 'lucide-react';
import { fragrances, type Fragrance } from '@/data/fragrances';

// ── Types ─────────────────────────────────────────────────────────────────────
interface DiaryRow {
  id: string;
  fragrance_id: number | null;
  fragrance_name: string;
  brand: string;
  occasion: string;
  longevity: number;
  projection: number;
  review: string;
  date: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getTopFamily(frags: Fragrance[]): string {
  if (!frags.length) return '-';
  const counts: Record<string, number> = {};
  frags.forEach(f => { counts[f.family] = (counts[f.family] ?? 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

const occasionEmoji: Record<string, string> = {
  daily: '☀️', evening: '🌙', business: '💼', romantic: '❤️',
};
const occasionLabel: Record<string, string> = {
  daily: 'יומיומי', evening: 'ערב', business: 'עסקי', romantic: 'רומנטי',
};

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon, value, label, sub, delay = 0,
}: {
  icon: React.ElementType; value: string | number; label: string; sub?: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="card p-5"
    >
      <div className="w-9 h-9 rounded-xl bg-gold-faint flex items-center justify-center mb-3">
        <Icon className="w-4 h-4 text-gold" />
      </div>
      <p className="font-serif text-3xl text-ink font-bold leading-none mb-1">{value}</p>
      <p className="text-ink-muted text-xs font-hebrew font-medium">{label}</p>
      {sub && <p className="text-ink-faint text-[10px] font-sans mt-0.5" dir="ltr">{sub}</p>}
    </motion.div>
  );
}

// ── Mini collection card ───────────────────────────────────────────────────────
function MiniCard({ frag, i }: { frag: Fragrance; i: number }) {
  const [err, setErr] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/fragrance/${frag.id}`} className="block group">
        <div className="card overflow-hidden group-hover:border-gold-border group-hover:-translate-y-1 transition-all duration-400">
          <div className="h-28 bg-bg-secondary flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4),transparent_70%)]" />
            {!err && frag.image ? (
              <div className="relative w-14 h-20 z-10">
                <Image
                  src={frag.image} alt={frag.name} fill
                  sizes="80px"
                  className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-400"
                  onError={() => setErr(true)}
                />
              </div>
            ) : (
              <Droplets className="w-8 h-8 text-gold/20" />
            )}
          </div>
          <div className="p-3">
            <p className="text-gold text-[8px] tracking-[0.15em] uppercase font-sans truncate" dir="ltr">{frag.house}</p>
            <p className="font-serif text-sm text-ink font-semibold leading-tight truncate" dir="ltr">{frag.name}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-2.5 h-2.5 text-gold fill-gold" />
              <span className="text-ink-faint text-[10px] font-sans">{frag.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [collectionFrags, setCollectionFrags] = useState<Fragrance[]>([]);
  const [diaryEntries, setDiaryEntries]       = useState<DiaryRow[]>([]);
  const [loading, setLoading]                 = useState(true);

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) router.replace('/sign-in');
  }, [isLoaded, isSignedIn, router]);

  // Fetch data
  useEffect(() => {
    if (!isSignedIn) return;
    Promise.all([
      fetch('/api/collection').then(r => r.json()),
      fetch('/api/diary').then(r => r.json()),
    ]).then(([col, diary]) => {
      const ids: number[] = col.ids ?? [];
      setCollectionFrags(fragrances.filter(f => ids.includes(f.id)));
      setDiaryEntries((diary.entries ?? []) as DiaryRow[]);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [isSignedIn]);

  if (!isLoaded || !isSignedIn) return null;

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalValue   = collectionFrags.reduce((s, f) => s + f.price, 0);
  const topFamily    = getTopFamily(collectionFrags);
  const avgLongevity = diaryEntries.length
    ? (diaryEntries.reduce((s, e) => s + e.longevity, 0) / diaryEntries.length).toFixed(1)
    : '-';

  const firstName = user.firstName ?? user.emailAddresses[0]?.emailAddress.split('@')[0] ?? 'חבר';
  const recentEntries = diaryEntries.slice(0, 5);

  // ── Top 3 houses ──────────────────────────────────────────────────────────
  const houseCounts: Record<string, number> = {};
  collectionFrags.forEach(f => { houseCounts[f.house] = (houseCounts[f.house] ?? 0) + 1; });
  const topHouses = Object.entries(houseCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-bg-primary" dir="rtl">

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header className="border-b border-black/[0.05] bg-bg-primary/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gold-faint flex items-center justify-center">
              <LayoutDashboard className="w-3.5 h-3.5 text-gold" />
            </div>
            <span className="font-serif text-base text-ink font-semibold">הדשבורד שלי</span>
          </div>
          <Link
            href="/#collection"
            className="flex items-center gap-1.5 text-ink-muted hover:text-gold transition-colors text-sm font-hebrew group"
          >
            <span>חזרה לאתר</span>
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-20">

        {/* ── Welcome ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-gold text-[11px] tracking-[0.22em] uppercase font-sans font-medium mb-1">
            PERSONAL DASHBOARD
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-ink font-bold">
            שלום, {firstName} 👋
          </h1>
          <p className="text-ink-muted text-sm font-hebrew mt-1">
            הנה הזהות הריחנית שלך - {collectionFrags.length} בשמים,{' '}
            {diaryEntries.length} רשומות יומן
          </p>
        </motion.div>

        {/* ── Stat cards ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard icon={Droplets}   value={collectionFrags.length} label="בשמים באוסף"       delay={0}    />
          <StatCard icon={Sparkles}   value={topFamily}              label="משפחה מובילה"       delay={0.08} sub={collectionFrags.length ? undefined : 'הוסף בשמים'} />
          <StatCard icon={BookOpen}   value={diaryEntries.length}    label="רשומות יומן"        delay={0.16} />
          <StatCard icon={TrendingUp} value={totalValue ? `₪${totalValue.toLocaleString()}` : '-'} label="שווי האוסף" delay={0.24} />
        </div>

        {/* ── Main grid ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Collection (2 cols wide) */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-ink font-semibold">האוסף שלי</h2>
              <Link href="/#collection" className="text-gold text-xs font-hebrew hover:underline flex items-center gap-1">
                <Plus className="w-3 h-3" />
                הוסף בשמים
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="card h-44 animate-pulse bg-bg-secondary" />
                ))}
              </div>
            ) : collectionFrags.length === 0 ? (
              <div className="card p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gold-faint flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-7 h-7 text-gold/40" />
                </div>
                <p className="text-ink-muted text-sm font-hebrew font-light mb-4">
                  האוסף שלך ריק עדיין
                </p>
                <Link href="/#collection" className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-hebrew text-sm">
                  <Plus className="w-4 h-4" />
                  גלה בשמים
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {collectionFrags.map((f, i) => (
                  <MiniCard key={f.id} frag={f} i={i} />
                ))}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-5">

            {/* Diary preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-ink font-semibold">יומן אחרון</h2>
                <Link href="/#diary" className="text-gold text-xs font-hebrew hover:underline">
                  כל הרשומות
                </Link>
              </div>

              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map(i => <div key={i} className="card h-16 animate-pulse bg-bg-secondary" />)}
                </div>
              ) : recentEntries.length === 0 ? (
                <div className="card p-6 text-center">
                  <BookOpen className="w-8 h-8 text-gold/30 mx-auto mb-2" />
                  <p className="text-ink-faint text-xs font-hebrew">אין רשומות עדיין</p>
                  <Link href="/#diary" className="text-gold text-xs font-hebrew mt-2 block hover:underline">
                    תעד את הבושם של היום ←
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentEntries.map((entry, i) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                      className="card p-3.5 flex items-center gap-3"
                    >
                      <span className="text-lg shrink-0">
                        {occasionEmoji[entry.occasion] ?? '🌸'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-ink text-xs font-sans font-semibold truncate" dir="ltr">
                          {entry.fragrance_name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-ink-faint text-[10px] font-hebrew">
                            {occasionLabel[entry.occasion] ?? entry.occasion}
                          </span>
                          <span className="text-ink-faint/30 text-[10px]">·</span>
                          <span className="flex items-center gap-0.5 text-ink-faint text-[10px]">
                            <Clock className="w-2.5 h-2.5" /> {entry.longevity}/10
                          </span>
                          <span className="flex items-center gap-0.5 text-ink-faint text-[10px]">
                            <Wind className="w-2.5 h-2.5" /> {entry.projection}/10
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-ink-faint/50 text-[9px] font-sans shrink-0">
                        <Calendar className="w-2.5 h-2.5" />
                        <span dir="ltr">{entry.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Top houses */}
            {topHouses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="card p-5"
              >
                <h3 className="font-serif text-base text-ink font-semibold mb-4">בתי הבושם שלי</h3>
                <div className="space-y-3">
                  {topHouses.map(([house, count], i) => (
                    <div key={house}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-sans text-ink-secondary" dir="ltr">{house}</span>
                        <span className="text-[10px] font-sans text-gold font-semibold">{count}</span>
                      </div>
                      <div className="h-1 bg-bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(to right, #96793a, #c9a85c)' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / collectionFrags.length) * 100}%` }}
                          transition={{ duration: 0.9, delay: 0.5 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Avg longevity card */}
            {diaryEntries.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="card p-5"
              >
                <h3 className="font-serif text-base text-ink font-semibold mb-4">ממוצעי ביצועים</h3>
                <div className="space-y-3">
                  {[
                    { label: 'עמידות ממוצעת', icon: Clock, value: avgLongevity },
                    {
                      label: 'הקרנה ממוצעת', icon: Wind,
                      value: diaryEntries.length
                        ? (diaryEntries.reduce((s, e) => s + e.projection, 0) / diaryEntries.length).toFixed(1)
                        : '-',
                    },
                  ].map(({ label, icon: Icon, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-ink-muted text-xs font-hebrew">
                        <Icon className="w-3.5 h-3.5 text-gold/60" />
                        {label}
                      </div>
                      <span className="text-gold text-sm font-sans font-bold">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
