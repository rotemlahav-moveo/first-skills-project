import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ShopProduct } from '../types';

type ShopProductCardProps = {
  product: ShopProduct;
  onAddToCart: (product: ShopProduct) => void;
};

export function ShopProductCard({ product, onAddToCart }: ShopProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const productPath = `/product/${product.productId}`;

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(productPath)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigate(productPath);
        }
      }}
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
          onClick={(event) => {
            event.stopPropagation();
            setIsFavorite((previous) => !previous);
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-gray-300 bg-white hover:bg-gray-50"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`h-4 w-4 ${isFavorite ? 'fill-gray-900 text-gray-900' : 'text-gray-700'}`}
          />
        </button>

        {isHovered && (
          <div className="absolute bottom-3 left-3 right-3 hidden md:block">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onAddToCart(product);
              }}
              className="flex h-10 w-full items-center justify-center gap-2 bg-gray-900 text-sm text-white hover:bg-gray-800"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        )}
      </div>

      <div>
        <p className="mb-2 block text-sm text-gray-900 hover:text-gray-600">
          {product.productName}
        </p>
        <p className="text-gray-700">${product.price.toFixed(2)}</p>
      </div>
      {/* Mobile Add to Cart Button */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onAddToCart(product);
        }}
        className="mt-3 flex h-10 w-full items-center justify-center gap-2 border border-gray-900 text-sm text-gray-900 hover:bg-gray-50 md:hidden"
      >
        <ShoppingCart className="h-4 w-4" />
        Add to Cart
      </button>
    </div>
  );
}
