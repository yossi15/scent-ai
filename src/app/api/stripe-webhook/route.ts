import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe, priceIdToTier } from '@/lib/stripe';
import { getSupabase } from '@/lib/supabase';
import { sendSubscriptionConfirmation } from '@/lib/email';

export const runtime = 'nodejs';
// Stripe needs the raw body for signature verification - disable Next's body parsing
export const dynamic = 'force-dynamic';

// POST /api/stripe-webhook
//   Stripe sends webhook events here.  Configure endpoint in Stripe dashboard.
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: 'Missing webhook secret' }, { status: 500 });

  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Invalid signature';
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === 'subscription' && session.subscription) {
          const subId = typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription.id;
          const sub = await stripe.subscriptions.retrieve(subId);
          await upsertSubscription(sub);

          // Send Hebrew confirmation email
          const email = session.customer_details?.email ?? session.customer_email;
          if (email) {
            const tier = priceIdToTier(sub.items.data[0]?.price?.id ?? '');
            void sendSubscriptionConfirmation({
              to: email,
              name: session.customer_details?.name ?? null,
              tier: tier ?? 'מנוי SCENTORY',
            });
          }
        }
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await upsertSubscription(sub);
        break;
      }
      default:
        // ignore other events
        break;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Handler error';
    console.error('Webhook handler error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// ─── helper ──────────────────────────────────────────────────────────────
async function upsertSubscription(sub: Stripe.Subscription) {
  const userId = (sub.metadata?.clerk_user_id as string | undefined)
    ?? await lookupUserIdByCustomer(sub.customer);
  if (!userId) {
    console.warn('No clerk_user_id for subscription', sub.id);
    return;
  }

  const item = sub.items.data[0];
  const priceId = item?.price?.id ?? '';
  const tier = priceIdToTier(priceId);

  const supabase = getSupabase();
  const { error } = await supabase
    .from('user_subscriptions')
    .upsert(
      {
        user_id: userId,
        stripe_customer_id: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
        stripe_subscription_id: sub.id,
        tier,
        status: sub.status,
        current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        cancel_at_period_end: sub.cancel_at_period_end,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );
  if (error) console.error('Supabase upsert failed:', error.message);
}

async function lookupUserIdByCustomer(customer: string | Stripe.Customer | Stripe.DeletedCustomer): Promise<string | null> {
  const customerId = typeof customer === 'string' ? customer : customer.id;
  const supabase = getSupabase();
  const { data } = await supabase
    .from('user_subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle();
  return (data?.user_id as string | undefined) ?? null;
}
