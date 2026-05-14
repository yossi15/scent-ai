import FAQ from '@/components/FAQ';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'שאלות נפוצות | SCENTORY',
  description: 'תשובות לשאלות הנפוצות על SCENTORY — הקולקציה, השאלון, המנוי ועוד.',
};

export default function FAQPage() {
  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      <div style={{ height: '72px' }} />
      <FAQ />
      <Footer />
    </main>
  );
}
