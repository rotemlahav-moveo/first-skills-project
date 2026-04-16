import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { SiteFooter } from '../home/components/SiteFooter';
import { SiteHeader } from '../home/components/SiteHeader';
import { INITIAL_CART_ITEMS } from './mockCart';
import { CartItemsSection } from './sections/CartItemsSection';
import { CartSummarySection } from './sections/CartSummarySection';
import { EmptyCartSection } from './sections/EmptyCartSection';
import type { CartItem } from './types';

export function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  function removeItem(itemId: string) {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  }

  function updateItemQuantity(itemId: string, nextQuantity: number) {
    if (nextQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  }

  function increaseQuantity(itemId: string) {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    if (!item) {
      return;
    }

    updateItemQuantity(itemId, item.quantity + 1);
  }

  function decreaseQuantity(itemId: string) {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    if (!item) {
      return;
    }

    updateItemQuantity(itemId, item.quantity - 1);
  }

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
              to="/"
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
