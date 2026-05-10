import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-guard';
import AdminClient from './AdminClient';

export const metadata = {
  title: 'Admin | SCENTORY',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const ok = await isAdmin();
  if (!ok) redirect('/');
  return <AdminClient />;
}
