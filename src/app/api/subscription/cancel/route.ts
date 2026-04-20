import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { getStripe } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/subscription/cancel
//   body: { resume?: boolean }
//   → toggles cancel_at_period_end on the user's Stripe subscription
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const resume = Boolean(body?.resume);

  const supabase = getSupabase();
  const { data: row, error: dbErr } = await supabase
    .from('user_subscriptions')
    .select('stripe_subscription_id')
    .eq('user_id', userId)
    .maybeSingle();

  if (dbErr) return NextResponse.json({ error: dbErr.message }, { status: 500 });
  if (!row?.stripe_subscription_id) {
    return NextResponse.json({ error: 'No active subscription' }, { status: 404 });
  }

  try {
    const stripe = getStripe();
    const sub = await stripe.subscriptions.update(row.stripe_subscription_id, {
      cancel_at_period_end: !resume,
    });

    await supabase
      .from('user_subscriptions')
      .update({
        cancel_at_period_end: sub.cancel_at_period_end,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    return NextResponse.json({
      ok: true,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Stripe error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
