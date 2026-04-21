import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface FragranceInput {
  id: number;
  name: string;
  house: string;
  family: string;
  concentration?: string;
  price?: number;
  tags?: string[];
}

interface CatalogEntry {
  id: number;
  name: string;
  house: string;
  family: string;
}

const SYSTEM = `אתה מומחה בשמים. תמליץ על 3 בשמים מכל בושם שקיים בעולם, לא רק מהמאגר שלנו.
לכל המלצה ציין: שם, בית בושם, משפחת ריח, למה מתאים למשתמש.
אם הבושם קיים במאגר שלנו — ציין "זמין לדגימה".
אם לא — ציין "ניתן לבקש דגימה".`;

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
      .map(f => `- ${f.name} (${f.house}) — ${f.family}${f.tags?.length ? `, תגיות: ${f.tags.join(', ')}` : ''}`)
      .join('\n');

    const catalogList = (catalog ?? [])
      .map(c => `ID:${c.id} | ${c.name} | ${c.house} | ${c.family}`)
      .join('\n');

    const prompt = `האוסף הנוכחי של המשתמש:
${collectionDesc}

המאגר שלנו (זמין לדגימה מיידית):
${catalogList}

בחר 3 בשמים מכל בושם שקיים בעולם שיתאימו הכי טוב ל-DNA הריחני של המשתמש בהתבסס על האוסף. אתה יכול לבחור מהמאגר שלנו או מבשמים אחרים שלא במאגר.

החזר JSON בלבד, ללא markdown:
{"recommendations":[
  {"id":<מספר אם מהמאגר, אחרת null>,"name":"<שם לועזי>","house":"<בית בושם>","family":"<משפחת ריח>","reason":"<2-3 משפטים בעברית שמסבירים למה מתאים ל-DNA ומה חדש שייכניס לאוסף>","inCatalog":<true/false>},
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
