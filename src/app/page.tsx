import Navigation from '@/components/home/Navigation';
import Hero from '@/components/home/Hero';
import WhatIsScentory from '@/components/home/WhatIsScentory';
import ThePain from '@/components/home/ThePain';
import PressStrip from '@/components/home/PressStrip';
import HowItWorks from '@/components/home/HowItWorks';
import WhyAI from '@/components/home/WhyAI';
import WhyFeature from '@/components/home/WhyFeature';
import Testimonials from '@/components/home/Testimonials';
import ComparisonTable from '@/components/home/ComparisonTable';
import PricingTable from '@/components/home/PricingTable';
import FinalCTA from '@/components/home/FinalCTA';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Spacer for fixed nav (57px height) */}
      <div style={{ height: 57 }} />

      <main id="main-content">
        <Hero />
        <WhatIsScentory />
        <ThePain />
        <PressStrip />
        <HowItWorks />
        <WhyAI />
        <WhyFeature />
        <Testimonials />
        <ComparisonTable />
        <PricingTable />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
