/**
 * Server-only admin auth helper.
 *
 * Usage in route handlers:
 *   const guard = await requireAdmin();
 *   if (guard.error) return guard.error;
 *
 * In server components:
 *   const ok = await isAdmin();
 *   if (!ok) redirect('/');
 */

import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function isAdmin(): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail) return false;
  const user = await currentUser();
  if (!user) return false;
  const emails = user.emailAddresses.map(e => e.emailAddress.trim().toLowerCase());
  return emails.includes(adminEmail);
}

export async function requireAdmin(): Promise<{ ok: true } | { ok: false; error: NextResponse }> {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  if (!(await isAdmin())) {
    return { ok: false, error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  }
  return { ok: true };
}
