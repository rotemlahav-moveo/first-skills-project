import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { SiteFooter } from '../home/components/SiteFooter';
import { SiteHeader } from '../home/components/SiteHeader';
import { useCart } from './CartContext';
import { CartItemsSection } from './sections/CartItemsSection';
import { CartSummarySection } from './sections/CartSummarySection';
import { EmptyCartSection } from './sections/EmptyCartSection';

export function CartPage() {
  const { cartItems, removeItem, increaseQuantity, decreaseQuantity } = useCart();

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );
  const shipping = cartItems.length > 0 ? 8 : 0;
  const total = subtotal + shipping;
  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

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
            <h1 className="text-4xl text-gray-900 md:text-5xl">Your Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <EmptyCartSection />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              <CartItemsSection
                items={cartItems}
                onIncreaseQuantity={increaseQuantity}
                onDecreaseQuantity={decreaseQuantity}
                onRemoveItem={removeItem}
              />
              <CartSummarySection
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                totalItems={totalItems}
              />
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
