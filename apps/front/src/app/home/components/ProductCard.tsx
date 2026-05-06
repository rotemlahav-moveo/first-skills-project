import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ProductDto } from '@shared/products-contracts';
import { useFavorites } from '@/app/favorites/FavoritesContext';

type ProductCardProps = {
  product: ProductDto;
};

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { isFavorite, toggleProduct } = useFavorites();
  const favorite = isFavorite(product.productId);
  const productPath = `/product/${product.productId}`;

  return (
    <div
      className="group cursor-pointer"
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
      <Card className="overflow-hidden border-gray-300 bg-white shadow-none transition hover:bg-gray-50">
        <div className="relative mb-3 aspect-[3/4] overflow-hidden border-b border-gray-300 bg-gray-200">
          <img src={product.imageUrl} alt={product.productName} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              toggleProduct(product);
            }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-gray-300 bg-white hover:bg-gray-50"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`h-4 w-4 ${favorite ? 'fill-gray-900 text-gray-900' : 'text-gray-700'}`}
            />
          </button>
        </div>
        <CardContent className="grid gap-2 p-4 pt-0">
          <p className="text-xs uppercase tracking-wide text-gray-600">{product.category.categoryName}</p>
          <h3 className="text-sm text-gray-900 md:text-base">{product.productName}</h3>
          <p className="text-sm text-gray-700">${product.price.toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  );
}
