import { Heart, ShoppingCart } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FavoriteItem } from '@/app/favorites/types';
import { useFavorites } from '@/app/favorites/FavoritesContext';
import type { ShopProduct } from '../types';

type CatalogShopProductCardProps = {
  variant?: 'catalog';
  product: ShopProduct;
  onAddToCart: (product: ShopProduct) => void;
};

type FavoritesPageGridCardProps = {
  variant: 'favoritesPage';
  product: FavoriteItem;
  onRemoveFromFavorites: () => void;
  onAddToCart: () => void;
};

export type ShopProductCardProps = CatalogShopProductCardProps | FavoritesPageGridCardProps;

export function ShopProductCard(props: ShopProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isFavoritesPageGrid = props.variant === 'favoritesPage';
  const product = props.product;
  const { isFavorite, toggleProduct } = useFavorites();
  const favorite = !isFavoritesPageGrid && isFavorite(product.productId);
  const navigate = useNavigate();
  const productPath = `/product/${product.productId}`;

  const navigateToProduct = useCallback(() => {
    navigate(productPath);
  }, [navigate, productPath]);

  // handle the keyboard event for the card
  const handleCardKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navigateToProduct();
      }
    },
    [navigateToProduct]
  );

  const removeFavorite = useCallback(() => {
    if (isFavoritesPageGrid) {
      props.onRemoveFromFavorites();
      return;
    }

    toggleProduct(props.product);
  }, [isFavoritesPageGrid, props, toggleProduct]);

  const addToCart = useCallback(() => {
    if (isFavoritesPageGrid) {
      props.onAddToCart();
      return;
    }

    props.onAddToCart(props.product);
  }, [isFavoritesPageGrid, props]);

  const handleFavoriteClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      removeFavorite();
    },
    [removeFavorite]
  );

  const handleAddToCartClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      addToCart();
    },
    [addToCart]
  );

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={navigateToProduct}
      onKeyDown={handleCardKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`View ${product.productName} details`}
    >
      <div className="relative">
        <div className="mb-3 aspect-[3/4] overflow-hidden border border-gray-300 bg-gray-200">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="h-full w-full object-cover"
          />
        </div>

        <button
          type="button"
          onClick={handleFavoriteClick}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-gray-300 bg-white hover:bg-gray-50"
          aria-label={
            isFavoritesPageGrid ? 'Remove from favorites' : favorite ? 'Remove from favorites' : 'Add to favorites'
          }
        >
          <Heart
            className={`h-4 w-4 ${
              isFavoritesPageGrid || favorite ? 'fill-gray-900 text-gray-900' : 'text-gray-700'
            }`}
          />
        </button>

        {isHovered ? (
          <div className="absolute bottom-3 left-3 right-3 hidden md:block">
            <button
              type="button"
              onClick={handleAddToCartClick}
              className="flex h-10 w-full items-center justify-center gap-2 bg-gray-900 text-sm text-white hover:bg-gray-800"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        ) : null}
      </div>

      <div>
        <p className="mb-2 block text-sm text-gray-900 hover:text-gray-600">{product.productName}</p>
        <p className="text-gray-700">${product.price.toFixed(2)}</p>
      </div>

      <button
        type="button"
        onClick={handleAddToCartClick}
        className="mt-3 flex h-10 w-full items-center justify-center gap-2 border border-gray-900 text-sm text-gray-900 hover:bg-gray-50 md:hidden"
      >
        <ShoppingCart className="h-4 w-4" />
        Add to Cart
      </button>
    </div>
  );
}
