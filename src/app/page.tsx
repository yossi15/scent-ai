'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FragranceSearch from '@/components/FragranceSearch';
import HowItWorks from '@/components/HowItWorks';
import TasteQuiz from '@/components/TasteQuiz';
import SignatureMatch from '@/components/SignatureMatch';
import ScentRadar from '@/components/ScentRadar';
import Diary from '@/components/Diary';
import Subscription from '@/components/Subscription';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <Navbar />
      <Hero />
      <FragranceSearch />
      <HowItWorks />
      <TasteQuiz />
      <SignatureMatch />
      <ScentRadar />
      <Diary />
      <Subscription />
      <Footer />
    </main>
  );
}
