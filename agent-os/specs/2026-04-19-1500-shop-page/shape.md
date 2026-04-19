# Shop page — Shaping Notes

## Scope

Shop route at `/shop` with filters, sort, product grid, add-to-cart, and homepage “View All” link. Cart state is shared app-wide via `CartProvider`. UI aligned with Figma Make wireframe for the shop preview.

## Decisions

- `CartProvider` wraps the app (inside `BrowserRouter`) with `useCart()` for `/cart` and `/shop`.
- Initial cart items remain `INITIAL_CART_ITEMS` from `mockCart.ts` for continuity.
- Shop uses dedicated components under `apps/front/src/app/shop/`; home `ProductCard` unchanged.
- Filters are client-side with checkbox selections per section (Category, Size, Color, Price Range, Brand).
- Product detail links from cards point to `#` or omitted for MVP (Figma used `/product/:id` which is not in app routes yet); cards focus on add-to-cart.

## Context

- **Visuals:** [Figma Make shop](https://www.figma.com/make/fRvRx3rPlaAGZc9I7dRRhM/E-commerce-Website-Wireframe?preview-route=%2Fshop)
- **References:** Cart page spec `agent-os/specs/2026-04-16-1211-cart-page/`, `CartPage.tsx`, `HowItWorksSection.tsx`
- **Product alignment:** Roadmap Phase 1 — product listing + cart MVP

## Standards Applied

- `frontend/new-section-component-hierarchy` — shop split into page + sections + components; Tailwind-first styling.
