import { CART_COOKIE_MAX_AGE, CART_COOKIE_NAME } from './constants';
import type { CartItem } from './types';

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

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'string' &&
    typeof row.name === 'string' &&
    typeof row.color === 'string' &&
    typeof row.size === 'string' &&
    typeof row.price === 'number' &&
    typeof row.quantity === 'number' &&
    Number.isFinite(row.quantity) &&
    row.quantity >= 1 &&
    typeof row.imageUrl === 'string'
  );
}

export function readCartFromCookie(): CartItem[] {
  const raw = getCookieValue(CART_COOKIE_NAME);
  if (!raw) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
}

export function writeCartToCookie(items: CartItem[]): void {
  if (typeof document === 'undefined') {
    return;
  }
  const payload = encodeURIComponent(JSON.stringify(items));
  document.cookie = `${encodeURIComponent(CART_COOKIE_NAME)}=${payload};path=/;max-age=${CART_COOKIE_MAX_AGE};SameSite=Lax`;
}
