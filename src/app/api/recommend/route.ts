/**
 * POST /api/recommend
 * Local collection-based recommendation — no external API required.
 * Analyses the user's collection DNA and returns 3 complementary fragrances.
 */
import { NextRequest, NextResponse } from 'next/server';
import { fragrances, type Fragrance } from '@/data/fragrances';

const RADAR_KEYS = ['woody', 'floral', 'oriental', 'fresh', 'gourmand', 'animalic'] as const;
type RadarKey = typeof RADAR_KEYS[number];
type RadarVec = Record<RadarKey, number>;

interface FragranceInput {
  id: number;
  name: string;
  house: string;
  family: string;
  radarProfile?: RadarVec;
}

function cosine(a: RadarVec, b: RadarVec): number {
  const dot  = RADAR_KEYS.reduce((s, k) => s + a[k] * b[k], 0);
  const magA = Math.sqrt(RADAR_KEYS.reduce((s, k) => s + a[k] ** 2, 0));
  const magB = Math.sqrt(RADAR_KEYS.reduce((s, k) => s + b[k] ** 2, 0));
  return magA && magB ? dot / (magA * magB) : 0;
}

function avgVec(vecs: RadarVec[]): RadarVec {
  if (!vecs.length) return { woody: 5, floral: 3, oriental: 4, fresh: 5, gourmand: 2, animalic: 2 };
  const sum = vecs.reduce((acc, v) => {
    RADAR_KEYS.forEach(k => { acc[k] = (acc[k] ?? 0) + v[k]; });
    return acc;
  }, {} as RadarVec);
  RADAR_KEYS.forEach(k => { sum[k] /= vecs.length; });
  return sum;
}

function invertVec(v: RadarVec): RadarVec {
  const inv = {} as RadarVec;
  RADAR_KEYS.forEach(k => { inv[k] = 10 - v[k]; });
  return inv;
}

function buildReason(f: Fragrance, type: 'sister' | 'lateral' | 'stretch', collectionNames: string[]): string {
  const ref = collectionNames[0] ?? 'האוסף שלך';
  const topNotes = f.notes.filter(n => n.type === 'top').slice(0, 2).map(n => n.name).join(' ו-');
  const baseNotes = f.notes.filter(n => n.type === 'base').slice(0, 2).map(n => n.name).join(' ו-');

  if (type === 'sister') {
    return `בדומה ל${ref}, ${f.name} מציע ${topNotes} בפתיחה ו${baseNotes} בבסיס. המשך טבעי וקרוב לה-DNA של האוסף שלך.`;
  }
  if (type === 'lateral') {
    return `${f.name} ממלא פינה שחסרה באוסף — ${f.family.toLowerCase()} שמאזן את הסגנון הקיים ב${ref}. ${f.sillage >= 7 ? 'עוצמה טובה.' : 'עדין ואינטימי.'} `;
  }
  return `${f.name} הוא צעד מחוץ לאזור הנוחות — ${topNotes} בפתיחה ייחודית עם בסיס של ${baseNotes}. מרחיב את הנפש הריחנית שלך מעבר ל${ref}.`;
}

export async function POST(req: NextRequest) {
  try {
    const { collection } = await req.json() as { collection: FragranceInput[]; catalog?: unknown };
    if (!collection?.length) {
      return NextResponse.json({ error: 'Missing collection' }, { status: 400 });
    }

    const collectionIds = new Set(collection.map(c => c.id));
    const collectionNames = collection.map(c => c.name);

    // Get radarProfiles for collection items from our catalog
    const collectionVecs: RadarVec[] = collection
      .map(c => fragrances.find(f => f.id === c.id)?.radarProfile as RadarVec | undefined)
      .filter(Boolean) as RadarVec[];

    const avgProfile = avgVec(collectionVecs);
    const invertedProfile = invertVec(avgProfile);

    const available = fragrances.filter(f => !collectionIds.has(f.id));

    // Sister — most similar to collection avg
    const sister = available
      .map(f => ({ f, sim: cosine(avgProfile, f.radarProfile as RadarVec) }))
      .sort((a, b) => b.sim - a.sim)[0]?.f;

    // Lateral — fills a gap (moderate inverse match)
    const lateral = available
      .filter(f => f.id !== sister?.id)
      .map(f => ({ f, sim: cosine(invertedProfile, f.radarProfile as RadarVec) * 0.5 + cosine(avgProfile, f.radarProfile as RadarVec) * 0.5 }))
      .sort((a, b) => b.sim - a.sim)[0]?.f;

    // Stretch — most different from collection avg (but highly rated)
    const stretch = available
      .filter(f => f.id !== sister?.id && f.id !== lateral?.id && f.rating >= 4.5)
      .map(f => ({ f, sim: 1 - cosine(avgProfile, f.radarProfile as RadarVec) }))
      .sort((a, b) => b.sim - a.sim)[0]?.f;

    const picks = [
      sister  && { f: sister,  type: 'sister'  as const },
      lateral && { f: lateral, type: 'lateral' as const },
      stretch && { f: stretch, type: 'stretch' as const },
    ].filter(Boolean) as { f: Fragrance; type: 'sister' | 'lateral' | 'stretch' }[];

    const recommendations = picks.map(({ f, type }) => ({
      id: f.id,
      name: f.name,
      house: f.house,
      family: f.family,
      reason: buildReason(f, type, collectionNames),
      inCatalog: true,
    }));

    return NextResponse.json({ recommendations });
  } catch (err) {
    console.error('Recommend local error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
