'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedFragrances from '@/components/FeaturedFragrances';
import HowItWorks from '@/components/HowItWorks';
import TasteQuiz from '@/components/TasteQuiz';
import Collection from '@/components/Collection';
import Testimonials from '@/components/Testimonials';
import Subscription from '@/components/Subscription';
import FAQ from '@/components/FAQ';
import TrustStrip from '@/components/TrustStrip';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main id="main-content" className="relative" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      <div style={{ height: '72px' }} />
      <Hero />
      <FeaturedFragrances />
      <HowItWorks />
      <TasteQuiz />
      <Collection />
      <Testimonials />
      <Subscription />
      <FAQ />
      <TrustStrip />
      <Footer />
    </main>
  );
}
