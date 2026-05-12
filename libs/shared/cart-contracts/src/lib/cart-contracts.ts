/** One line sent on PUT /cart (server validates product exists). */
export type CartLineReplaceDto = {
  productId: string;
  quantity: number;
  size: string;
  color: string;
};

export type ReplaceCartRequestDto = {
  items: CartLineReplaceDto[];
};

/** Mirrors UI cart row (same shape as client `CartItem`). */
export type SavedCartItemDto = {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

/** Max distinct products per cart (guest cookie + authenticated DB). */
export const CART_MAX_LINE_ITEMS = 30;
