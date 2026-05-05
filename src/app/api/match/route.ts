/**
 * POST /api/match
 * Local similarity algorithm — no external API required.
 * Given one fragrance name, infers profile + returns 3 similar fragrances.
 */
import { NextRequest, NextResponse } from 'next/server';
import { fragrances, type Fragrance } from '@/data/fragrances';

export interface MatchProfile {
  scent_type: string;
  intensity: 'light' | 'medium' | 'strong';
  season: string[];
  occasions: string[];
  style: string;
}

export interface MatchRecommendation {
  name: string;
  brand: string;
  description: string;
  match_reason: string;
  price_range: string;
  tier: 'cheap' | 'mid' | 'luxury';
  image_url: string;
  affiliate_link: string;
  in_catalog: boolean;
  catalog_id: number | null;
}

export interface MatchResponse {
  input_fragrance: string;
  profile: MatchProfile;
  insight: string;
  traits: string[];
  recommendations: MatchRecommendation[];
  premium_recommendations: { name: string; hidden: true }[];
}

const RADAR_KEYS = ['woody', 'floral', 'oriental', 'fresh', 'gourmand', 'animalic'] as const;
type RadarKey = typeof RADAR_KEYS[number];
type RadarVec = Record<RadarKey, number>;

function cosine(a: RadarVec, b: RadarVec): number {
  const dot  = RADAR_KEYS.reduce((s, k) => s + a[k] * b[k], 0);
  const magA = Math.sqrt(RADAR_KEYS.reduce((s, k) => s + a[k] ** 2, 0));
  const magB = Math.sqrt(RADAR_KEYS.reduce((s, k) => s + b[k] ** 2, 0));
  return magA && magB ? dot / (magA * magB) : 0;
}

function findFragrance(name: string): Fragrance | undefined {
  const n = name.trim().toLowerCase();
  return fragrances.find(f => f.name.toLowerCase() === n || f.name.toLowerCase().includes(n)) ??
         fragrances.find(f => f.house.toLowerCase().includes(n));
}

function dominantNote(r: RadarVec): RadarKey {
  return (RADAR_KEYS as readonly RadarKey[]).reduce((best, k) => r[k] > r[best] ? k : best, RADAR_KEYS[0]);
}

function inferProfile(f: Fragrance): MatchProfile {
  const r = f.radarProfile as RadarVec;
  const dom = dominantNote(r);
  const scentTypeMap: Record<RadarKey, string> = {
    woody: 'woody', floral: 'floral', oriental: 'oriental',
    fresh: 'fresh', gourmand: 'gourmand', animalic: 'leather',
  };
  return {
    scent_type: scentTypeMap[dom],
    intensity: f.sillage >= 8 ? 'strong' : f.sillage >= 5 ? 'medium' : 'light',
    season: f.radarProfile.fresh >= 6 ? ['spring', 'summer'] :
            f.radarProfile.oriental >= 7 || f.radarProfile.gourmand >= 6 ? ['fall', 'winter'] :
            ['all-season'],
    occasions: f.sillage <= 6 ? ['day', 'office'] :
               f.radarProfile.oriental >= 7 ? ['night', 'date'] : ['day', 'casual'],
    style: f.rating >= 4.7 ? 'elegant' : f.radarProfile.fresh >= 7 ? 'clean' : 'classic',
  };
}

function insightHe(f: Fragrance): string {
  const r = f.radarProfile as RadarVec;
  const dom = dominantNote(r);
  const domMap: Record<RadarKey, string> = {
    woody: 'בשמים עציים ועמוקים', floral: 'בשמים פרחוניים ועדינים',
    oriental: 'בשמים מזרחיים וחמים', fresh: 'בשמים טריים ומרעננים',
    gourmand: 'בשמים מתוקים ועוטפים', animalic: 'בשמים חייתיים ועוריים',
  };
  return `הטעם שלך נוטה ל${domMap[dom]}, עם העדפה לבשמים ${f.sillage >= 7 ? 'בולטים ונוכחים' : 'אינטימיים ואישיים'}.`;
}

function tierOf(price: number): 'cheap' | 'mid' | 'luxury' {
  return price < 450 ? 'cheap' : price > 1200 ? 'luxury' : 'mid';
}

function buildMatchRec(f: Fragrance, inputName: string): MatchRecommendation {
  const topNotes = f.notes.filter(n => n.type === 'top').slice(0, 2).map(n => n.name).join(' ו-');
  return {
    name: f.name,
    brand: f.house,
    description: `${f.house} ${f.name} — בושם ${f.family.toLowerCase()} עם ${topNotes}.`,
    match_reason: `בהשראת ${inputName}, אך בגרסה ${f.radarProfile.fresh >= 7 ? 'קלה וטרייה יותר' : f.radarProfile.oriental >= 7 ? 'עמוקה ומחממת יותר' : 'מעודנת ומאוזנת יותר'}.`,
    price_range: `₪${f.price.toLocaleString()}`,
    tier: tierOf(f.price),
    image_url: f.image ?? '',
    affiliate_link: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(f.name + ' ' + f.house)}`,
    in_catalog: true,
    catalog_id: f.id,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { fragrance: inputName } = (await req.json()) as { fragrance?: string };
    if (!inputName?.trim()) {
      return NextResponse.json({ error: 'Missing fragrance' }, { status: 400 });
    }

    const source = findFragrance(inputName.trim());
    const sourceVec: RadarVec = source
      ? source.radarProfile as RadarVec
      : { woody: 5, floral: 3, oriental: 4, fresh: 5, gourmand: 2, animalic: 2 };

    // Score by cosine similarity, exclude the source itself
    const similar = fragrances
      .filter(f => f.id !== source?.id)
      .map(f => ({ f, sim: cosine(sourceVec, f.radarProfile as RadarVec) }))
      .sort((a, b) => b.sim - a.sim);

    // 3 tiers: cheap / mid / luxury
    const pick = (tier: 'cheap' | 'mid' | 'luxury') =>
      similar.find(({ f }) => tierOf(f.price) === tier)?.f ??
      similar[0]?.f;

    const cheap   = pick('cheap');
    const mid     = pick('mid');
    const luxury  = pick('luxury');

    const recs = [cheap, mid, luxury]
      .filter(Boolean)
      .filter((f, i, arr) => arr.findIndex(x => x?.id === f?.id) === i)
      .slice(0, 3) as Fragrance[];

    // Premium (locked) — next 3 most similar
    const usedIds = new Set(recs.map(f => f.id));
    const premium = similar
      .filter(({ f }) => !usedIds.has(f.id))
      .slice(0, 3)
      .map(({ f }) => ({ name: f.name, hidden: true as const }));

    const profile = source ? inferProfile(source) : {
      scent_type: 'woody', intensity: 'medium' as const,
      season: ['all-season'], occasions: ['day'], style: 'elegant',
    };

    const response: MatchResponse = {
      input_fragrance: inputName.trim(),
      profile,
      insight: source ? insightHe(source) : 'בושם עם אופי ייחודי — הנה כמה כיוונים שיכולים לעניין אותך.',
      traits: [
        profile.intensity === 'strong' ? 'נוכח' : 'עדין',
        profile.scent_type,
        profile.season.includes('summer') ? 'קיצי' : 'כל-עונה',
      ],
      recommendations: recs.map(f => buildMatchRec(f, inputName.trim())),
      premium_recommendations: premium,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error('Match local error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
