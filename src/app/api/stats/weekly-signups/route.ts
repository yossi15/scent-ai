import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // No Supabase config in this environment — return gracefully
  if (!url || !key) {
    return NextResponse.json({ show: false, count: 0 });
  }

  try {
    const supabase = createClient(url, key);

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Try 'profiles' table first (common Clerk + Supabase pattern),
    // fall back to 'users' if needed
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo.toISOString());

    if (error) {
      // Try alternate table name
      const { count: count2, error: error2 } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekAgo.toISOString());

      if (error2) {
        return NextResponse.json({ show: false, count: 0 });
      }

      const n = count2 ?? 0;
      return NextResponse.json({ show: n >= 10, count: n });
    }

    const n = count ?? 0;
    return NextResponse.json({ show: n >= 10, count: n });
  } catch {
    return NextResponse.json({ show: false, count: 0 });
  }
}
