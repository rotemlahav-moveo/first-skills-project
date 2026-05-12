import type { SavedCartItemDto } from '@shared/cart-contracts';
import { CART_MAX_LINE_ITEMS } from '@shared/cart-contracts';
import type { CartItem } from './types';

/** Server order first, then cookie-only rows, capped (same idea as favorites). */
export function mergeServerAndCookieCart(
  server: SavedCartItemDto[],
  cookie: CartItem[],
): CartItem[] {
  const seen = new Set(server.map((row) => row.id));
  const out: CartItem[] = [...server];
  for (const item of cookie) {
    if (out.length >= CART_MAX_LINE_ITEMS) {
      break;
    }
    if (!seen.has(item.id)) {
      seen.add(item.id);
      out.push(item);
    }
  }
  return out.slice(0, CART_MAX_LINE_ITEMS);
}
