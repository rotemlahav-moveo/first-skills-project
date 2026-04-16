import { CartItemRow } from '../components/CartItemRow';
import type { CartItem } from '../types';

type CartItemsSectionProps = {
  items: CartItem[];
  onIncreaseQuantity: (itemId: string) => void;
  onDecreaseQuantity: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
};

export function CartItemsSection({
  items,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}: CartItemsSectionProps) {
  return (
    <section aria-labelledby="cart-items-heading" className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 id="cart-items-heading" className="text-2xl text-gray-900">
          Cart Items
        </h2>
        <p className="text-sm text-gray-600">
          {items.length} {items.length === 1 ? 'style selected' : 'styles selected'}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </section>
  );
}
