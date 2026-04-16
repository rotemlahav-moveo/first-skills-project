import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function AuthEntrySection() {
  return (
    <section className="section auth-entry" aria-labelledby="auth-entry-title">
      <div className="container">
        <h2 id="auth-entry-title">Create your account and unlock member-only edits</h2>
        <p className="section-intro">
          Join now to save your picks, sync your style profile, and track every drop.
        </p>
        <div className="hero-actions">
          <Button asChild size="lg" className="!text-white hover:!text-white">
            <Link to="/sign-up">Create account</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/sign-in">Sign in</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
