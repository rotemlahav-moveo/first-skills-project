import { Link } from 'react-router-dom';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <Link className="brand" to="/">
          FirstSkills Fashion
        </Link>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
