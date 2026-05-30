import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp, rateLimitResponse } from '@/lib/rate-limit';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `אתה Master Perfumer עם 25 שנות ניסיון בבוטיק נישה יוקרתי.
עבדת עם Roja Dove, Frédéric Malle, ואצל Henry Jacques.

כשלקוח עומד מולך, אתה לא בוחר בושם "פופולרי" - אתה קורא אותו:
עור, מזג אוויר, סיפור, איך הוא רוצה להרגיש.

חוקי המלצה:
1. דבר על תווים ספציפיים (2-3 תווים אמיתיים בכל המלצה).
2. תאר טקסטורה ואינטראקציה עם העור.
3. הצמד למצב - מתי/איפה/עם מי ללבוש.
4. ה-why_text חייב להתייחס לתשובות הספציפיות של המשתמש ולאוסף שלו.
5. גוון את 10 ההמלצות - לא בשמים מאותה משפחה.

החזר JSON בלבד, ללא markdown:
{
  "profile_summary": "תיאור קצר של הפרופיל (3-5 מילים, עברית, למשל: אספן ניחוחות חמים)",
  "dna_bars": [
    {"label": "שם תו/משפחה בעברית", "value": 0-100}
  ],
  "recommendations": [
    {
      "fragrance_id": <מספר אם מהמאגר, אחרת null>,
      "name": "<שם לועזי>",
      "house": "<בית בושם>",
      "family": "<משפחת ריח באנגלית>",
      "match_score": <מספר 70-99>,
      "why_text": "<2-3 משפטים בעברית טבעית, עם תווים ספציפיים>",
      "in_catalog": <true/false>
    }
  ]
}

profile_summary: ביטוי קצר שמתאר את הפרופיל הריחני הכולל.
dna_bars: 4-5 bars שמייצגים את ה-DNA הריחני (הציר הדומיננטי קודם).
recommendations: בדיוק 10 בשמים, match_score יורד (הראשון הכי גבוה).`;

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
  notes?: { name: string; type: 'top' | 'heart' | 'base' }[];
  radarProfile: Record<string, number>;
  gender?: string;
  year?: number;
  algoRank?: number;
  similarityScore?: number;
}

interface Answers {
  scentType?: string;
  lovedNotes?: string;
  avoidedNotes?: string;
  occasions?: string;
  season?: string;
  projection?: string;
  longevity?: string;
  budget?: string;
  previousFragrance?: string;
  gender?: string;
  sillage?: string;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const limited = checkRateLimit({ key: `quiz-recommend:ip:${ip}`, limit: 10, windowMs: 60 * 60 * 1000 });
    if (!limited.ok) return rateLimitResponse(limited.resetAt);

    const { answers, candidates, tasteVector, sigNotes, dislikes = [] } =
      await req.json() as {
        answers: Answers;
        candidates: Candidate[];
        tasteVector: Record<string, number> | null;
        sigNotes: string[];
        dislikes: string[];
      };

    const catalogList = (candidates ?? []).slice(0, 30).map(f => {
      const top   = f.notes?.filter(n => n.type === 'top').map(n => n.name).slice(0, 3).join(', ') ?? '';
      const heart = f.notes?.filter(n => n.type === 'heart').map(n => n.name).slice(0, 3).join(', ') ?? '';
      const base  = f.notes?.filter(n => n.type === 'base').map(n => n.name).slice(0, 3).join(', ') ?? '';
      const rank  = f.algoRank != null ? `[#${f.algoRank}] ` : '';
      const sim   = f.similarityScore != null ? ` | match: ${Math.round(f.similarityScore * 100)}%` : '';
      return `${rank}ID:${f.id} | ${f.name} (${f.house}, ${f.year ?? '-'}) | ${f.family} | ` +
             `עמידות ${f.longevity}/10, הקרנה ${f.sillage}/10 | ₪${f.price.toLocaleString()}${sim} | ` +
             `top: ${top} | heart: ${heart} | base: ${base}`;
    }).join('\n');

    const radarSummary = tasteVector
      ? Object.entries(tasteVector).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, v]) => `${k} ${v.toFixed(1)}/10`).join(', ')
      : null;

    const profile = `פרופיל לקוח:
• כיוון ריחני: ${answers.scentType ?? '-'}
• תווים אהובים: ${answers.lovedNotes ?? '-'}
• תווים להימנע: ${answers.avoidedNotes ?? dislikes.join(', ') ?? '-'}
• רגעי שימוש: ${answers.occasions ?? '-'}
• עונות: ${answers.season ?? '-'}
• עוצמת נוכחות: ${answers.projection ?? answers.sillage ?? '-'}
• עמידות: ${answers.longevity ?? '-'}
• תקציב: ${answers.budget ?? '-'}
• בשמים שאוהב: ${answers.previousFragrance ?? '-'}${radarSummary ? `\n• פרופיל ריחי מהאוסף: ${radarSummary}` : ''}${sigNotes?.length ? `\n• תווים חוזרים באוסף: ${sigNotes.slice(0, 6).join(', ')}` : ''}`;

    const prompt = `${profile}

המאגר הזמין (ממוין לפי רלוונטיות, #1 = הכי מתאים):
${catalogList}

המשימה: בחר בדיוק 10 בשמים מגוונים.
- תן עדיפות לבשמים עם rank נמוך (#1-#10).
- ה-match_score של ההמלצה הראשונה יהיה 90-99, האחרונה 70-80.
- match_score יורד בהדרגה (לא קפיצות גדולות).
- כל why_text: 2-3 משפטים עם תווים ספציפיים + מתי/איפה ללבוש + קישור לפרופיל האישי.

החזר JSON בלבד.`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3500,
      system: SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '{}';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const data = JSON.parse(jsonMatch[0]) as {
      profile_summary: string;
      dna_bars: { label: string; value: number }[];
      recommendations: {
        fragrance_id: number | null;
        name: string; house: string; family: string;
        match_score: number; why_text: string; in_catalog: boolean;
      }[];
    };

    // Verify catalog IDs
    const catalogById  = new Map((candidates ?? []).map(c => [c.id, c]));
    const catalogByName = new Map((candidates ?? []).map(c => [c.name.toLowerCase().trim(), c]));

    const recs = (data.recommendations ?? []).map(rec => {
      const match = rec.fragrance_id != null
        ? (catalogById.get(rec.fragrance_id) ?? catalogByName.get(rec.name.toLowerCase().trim()))
        : catalogByName.get(rec.name.toLowerCase().trim());
      return {
        id: match?.id ?? null,
        name: rec.name,
        house: match?.house ?? rec.house,
        family: match?.family ?? rec.family,
        match_score: Math.min(99, Math.max(50, rec.match_score ?? 80)),
        why_text: rec.why_text,
        in_catalog: !!match,
      };
    });

    return NextResponse.json({
      profile_summary: data.profile_summary ?? 'פרופיל ריחי ייחודי',
      dna_bars:        data.dna_bars ?? [],
      recommendations: recs,
    });
  } catch (err) {
    console.error('[quiz/recommend] error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
