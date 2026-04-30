import { JoinUsSection } from './sections/JoinUsSection';
import { CollectionsSection } from './sections/CollectionsSection';
import { HeroSection } from './sections/HeroSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { ProductsSection } from './sections/ProductsSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';

export function HomePage() {
  return (
    <>
      <SiteHeader />

      <main className="bg-white">
        <HeroSection />
        <CollectionsSection />
        <ProductsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <JoinUsSection />
      </main>

      <SiteFooter />
    </>
  );
}
