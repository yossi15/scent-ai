import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getSupabase } from '@/lib/supabase';

// GET /api/admin/users → list of Clerk users + their subscription tier (if any)
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.error;

  const cc = await clerkClient();
  const list = await cc.users.getUserList({ limit: 200, orderBy: '-created_at' });

  // Fetch all subscription rows once to enrich
  let subs: Array<{ user_id: string; tier: string | null; status: string | null }> = [];
  try {
    const sb = getSupabase();
    const { data } = await sb.from('user_subscriptions').select('user_id, tier, status');
    subs = (data ?? []) as typeof subs;
  } catch { /* ignore */ }
  const subByUser = new Map(subs.map(s => [s.user_id, s]));

  const users = list.data.map(u => {
    const sub = subByUser.get(u.id);
    return {
      id: u.id,
      name: [u.firstName, u.lastName].filter(Boolean).join(' ') || u.username || '—',
      email: u.emailAddresses[0]?.emailAddress ?? '—',
      createdAt: new Date(u.createdAt).toISOString(),
      lastSignInAt: u.lastSignInAt ? new Date(u.lastSignInAt).toISOString() : null,
      tier: sub?.tier ?? null,
      subStatus: sub?.status ?? null,
    };
  });

  return NextResponse.json({ users, total: list.totalCount });
}
