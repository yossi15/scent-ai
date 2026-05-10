import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getStripe, appUrl } from '@/lib/stripe';
import { getSupabase } from '@/lib/supabase';

// POST /api/customer-portal
//   → { url: string }   (Stripe Customer Portal URL - redirect for cancel/upgrade/billing)
export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = getSupabase();
  const { data } = await supabase
    .from('user_subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .maybeSingle();

  const customerId = data?.stripe_customer_id as string | undefined;
  if (!customerId) {
    return NextResponse.json({ error: 'No Stripe customer for this user' }, { status: 404 });
  }

  const stripe = getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${appUrl()}/dashboard`,
  });

  return NextResponse.json({ url: session.url });
}
