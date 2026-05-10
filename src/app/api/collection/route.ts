import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// GET /api/collection → { ids: number[] }
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('user_collection')
    .select('fragrance_id')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ids: (data ?? []).map(r => r.fragrance_id as number) });
}

// POST /api/collection  body: { fragranceId, name, house }
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { fragranceId, name, house } = await req.json();
  if (!fragranceId) return NextResponse.json({ error: 'Missing fragranceId' }, { status: 400 });

  const supabase = getSupabase();
  const { error } = await supabase
    .from('user_collection')
    .upsert(
      { user_id: userId, fragrance_id: fragranceId, fragrance_name: name, brand: house },
      { onConflict: 'user_id,fragrance_id' }
    );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// DELETE /api/collection?fragranceId=X
export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const fragranceId = Number(req.nextUrl.searchParams.get('fragranceId'));
  if (!fragranceId) return NextResponse.json({ error: 'Missing fragranceId' }, { status: 400 });

  const supabase = getSupabase();
  const { error } = await supabase
    .from('user_collection')
    .delete()
    .eq('user_id', userId)
    .eq('fragrance_id', fragranceId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
