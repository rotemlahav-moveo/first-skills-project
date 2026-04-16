import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function AuthEntrySection() {
  return (
    <section className="bg-gray-100 py-16 text-center md:py-24" aria-labelledby="auth-entry-title">
      <div className="mx-auto w-full max-w-[1440px] px-8">
        <div className="mx-auto max-w-3xl">
          <h2 id="auth-entry-title" className="mb-6 text-2xl text-gray-900 md:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Create an account to save your favorites, track orders, and enjoy a personalized shopping experience.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-14 px-8">
              <Link to="/sign-up">Create Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8">
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
