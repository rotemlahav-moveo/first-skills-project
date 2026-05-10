/** One cart line sent to checkout (aligned with cart item selection). */
export type CheckoutLineRequestDto = {
  productId: string;
  quantity: number;
  size: string;
  color: string;
};

export type CheckoutRequestDto = {
  items: CheckoutLineRequestDto[];
};

export type CheckoutResponseDto = {
  orderId: string;
  totalAmount: number;
  subtotal: number;
  shipping: number;
};
