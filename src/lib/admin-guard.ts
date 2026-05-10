import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? 'yossizrihen12@gmail.com')
  .split(',')
  .map(e => e.trim().toLowerCase());

interface GuardResult {
  ok: true;
  userId: string;
}

interface GuardError {
  ok: false;
  error: NextResponse;
}

export async function isAdmin(): Promise<boolean> {
  try {
    const { userId } = await auth();
    if (!userId) return false;
    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress?.toLowerCase() ?? '';
    return ADMIN_EMAILS.includes(email);
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<GuardResult | GuardError> {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress?.toLowerCase() ?? '';

  if (!ADMIN_EMAILS.includes(email)) {
    return { ok: false, error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  }

  return { ok: true, userId };
}
