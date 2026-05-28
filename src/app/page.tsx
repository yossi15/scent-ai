import Navigation from '@/components/home/Navigation';
import Hero from '@/components/home/Hero';
import PressStrip from '@/components/home/PressStrip';
import HowItWorks from '@/components/home/HowItWorks';
import WhyFeature from '@/components/home/WhyFeature';
import Testimonials from '@/components/home/Testimonials';
import ComparisonTable from '@/components/home/ComparisonTable';
import PricingTable from '@/components/home/PricingTable';
import FinalCTA from '@/components/home/FinalCTA';
import Footer from '@/components/home/Footer';

// Feature flags — set in .env.local or Vercel env vars
// NEXT_PUBLIC_SHOW_PRESS=true       → shows press strip
// NEXT_PUBLIC_SHOW_TESTIMONIALS=true → shows testimonials

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Spacer for fixed nav (57px height) */}
      <div style={{ height: 57 }} />

      <main id="main-content">
        <Hero />
        <PressStrip />
        <HowItWorks />
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
