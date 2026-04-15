import { Link } from 'react-router-dom';

type AuthPlaceholderProps = {
  title: string;
};

export function AuthPlaceholder({ title }: AuthPlaceholderProps) {
  return (
    <main className="section">
      <div className="container auth-placeholder">
        <h1>{title}</h1>
        <p>Authentication flow is coming next. Return to the homepage for now.</p>
        <Link className="button secondary" to="/">
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
