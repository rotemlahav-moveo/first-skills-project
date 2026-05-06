# Wishlist / Favorites — Shaping Notes

## Scope

- Favorites page at `/favorites` with grid, empty state, per-item add to cart, add all to cart, clear all.
- Header: Favorites nav next to Cart; heart icon link to `/favorites` with optional count badge.
- Heart toggles on shop cards, product detail, and home featured products.
- Persistence: **browser cookie** storing a JSON array of compact product payloads (no new backend API).

## Decisions

- Cookie-based storage (user request); cap list size to reduce 4KB cookie risk.
- Reuse cart `addToCart` with default size rule (prefer `M`, else first size).
- Backend `Wishlist` entity left unused for a future server-backed migration.

## Context

- **Visuals:** [Figma Make — E-commerce Website Wireframe](https://www.figma.com/make/fRvRx3rPlaAGZc9I7dRRhM/E-commerce-Website-Wireframe) (`fileKey` `fRvRx3rPlaAGZc9I7dRRhM`); Favorites page and Header/ProductCard source via MCP.
- **References:** Cart page composition, `ShopProductCard`, `SiteHeader`, `SiteFooter`.
- **Product alignment:** Supports MVP discovery-to-purchase and existing “save favorites” copy.

## Standards Applied

- `frontend/new-section-component-hierarchy` — favorites UI split into page sections.
- `frontend/redux-rtk-query-api-standard` — exception documented for wishlist cookie persistence (no wishlist HTTP API).
- `global/extract-repeated-literals-to-enums` — cookie name and caps in shared constants.
