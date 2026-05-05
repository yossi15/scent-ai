'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedGrid from '@/components/FeaturedGrid';
import FragranceSearch from '@/components/FragranceSearch';
import HowItWorks from '@/components/HowItWorks';
import TasteQuiz from '@/components/TasteQuiz';
import Subscription from '@/components/Subscription';
import Footer from '@/components/Footer';

// Flow: Hero → Featured → Search/Collection → How It Works → Quiz → Subscription → Footer
export default function Home() {
  return (
    <main id="main-content" className="relative">
      <Navbar />
      <Hero />
      <FeaturedGrid />
      <FragranceSearch />
      <HowItWorks />
      <TasteQuiz />
      <Subscription />
      <Footer />
    </main>
  );
}
