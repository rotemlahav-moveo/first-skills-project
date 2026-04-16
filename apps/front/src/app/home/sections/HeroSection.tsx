import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="fashion-hero section">
      <div className="container fashion-hero-layout">
        <div>
          <p className="fashion-eyebrow">Trend-forward pieces just dropped</p>
          <h1>Own the look before it sells out.</h1>
          <p className="section-intro">
            Shop vibrant street-to-evening collections with curated edits, rapid
            delivery, and fits picked for your style profile.
          </p>
          <div className="hero-actions">
            <Button asChild size="lg" className="!text-white hover:!text-white">
              <Link to="/sign-up">
                Start shopping <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#collections">Browse collections</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
