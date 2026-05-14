import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { JoinUsSection } from './sections/JoinUsSection';
import { CollectionsSection } from './sections/CollectionsSection';
import { HeroSection } from './sections/HeroSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { ProductsSection } from './sections/ProductsSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { ROUTES } from '@/app/routes';
import { scrollToHomeSection } from './homeSectionNavigation';

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== ROUTES.HOME || !location.hash) {
      return;
    }

    const sectionId = location.hash.slice(1);
    if (!sectionId) {
      return;
    }

    requestAnimationFrame(() => {
      scrollToHomeSection(sectionId);
    });
  }, [location.pathname, location.hash]);

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
