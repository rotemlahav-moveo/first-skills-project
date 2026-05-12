import type { ProductDto } from '@shared/products-contracts';
import { toFavoriteItemDto } from '@shared/favorites-contracts';
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
import { useReplaceFavoritesMutation, useLazyGetFavoritesQuery } from '../../redux/favoritesApi/favoritesApi';
import { useAuth } from '../auth/AuthContext';
import { FAVORITES_MAX_ITEMS } from './constants';
import { readFavoritesFromCookie, writeFavoritesToCookie } from './favoritesCookieStorage';
import { mergeServerAndCookieFavorites } from './mergeFavorites';
import type { FavoriteItem } from './types';
import { isFavoritesInitialSyncDone, markFavoritesInitialSyncDone } from '../sync/initialGuestCookieMergeStorage';

type FavoritesContextValue = {
  items: FavoriteItem[];
  favoritesCount: number;
  isAtFavoritesLimit: boolean;
  isFavorite: (productId: string) => boolean;
  toggleProduct: (product: ProductDto) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

type FavoritesProviderProps = {
  children: ReactNode;
};

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const { user } = useAuth();
  const [items, setItems] = useState<FavoriteItem[]>(() => readFavoritesFromCookie());
  const [replaceFavorites] = useReplaceFavoritesMutation();
  const [getFavorites] = useLazyGetFavoritesQuery();
  /** Last user id we finished a server/cookie sync for; `null` means guest or never logged in this tab. */
  const lastSyncedUserIdRef = useRef<string | null>(null);

  const replaceLocal = useCallback((next: FavoriteItem[]) => {
    setItems(next);
    writeFavoritesToCookie(next);
  }, []);

  const syncToServerIfAuthed = useCallback(
    async (next: FavoriteItem[]) => {
      if (!user) {
        return;
      }
      try {
        await replaceFavorites({ productIds: next.map((item) => item.productId) }).unwrap();
      } catch {
        try {
          const server = await getFavorites().unwrap();
          replaceLocal(server);
        } catch {
          /* keep local cookie state */
        }
      }
    },
    [user, replaceFavorites, getFavorites, replaceLocal],
  );

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
    (async () => {
      try {
        const previous = lastSyncedUserIdRef.current;
        const server = await getFavorites().unwrap();
        if (cancelled) {
          return;
        }

        const cookieItems = readFavoritesFromCookie();
        let next: FavoriteItem[];

        if (previous !== null && previous !== uid) {
          next = server;
        } else if (
          previous === null &&
          !isFavoritesInitialSyncDone(uid) &&
          server.length === 0 &&
          cookieItems.length > 0
        ) {
          next = mergeServerAndCookieFavorites(server, cookieItems);
        } else {
          next = server;
        }

        replaceLocal(next);
        await replaceFavorites({ productIds: next.map((item) => item.productId) }).unwrap();
        lastSyncedUserIdRef.current = uid;
        if (previous === null) {
          markFavoritesInitialSyncDone(uid);
        }
      } catch {
        /* keep local; do not advance lastSyncedUserIdRef on failed GET */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.userId, getFavorites, replaceFavorites, replaceLocal]);

  const isFavorite = useCallback(
    (productId: string) => items.some((item) => item.productId === productId),
    [items],
  );

  const toggleProduct = useCallback(
    (product: ProductDto) => {
      setItems((current) => {
        const id = product.productId;
        const exists = current.some((item) => item.productId === id);
        let next: FavoriteItem[];
        if (exists) {
          next = current.filter((item) => item.productId !== id);
        } else {
          if (current.length >= FAVORITES_MAX_ITEMS) {
            return current;
          }
          next = [...current, toFavoriteItemDto(product)];
        }
        writeFavoritesToCookie(next);
        void syncToServerIfAuthed(next);
        return next;
      });
    },
    [syncToServerIfAuthed],
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((current) => {
        const next = current.filter((item) => item.productId !== productId);
        writeFavoritesToCookie(next);
        void syncToServerIfAuthed(next);
        return next;
      });
    },
    [syncToServerIfAuthed],
  );

  const clear = useCallback(() => {
    setItems(() => {
      const next: FavoriteItem[] = [];
      writeFavoritesToCookie(next);
      void syncToServerIfAuthed(next);
      return next;
    });
  }, [syncToServerIfAuthed]);

  const isAtFavoritesLimit = items.length >= FAVORITES_MAX_ITEMS;

  const value = useMemo(
    () => ({
      items,
      favoritesCount: items.length,
      isAtFavoritesLimit,
      isFavorite,
      toggleProduct,
      removeItem,
      clear,
    }),
    [items, isAtFavoritesLimit, isFavorite, toggleProduct, removeItem, clear],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return ctx;
}
