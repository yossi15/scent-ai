'use client';

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
import Footer from '@/components/Footer';

export default function Home() {
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

      <SignatureMatch />

      <div className="gold-line max-w-xs mx-auto" />

      <ScentRadar />

      <div className="gold-line max-w-xs mx-auto" />

      <Diary />

      <div className="gold-line max-w-xs mx-auto" />

      <Testimonials />

      <div className="gold-line max-w-xs mx-auto" />

      <Subscription />

      <div className="gold-line max-w-xs mx-auto" />

      <FAQ />

      <Footer />
    </main>
  );
}
