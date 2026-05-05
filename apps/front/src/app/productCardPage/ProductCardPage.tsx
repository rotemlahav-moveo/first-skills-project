import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../redux/productsApi/productsApi';
import { useCart } from '../cart/CartContext';
import { SiteFooter } from '../home/components/SiteFooter';
import { SiteHeader } from '../home/components/SiteHeader';
import { useToast } from '../toast/useToast';
import { ProductDescriptionSection } from './sections/ProductDescriptionSection';
import { ProductMediaSection } from './sections/ProductMediaSection';
import { ProductPurchaseSection } from './sections/ProductPurchaseSection';

function fallbackSize(sizes: string[]): string {
  const preferredSize = sizes.find((size) => size === 'M');
  return preferredSize ?? sizes[0] ?? 'M';
}

export function ProductCardPage() {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const { showSuccess } = useToast();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(productId ?? '', {
    skip: !productId,
  });
  const defaultSize = useMemo(() => fallbackSize(product?.sizes ?? []), [product?.sizes]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const activeSize = selectedSize || defaultSize;

  const handleAddToCart = async () => {
    if (!product) {
      return;
    }

    setIsAddingToCart(true);

    // Keep async flow explicit so UI can show disabled/pending state.
    await Promise.resolve();

    addToCart({
      id: product.productId,
      name: product.productName,
      color: product.color,
      size: activeSize,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
    });

    setIsAddingToCart(false);
    showSuccess('Added to cart');
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-white py-10">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Link to="/shop" className="mb-8 inline-block text-sm text-gray-600 hover:text-gray-900">
            ← Back to shop
          </Link>

          {isLoading ? (
            <p className="py-20 text-center text-sm text-gray-600">Loading product...</p>
          ) : isError ? (
            <p className="py-20 text-center text-sm text-red-600">Failed to load this product.</p>
          ) : !product ? (
            <p className="py-20 text-center text-sm text-gray-600">Product not found.</p>
          ) : (
            <div className="space-y-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
                <ProductMediaSection imageUrl={product.imageUrl} name={product.productName} />
                <ProductPurchaseSection
                  product={product}
                  selectedSize={activeSize}
                  quantity={quantity}
                  isAddingToCart={isAddingToCart}
                  onSelectSize={setSelectedSize}
                  onDecreaseQuantity={() => setQuantity((current) => Math.max(1, current - 1))}
                  onIncreaseQuantity={() => setQuantity((current) => current + 1)}
                  onAddToCart={handleAddToCart}
                />
              </div>

              <ProductDescriptionSection description={product.description} />
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
