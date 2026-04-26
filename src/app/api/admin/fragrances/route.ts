import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getSupabase } from '@/lib/supabase';
import { fragrances, type Fragrance } from '@/data/fragrances';

// GET /api/admin/fragrances → merged list (static catalog + DB overrides/additions)
export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.error;

  let edits: Array<{ base_id: number | null; deleted: boolean; data: Fragrance | null }> = [];
  try {
    const sb = getSupabase();
    const { data } = await sb
      .from('fragrance_edits')
      .select('base_id, deleted, data')
      .order('updated_at', { ascending: false });
    edits = (data ?? []) as typeof edits;
  } catch {
    // Table may not exist yet — fall through with empty edits
  }

  // Apply edits: index by base_id (latest wins; we already ordered desc)
  const editByBase = new Map<number, { deleted: boolean; data: Fragrance | null }>();
  const additions: Fragrance[] = [];
  for (const e of edits) {
    if (e.base_id === null && e.data) {
      additions.push(e.data);
    } else if (e.base_id !== null && !editByBase.has(e.base_id)) {
      editByBase.set(e.base_id, { deleted: e.deleted, data: e.data });
    }
  }

  const merged: Array<Fragrance & { _source: 'static' | 'override' | 'new' }> = [];
  for (const f of fragrances) {
    const ed = editByBase.get(f.id);
    if (ed?.deleted) continue;
    if (ed?.data) merged.push({ ...ed.data, _source: 'override' });
    else merged.push({ ...f, _source: 'static' });
  }
  for (const a of additions) {
    merged.push({ ...a, _source: 'new' });
  }
  return NextResponse.json({ fragrances: merged });
}

// POST /api/admin/fragrances  body: Fragrance (without id; id auto-assigned)
export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.error;

  const body = (await req.json()) as Partial<Fragrance>;
  if (!body.name || !body.house) {
    return NextResponse.json({ error: 'Missing name or house' }, { status: 400 });
  }

  const newId = Math.max(...fragrances.map(f => f.id), 9999) + 1 + Math.floor(Math.random() * 100);
  const data: Fragrance = {
    id: newId,
    name: body.name,
    house: body.house,
    year: body.year ?? new Date().getFullYear(),
    concentration: body.concentration ?? 'EDP',
    price: body.price ?? 0,
    size: body.size ?? '100ml',
    rating: body.rating ?? 4.5,
    family: body.family ?? 'Woody',
    gender: body.gender ?? 'Unisex',
    longevity: body.longevity ?? 7,
    sillage: body.sillage ?? 6,
    notes: body.notes ?? [],
    description: body.description ?? '',
    image: body.image ?? '',
    tags: body.tags ?? [],
    radarProfile: body.radarProfile ?? { woody: 5, floral: 4, oriental: 4, fresh: 4, gourmand: 3, animalic: 2 },
  };

  try {
    const sb = getSupabase();
    const { error } = await sb.from('fragrance_edits').insert({ base_id: null, deleted: false, data });
    if (error) throw error;
  } catch (err) {
    console.error('insert failed:', err);
    return NextResponse.json({ error: 'DB insert failed (table missing? run scripts/admin-tables.sql)' }, { status: 500 });
  }
  return NextResponse.json({ ok: true, fragrance: data });
}
