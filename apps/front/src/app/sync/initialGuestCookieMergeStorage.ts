/**
 * After the first successful logged-in sync in this browser, treat the server cart /
 * favorites as authoritative when the server returns an empty list, instead of
 * re-merging stale guest cookies (e.g. cart cleared by checkout on another device).
 */
const cartKey = (userId: string) => `snapstyle:cart_initial_sync:${userId}`;
const favoritesKey = (userId: string) => `snapstyle:favorites_initial_sync:${userId}`;

export function isCartInitialSyncDone(userId: string): boolean {
  try {
    return localStorage.getItem(cartKey(userId)) === '1';
  } catch {
    return true;
  }
}

export function markCartInitialSyncDone(userId: string): void {
  try {
    localStorage.setItem(cartKey(userId), '1');
  } catch {
    /* ignore */
  }
}

export function isFavoritesInitialSyncDone(userId: string): boolean {
  try {
    return localStorage.getItem(favoritesKey(userId)) === '1';
  } catch {
    return true;
  }
}

export function markFavoritesInitialSyncDone(userId: string): void {
  try {
    localStorage.setItem(favoritesKey(userId), '1');
  } catch {
    /* ignore */
  }
}
