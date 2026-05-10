import Stripe from 'stripe';

export type Tier = 'discovery' | 'collector' | 'expert';

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY');
  return new Stripe(key, { apiVersion: '2025-02-24.acacia' });
}

export function tierToPriceId(tier: Tier): string {
  const map: Record<Tier, string | undefined> = {
    discovery: process.env.NEXT_PUBLIC_STRIPE_PRICE_DISCOVERY,
    collector:  process.env.NEXT_PUBLIC_STRIPE_PRICE_COLLECTOR,
    expert:     process.env.NEXT_PUBLIC_STRIPE_PRICE_EXPERT,
  };
  const id = map[tier];
  if (!id) throw new Error(`Missing Stripe price ID for tier: ${tier}`);
  return id;
}

export function priceIdToTier(priceId: string): Tier | null {
  const map: Record<string, Tier> = {
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_DISCOVERY ?? '']: 'discovery',
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_COLLECTOR  ?? '']: 'collector',
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_EXPERT     ?? '']: 'expert',
  };
  return map[priceId] ?? null;
}

export function appUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? 'https://scentory.co.il';
}
