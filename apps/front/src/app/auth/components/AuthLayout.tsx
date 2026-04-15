import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <main className="auth-page">
      <div className="container auth-layout">
        <section className="auth-brand-panel" aria-label="Brand highlights">
          <Link className="auth-brand-link" to="/">
            FirstSkills Fashion
          </Link>
          <p className="auth-eyebrow">Spring Edit 2026</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <ul className="auth-brand-list">
            <li>Style recommendations tuned to your taste</li>
            <li>Drop alerts for trending collections</li>
            <li>Fast checkout with saved preferences</li>
          </ul>
        </section>
        <section className="auth-form-panel">{children}</section>
      </div>
    </main>
  );
}
