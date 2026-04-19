import type { ShopProduct } from '../types';
import { ShopProductCard } from '../components/ShopProductCard';

type ShopProductsSectionProps = {
  products: ShopProduct[];
  onAddToCart: (product: ShopProduct) => void;
};

export function ShopProductsSection({ products, onAddToCart }: ShopProductsSectionProps) {
  return (
    <>
      <div className="mb-6">
        <p className="text-sm text-gray-600">{products.length} products</p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ShopProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>

      <div className="mt-16 flex items-center justify-center gap-2">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50"
          aria-label="Previous page"
        >
          ←
        </button>
        <button type="button" className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white">
          1
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-900 hover:bg-gray-50"
        >
          2
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-900 hover:bg-gray-50"
        >
          3
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50"
          aria-label="Next page"
        >
          →
        </button>
      </div>
    </>
  );
}
