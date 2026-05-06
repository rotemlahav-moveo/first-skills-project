# References for Wishlist / Favorites

## Similar implementations

### Cart page and context

- **Location:** [`apps/front/src/app/cart/CartPage.tsx`](../../../apps/front/src/app/cart/CartPage.tsx), [`apps/front/src/app/cart/CartContext.tsx`](../../../apps/front/src/app/cart/CartContext.tsx)
- **Relevance:** Page shell (header, main, footer), empty state pattern, `addToCart` payload shape.
- **Key patterns:** Section components under `cart/sections/`, `useCart` for mutations.

### Shop product card

- **Location:** [`apps/front/src/app/shop/components/ShopProductCard.tsx`](../../../apps/front/src/app/shop/components/ShopProductCard.tsx)
- **Relevance:** Heart overlay, hover add-to-cart, `stopPropagation` for nested buttons.
- **Key patterns:** Reuse for favorites grid card and home featured card behavior.

### Navigation

- **Location:** [`apps/front/src/app/home/components/SiteHeader.tsx`](../../../apps/front/src/app/home/components/SiteHeader.tsx), [`apps/front/src/app/home/components/SiteFooter.tsx`](../../../apps/front/src/app/home/components/SiteFooter.tsx)
- **Relevance:** Footer already links `/favorites`; extend header with Favorites + heart.

## Figma Make

- Wireframe file: `https://www.figma.com/make/fRvRx3rPlaAGZc9I7dRRhM/E-commerce-Website-Wireframe`
- MCP source URIs (examples): `file://figma/make/source/fRvRx3rPlaAGZc9I7dRRhM/src/app/pages/Favorites.tsx`, `Header.tsx`, `ProductCard.tsx`

## Backend (out of scope)

- **Location:** [`apps/backend/src/app/wishlist/entities/wishlist.entity.ts`](../../../apps/backend/src/app/wishlist/entities/wishlist.entity.ts)
- **Relevance:** Future server persistence only.
