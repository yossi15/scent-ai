'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Wind, Star, Plus, Check, Sparkles, ExternalLink } from 'lucide-react';
import { useAuth, SignInButton } from '@clerk/nextjs';
import { fragrances, type Fragrance } from '@/data/fragrances';
import Navigation from '@/components/home/Navigation';
import Footer from '@/components/home/Footer';

/* ─── Slug utils ─────────────────────────────────────────────────── */
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function findBySlug(slug: string): Fragrance | undefined {
  // Support legacy numeric IDs: /fragrance/42 → find by id and the caller redirects
  const numId = Number(slug);
  if (!isNaN(numId) && numId > 0) {
    return fragrances.find(f => f.id === numId);
  }
  return fragrances.find(f => toSlug(f.name) === slug);
}

/* ─── Bottle visual ──────────────────────────────────────────────── */
function BottleVisual({ fragrance, size = 'lg' }: { fragrance: Fragrance; size?: 'sm' | 'lg' }) {
  const [imgErr, setImgErr] = useState(false);
  const w = size === 'lg' ? 160 : 80;
  const h = size === 'lg' ? 220 : 108;
  const imgUrl = fragrance.fragrantica_id
    ? `https://fimgs.net/mdimg/perfume/375x500.${fragrance.fragrantica_id}.jpg`
    : fragrance.image;

  if (!imgErr && imgUrl) {
    return (
      <div style={{ position: 'relative', width: w, height: h }}>
        <Image
          src={imgUrl}
          alt={`${fragrance.name} מאת ${fragrance.house}`}
          fill
          sizes={`${w}px`}
          className="object-contain drop-shadow-2xl"
          onError={() => setImgErr(true)}
          priority={size === 'lg'}
        />
      </div>
    );
  }

  return (
    <div style={{ width: w, height: h, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(201,169,97,0.08)', borderRadius: 12 }}>
      <span style={{ fontFamily: "Georgia, serif", fontSize: size === 'lg' ? 56 : 28, color: 'var(--text-muted)', userSelect: 'none' }} aria-hidden="true">
        {fragrance.house.charAt(0)}
      </span>
    </div>
  );
}

/* ─── Notes pyramid ──────────────────────────────────────────────── */
function NotesPyramid({ notes }: { notes: Fragrance['notes'] }) {
  const tiers = [
    { key: 'top'   as const, label: 'Top', sub: 'הפתיחה', desc: '10 דקות ראשונות', color: '#c9a961', bg: 'rgba(201,169,97,0.1)' },
    { key: 'heart' as const, label: 'Heart', sub: 'הלב',   desc: 'אחרי שעה',        color: '#b8864a', bg: 'rgba(184,134,74,0.1)' },
    { key: 'base'  as const, label: 'Base', sub: 'הבסיס',  desc: 'נשאר כל היום',    color: '#8b6835', bg: 'rgba(139,104,53,0.1)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {tiers.map(tier => {
        const tierNotes = notes.filter(n => n.type === tier.key);
        if (!tierNotes.length) return null;
        return (
          <div key={tier.key}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: tier.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: tier.color }}>{tier.label}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{tier.sub}</span>
              <span style={{ fontSize: 10, color: 'var(--text-faint)', marginRight: 'auto' }}>{tier.desc}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {tierNotes.map(n => (
                <span
                  key={n.name}
                  style={{ fontSize: 11, padding: '4px 10px', borderRadius: 100, background: tier.bg, color: tier.color, border: `1px solid ${tier.bg}` }}
                  dir="ltr"
                >
                  {n.name}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Performance bars (5 segments) ─────────────────────────────── */
function PerformanceBars({ longevity, sillage }: { longevity: number; sillage: number }) {
  const bars = [
    { label: 'עמידות', value: Math.round((longevity / 10) * 5) },
    { label: 'עוצמה',  value: Math.round((sillage  / 10) * 5) },
    { label: 'השלכה',  value: Math.round((sillage  / 10) * 4) },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {bars.map(bar => (
        <div key={bar.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{bar.label}</span>
            <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>{bar.value}/5</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3, 4, 5].map(seg => (
              <div
                key={seg}
                style={{
                  flex: 1, height: 8, borderRadius: 4,
                  background: seg <= bar.value ? 'var(--gold)' : 'rgba(255,255,255,0.06)',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 4 }}>
        לפי נתוני Fragrantica
      </p>
    </div>
  );
}

/* ─── Similar fragrances ─────────────────────────────────────────── */
function getSimilar(f: Fragrance, count = 3): Fragrance[] {
  const keys = ['woody', 'floral', 'oriental', 'fresh', 'gourmand', 'animalic'] as const;
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

/* ─── Main page ──────────────────────────────────────────────────── */
export default function FragranceSlugPage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : (params.slug as string);
  const fragrance = findBySlug(slug);

  // Redirect legacy numeric IDs → canonical slug URL
  useEffect(() => {
    const numId = Number(slug);
    if (!isNaN(numId) && numId > 0 && fragrance) {
      router.replace(`/fragrance/${toSlug(fragrance.name)}`);
    }
  }, [slug, fragrance, router]);

  const { isSignedIn, isLoaded } = useAuth();
  const [inCollection, setInCollection] = useState(false);

  useEffect(() => {
    if (!fragrance) return;
    if (!isLoaded || !isSignedIn) return;
    fetch('/api/collection')
      .then(r => r.json())
      .then(data => {
        if (data.ids) setInCollection((data.ids as number[]).includes(fragrance.id));
      })
      .catch(() => {});
  }, [isLoaded, isSignedIn, fragrance]);

  if (!fragrance) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>הבושם לא נמצא</p>
        <Link href="/collection" style={{ padding: '10px 24px', background: 'var(--gold)', color: '#050505', textDecoration: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600 }}>
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
        body: JSON.stringify({ fragranceId: fragrance.id, name: fragrance.name, house: fragrance.house }),
      }).catch(() => setInCollection(!newState));
    } else {
      await fetch(`/api/collection?fragranceId=${fragrance.id}`, { method: 'DELETE' })
        .catch(() => setInCollection(!newState));
    }
  };

  const similar  = getSimilar(fragrance);
  const buyUrl   = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(`${fragrance.name} ${fragrance.house} perfume`)}`;

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }} dir="rtl">
      <Navigation />
      <div style={{ height: 57 }} />

      {/* Breadcrumb */}
      <div style={{ background: '#080808', padding: '10px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
        <p style={{ fontSize: 10, color: '#888', margin: 0 }}>
          קולקציה
          <span style={{ margin: '0 6px' }}>/</span>
          {fragrance.house}
          <span style={{ margin: '0 6px' }}>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>{fragrance.name}</span>
        </p>
      </div>

      <main style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, padding: '36px 28px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(201,169,97,0.06), transparent 60%)', pointerEvents: 'none' }} />

          {/* Bottle side */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: -32, background: 'radial-gradient(ellipse, rgba(201,169,97,0.08), transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />
              <div style={{
                background: 'linear-gradient(160deg, rgba(201,169,97,0.15), rgba(201,169,97,0.04))',
                border: '1px solid rgba(201,169,97,0.15)',
                borderRadius: 16, padding: 24,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 30px 60px rgba(201,169,97,0.12)',
              }}>
                <BottleVisual fragrance={fragrance} size="lg" />
              </div>
            </div>
            {/* Rating badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 100, padding: '4px 10px' }}>
              <Star size={12} color="var(--gold)" fill="var(--gold)" />
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>{fragrance.rating}</span>
            </div>
          </div>

          {/* Info side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
            <p style={{ fontSize: 9, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', margin: 0 }}>
              {fragrance.house}
            </p>

            <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.15, margin: 0 }} dir="ltr">
              {fragrance.name}
            </h1>

            {/* Meta chips */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[fragrance.year, fragrance.concentration, fragrance.gender, fragrance.size].filter(Boolean).map(chip => (
                <span key={chip} style={{ fontSize: 9, padding: '3px 8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', borderRadius: 100, color: 'var(--text-muted)' }}>
                  {chip}
                </span>
              ))}
            </div>

            {/* Price */}
            <div>
              <p style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 4 }}>החל מ-</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--gold)' }}>
                  {fragrance.price.toLocaleString()}&#8362;
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>/ {fragrance.size}</span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a
                href={buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1, minWidth: 160, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '12px 20px', borderRadius: 8, background: 'var(--gold)', color: '#050505',
                  fontSize: 13, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >
                מצא מחיר טוב ביותר <ExternalLink size={13} />
              </a>

              {isLoaded && !isSignedIn ? (
                <SignInButton mode="modal">
                  <button style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer' }}>
                    <Plus size={14} />
                    לאוסף
                  </button>
                </SignInButton>
              ) : (
                <button
                  onClick={toggleCollection}
                  style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 16px', borderRadius: 8, border: inCollection ? '1px solid var(--border-gold)' : '1px solid var(--border-default)', background: inCollection ? 'rgba(201,169,97,0.08)' : 'transparent', color: inCollection ? 'var(--gold)' : 'var(--text-secondary)', fontSize: 13, cursor: 'pointer' }}
                >
                  {inCollection ? <Check size={14} /> : <Plus size={14} />}
                  {inCollection ? 'באוסף' : 'לאוסף'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── "למה זה אתה" (only when logged in + quiz done) ────────── */}
        {isSignedIn && (
          <div className="frag-section-outer" style={{ margin: '0 28px 8px', background: 'linear-gradient(135deg, #1a1410, #0f0a05)', border: '1px solid rgba(201,169,97,0.2)', borderRadius: 12, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(201,169,97,0.1)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={14} color="var(--gold)" />
              </div>
              <div>
                <p style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>הניתוח האישי שלך</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>למה זה אתה</p>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.7, marginBottom: 14 }}>
              {fragrance.family.toLowerCase().includes('oriental') || fragrance.family.toLowerCase().includes('woody')
                ? `בחרת בניחוחות חמים ועוטפים. ${fragrance.name} מחבר בין ${fragrance.notes.filter(n => n.type === 'base').slice(0, 2).map(n => n.name).join(' ו-')} לכדי חוויה ייחודית שמתאימה לפרופיל שלך.`
                : `הבושם הזה מתאים לפרופיל הריחני שלך ומשלים את האוסף הקיים שלך בצורה מעניינת.`}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[`✓ ${fragrance.family}`, `✓ עמידות ${fragrance.longevity}/10`, `✓ הקרנה ${fragrance.sillage}/10`].map(chip => (
                <span key={chip} style={{ fontSize: 10, padding: '4px 10px', background: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.2)', borderRadius: 100, color: 'var(--gold)' }}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Notes + Performance ───────────────────────────────────── */}
        <div className="frag-section-pad" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, padding: '28px 28px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 12, padding: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 16, letterSpacing: 1 }}>פירמידת הריח</p>
            <NotesPyramid notes={fragrance.notes} />
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 12, padding: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 16, letterSpacing: 1 }}>ביצועים</p>
            <PerformanceBars longevity={fragrance.longevity} sillage={fragrance.sillage} />
          </div>
        </div>

        {/* ── Price comparison (affiliate table placeholder) ─────────── */}
        <div className="frag-section-outer" style={{ margin: '0 28px 28px', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>השוואת מחירים</p>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>איפה הכי משתלם.</h2>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  {[
                    { label: 'חנות',   cls: '' },
                    { label: 'משלוח', cls: 'price-col-secondary' },
                    { label: 'מלאי',   cls: 'price-col-secondary' },
                    { label: 'מחיר',   cls: '' },
                    { label: '',        cls: '' },
                  ].map(h => (
                    <th key={h.label} className={h.cls} style={{ padding: '8px 12px', textAlign: 'right', fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>{h.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: 'rgba(201,169,97,0.04)', borderBottom: '1px solid rgba(201,169,97,0.08)' }}>
                  <td style={{ padding: '12px', fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 }}>
                    Notino.co.il <span style={{ fontSize: 9, color: 'var(--gold)', marginRight: 4 }}>⭐ הכי זול</span>
                  </td>
                  <td className="price-col-secondary" style={{ padding: '12px', fontSize: 11, color: 'var(--text-muted)' }}>משלוח חינם · 3-5 ימים</td>
                  <td className="price-col-secondary" style={{ padding: '12px', fontSize: 11, color: '#4caf50' }}>✓ במלאי</td>
                  <td style={{ padding: '12px', fontSize: 14, fontWeight: 700, color: 'var(--gold)' }}>{fragrance.price.toLocaleString()}&#8362;</td>
                  <td style={{ padding: '12px' }}>
                    <a href={buyUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: 'var(--gold)', textDecoration: 'none', border: '1px solid var(--border-gold)', padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap' }}>
                      לחנות &#8599;
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 12, borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
            SCENTORY לא מוכרת ישירות - אנחנו מציגים מחירים אמיתיים מחנויות מורשות.
          </p>
        </div>

        {/* ── Similar fragrances ────────────────────────────────────── */}
        {similar.length > 0 && (
          <section className="frag-section-pad" style={{ padding: '0 28px 48px' }}>
            <p style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>באותו DNA</p>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 20 }}>בשמים דומים</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
              {similar.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link
                    href={`/fragrance/${toSlug(f.name)}`}
                    style={{ display: 'block', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 12, padding: 16, textDecoration: 'none', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-gold)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-default)')}
                  >
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                      <BottleVisual fragrance={f} size="sm" />
                    </div>
                    <p style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 3, textAlign: 'center' }} dir="ltr">{f.house}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', textAlign: 'center', marginBottom: 8 }} dir="ltr">{f.name}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>{f.price.toLocaleString()}&#8362;</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Star size={10} color="var(--gold)" fill="var(--gold)" />
                        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{f.rating}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
}
