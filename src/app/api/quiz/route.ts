import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp, rateLimitResponse } from '@/lib/rate-limit';

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
  '3-5h': '3-5 שעות', '6-8h': '6-8 שעות', '10h+': '10+ שעות',
};
const STYLE_MAP: Record<string, string> = {
  classic: 'קלאסי ונצחי', modern: 'מודרני ובולט',
  minimal: 'מינימליסטי', eccentric: 'אקסצנטרי/ייחודי',
};
const BUDGET_MAP: Record<string, string> = {
  under500: 'עד ₪500', '500-1000': '₪500-1000', above1000: 'מעל ₪1000',
};

interface Note { name: string; type: 'top' | 'heart' | 'base' }

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
  notes?: Note[];
  radarProfile: Record<string, number>;
  gender?: string;
  year?: number;
  algoRank?: number;        // pre-ranking position (1 = best match)
  similarityScore?: number; // cosine similarity 0-1
}

interface Answers {
  scentType?: string;
  season?: string;
  occasion?: string;
  longevity?: string;
  style?: string;
  budget?: string;
  previousFragrance?: string;
  gender?: string;
  sillage?: string;
}

const SYSTEM = `אתה Master Perfumer עם 25 שנות ניסיון בבוטיק נישה יוקרתי בפריז ובלונדון -
עבדת עם Roja Dove, Frédéric Malle, ואצל Henry Jacques. הריח הוא שפת האם שלך.

כשלקוח עומד מולך, אתה לא בוחר בושם "פופולרי" - אתה קורא אותו: עור, מזג אוויר, סיפור,
איך הוא רוצה להרגיש, את מה הוא לובש מתחת לבושם. אתה ממליץ כמו שמוזג יין:
לפי האף, לא לפי הרשימה.

חוקי המלצה:
1. דבר על תווים ספציפיים (Pineapple-Birch בפתיחה, Iris פודרי בלב, Ambroxan סטטי בבסיס) -
   לא על "משפחות" כלליות. הזכר 2-3 תווים ממש בכל המלצה.
2. תאר טקסטורה ואינטראקציה עם העור - "פותח חמוץ ויבש, מתפנה לעור רך אחרי שעתיים".
3. הצמד למצב - "לפגישת ערב באוקטובר", "ליום עבודה במשרד ממוזג", "לדייט שני".
4. אל תפחד להמליץ על פחות מוכר - אם בית ניש'ה קטן עונה יותר טוב, זה הבחירה.
5. אם המאגר שלנו מציע התאמה מצוינת - קח משם (זה מאפשר דגימה מיידית).
   אם השוק הרחב מציע משהו טוב יותר - תמליץ עליו ותציין שאפשר לבקש דגימה.
6. כל המלצה: בושם אחד עיקרי + הסבר אישי בעברית טבעית כאילו דיברת מול הלקוח.
7. גוון את ההמלצות - לא 3 בשמים מאותה משפחה.
8. אם הלקוח ציין בושם שאהב - תקרא אותו (האם הוא רומז על שיק קלאסי? gourmand מתחבא?
   חיפוש אחר wow factor?) ותציע לו את "המקבילה הניש'ית" או "הצעד הבא".`;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const limited = checkRateLimit({ key: `quiz:ip:${ip}`, limit: 10, windowMs: 60 * 60 * 1000 });
    if (!limited.ok) return rateLimitResponse(limited.resetAt);

    const {
      answers,
      candidates,
      tasteVector,
      sigNotes,
      dislikes,
    } = await req.json() as {
      answers: Answers;
      candidates: Candidate[];
      tasteVector: Record<string, number> | null;
      sigNotes: string[];
      dislikes: string[];
    };

    // Rich catalog summary — candidates arrive pre-sorted by algo rank (1 = best match)
    const catalogList = (candidates ?? [])
      .map(f => {
        const top   = f.notes?.filter(n => n.type === 'top').map(n => n.name).slice(0, 3).join(', ') ?? '';
        const heart = f.notes?.filter(n => n.type === 'heart').map(n => n.name).slice(0, 3).join(', ') ?? '';
        const base  = f.notes?.filter(n => n.type === 'base').map(n => n.name).slice(0, 3).join(', ') ?? '';
        const rank  = f.algoRank != null ? `[#${f.algoRank}] ` : '';
        const sim   = f.similarityScore != null ? ` | match: ${Math.round(f.similarityScore * 100)}%` : '';
        return `${rank}ID:${f.id} | ${f.name} (${f.house}, ${f.year ?? '-'}) | ${f.family} | ${f.gender ?? 'Unisex'} | ` +
               `עמידות ${f.longevity}/10, הקרנה ${f.sillage}/10 | ₪${f.price.toLocaleString()}${sim} | ` +
               `top: ${top} | heart: ${heart} | base: ${base}`;
      })
      .join('\n');

    // Taste-vector radar summary (top 3 dominant axes)
    const radarSummary = tasteVector
      ? Object.entries(tasteVector)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([k, v]) => `${k} ${v.toFixed(1)}/10`)
          .join(', ')
      : null;

    // Dislikes in Hebrew labels
    const DISLIKE_HE: Record<string, string> = {
      sweet: 'מתוק/גורמה', oud: 'עוד/קטרן', smoky: 'מעושן/טבק',
      fresh: 'ים/אוזון', floral: 'פרחוני כבד', detergent: 'סבוני/מוסק',
      animalic: 'אנימאלי', powdery: 'פודרי/טאלק',
    };
    const dislikeHe = (dislikes ?? []).map(d => DISLIKE_HE[d] ?? d).join(', ');

    const profile = `פרופיל הלקוח:
• סוג ריח שמושך: ${SCENT_MAP[answers.scentType ?? ''] ?? answers.scentType ?? '-'}
• עונה דומיננטית: ${SEASON_MAP[answers.season ?? ''] ?? '-'}
• אירוע מרכזי: ${OCCASION_MAP[answers.occasion ?? ''] ?? answers.occasion ?? '-'}
• עמידות רצויה: ${LONGEVITY_MAP[answers.longevity ?? ''] ?? '-'}
• סגנון אישי: ${STYLE_MAP[answers.style ?? ''] ?? '-'}
• תקציב לבקבוק מלא: ${BUDGET_MAP[answers.budget ?? ''] ?? '-'}${answers.gender ? `\n• כיוון מגדרי: ${answers.gender}` : ''}${answers.sillage ? `\n• הקרנה: ${answers.sillage}` : ''}${answers.previousFragrance ? `\n• בשמים שאוהב/לובש: ${answers.previousFragrance}` : ''}${radarSummary ? `\n• פרופיל ריחי (מהאוסף): ${radarSummary}` : ''}${sigNotes?.length ? `\n• תווים חוזרים באוסף: ${sigNotes.slice(0, 6).join(', ')}` : ''}${dislikeHe ? `\n• אסורים — מה לא לכלול: ${dislikeHe}` : ''}`;

    const prompt = `${profile}

המאגר הזמין שלנו — ממוין לפי רלוונטיות אלגוריתמית (#1 = הכי דומה לטעם הלקוח):
${catalogList}

המשימה:
בחר 5 בשמים. תן עדיפות לבשמים עם מספר #rank נמוך (אלה כבר סוננו ודורגו לפי פרופיל הלקוח).
אם מישהו מה-top-10 אלגוריתמי עונה מצוין — העדף אותו על פני בושם חיצוני מפורסם.
אם קיים בושם חיצוני שמתאים הרבה יותר — תמליץ עליו ותציין שאין לו ID במאגר.

תוודא שהחמישייה מגוונת (משפחה/עוצמה/אנרגיה - לא 5 גרסאות של אותו דבר).
לכל בושם, ה-reason חייב לכלול:
  (א) 2-3 תווים ספציפיים שיורגשו על העור
  (ב) פתיחה → מעבר → יבשה (איך הוא מתפתח)
  (ג) מתי/איפה/עם מי ללבוש אותו
  (ד) קישור אישי לפרופיל הלקוח (לא גנרי)${dislikeHe ? `\n  (ה) ודא שאין בבושם: ${dislikeHe}` : ''}

החזר JSON בלבד, ללא markdown, ללא טקסט מלפני/אחרי:
{"recommendations":[
  {"id":<מספר אם מהמאגר, אחרת null>,"name":"<שם לועזי>","house":"<בית בושם>","family":"<משפחת ריח באנגלית>","reason":"<3-4 משפטים בעברית טבעית כמו פרפיומר שמדבר ללקוח, עם תווים ספציפיים>","inCatalog":<true/false>}
]}`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2500,
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
