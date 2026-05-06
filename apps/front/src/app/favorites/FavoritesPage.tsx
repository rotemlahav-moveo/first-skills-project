import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useCart } from '@/app/cart/CartContext';
import { SiteFooter } from '@/app/home/components/SiteFooter';
import { SiteHeader } from '@/app/home/components/SiteHeader';
import { pickDefaultSize } from './defaultProductSize';
import type { FavoriteItem } from './types';
import { useFavorites } from './FavoritesContext';
import { EmptyFavoritesSection } from './sections/EmptyFavoritesSection';
import { FavoritesActionsSection } from './sections/FavoritesActionsSection';
import { FavoritesGridSection } from './sections/FavoritesGridSection';

export function FavoritesPage() {
  const { items, removeItem, clear } = useFavorites();
  const { addToCart } = useCart();

  const addFavoriteItemToCart = useCallback(
    (favoriteItem: FavoriteItem) => {
      addToCart({
        id: favoriteItem.productId,
        name: favoriteItem.productName,
        color: favoriteItem.color,
        size: pickDefaultSize(favoriteItem.sizes),
        price: favoriteItem.price,
        imageUrl: favoriteItem.imageUrl,
        quantity: 1,
      });
    },
    [addToCart],
  );

  const handleAddAllToCart = useCallback(() => {
    for (const item of items) {
      addFavoriteItemToCart(item);
    }
  }, [items, addFavoriteItemToCart]);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gray-100 py-10 md:py-14">
        <div className="mx-auto w-full max-w-[1440px] px-8">
          <div className="mb-8 space-y-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm text-gray-700 transition hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Continue shopping
            </Link>
          </div>

          {items.length === 0 ? (
            <EmptyFavoritesSection />
          ) : (
            <>
              <div className="mb-8">
                <h1 className="mb-2 text-3xl text-gray-900 md:text-4xl">My favorites</h1>
                <p className="text-gray-600">{items.length} items saved</p>
              </div>
              <FavoritesGridSection items={items} onRemoveItem={removeItem} onAddItemToCart={addFavoriteItemToCart} />
              <FavoritesActionsSection onAddAllToCart={handleAddAllToCart} onClearAll={clear} />
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
