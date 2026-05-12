import type { SavedCartItemDto } from '@shared/cart-contracts';

export type CartItem = SavedCartItemDto;

/** Payload for `addToCart`; quantity defaults to 1 in cart logic. */
export type AddToCartInput = Omit<CartItem, 'quantity'> & {
  quantity?: number;
};
