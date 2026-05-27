import FAQ from '@/components/FAQ';
import Navigation from '@/components/home/Navigation';
import Footer from '@/components/home/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'שאלות נפוצות | SCENTORY',
  description: 'תשובות לשאלות הנפוצות על SCENTORY — הקולקציה, השאלון, המנוי ועוד.',
};

export default function FAQPage() {
  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      <Navigation />
      <div style={{ height: 57 }} />
      <FAQ />
      <Footer />
    </main>
  );
}
