import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/auth/AuthContext';

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="border-b border-gray-300 bg-gray-100 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-8">
        <div className="max-w-3xl">
          <h1 className="mb-6 max-w-none text-4xl text-gray-900 md:text-5xl lg:text-6xl">Discover Your Style</h1>
          <p className="mb-8 text-lg text-gray-600">
            Quality fashion for everyone. Browse our latest collections and find your perfect look.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {user ? (
              <p className="inline-flex h-14 items-center px-2 text-lg text-gray-900">
                Welcome back, {user.name}
              </p>
            ) : (
              <Button asChild size="lg" className="h-14 px-8">
                <Link to="/sign-up">
                  Shop Now <ArrowRight />
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" size="lg" className="h-14 px-8">
              <a href="#collections">Browse collections</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
