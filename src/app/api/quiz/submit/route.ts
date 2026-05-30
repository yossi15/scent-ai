import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      answers: Record<string, unknown>;
      email?: string;
      marketingConsent?: boolean;
    };

    // Save to Supabase when available; skip gracefully in dev
    try {
      const { getSupabase } = await import('@/lib/supabase');
      const sb = getSupabase();

      const { data: qr } = await sb
        .from('quiz_responses')
        .insert({ answers: body.answers, email: body.email ?? null })
        .select('id')
        .single();

      if (body.email && qr) {
        await sb.from('email_subscribers').upsert(
          { email: body.email, source: 'quiz_gate', marketing_consent: body.marketingConsent ?? false },
          { onConflict: 'email' }
        );
      }
    } catch {
      // Supabase not configured — continue
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[quiz/submit] error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
