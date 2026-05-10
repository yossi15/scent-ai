import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { sendSampleConfirmation } from '@/lib/email';
import { checkRateLimit, getClientIp, rateLimitResponse } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const ipLimit = checkRateLimit({ key: `sample-request:ip:${ip}`, limit: 8, windowMs: 60 * 60 * 1000 });
    if (!ipLimit.ok) return rateLimitResponse(ipLimit.resetAt);

    const { email, name, fragrance_name, brand, website } = await req.json() as {
      email?: string; name?: string; fragrance_name?: string; brand?: string; website?: string;
    };

    // Honeypot for simple form bots. Real clients should never send this field.
    if (website) return NextResponse.json({ ok: true });

    if (!email || !fragrance_name) {
      return NextResponse.json({ error: 'Missing email or fragrance' }, { status: 400 });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const emailLimit = checkRateLimit({
      key: `sample-request:email:${normalizedEmail}`,
      limit: 3,
      windowMs: 24 * 60 * 60 * 1000,
    });
    if (!emailLimit.ok) return rateLimitResponse(emailLimit.resetAt);

    const fragranceName = fragrance_name.trim().slice(0, 160);
    const safeName = name?.trim().slice(0, 120) || null;
    const safeBrand = brand?.trim().slice(0, 120) || null;

    const supabase = getSupabase();
    const { error } = await supabase.from('sample_requests').insert({
      email: normalizedEmail,
      name: safeName,
      fragrance_name: fragranceName,
      brand: safeBrand,
    });

    if (error) {
      console.error('Sample request insert error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Fire-and-forget email confirmation (don't fail the request if email fails)
    void sendSampleConfirmation({
      to: normalizedEmail,
      name: safeName,
      fragranceName,
      brand: safeBrand,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Sample request error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
