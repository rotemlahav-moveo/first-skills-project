import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/auth/AuthContext';
import { useFavorites } from '@/app/favorites/FavoritesContext';
import { ROUTES } from '@/app/routes';
import { homeSectionNavItems, useHomeSectionNavigation } from '@/app/home/homeSectionNavigation';

const homeSectionLinkClassName = 'text-gray-700 transition hover:text-gray-900';
const mobileHomeSectionLinkClassName =
  'block w-full rounded-md px-3 py-3 text-left text-gray-700 transition hover:bg-gray-50 hover:text-gray-900';

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const { favoritesCount } = useFavorites();
  const location = useLocation();
  const goToHomeSection = useHomeSectionNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const handleHomeSectionClick = (sectionId: string) => {
    goToHomeSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-300 bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-4 py-4 sm:px-8">
        <Link to={ROUTES.HOME} className="shrink-0 text-gray-900">
          <div className="flex h-8 w-[140px] items-center justify-center bg-gray-900 sm:w-[200px]">
            <span className="text-sm text-white">SnapStyle</span>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="ml-auto hidden lg:block">
          <ul className="m-0 flex list-none items-center gap-8 p-0">
            {homeSectionNavItems.map((link) => (
              <li key={link.sectionId}>
                <button
                  type="button"
                  className={homeSectionLinkClassName}
                  onClick={() => handleHomeSectionClick(link.sectionId)}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <Link
                className="relative inline-flex items-center gap-1.5 text-gray-700 transition hover:text-gray-900"
                to={ROUTES.FAVORITES}
                aria-label={`Favorites${favoritesCount > 0 ? `, ${favoritesCount} items` : ''}`}
              >
                <Heart className="h-4 w-4 shrink-0" aria-hidden />
                <span>Favorites</span>
                {favoritesCount > 0 ? (
                  <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-medium leading-none text-white">
                    {favoritesCount > 99 ? '99+' : favoritesCount}
                  </span>
                ) : null}
              </Link>
            </li>
            <li>
              <Link className="text-gray-700 transition hover:text-gray-900" to={ROUTES.CART}>
                Cart
              </Link>
            </li>
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 border-gray-300 lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-main-navigation"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>

          {user ? (
            <Button type="button" size="sm" className="h-10 px-4" onClick={signOut}>
              Sign out
            </Button>
          ) : (
            <Button asChild size="sm" className="h-10 px-4">
              <Link to={ROUTES.SIGN_IN}>Sign in</Link>
            </Button>
          )}
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav
          id="mobile-main-navigation"
          aria-label="Main navigation"
          className="border-t border-gray-300 bg-white lg:hidden"
        >
          <ul className="m-0 flex list-none flex-col gap-1 p-4 sm:px-8">
            {homeSectionNavItems.map((link) => (
              <li key={link.sectionId}>
                <button
                  type="button"
                  className={mobileHomeSectionLinkClassName}
                  onClick={() => handleHomeSectionClick(link.sectionId)}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <Link
                className="relative flex items-center gap-2 rounded-md px-3 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
                to={ROUTES.FAVORITES}
                onClick={() => setMobileMenuOpen(false)}
                aria-label={`Favorites${favoritesCount > 0 ? `, ${favoritesCount} items` : ''}`}
              >
                <Heart className="h-4 w-4 shrink-0" aria-hidden />
                <span>Favorites</span>
                {favoritesCount > 0 ? (
                  <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-medium leading-none text-white">
                    {favoritesCount > 99 ? '99+' : favoritesCount}
                  </span>
                ) : null}
              </Link>
            </li>
            <li>
              <Link
                className="block rounded-md px-3 py-3 text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
                to={ROUTES.CART}
                onClick={() => setMobileMenuOpen(false)}
              >
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
