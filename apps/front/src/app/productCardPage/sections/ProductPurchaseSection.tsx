import type { ProductDto } from '@shared/products-contracts';
import { QuantitySelector } from '../components/QuantitySelector';

type ProductPurchaseSectionProps = {
  product: ProductDto;
  selectedSize: string;
  quantity: number;
  isAddingToCart: boolean;
  onSelectSize: (size: string) => void;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
  onAddToCart: () => void;
};

export function ProductPurchaseSection({
  product,
  selectedSize,
  quantity,
  isAddingToCart,
  onSelectSize,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onAddToCart,
}: ProductPurchaseSectionProps) {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">{product.brand}</p>
        <h1 className="mt-2 text-3xl font-medium text-gray-900">{product.productName}</h1>
        <p className="mt-3 text-2xl text-gray-900">${product.price.toFixed(2)}</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-gray-900">Select size</h2>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onSelectSize(size)}
                className={`h-10 min-w-12 border px-3 text-sm ${
                  isSelected
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-300 text-gray-900 hover:bg-gray-100'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-gray-900">Quantity</h2>
        <QuantitySelector
          quantity={quantity}
          onDecrease={onDecreaseQuantity}
          onIncrease={onIncreaseQuantity}
        />
      </div>

      <button
        type="button"
        onClick={onAddToCart}
        disabled={isAddingToCart}
        className="h-12 w-full bg-gray-900 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isAddingToCart ? 'Adding to cart...' : 'Add to cart'}
      </button>
    </section>
  );
}
