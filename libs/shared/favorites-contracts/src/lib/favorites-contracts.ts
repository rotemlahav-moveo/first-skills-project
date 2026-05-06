/** One saved favorite row (cookie, API, UI). */
export type FavoriteItemDto = {
  productId: string;
  productName: string;
  price: number;
  imageUrl: string;
  color: string;
  sizes: string[];
};

/** Any product-like record used to build a favorite row. */
export type FavoriteItemSource = {
  productId: string;
  productName: string;
  price: number | string;
  imageUrl: string;
  color: string;
  sizes?: string[] | null;
};

/** Map product fields into a favorite DTO (front cookie + backend GET). */
export function toFavoriteItemDto(source: FavoriteItemSource): FavoriteItemDto {
  return {
    productId: source.productId,
    productName: source.productName,
    price: typeof source.price === 'string' ? Number(source.price) : source.price,
    imageUrl: source.imageUrl,
    color: source.color,
    sizes: source.sizes ?? [],
  };
}

export type ReplaceFavoritesRequestDto = {
  productIds: string[];
};

/** Shared cap for cookie, API, and DB sync. */
export const FAVORITES_MAX_ITEMS = 30;
