import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routes';

export const homeSectionNavItems = [
  { label: 'Collections', sectionId: 'collections' },
  { label: 'Products', sectionId: 'featured-products' },
  { label: 'How it works', sectionId: 'how-it-works' },
] as const;

export function scrollToHomeSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function useHomeSectionNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (sectionId: string) => {
      if (location.pathname === ROUTES.HOME) {
        window.history.replaceState(null, '', `${ROUTES.HOME}#${sectionId}`);
        scrollToHomeSection(sectionId);
        return;
      }

      navigate({ pathname: ROUTES.HOME, hash: sectionId });
    },
    [location.pathname, navigate],
  );
}
