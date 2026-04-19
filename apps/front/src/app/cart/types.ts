export type CartItem = {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

/** Payload for `addToCart`; quantity defaults to 1 in cart logic. */
export type AddToCartInput = Omit<CartItem, 'quantity'> & {
  quantity?: number;
};
