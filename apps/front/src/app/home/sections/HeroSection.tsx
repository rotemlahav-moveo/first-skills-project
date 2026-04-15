import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="hero section">
      <div className="container">
        <p className="eyebrow">Discover your next look faster</p>
        <h1>Shop smarter, dress better, and save time.</h1>
        <p className="section-intro">
          Browse curated clothing categories, find the right style quickly, and
          move from discovery to checkout with less effort.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#features">
            Browse categories
          </a>
          <Link className="button secondary" to="/sign-up">
            Create account
          </Link>
        </div>
      </div>
    </section>
  );
}
