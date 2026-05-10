import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getSupabase } from '@/lib/supabase';

// GET /api/admin/sample-requests
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.error;

  try {
    const sb = getSupabase();
    const { data, error } = await sb
      .from('sample_requests')
      .select('id, email, name, fragrance_name, brand, status, created_at')
      .order('created_at', { ascending: false })
      .limit(500);
    if (error) throw error;

    // Default missing status to 'pending'
    const rows = (data ?? []).map(r => ({ ...r, status: r.status ?? 'pending' }));
    return NextResponse.json({ requests: rows });
  } catch (err) {
    console.error('sample-requests fetch failed:', err);
    return NextResponse.json({ requests: [], error: 'DB error' }, { status: 500 });
  }
}
