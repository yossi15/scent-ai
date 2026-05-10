import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getSupabase } from '@/lib/supabase';

const VALID_STATUSES = ['pending', 'handled', 'rejected'] as const;
type Status = typeof VALID_STATUSES[number];

// PATCH /api/admin/sample-requests/:id  body: { status }
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.error;

  const { id } = await ctx.params;
  const { status } = (await req.json()) as { status?: Status };
  if (!status || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    const sb = getSupabase();
    const { error } = await sb.from('sample_requests').update({ status }).eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('update failed:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
