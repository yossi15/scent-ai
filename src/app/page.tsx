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

export default function Home() {
  return (
    <main
      id="main-content"
      style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}
    >
      <Navigation />

      {/* Spacer for fixed nav */}
      <div style={{ height: 57 }} />

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
  );
}
