import { ShoppingCart } from 'lucide-react';

type FavoritesActionsSectionProps = {
  onAddAllToCart: () => void;
  onClearAll: () => void;
};

export function FavoritesActionsSection({ onAddAllToCart, onClearAll }: FavoritesActionsSectionProps) {
  return (
    <section className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row" aria-label="Favorites actions">
      <button
        type="button"
        onClick={onAddAllToCart}
        className="flex h-12 items-center justify-center gap-2 bg-gray-900 px-8 text-white hover:bg-gray-800"
      >
        <ShoppingCart className="h-5 w-5" />
        <span>Add all to cart</span>
      </button>
      <button
        type="button"
        onClick={onClearAll}
        className="h-12 border border-gray-300 px-8 text-gray-900 hover:bg-gray-50"
      >
        Clear all favorites
      </button>
    </section>
  );
}
