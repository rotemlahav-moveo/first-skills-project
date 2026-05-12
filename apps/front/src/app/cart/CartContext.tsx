import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { readCartFromCookie, writeCartToCookie } from './cartCookieStorage';
import { CART_MAX_LINE_ITEMS } from './constants';
import { mergeServerAndCookieCart } from './mergeCart';
import type { AddToCartInput, CartItem } from './types';
import { useReplaceCartMutation, useLazyGetCartQuery } from '../../redux/cartApi/cartApi';
import { useAuth } from '../auth/AuthContext';

function readInitialCartItems(): CartItem[] {
  return readCartFromCookie();
}

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

function cartToReplaceBody(items: CartItem[]) {
  return {
    items: items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    })),
  };
}

export function CartProvider({ children }: CartProviderProps) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => readInitialCartItems());
  const [replaceCart] = useReplaceCartMutation();
  const [getCart] = useLazyGetCartQuery();
  const lastSyncedUserIdRef = useRef<string | null>(null);

  // Replace the local cart items with the new ones and write them to the cookie
  const replaceLocal = useCallback((next: CartItem[]) => {
    setCartItems(next);
    writeCartToCookie(next);
  }, []);

  // Sync the local cart items to the server if the user is authenticated
  const syncToServerIfAuthed = useCallback(
    async (next: CartItem[]) => {
      if (!user) {
        return;
      }
      try {
        await replaceCart(cartToReplaceBody(next)).unwrap();
      } catch {
        try {
          const server = await getCart().unwrap();
          replaceLocal(server);
        } catch {
          /* keep cookie */
        }
      }
    },
    [user, replaceCart, getCart, replaceLocal],
  );

  // in log in - sync the cart items to the server (getCart)
  // in log out - clear the cart items from the server (replaceCart)
  useEffect(() => {
    const uid = user?.userId ?? null;

    if (uid === null) {
      if (lastSyncedUserIdRef.current !== null) {
        replaceLocal([]);
      }
      lastSyncedUserIdRef.current = null;
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        const previous = lastSyncedUserIdRef.current;
        const server = await getCart().unwrap();
        if (cancelled) {
          return;
        }

        const cookieItems = readCartFromCookie();
        let next: CartItem[];

        if (previous !== null && previous !== uid) {
          next = server;
        } else if (previous === null && server.length === 0 && cookieItems.length > 0) {
          next = mergeServerAndCookieCart(server, cookieItems);
        } else {
          next = server;
        }

        replaceLocal(next);
        await replaceCart(cartToReplaceBody(next)).unwrap();
        lastSyncedUserIdRef.current = uid;
      } catch {
        /* keep local */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.userId, getCart, replaceCart, replaceLocal]);

  const removeItem = useCallback(
    (itemId: string) => {
      setCartItems((currentItems) => {
        const next = currentItems.filter((item) => item.id !== itemId);
        writeCartToCookie(next);
        void syncToServerIfAuthed(next);
        return next;
      });
    },
    [syncToServerIfAuthed],
  );

  const addToCart = useCallback(
    (input: AddToCartInput) => {
      const qty = input.quantity ?? 1;
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === input.id);
        let next: CartItem[];
        if (existing) {
          next = prev.map((item) =>
            item.id === input.id ? { ...item, quantity: item.quantity + qty } : item,
          );
        } else {
          if (prev.length >= CART_MAX_LINE_ITEMS) {
            return prev;
          }
          next = [
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
        }
        writeCartToCookie(next);
        void syncToServerIfAuthed(next);
        return next;
      });
    },
    [syncToServerIfAuthed],
  );

  const increaseQuantity = useCallback(
    (itemId: string) => {
      setCartItems((prev) => {
        const item = prev.find((cartItem) => cartItem.id === itemId);
        if (!item) {
          return prev;
        }
        const next = prev.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        );
        writeCartToCookie(next);
        void syncToServerIfAuthed(next);
        return next;
      });
    },
    [syncToServerIfAuthed],
  );

  const decreaseQuantity = useCallback(
    (itemId: string) => {
      setCartItems((prev) => {
        const item = prev.find((cartItem) => cartItem.id === itemId);
        if (!item) {
          return prev;
        }
        const nextQty = item.quantity - 1;
        const next =
          nextQty <= 0
            ? prev.filter((cartItem) => cartItem.id !== itemId)
            : prev.map((cartItem) =>
                cartItem.id === itemId ? { ...cartItem, quantity: nextQty } : cartItem,
              );
        writeCartToCookie(next);
        void syncToServerIfAuthed(next);
        return next;
      });
    },
    [syncToServerIfAuthed],
  );

  const clearCart = useCallback(() => {
    setCartItems(() => {
      const next: CartItem[] = [];
      writeCartToCookie(next);
      void syncToServerIfAuthed(next);
      return next;
    });
  }, [syncToServerIfAuthed]);

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
