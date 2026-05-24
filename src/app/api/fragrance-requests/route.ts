import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getSupabase } from '@/lib/supabase';
import { checkRateLimit, getClientIp, rateLimitResponse } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    /* ── Rate limit: 5 requests per hour per IP ───────────────── */
    const ip = getClientIp(req);
    const limited = checkRateLimit({
      key: `frag-req:ip:${ip}`,
      limit: 5,
      windowMs: 60 * 60 * 1000,
    });
    if (!limited.ok) return rateLimitResponse(limited.resetAt);

    /* ── Parse body ───────────────────────────────────────────── */
    const body = await req.json() as { query_text?: string };
    const query_text = body.query_text?.trim();

    if (!query_text || query_text.length < 2) {
      return NextResponse.json(
        { error: 'query_text is required (min 2 chars)' },
        { status: 400 },
      );
    }
    if (query_text.length > 500) {
      return NextResponse.json(
        { error: 'query_text too long (max 500 chars)' },
        { status: 400 },
      );
    }

    /* ── Clerk user (optional — anonymous requests allowed) ───── */
    let user_id: string | null = null;
    try {
      const session = await auth();
      user_id = session.userId ?? null;
    } catch {
      // Clerk not configured or not signed in — allow anonymous
    }

    /* ── Insert into Supabase ─────────────────────────────────── */
    const supabase = getSupabase();
    const { error } = await supabase
      .from('fragrance_requests')
      .insert({ query_text, user_id });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'db_error' }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('fragrance-requests route error:', err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
