import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-300 bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-6 px-8 py-4">
        <Link to="/" className="text-gray-900">
          <div className="flex h-8 w-[200px] items-center justify-center bg-gray-900">
            <span className="text-sm text-white">SnapStyle</span>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="ml-auto hidden md:block">
          <ul className="m-0 flex list-none items-center gap-8 p-0">
            <li>
              <a className="text-gray-700 transition hover:text-gray-900" href="#collections">
                Collections
              </a>
            </li>
            <li>
              <a className="text-gray-700 transition hover:text-gray-900" href="#featured-products">
                Products
              </a>
            </li>
            <li>
              <a className="text-gray-700 transition hover:text-gray-900" href="#how-it-works">
                How it works
              </a>
            </li>
            <li>
              <Link className="text-gray-700 transition hover:text-gray-900" to="/cart">
                Cart
              </Link>
            </li>
          </ul>
        </nav>

        <Button asChild size="sm" className="h-10 px-4">
          <Link to="/sign-in">Sign in</Link>
        </Button>
      </div>
    </header>
  );
}
