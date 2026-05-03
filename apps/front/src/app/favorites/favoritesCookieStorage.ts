import type { FavoriteItem } from './types';
import { FAVORITES_COOKIE_MAX_AGE, FAVORITES_COOKIE_NAME } from './constants';

function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }
  const prefix = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(';');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(prefix)) {
      return decodeURIComponent(trimmed.slice(prefix.length));
    }
  }
  return null;
}

export function readFavoritesFromCookie(): FavoriteItem[] {
  const raw = getCookieValue(FAVORITES_COOKIE_NAME);
  if (!raw) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isFavoriteItem);
  } catch {
    return [];
  }
}

function isFavoriteItem(value: unknown): value is FavoriteItem {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const row = value as Record<string, unknown>;
  return (
    typeof row.productId === 'string' &&
    typeof row.productName === 'string' &&
    typeof row.price === 'number' &&
    typeof row.imageUrl === 'string' &&
    typeof row.color === 'string' &&
    Array.isArray(row.sizes) &&
    row.sizes.every((s) => typeof s === 'string')
  );
}

export function writeFavoritesToCookie(items: FavoriteItem[]): void {
  if (typeof document === 'undefined') {
    return;
  }
  const payload = encodeURIComponent(JSON.stringify(items));
  document.cookie = `${encodeURIComponent(FAVORITES_COOKIE_NAME)}=${payload};path=/;max-age=${FAVORITES_COOKIE_MAX_AGE};SameSite=Lax`;
}
