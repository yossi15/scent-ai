import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe, tierToPriceId, appUrl, type Tier } from '@/lib/stripe';
import { getSupabase } from '@/lib/supabase';

// POST /api/checkout  body: { tier: 'discovery' | 'collector' | 'expert', couponCode?: string }
//   → { url: string }   (Stripe Checkout URL - redirect the user there)
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  if (!email) return NextResponse.json({ error: 'No email on account' }, { status: 400 });

  const { tier, couponCode } = (await req.json()) as { tier?: Tier; couponCode?: string };
  if (!tier || !['discovery', 'collector', 'expert'].includes(tier)) {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
  }

  const stripe = getStripe();
  const supabase = getSupabase();

  // Reuse existing Stripe customer if we already have one for this user
  const { data: existing } = await supabase
    .from('user_subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .maybeSingle();

  let customerId = existing?.stripe_customer_id as string | undefined;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email,
      metadata: { clerk_user_id: userId },
    });
    customerId = customer.id;
  }

  // Resolve promotion code → discount (best-effort; if the code doesn't exist
  // we still let the user apply it on the Stripe-hosted page).
  let discounts: { promotion_code: string }[] | undefined;
  if (couponCode && couponCode.trim()) {
    const code = couponCode.trim().toUpperCase();
    try {
      const found = await stripe.promotionCodes.list({ code, active: true, limit: 1 });
      if (found.data[0]) discounts = [{ promotion_code: found.data[0].id }];
    } catch (e) {
      console.warn('promotion code lookup failed:', e);
    }
  }

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: tierToPriceId(tier), quantity: 1 }],
    success_url: `${appUrl()}/dashboard?subscription=success`,
    cancel_url:  `${appUrl()}/?subscription=cancelled#subscribe`,
    subscription_data: {
      metadata: { clerk_user_id: userId, tier },
    },
    metadata: { clerk_user_id: userId, tier },
  };

  if (discounts) {
    sessionParams.discounts = discounts;
  } else {
    // Only allow user-entered codes if we didn't already attach one
    sessionParams.allow_promotion_codes = true;
  }

  const session = await stripe.checkout.sessions.create(sessionParams);

  if (!session.url) return NextResponse.json({ error: 'No checkout URL' }, { status: 500 });
  return NextResponse.json({ url: session.url });
}
