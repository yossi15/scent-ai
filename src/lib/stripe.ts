/**
 * Server-side Stripe client + tier <-> price-id mapping.
 * Never import this in 'use client' components.
 *
 * ─── Required ENV VARS ──────────────────────────────────────────────────
 *   STRIPE_SECRET_KEY                 sk_test_... (or sk_live_...)
 *   STRIPE_WEBHOOK_SECRET             whsec_... (from Stripe CLI or dashboard)
 *   NEXT_PUBLIC_APP_URL               https://your-domain.vercel.app
 *   NEXT_PUBLIC_STRIPE_PRICE_DISCOVERY  price_... (₪49/mo)
 *   NEXT_PUBLIC_STRIPE_PRICE_COLLECTOR  price_... (₪99/mo)
 *   NEXT_PUBLIC_STRIPE_PRICE_EXPERT     price_... (₪199/mo)
 *
 * ─── Required Supabase SQL ──────────────────────────────────────────────
 *   create table public.user_subscriptions (
 *     user_id              text primary key,
 *     stripe_customer_id   text unique,
 *     stripe_subscription_id text unique,
 *     tier                 text,                    -- 'discovery' | 'collector' | 'expert'
 *     status               text,                    -- 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete'
 *     current_period_end   timestamptz,
 *     cancel_at_period_end boolean default false,
 *     created_at           timestamptz default now(),
 *     updated_at           timestamptz default now()
 *   );
 *   create index on public.user_subscriptions(stripe_customer_id);
 *
 * ─── Stripe Dashboard setup ─────────────────────────────────────────────
 *   1. Create 3 Products + recurring monthly Prices in ILS:
 *        Discovery  → ₪49
 *        Collector  → ₪99
 *        Expert     → ₪199
 *   2. Copy each price_id into the env vars above.
 *   3. Add a webhook endpoint pointing to:
 *        https://YOUR-DOMAIN/api/stripe-webhook
 *      Subscribe to events:
 *        checkout.session.completed
 *        customer.subscription.created
 *        customer.subscription.updated
 *        customer.subscription.deleted
 *      Copy the signing secret into STRIPE_WEBHOOK_SECRET.
 *   4. Enable Customer Portal in Stripe Dashboard (Settings → Billing → Customer portal).
 */

import Stripe from 'stripe';

export type Tier = 'discovery' | 'collector' | 'expert';

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY');
  return new Stripe(key, { apiVersion: '2025-01-27.acacia' as Stripe.LatestApiVersion });
}

export function tierToPriceId(tier: Tier): string {
  const map: Record<Tier, string | undefined> = {
    discovery: process.env.NEXT_PUBLIC_STRIPE_PRICE_DISCOVERY,
    collector: process.env.NEXT_PUBLIC_STRIPE_PRICE_COLLECTOR,
    expert:    process.env.NEXT_PUBLIC_STRIPE_PRICE_EXPERT,
  };
  const id = map[tier];
  if (!id) throw new Error(`Missing price id for tier: ${tier}`);
  return id;
}

export function priceIdToTier(priceId: string): Tier | null {
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_DISCOVERY) return 'discovery';
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_COLLECTOR) return 'collector';
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_EXPERT)    return 'expert';
  return null;
}

export function appUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
}
