# References for Shop page

## Similar implementations

### Cart page (local state → provider)

- **Location:** [`apps/front/src/app/cart/CartPage.tsx`](../../../apps/front/src/app/cart/CartPage.tsx)
- **Relevance:** Layout pattern (`SiteHeader`, `main`, `max-w-[1440px]`, `SiteFooter`), cart line items and totals.
- **Key patterns:** Section components under `cart/sections/`; extracted after shared cart context.

### Homepage — Featured products

- **Location:** [`apps/front/src/app/home/sections/HowItWorksSection.tsx`](../../../apps/front/src/app/home/sections/HowItWorksSection.tsx)
- **Relevance:** “View All” CTA wired to `/shop`.
- **Key patterns:** `SectionHeading`, product grid spacing.

### Figma Make source (design reference)

- **Location:** Figma file `fRvRx3rPlaAGZc9I7dRRhM` — pages `ProductListing`, components `FilterPanel`, `ProductCard`.
- **Relevance:** Breadcrumb, filter sidebar, mobile filter drawer, sort dropdown, grid, pagination, hover add-to-cart.

### Prior spec

- **Location:** [`agent-os/specs/2026-04-16-1211-cart-page/`](../2026-04-16-1211-cart-page/)
- **Relevance:** MVP cart UX and section extraction decisions.
