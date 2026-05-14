'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedFragrances from '@/components/FeaturedFragrances';
import Collection from '@/components/Collection';
import HowItWorks from '@/components/HowItWorks';
import TasteQuiz from '@/components/TasteQuiz';
import Testimonials from '@/components/Testimonials';
import Subscription from '@/components/Subscription';
import TrustStrip from '@/components/TrustStrip';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main id="main-content" className="relative" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      <div style={{ height: '72px' }} />
      <Hero />
      <FeaturedFragrances />
      <Collection />
      <HowItWorks />
      <TasteQuiz />
      <Testimonials />
      <Subscription />
      <TrustStrip />
      <Footer />
    </main>
  );
}
