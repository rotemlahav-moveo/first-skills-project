# Backend shop filters + URL state — Shaping notes

## Scope

- Move shop facet filtering (Category, Size, Color, Price Range, Brand) and product sorting from the client to `GET /products`.
- Persist `department`, all facet filters, and `sort` in URL search params so refresh and shared links restore the same catalog view.

## Decisions

- **URL encoding:** `department` (unchanged), `sort` (`featured` | `price-asc` | `price-desc` | `newest`), repeated keys for multi-select: `category`, `size`, `color`, `priceRange`, `brand` (e.g. `category=Tops&category=Bottoms`).
- **Server semantics:** Match existing [`filterProducts`](apps/front/src/app/shop/filterProducts.ts) — OR within each facet, AND across facets; invalid `sort` falls back to featured ordering.
- **Sort in URL:** Included (user confirmed filters + sort).

## Context

- **Visuals:** None.
- **References:** Shop page, products API, products service/controller; prior spec `2026-04-29-1453-department-based-product-filtering`.
- **Product alignment:** Shareable, refresh-safe filtered views support faster discovery ([mission.md](../../product/mission.md)).

## Standards applied

See [standards.md](./standards.md).
