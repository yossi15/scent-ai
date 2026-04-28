/**
 * POST /api/match
 *   body: { fragrance: string }
 *   returns the structured QuickMatch payload (see MatchResponse type below).
 *
 * Conversion-focused single-fragrance flow:
 *   1. AI infers the user's scent profile + personality from one input.
 *   2. Returns 3 visible recommendations (with affiliate links) + 3 premium-locked.
 *   3. Each visible rec is enriched with image + buy URL when found in catalog,
 *      otherwise gets a Google Shopping affiliate fallback.
 */

import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { fragrances, type Fragrance } from '@/data/fragrances';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface MatchProfile {
  scent_type: string;       // "fresh / sweet / woody / spicy / oriental"
  intensity: string;        // "light / medium / strong"
  season: string[];         // ["summer"], ["winter", "fall"], or ["all-season"]
  occasions: string[];      // ["day", "night", "date", "office"]
  style: string;            // "clean / bold / elegant / seductive ..."
}

export interface MatchRecommendation {
  name: string;
  brand: string;
  description: string;        // 1 sentence, premium tone
  match_reason: string;       // 1 sentence, why-it-fits
  price_range: string;        // "₪450–650"
  image_url: string;
  affiliate_link: string;
  in_catalog: boolean;
  catalog_id: number | null;
}

export interface MatchResponse {
  input_fragrance: string;
  profile: MatchProfile;
  insight: string;
  traits: string[];           // 3 short tags rendered on the profile card
  recommendations: MatchRecommendation[];
  premium_recommendations: { name: string; hidden: true }[];
}

const SYSTEM = `אתה Master Perfumer עם 25 שנות ניסיון בבוטיקים יוקרתיים בפריז ולונדון.
לקוח מזכיר בושם אחד שבבעלותו, ואתה — מהבושם הזה לבד — קורא את הטעם, הסגנון ואת מי שהוא רוצה להיות.

אתה ממליץ עם ביטחון של פרפיומר מנוסה: שולף 3 בשמים שמדברים אליו ישירות, לא רשימה גנרית.
דבר במשפטים קצרים, חדים, פרימיום. לא גנרי, לא משעמם, לא מפוצץ.

חוקי פלט:
• description: משפט אחד שמתאר את הבושם המומלץ — טון יוקרתי קצר.
• match_reason: משפט אחד שאומר למה זה מתאים ספציפית לבחירה של הלקוח.
• match_reason חייב להזכיר את הבושם של הלקוח בשם ולהראות חיבור: "גרסה נקייה ומעודנת יותר של ${'<בושם הלקוח>'}".
• price_range: טווח בש"ח כמו "₪450–650".
• Premium recommendations: 3 שמות נוספים יוקרתיים שמתאימים אבל נעולים — שולח פיתוי, לא תשובה.

השב JSON בלבד.`;

function googleShoppingLink(name: string, brand: string): string {
  return `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(`${name} ${brand} perfume`)}`;
}

function fragranticaImageGuess(): string {
  // Generic premium fallback (transparent bottle silhouette is preferable, but
  // we don't bundle one in /public; UI handles missing image gracefully).
  return '';
}

function findInCatalog(name: string, brand: string): Fragrance | undefined {
  const n = name.trim().toLowerCase();
  const b = brand.trim().toLowerCase();
  return fragrances.find(f =>
    f.name.toLowerCase() === n && f.house.toLowerCase() === b
  ) ?? fragrances.find(f =>
    f.name.toLowerCase().includes(n) && f.house.toLowerCase().includes(b)
  );
}

export async function POST(req: NextRequest) {
  try {
    const { fragrance } = (await req.json()) as { fragrance?: string };
    if (!fragrance || !fragrance.trim()) {
      return NextResponse.json({ error: 'Missing fragrance' }, { status: 400 });
    }

    // Pull a small catalog hint so the AI prefers in-stock matches when relevant
    const catalogHint = fragrances
      .slice(0, 60)
      .map(f => `${f.name} (${f.house})`)
      .join(', ');

    const prompt = `הבושם של הלקוח: "${fragrance.trim()}"

מאגר זמין (תן עדיפות אם ההתאמה מעולה — מאפשר לנו להציג מחיר אמיתי):
${catalogHint}

החזר JSON אך ורק במבנה הזה (ללא markdown, ללא טקסט נוסף):
{
  "input_fragrance": "<echo of input>",
  "profile": {
    "scent_type": "<fresh / sweet / woody / spicy / oriental / aromatic / floral / leather / aquatic>",
    "intensity": "<light / medium / strong>",
    "season": ["<summer / winter / spring / fall / all-season>"],
    "occasions": ["<day / night / date / office / casual / formal / sport>"],
    "style": "<one short English label: clean / bold / elegant / seductive / minimalist / classic / playful>"
  },
  "insight": "<משפט אחד בעברית טבעית שמתאר את הטעם של הלקוח, תורגם לסיפור קצר. לדוגמה: 'אתה מחפש בשמים נקיים ומדויקים שעובדים גם ביום וגם לאירוע ערב.'>",
  "traits": ["<3 שמות-תכונה קצרים בעברית, מקסימום מילה אחת או שתיים — לדוגמה 'נקי', 'מעודן', 'יומיומי'>"],
  "recommendations": [
    {
      "name": "<שם לועזי של הבושם>",
      "brand": "<בית בושם>",
      "description": "<משפט אחד פרימיום בעברית — מה הבושם הזה>",
      "match_reason": "<משפט אחד בעברית שמסביר למה זה מתאים לבחירה של הלקוח, מזכיר את שמו>",
      "price_range": "<טווח כמו '₪450–650' או '₪900–1,200'>"
    }
  ],
  "premium_recommendations": [
    { "name": "<שם בושם יוקרתי שיוצג נעול>", "hidden": true }
  ]
}

מבנה: 3 פריטים ב-recommendations, 3 פריטים ב-premium_recommendations.
החזר 3 בדיוק בכל אחד.`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '{}';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in AI response');

    const raw = JSON.parse(jsonMatch[0]) as Omit<MatchResponse, 'recommendations'> & {
      recommendations: Array<Omit<MatchRecommendation, 'image_url' | 'affiliate_link' | 'in_catalog' | 'catalog_id'>>;
    };

    // Enrich each recommendation: image + affiliate link + catalog match
    const recommendations: MatchRecommendation[] = (raw.recommendations ?? []).slice(0, 3).map(rec => {
      const match = findInCatalog(rec.name, rec.brand);
      return {
        name: rec.name,
        brand: rec.brand,
        description: rec.description,
        match_reason: rec.match_reason,
        price_range: match
          ? `₪${match.price.toLocaleString()}`
          : (rec.price_range ?? '—'),
        image_url: match?.image ?? fragranticaImageGuess(),
        affiliate_link: googleShoppingLink(rec.name, rec.brand),
        in_catalog: !!match,
        catalog_id: match?.id ?? null,
      };
    });

    const response: MatchResponse = {
      input_fragrance: fragrance.trim(),
      profile: raw.profile,
      insight: raw.insight,
      traits: (raw.traits ?? []).slice(0, 3),
      recommendations,
      premium_recommendations: (raw.premium_recommendations ?? []).slice(0, 3).map(p => ({
        name: p.name,
        hidden: true,
      })),
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error('Match API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
