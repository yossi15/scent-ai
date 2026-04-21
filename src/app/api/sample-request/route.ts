import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email, name, fragrance_name, brand } = await req.json() as {
      email?: string; name?: string; fragrance_name?: string; brand?: string;
    };

    if (!email || !fragrance_name) {
      return NextResponse.json({ error: 'Missing email or fragrance' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const supabase = getSupabase();
    const { error } = await supabase.from('sample_requests').insert({
      email,
      name: name ?? null,
      fragrance_name,
      brand: brand ?? null,
    });

    if (error) {
      console.error('Sample request insert error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Sample request error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
