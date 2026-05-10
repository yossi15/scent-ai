import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// GET /api/diary → { entries: DiaryRow[] }
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('diary_entries')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ entries: data ?? [] });
}

// POST /api/diary  body: { fragranceId, fragranceName, brand, occasion, longevity, projection, review, date }
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { fragranceId, fragranceName, brand, occasion, longevity, projection, review, date } = body;

  if (!fragranceName || !occasion || !longevity || !projection || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('diary_entries')
    .insert({
      user_id: userId,
      fragrance_id: fragranceId ?? null,
      fragrance_name: fragranceName,
      brand: brand ?? '',
      occasion,
      longevity,
      projection,
      review: review ?? '',
      date,
    })
    .select('id')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}

// DELETE /api/diary?id=UUID
export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const supabase = getSupabase();
  const { error } = await supabase
    .from('diary_entries')
    .delete()
    .eq('id', id)
    .eq('user_id', userId); // security: can only delete own entries

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
