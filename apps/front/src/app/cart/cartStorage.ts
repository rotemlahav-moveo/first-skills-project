import type { CartItem } from './types';

const CART_STORAGE_KEY = 'snap_style_cart_v1';

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

export function readCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
}

export function writeCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    if (items.length === 0) {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Quota or private mode — ignore
  }
}
