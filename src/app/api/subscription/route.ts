import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// GET /api/subscription
//   → { tier: Tier | null, status: string | null, currentPeriodEnd: string | null,
//       cancelAtPeriodEnd: boolean }
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('user_subscriptions')
    .select('tier, status, current_period_end, cancel_at_period_end')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    tier:               (data?.tier as string | null) ?? null,
    status:             (data?.status as string | null) ?? null,
    currentPeriodEnd:   (data?.current_period_end as string | null) ?? null,
    cancelAtPeriodEnd:  Boolean(data?.cancel_at_period_end),
  });
}
