import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getSupabase } from '@/lib/supabase';
import { fragrances, type Fragrance } from '@/data/fragrances';

// PATCH /api/admin/fragrances/:id  body: Partial<Fragrance>
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.error;

  const { id: idStr } = await ctx.params;
  const id = parseInt(idStr, 10);
  const patch = (await req.json()) as Partial<Fragrance>;

  // Find current state - check static catalog or existing override
  const base = fragrances.find(f => f.id === id);
  let data: Fragrance | null = base ? { ...base } : null;

  try {
    const sb = getSupabase();
    if (!data) {
      // Maybe it's a "new" entry stored in DB
      const { data: existing } = await sb
        .from('fragrance_edits')
        .select('data')
        .filter('data->>id', 'eq', String(id))
        .limit(1)
        .maybeSingle();
      if (existing?.data) data = existing.data as Fragrance;
    }

    if (!data) return NextResponse.json({ error: 'Fragrance not found' }, { status: 404 });

    const merged: Fragrance = { ...data, ...patch, id }; // id is immutable

    const { error } = await sb.from('fragrance_edits').insert({
      base_id: base ? id : null,
      deleted: false,
      data: merged,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true, fragrance: merged });
  } catch (err) {
    console.error('patch failed:', err);
    return NextResponse.json({ error: 'DB error (run scripts/admin-tables.sql?)' }, { status: 500 });
  }
}

// DELETE /api/admin/fragrances/:id
export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.error;

  const { id: idStr } = await ctx.params;
  const id = parseInt(idStr, 10);
  const isStatic = fragrances.some(f => f.id === id);

  try {
    const sb = getSupabase();
    if (isStatic) {
      // Soft-delete: insert a deletion marker
      const { error } = await sb.from('fragrance_edits').insert({ base_id: id, deleted: true, data: null });
      if (error) throw error;
    } else {
      // Hard-delete: remove the addition row by data->>id
      const { error } = await sb.from('fragrance_edits').delete().filter('data->>id', 'eq', String(id));
      if (error) throw error;
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('delete failed:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
