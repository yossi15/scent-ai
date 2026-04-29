import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { sendWaitlistConfirmation } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json() as { email?: string; name?: string };

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Best-effort persist (table may or may not exist - don't block on failure)
    try {
      const supabase = getSupabase();
      await supabase.from('waitlist').insert({ email, name: name ?? null });
    } catch (err) {
      console.warn('Waitlist insert skipped:', err);
    }

    void sendWaitlistConfirmation({ to: email, name: name ?? null });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Waitlist error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
