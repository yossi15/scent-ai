/**
 * POST /api/quiz
 * Local scoring algorithm — no external API required.
 * Scores every fragrance against the user's quiz answers and returns top 3.
 */
import { NextRequest, NextResponse } from 'next/server';
import { fragrances, type Fragrance } from '@/data/fragrances';

interface Answers {
  scentType?: string;   // woody | floral | fresh | gourmand | oriental
  season?: string;      // spring | summer | fall | winter
  occasion?: string;    // business | evening | daily | romantic
  longevity?: string;   // 3-5h | 6-8h | 10h+
  style?: string;       // classic | modern | minimal | eccentric
  budget?: string;      // under500 | 500-1000 | above1000
  previousFragrance?: string;
  gender?: string;
}

const RADAR_KEYS = ['woody', 'floral', 'oriental', 'fresh', 'gourmand', 'animalic'] as const;
type RadarKey = typeof RADAR_KEYS[number];

// ── Scoring ────────────────────────────────────────────────────────────────────
function score(f: Fragrance, answers: Answers): number {
  let pts = 0;
  const r = f.radarProfile;

  // 1. Primary scent type (0–50)
  const scentMap: Record<string, RadarKey> = {
    woody: 'woody', floral: 'floral', fresh: 'fresh',
    gourmand: 'gourmand', oriental: 'oriental',
  };
  const pk = scentMap[answers.scentType ?? ''];
  if (pk) pts += r[pk] * 5;

  // 2. Season fit (0–20)
  if (answers.season === 'summer' && r.fresh >= 6) pts += 20;
  if (answers.season === 'winter' && (r.oriental >= 6 || r.gourmand >= 5)) pts += 20;
  if (answers.season === 'spring' && (r.fresh >= 4 || r.floral >= 5)) pts += 20;
  if (answers.season === 'fall'   && (r.woody >= 5  || r.oriental >= 4)) pts += 20;

  // 3. Occasion fit (0–20)
  if (answers.occasion === 'business' && f.sillage <= 7 && f.longevity >= 5) pts += 20;
  if (answers.occasion === 'evening'  && f.sillage >= 7 && r.oriental >= 5)  pts += 20;
  if (answers.occasion === 'daily'    && f.sillage <= 7)                      pts += 20;
  if (answers.occasion === 'romantic' && (r.floral >= 5 || r.oriental >= 6))  pts += 20;

  // 4. Longevity fit (0–20)
  if (answers.longevity === '3-5h'  && f.longevity <= 5)                      pts += 20;
  if (answers.longevity === '6-8h'  && f.longevity >= 6 && f.longevity <= 8)  pts += 20;
  if (answers.longevity === '10h+'  && f.longevity >= 9)                      pts += 20;

  // 5. Budget (0–30)
  if (answers.budget === 'under500'  && f.price < 500)                        pts += 30;
  if (answers.budget === '500-1000'  && f.price >= 500 && f.price <= 1000)    pts += 30;
  if (answers.budget === 'above1000' && f.price > 1000)                       pts += 30;

  // 6. Gender (0–15)
  if (!answers.gender || answers.gender === 'any') pts += 10;
  else if (f.gender.toLowerCase() === answers.gender.toLowerCase()) pts += 15;
  else if (f.gender.toLowerCase() === 'unisex') pts += 8;

  // 7. Rating bonus (0–10)
  pts += (f.rating - 3.5) * 8;

  return pts;
}

// ── Reason generator (template-based Hebrew) ───────────────────────────────────
function buildReason(f: Fragrance, answers: Answers): string {
  const topNotes = f.notes.filter(n => n.type === 'top').slice(0, 2).map(n => n.name);
  const baseNotes = f.notes.filter(n => n.type === 'base').slice(0, 2).map(n => n.name);
  const r = f.radarProfile;

  const dominant = (RADAR_KEYS as readonly string[])
    .map(k => ({ k, v: r[k as RadarKey] }))
    .sort((a, b) => b.v - a.v)[0].k;

  const characterMap: Record<string, string> = {
    woody: 'עצי ועמוק', floral: 'פרחוני ועדין', oriental: 'מזרחי ומחמם',
    fresh: 'טרי ומרענן', gourmand: 'מתוק ועוטף', animalic: 'חייתי ועורני',
  };

  const longevityText = f.longevity >= 9 ? 'חזיקה מצוינת — כל היום על העור' :
                        f.longevity >= 7 ? `חזיקה טובה של ${f.longevity}-${f.longevity + 1} שעות` :
                        `ריח קצר ואינטימי, כ-${f.longevity} שעות`;

  const occasionText = answers.occasion === 'evening'  ? 'מושלם לאירועי ערב' :
                       answers.occasion === 'business' ? 'מתאים ליום עבודה ופגישות' :
                       answers.occasion === 'romantic' ? 'עובד מצוין לדייטים' :
                       'רב-שימוש ויומיומי';

  const opening = topNotes.length
    ? `פותח עם ${topNotes.join(' ו-')}`
    : `בושם ${characterMap[dominant] ?? dominant}`;

  const closing = baseNotes.length
    ? `ומגיע לבסיס של ${baseNotes.join(' ו-')}`
    : 'עם בסיס חם שנשאר על העור';

  return `${opening}, ${closing}. ${longevityText}. ${occasionText} — ${f.sillage >= 8 ? 'הקרנה חזקה שנוכחת בכל חדר' : f.sillage >= 6 ? 'הקרנה מתונה ומאוזנת' : 'ריח אינטימי ואישי'}.`;
}

// ── Route ──────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { answers: Answers; candidates?: unknown[] };
    const answers: Answers = body.answers ?? {};

    // Score all fragrances and pick top 3 (diverse family selection)
    const scored = fragrances
      .map(f => ({ f, pts: score(f, answers) }))
      .sort((a, b) => b.pts - a.pts);

    // Pick top 3 ensuring family diversity
    const chosen: Fragrance[] = [];
    const usedFamilies = new Set<string>();
    for (const { f } of scored) {
      const familyBase = f.family.split(' ')[0];
      if (!usedFamilies.has(familyBase)) {
        chosen.push(f);
        usedFamilies.add(familyBase);
      }
      if (chosen.length === 3) break;
    }
    // Fallback: fill with top scorers if not enough diversity
    if (chosen.length < 3) {
      for (const { f } of scored) {
        if (!chosen.find(c => c.id === f.id)) chosen.push(f);
        if (chosen.length === 3) break;
      }
    }

    const recommendations = chosen.map(f => ({
      id: f.id,
      name: f.name,
      house: f.house,
      family: f.family,
      reason: buildReason(f, answers),
      inCatalog: true,
    }));

    return NextResponse.json({ recommendations });
  } catch (err) {
    console.error('Quiz local error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
