'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import HowItWorks from '@/components/HowItWorks';
import TasteQuiz from '@/components/TasteQuiz';
import Collection from '@/components/Collection';
import Testimonials from '@/components/Testimonials';
import Subscription from '@/components/Subscription';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

// סדר הדף: שיווק בלבד — features (Match, Radar, Diary) בדאשבורד
export default function Home() {
  return (
    <main id="main-content" className="relative">
      <Navbar />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <TasteQuiz />
      <Collection />
      <Testimonials />
      <Subscription />
      <FAQ />
      <Footer />
    </main>
  );
}
