'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import HowItWorks from '@/components/HowItWorks';
import TasteQuiz from '@/components/TasteQuiz';
import Collection from '@/components/Collection';
import SignatureMatch from '@/components/SignatureMatch';
import ScentRadar from '@/components/ScentRadar';
import Diary from '@/components/Diary';
import Testimonials from '@/components/Testimonials';
import Subscription from '@/components/Subscription';
import FAQ from '@/components/FAQ';
import TrustStrip from '@/components/TrustStrip';
import Footer from '@/components/Footer';
import type { Fragrance } from '@/data/fragrances';

export default function Home() {
  const [matchCollection, setMatchCollection] = useState<Fragrance[]>([]);

  return (
    <main className="relative">
      <Navbar />
      <Hero />

      <SocialProof />

      <div className="gold-line max-w-xs mx-auto" />

      <HowItWorks />

      <div className="gold-line max-w-xs mx-auto" />

      <TasteQuiz />

      <div className="gold-line max-w-xs mx-auto" />

      <Collection />

      <div className="gold-line max-w-xs mx-auto" />

      <SignatureMatch onCollectionChange={setMatchCollection} />

      <div className="gold-line max-w-xs mx-auto" />

      <ScentRadar collection={matchCollection} />

      <div className="gold-line max-w-xs mx-auto" />

      <Diary />

      <div className="gold-line max-w-xs mx-auto" />

      <Testimonials />

      <div className="gold-line max-w-xs mx-auto" />

      <Subscription />

      <div className="gold-line max-w-xs mx-auto" />

      <FAQ />

      <TrustStrip />

      <Footer />
    </main>
  );
}
