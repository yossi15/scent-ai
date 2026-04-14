import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface FragranceInput {
  id: number;
  name: string;
  house: string;
  family: string;
  concentration: string;
  price: number;
  rating: number;
  longevity: number;
  sillage: number;
  tags: string[];
  notes: { name: string; type: string }[];
  radarProfile: {
    woody: number;
    floral: number;
    oriental: number;
    fresh: number;
    gourmand: number;
    animalic: number;
  };
}

export async function POST(req: NextRequest) {
  const { collection, candidate } = await req.json() as {
    collection: FragranceInput[];
    candidate: FragranceInput;
  };

  if (!collection?.length || !candidate) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  const collectionDesc = collection
    .map(f => `- ${f.name} (${f.house}) — ${f.family}, תגיות: ${f.tags.join(', ')}`)
    .join('\n');

  const prompt = `אתה מומחה בשמים עם ידע עמוק בתרבות הניש.

האוסף הנוכחי של המשתמש:
${collectionDesc}

הבושם המומלץ לנסות הבא: ${candidate.name} של ${candidate.house} (${candidate.family}, ${candidate.concentration}, ₪${candidate.price.toLocaleString()})

כתוב המלצה אישית בעברית — 2-3 משפטים בלבד — שמסבירים:
1. למה הבושם הזה מתאים ל-DNA הריחני של המשתמש בהתבסס על האוסף שלו
2. מה חדש וייחודי שהוא יכניס לאוסף

כתוב בסגנון מקצועי אך חם, כמו מומחה בושם שמדבר ישירות ללקוח.
החזר רק את הטקסט, בלי כותרות או נקודות.`;

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 256,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '';
  return NextResponse.json({ reasoning: text });
}
