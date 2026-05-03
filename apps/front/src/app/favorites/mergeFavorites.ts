import type { FavoriteItemDto } from '@shared/favorites-contracts';
import { FAVORITES_MAX_ITEMS } from '@shared/favorites-contracts';

/** Server order first, then cookie-only rows, capped. */
export function mergeServerAndCookieFavorites(
  server: FavoriteItemDto[],
  cookie: FavoriteItemDto[],
): FavoriteItemDto[] {
  const seen = new Set(server.map((item) => item.productId));
  const out: FavoriteItemDto[] = [...server];
  for (const item of cookie) {
    if (out.length >= FAVORITES_MAX_ITEMS) {
      break;
    }
    if (!seen.has(item.productId)) {
      seen.add(item.productId);
      out.push(item);
    }
  }
  return out.slice(0, FAVORITES_MAX_ITEMS);
}
