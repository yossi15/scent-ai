import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface Note { name: string; type: 'top' | 'heart' | 'base' }

interface FragranceInput {
  id: number;
  name: string;
  house: string;
  family: string;
  concentration?: string;
  price?: number;
  tags?: string[];
  notes?: Note[];
  longevity?: number;
  sillage?: number;
  year?: number;
  gender?: string;
}

interface CatalogEntry {
  id: number;
  name: string;
  house: string;
  family: string;
  notes?: Note[];
  year?: number;
  gender?: string;
  longevity?: number;
  sillage?: number;
}

const SYSTEM = `אתה Master Perfumer עם 25 שנות ניסיון בבוטיק נישה יוקרתי בפריז ובלונדון -
עבדת עם Roja Dove, Frédéric Malle, ואצל Henry Jacques. אתה לא מצטט רשימות -
אתה מריח את האוסף של הלקוח ושומע את הסיפור שמסתתר מאחוריו.

לפני שאתה ממליץ, אתה ממפה את ה-DNA של האוסף:
• מה החוט המשותף? (סגנון? תקופה? עוצמה? תווי בסיס חוזרים?)
• איפה החללים? (אין floral נשי? אין משהו לקיץ? תמיד חזק?)
• האם יש "תפר אישי" - חיבה ל-Iris? לעור עשן? לתווים imaginary של MFK?

ההמלצות שלך עוקבות אחרי שלוש פילוסופיות:
1. **Sister fragrance** - קרוב למה שיש, אבל מעדן/משדרג זווית אחת.
2. **Lateral move** - ממלא חלל באוסף (אם הכל יבש וכבד, תציע משהו חיוני; אם הכל
   מודרני, תציע קלאסיקה).
3. **Stretch pick** - צעד אחד מחוץ לאזור הנוחות. בושם שיגדיל את הנפש הריחנית.

חוקים:
• דבר על תווים ספציפיים. לא "פרחוני" אלא "Iris פודרי על Cashmeran חמים".
• הסבר בדיוק איך זה מתחבר לאוסף הקיים - קרא אותו בשם.
• כל המלצה: בעברית טבעית, 3-4 משפטים, כמו פרפיומר שמדבר מול לקוח.
• עדיפות לבשמים מהמאגר שלנו (זמינים לדגימה מיידית) אם ההתאמה דומה.`;

export async function POST(req: NextRequest) {
  try {
    const { collection, catalog } = await req.json() as {
      collection: FragranceInput[];
      catalog?: CatalogEntry[];
    };

    if (!collection?.length) {
      return NextResponse.json({ error: 'Missing collection' }, { status: 400 });
    }

    const collectionDesc = collection
      .map(f => {
        const top = f.notes?.filter(n => n.type === 'top').map(n => n.name).slice(0, 3).join(', ') ?? '';
        const heart = f.notes?.filter(n => n.type === 'heart').map(n => n.name).slice(0, 3).join(', ') ?? '';
        const base = f.notes?.filter(n => n.type === 'base').map(n => n.name).slice(0, 3).join(', ') ?? '';
        return `• ${f.name} - ${f.house} (${f.year ?? '-'}) | ${f.family} | ${f.gender ?? 'Unisex'} | ` +
               `עמידות ${f.longevity ?? '-'}/10, הקרנה ${f.sillage ?? '-'}/10` +
               (top || heart || base ? `\n   top: ${top} | heart: ${heart} | base: ${base}` : '');
      })
      .join('\n');

    const catalogList = (catalog ?? [])
      .slice(0, 30)
      .map(c => {
        const top = c.notes?.filter(n => n.type === 'top').map(n => n.name).slice(0, 3).join(', ') ?? '';
        const heart = c.notes?.filter(n => n.type === 'heart').map(n => n.name).slice(0, 3).join(', ') ?? '';
        const base = c.notes?.filter(n => n.type === 'base').map(n => n.name).slice(0, 3).join(', ') ?? '';
        return `ID:${c.id} | ${c.name} (${c.house}) | ${c.family} | top: ${top} | heart: ${heart} | base: ${base}`;
      })
      .join('\n');

    const prompt = `האוסף של הלקוח (קרא את ה-DNA שלו לפני שאתה ממליץ):
${collectionDesc}

המאגר שלנו (תן עדיפות לאלה אם ההתאמה דומה - זמין לדגימה מיידית):
${catalogList}

המשימה: 3 בשמים. אחד "Sister" (קרוב לאוסף), אחד "Lateral" (ממלא חלל), אחד "Stretch" (מתח את הטעם בעדינות).
ה-reason חייב:
  (א) לקרוא את ה-DNA שאתה זיהית באוסף בשם (שם בושם ספציפי)
  (ב) להסביר איך הבושם המומלץ מתחבר/מרחיב/משלים את ה-DNA הזה
  (ג) להזכיר 2-3 תווים ספציפיים שיורגשו על העור
  (ד) "כשללבוש" - מצב/מזג אוויר/אנרגיה

החזר JSON בלבד, ללא markdown:
{"recommendations":[
  {"id":<מספר אם מהמאגר, אחרת null>,"name":"<שם לועזי>","house":"<בית בושם>","family":"<משפחה באנגלית>","reason":"<3-4 משפטים בעברית טבעית כמו פרפיומר>","inCatalog":<true/false>}
]}`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '{}';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const data = JSON.parse(jsonMatch[0]) as { recommendations: Array<{
      id: number | null; name: string; house: string; family: string; reason: string; inCatalog: boolean;
    }> };

    const catalogById = new Map((catalog ?? []).map(c => [c.id, c]));
    const catalogByName = new Map((catalog ?? []).map(c => [c.name.toLowerCase().trim(), c]));

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
    console.error('Recommend API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
