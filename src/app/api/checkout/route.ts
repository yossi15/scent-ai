import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { getStripe, tierToPriceId, appUrl, type Tier } from '@/lib/stripe';
import { getSupabase } from '@/lib/supabase';

// POST /api/checkout  body: { tier: 'discovery' | 'collector' | 'vault' }
//   → { url: string }   (Stripe Checkout URL — redirect the user there)
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  if (!email) return NextResponse.json({ error: 'No email on account' }, { status: 400 });

  const { tier } = (await req.json()) as { tier?: Tier };
  if (!tier || !['discovery', 'collector', 'vault'].includes(tier)) {
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

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: tierToPriceId(tier), quantity: 1 }],
    success_url: `${appUrl()}/dashboard?subscription=success`,
    cancel_url:  `${appUrl()}/?subscription=cancelled#subscribe`,
    allow_promotion_codes: true,
    subscription_data: {
      metadata: { clerk_user_id: userId, tier },
    },
    metadata: { clerk_user_id: userId, tier },
  });

  if (!session.url) return NextResponse.json({ error: 'No checkout URL' }, { status: 500 });
  return NextResponse.json({ url: session.url });
}
