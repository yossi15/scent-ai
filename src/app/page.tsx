'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Collection from '@/components/Collection';
import SignatureMatch from '@/components/SignatureMatch';
import ScentRadar from '@/components/ScentRadar';
import Diary from '@/components/Diary';
import Subscription from '@/components/Subscription';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />

      <div className="gold-line max-w-xs mx-auto" />

      <Collection />

      <div className="gold-line max-w-xs mx-auto" />

      <SignatureMatch />

      <div className="gold-line max-w-xs mx-auto" />

      <ScentRadar />

      <div className="gold-line max-w-xs mx-auto" />

      <Diary />

      <div className="gold-line max-w-xs mx-auto" />

      <Subscription />

      <Footer />
    </main>
  );
}
