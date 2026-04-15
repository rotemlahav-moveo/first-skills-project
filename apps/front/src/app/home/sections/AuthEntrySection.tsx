import { Link } from 'react-router-dom';

export function AuthEntrySection() {
  return (
    <section className="section auth-entry" aria-labelledby="auth-entry-title">
      <div className="container">
        <h2 id="auth-entry-title">Ready to find your next outfit?</h2>
        <p className="section-intro">
          Create an account to save your preferences and speed up future
          shopping.
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/sign-up">
            Sign up
          </Link>
          <Link className="button secondary" to="/sign-in">
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
