import { ShopProductCard } from '@/app/shop/components/ShopProductCard';
import type { FavoriteItem } from '../types';

type FavoritesGridSectionProps = {
  items: FavoriteItem[];
  onRemoveItem: (productId: string) => void;
  onAddItemToCart: (item: FavoriteItem) => void;
};

export function FavoritesGridSection({ items, onRemoveItem, onAddItemToCart }: FavoritesGridSectionProps) {
  return (
    <section aria-label="Favorite products">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
        {items.map((item) => (
          <ShopProductCard
            key={item.productId}
            variant="favoritesPage"
            product={item}
            onRemoveFromFavorites={() => onRemoveItem(item.productId)}
            onAddToCart={() => onAddItemToCart(item)}
          />
        ))}
      </div>
    </section>
  );
}
