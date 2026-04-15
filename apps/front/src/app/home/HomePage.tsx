import { AuthEntrySection } from './sections/AuthEntrySection';
import { FeaturesSection } from './sections/FeaturesSection';
import { HeroSection } from './sections/HeroSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { MembershipSection } from './sections/MembershipSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';

export function HomePage() {
  return (
    <>
      <SiteHeader />

      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <MembershipSection />
        <AuthEntrySection />
      </main>

      <SiteFooter />
    </>
  );
}
