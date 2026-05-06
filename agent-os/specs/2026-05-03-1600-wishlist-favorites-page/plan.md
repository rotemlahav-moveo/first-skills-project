# Plan: Wishlist / favorites (cookie persistence)

## Summary

Implement `/favorites` with cookie-backed `WishlistProvider`, header Favorites + heart, heart toggles on shop / PDP / home featured, and cart actions (single + add all + clear). See `shape.md` for decisions and `references.md` for file pointers.

## Tasks

1. **Spec documentation** — This folder (`plan.md`, `shape.md`, `standards.md`, `references.md`, `visuals/README.md`).
2. **Wishlist module** — `apps/front/src/app/wishlist/`: constants, types, cookie read/write, `pickDefaultSize`, `WishlistContext`, provider in `main.tsx`.
3. **Favorites page** — `apps/front/src/app/favorites/`: `FavoritesPage`, sections (empty, grid, actions), route in `app.tsx`.
4. **SiteHeader** — Favorites link next to Cart; heart link with optional count badge.
5. **Wire surfaces** — `ShopProductCard`, `ProductCardPage` (+ purchase section or parent), `ProductsSection` with new featured card component.
6. **Verification** — Lint/build for `front` app; manual cookie reload smoke test.

## Out of scope

Nest wishlist REST API; full Figma header (search / mobile drawer).
