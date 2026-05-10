import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { readCartFromStorage, writeCartToStorage } from './cartStorage';
import type { AddToCartInput, CartItem } from './types';

type CartContextValue = {
  cartItems: CartItem[];
  addToCart: (input: AddToCartInput) => void;
  removeItem: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => readCartFromStorage());

  useEffect(() => {
    writeCartToStorage(cartItems);
  }, [cartItems]);

  const removeItem = useCallback((itemId: string) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  }, []);

  const addToCart = useCallback((input: AddToCartInput) => {
    const qty = input.quantity ?? 1;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === input.id);
      if (existing) {
        return prev.map((item) =>
          item.id === input.id ? { ...item, quantity: item.quantity + qty } : item,
        );
      }
      return [
        ...prev,
        {
          id: input.id,
          name: input.name,
          color: input.color,
          size: input.size,
          price: input.price,
          imageUrl: input.imageUrl,
          quantity: qty,
        },
      ];
    });
  }, []);

  const increaseQuantity = useCallback(
    (itemId: string) => {
      setCartItems((prev) => {
        const item = prev.find((cartItem) => cartItem.id === itemId);
        if (!item) {
          return prev;
        }
        return prev.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        );
      });
    },
    [],
  );

  const decreaseQuantity = useCallback(
    (itemId: string) => {
      setCartItems((prev) => {
        const item = prev.find((cartItem) => cartItem.id === itemId);
        if (!item) {
          return prev;
        }
        const next = item.quantity - 1;
        if (next <= 0) {
          return prev.filter((cartItem) => cartItem.id !== itemId);
        }
        return prev.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: next } : cartItem,
        );
      });
    },
    [],
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [cartItems, addToCart, removeItem, increaseQuantity, decreaseQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
