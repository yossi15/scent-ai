import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SCENT_MAP: Record<string, string> = {
  woody: 'יערי/עצי', floral: 'פרחוני', fresh: 'הדרי/טרי',
  gourmand: 'מתוק/גורמה', oriental: 'מזרחי/עשן',
};
const SEASON_MAP: Record<string, string> = {
  spring: 'אביב', summer: 'קיץ', fall: 'סתיו', winter: 'חורף',
};
const OCCASION_MAP: Record<string, string> = {
  business: 'עסקי', evening: 'ערב', daily: 'יומיומי', romantic: 'רומנטי',
};
const LONGEVITY_MAP: Record<string, string> = {
  '3-5h': '3–5 שעות', '6-8h': '6–8 שעות', '10h+': '10+ שעות',
};
const STYLE_MAP: Record<string, string> = {
  classic: 'קלאסי ונצחי', modern: 'מודרני ובולט',
  minimal: 'מינימליסטי', eccentric: 'אקסצנטרי/ייחודי',
};
const BUDGET_MAP: Record<string, string> = {
  under500: 'עד ₪500', '500-1000': '₪500–1000', above1000: 'מעל ₪1000',
};

interface Candidate {
  id: number;
  name: string;
  house: string;
  family: string;
  price: number;
  concentration: string;
  tags: string[];
  longevity: number;
  sillage: number;
  radarProfile: Record<string, number>;
}

interface Answers {
  scentType?: string;
  season?: string;
  occasion?: string;
  longevity?: string;
  style?: string;
  budget?: string;
  previousFragrance?: string;
}

const SYSTEM = `אתה מומחה בשמים. תמליץ על 3 בשמים מכל בושם שקיים בעולם, לא רק מהמאגר שלנו.
לכל המלצה ציין: שם, בית בושם, משפחת ריח, למה מתאים למשתמש.
אם הבושם קיים במאגר שלנו — ציין "זמין לדגימה".
אם לא — ציין "ניתן לבקש דגימה".`;

export async function POST(req: NextRequest) {
  try {
    const { answers, candidates } = await req.json() as { answers: Answers; candidates: Candidate[] };

    const catalogList = (candidates ?? [])
      .map(f => `ID:${f.id} | ${f.name} | ${f.house} | ${f.family} | ₪${f.price.toLocaleString()}`)
      .join('\n');

    const prompt = `פרופיל המשתמש:
• סוג ריח מועדף: ${SCENT_MAP[answers.scentType ?? ''] ?? answers.scentType ?? 'לא צוין'}
• עונה עיקרית: ${SEASON_MAP[answers.season ?? ''] ?? answers.season ?? 'לא צוין'}
• אירוע: ${OCCASION_MAP[answers.occasion ?? ''] ?? answers.occasion ?? 'לא צוין'}
• עמידות: ${LONGEVITY_MAP[answers.longevity ?? ''] ?? answers.longevity ?? 'לא צוין'}
• סגנון: ${STYLE_MAP[answers.style ?? ''] ?? answers.style ?? 'לא צוין'}
• תקציב: ${BUDGET_MAP[answers.budget ?? ''] ?? answers.budget ?? 'לא צוין'}
${answers.previousFragrance ? `• בושם שאהב בעבר: ${answers.previousFragrance}` : ''}

המאגר שלנו (זמין לדגימה מיידית):
${catalogList}

בחר 3 בשמים מכל בושם שקיים בעולם שמתאימים הכי טוב לפרופיל הזה. אתה יכול לבחור מהמאגר שלנו או מבשמים אחרים שאינם במאגר.

החזר JSON בלבד, ללא markdown:
{"recommendations":[
  {"id":<מספר אם מהמאגר, אחרת null>,"name":"<שם לועזי>","house":"<בית בושם>","family":"<משפחת ריח>","reason":"<2 משפטים בעברית למה מתאים>","inCatalog":<true/false>},
  ...
]}`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 900,
      system: SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '{}';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const data = JSON.parse(jsonMatch[0]) as { recommendations: Array<{
      id: number | null; name: string; house: string; family: string; reason: string; inCatalog: boolean;
    }> };

    // Server-side verification: match by ID first, then name (case-insensitive)
    const catalogById = new Map((candidates ?? []).map(c => [c.id, c]));
    const catalogByName = new Map((candidates ?? []).map(c => [c.name.toLowerCase().trim(), c]));

    const recs = (data.recommendations ?? []).map(rec => {
      let match = rec.id != null ? catalogById.get(rec.id) : undefined;
      if (!match) match = catalogByName.get(rec.name.toLowerCase().trim());
      return {
        id: match?.id ?? null,
        name: rec.name,
        house: match?.house ?? rec.house,
        family: match?.family ?? rec.family,
        reason: rec.reason,
        inCatalog: !!match,
      };
    });

    return NextResponse.json({ recommendations: recs });
  } catch (err) {
    console.error('Quiz API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
