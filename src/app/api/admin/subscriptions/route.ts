import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getStripe } from '@/lib/stripe';

const TIER_HEBREW: Record<string, string> = {
  discovery: 'גילוי',
  collector: 'אספן',
  expert: 'מומחה',
};

// GET /api/admin/subscriptions → active Stripe subscriptions enriched with user info
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.error;

  const stripe = getStripe();
  const subs = await stripe.subscriptions.list({
    status: 'all',
    limit: 100,
    expand: ['data.customer'],
  });

  // Map Stripe price ids to our tier ids (env-driven)
  const priceToTier: Record<string, string> = {
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_DISCOVERY ?? '']: 'discovery',
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_COLLECTOR ?? '']: 'collector',
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_EXPERT ?? '']:    'expert',
  };

  // Resolve clerk user names if metadata.clerk_user_id is present
  const cc = await clerkClient();
  const clerkIds = Array.from(new Set(
    subs.data.map(s => (s.metadata?.clerk_user_id as string | undefined) ?? '').filter(Boolean)
  ));
  const userMap = new Map<string, { name: string; email: string }>();
  for (const id of clerkIds) {
    try {
      const u = await cc.users.getUser(id);
      userMap.set(id, {
        name: [u.firstName, u.lastName].filter(Boolean).join(' ') || u.username || '-',
        email: u.emailAddresses[0]?.emailAddress ?? '-',
      });
    } catch { /* ignore single failures */ }
  }

  const rows = subs.data.map(s => {
    const priceId = s.items.data[0]?.price?.id ?? '';
    const tier = priceToTier[priceId] ?? null;
    const customer = (typeof s.customer === 'object' && !('deleted' in s.customer))
      ? s.customer
      : null;
    const clerkId = (s.metadata?.clerk_user_id as string | undefined);
    const clerk = clerkId ? userMap.get(clerkId) : null;

    return {
      id: s.id,
      name: clerk?.name ?? customer?.name ?? '-',
      email: clerk?.email ?? customer?.email ?? '-',
      tier,
      tierHebrew: tier ? TIER_HEBREW[tier] : '-',
      status: s.status,
      currentPeriodEnd: new Date(s.current_period_end * 1000).toISOString(),
      cancelAtPeriodEnd: s.cancel_at_period_end,
      amount: s.items.data[0]?.price?.unit_amount ?? 0,
      currency: s.items.data[0]?.price?.currency ?? 'ils',
    };
  });

  // Sort: active first, then by upcoming charge date
  rows.sort((a, b) => {
    const score = (s: string) => (s === 'active' || s === 'trialing') ? 0 : 1;
    return score(a.status) - score(b.status) || a.currentPeriodEnd.localeCompare(b.currentPeriodEnd);
  });

  return NextResponse.json({ subscriptions: rows });
}
