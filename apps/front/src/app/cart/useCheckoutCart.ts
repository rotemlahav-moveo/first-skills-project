import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../redux/authApi/authApi';
import { useCheckoutMutation } from '../../redux/checkoutApi/checkoutApi';
import { useAuth } from '../auth/AuthContext';
import { ROUTES } from '../routes';
import { useCart } from './CartContext';

export type CheckoutRunResult =
  | { status: 'navigated' }
  | { status: 'success' }
  | { status: 'error'; message: string };

export function useCheckoutCart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [checkout, { isLoading }] = useCheckoutMutation();

  const runCheckout = useCallback(async (): Promise<CheckoutRunResult> => {
    if (!user) {
      navigate(ROUTES.SIGN_IN, { state: { from: ROUTES.CART } });
      return { status: 'navigated' };
    }
    const items = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }));
    try {
      await checkout({ items }).unwrap();
      clearCart();
      return { status: 'success' };
    } catch (e) {
      return { status: 'error', message: getErrorMessage(e) };
    }
  }, [user, navigate, cartItems, checkout, clearCart]);

  return { runCheckout, isCheckoutLoading: isLoading };
}
