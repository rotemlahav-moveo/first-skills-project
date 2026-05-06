import type { ShopProduct } from '../types';
import { ShopProductCard } from '../components/ShopProductCard';

type ShopProductsSectionProps = {
  products: ShopProduct[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onAddToCart: (product: ShopProduct) => void;
};

export function ShopProductsSection({
  products,
  totalProducts,
  currentPage,
  totalPages,
  onPageChange,
  onAddToCart,
}: ShopProductsSectionProps) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const previousPage = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <div className="mb-6">
        <p className="text-sm text-gray-600">{totalProducts} products</p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ShopProductCard key={product.productId} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>

      <div className="mt-16 flex items-center justify-center gap-2">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous page"
          onClick={previousPage}
          disabled={!canGoPrevious}
        >
          ←
        </button>
        {pageNumbers.map((pageNumber) => {
          const isActive = pageNumber === currentPage;
          return (
            <button
              key={pageNumber}
              type="button"
              className={
                isActive
                  ? 'flex h-10 w-10 items-center justify-center bg-gray-900 text-white'
                  : 'flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-900 hover:bg-gray-50'
              }
              onClick={() => onPageChange(pageNumber)}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next page"
          onClick={nextPage}
          disabled={!canGoNext}
        >
          →
        </button>
      </div>
    </>
  );
}
