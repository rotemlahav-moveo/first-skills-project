import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-8 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="mb-4 inline-flex items-center justify-center text-gray-900">
            <div className="flex h-8 w-[200px] items-center justify-center bg-gray-900">
              <span className="text-sm text-white">FirstSkills Fashion</span>
            </div>
          </Link>
          <h1 className="mb-3 max-w-none text-3xl text-gray-900 md:text-4xl">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <section>{children}</section>
      </div>
    </main>
  );
}
