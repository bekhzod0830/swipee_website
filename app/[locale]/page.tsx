import Navigation from '@/components/Navigation/Navigation';
import Hero from '@/components/Hero/Hero';
import ProblemStatement from '@/components/ProblemStatement/ProblemStatement';
import Features from '@/components/Features/Features';
import SwipeDemo from '@/components/SwipeDemo/SwipeDemo';
import VisualSearchDemo from '@/components/VisualSearchDemo/VisualSearchDemo';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import Waitlist from '@/components/Waitlist/Waitlist';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <SwipeDemo />
      <ProblemStatement />
      <VisualSearchDemo />
      <Features />
      <HowItWorks />
      <Waitlist />
      <Footer />
    </main>
  );
}
