'use client';

import Navigation from '@/components/home/Navigation';
import Collection from '@/components/Collection';
import Footer from '@/components/home/Footer';

export default function CollectionPage() {
  return (
    <main id="main-content" style={{ background: 'var(--bg-primary)' }}>
      <Navigation />
      <div style={{ height: 57 }} />
      <Collection />
      <Footer />
    </main>
  );
}
