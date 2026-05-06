'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import FeaturedGrid from '@/components/FeaturedGrid';
import FragranceSearch from '@/components/FragranceSearch';
import HowItWorks from '@/components/HowItWorks';
import TasteQuiz from '@/components/TasteQuiz';
import Testimonials from '@/components/Testimonials';
import Subscription from '@/components/Subscription';
import Footer from '@/components/Footer';

// Flow: Hero → TrustBar → Featured → Search → HowItWorks → Quiz → Testimonials → Subscription → Footer
export default function Home() {
  return (
    <main id="main-content" className="relative">
      <Navbar />
      <Hero />
      <TrustBar />
      <FeaturedGrid />
      <FragranceSearch />
      <HowItWorks />
      <TasteQuiz />
      <Testimonials />
      <Subscription />
      <Footer />
    </main>
  );
}
