'use client';

import Navbar from '@/components/Navbar';
import Collection from '@/components/Collection';
import Footer from '@/components/Footer';

export default function CollectionPage() {
  return (
    <main id="main-content" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      <div style={{ height: '72px' }} />
      <Collection />
      <Footer />
    </main>
  );
}
