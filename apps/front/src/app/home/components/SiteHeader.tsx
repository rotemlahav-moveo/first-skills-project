import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
              <a href="#collections">Collections</a>
            </li>
            <li>
              <a href="#moods">How it works</a>
            </li>
            <li>
              <a href="#membership">Membership</a>
            </li>
            <li>
              <Button asChild variant="outline" size="sm">
                <Link to="/sign-in">Sign in</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
