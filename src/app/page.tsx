'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import HowItWorks from '@/components/HowItWorks';
import WhyScentory from '@/components/WhyScentory';
import FeaturedFragrances from '@/components/FeaturedFragrances';
import Subscription from '@/components/Subscription';
import Testimonials from '@/components/Testimonials';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main id="main-content" className="relative" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      <div style={{ height: '72px' }} />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <WhyScentory />
      <FeaturedFragrances id="collection" />
      <Subscription />
      <Testimonials id="testimonials" />
      <FinalCTA />
      <Footer />
    </main>
  );
}
