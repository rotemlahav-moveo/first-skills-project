import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '../utils';
import type { CartItem } from '../types';

type CartItemRowProps = {
  item: CartItem;
  onIncreaseQuantity: (itemId: string) => void;
  onDecreaseQuantity: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
};

export function CartItemRow({ item, onIncreaseQuantity, onDecreaseQuantity, onRemoveItem }: CartItemRowProps) {
  return (
    <Card className="p-4">
      <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
        <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
          <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg text-gray-900">{item.name}</h3>
              <p className="mt-1 text-sm text-gray-600">
                Color: {item.color} - Size: {item.size}
              </p>
            </div>
            <p className="text-lg text-gray-900">{formatCurrency(item.price)}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-md border border-gray-300 p-1">
              <Button
                aria-label={`Decrease quantity for ${item.name}`}
                onClick={() => onDecreaseQuantity(item.id)}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Minus />
              </Button>
              <span className="min-w-8 text-center text-sm text-gray-900">{item.quantity}</span>
              <Button
                aria-label={`Increase quantity for ${item.name}`}
                onClick={() => onIncreaseQuantity(item.id)}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Plus />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-700">{formatCurrency(item.price * item.quantity)}</p>
              <Button
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => onRemoveItem(item.id)}
                variant="outline"
                size="sm"
                className="h-8"
              >
                <Trash2 /> Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
