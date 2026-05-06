# References for Shop Pagination Navigation

## Similar Implementations

### Shop page query orchestration

- Location: `apps/front/src/app/shop/ShopPage.tsx`
- Relevance: Current source of truth for URL/search params and RTK Query request args.
- Key patterns: `useSearchParams` integration, form-sync effects, query args derivation.

### Shop URL param mappers

- Location: `apps/front/src/app/shop/shopSearchParams.ts`
- Relevance: Existing mapper/parsers for translating URL params to frontend query args and form values.
- Key patterns: parsing enum/list params, URL write-back normalization.

### Products RTK Query endpoint

- Location: `apps/front/src/redux/productsApi/productsApi.ts`
- Relevance: Defines how frontend sends product list query args to backend.
- Key patterns: `baseApi.injectEndpoints`, request `params: args`.

### Shop products section pagination UI

- Location: `apps/front/src/app/shop/sections/ShopProductsSection.tsx`
- Relevance: Contains pagination buttons to convert from static controls into controlled page navigation.
- Key patterns: rendering product list + pagination controls in same section.

### Backend product list query parsing

- Location: `apps/backend/src/app/products/dto/parse-product-list-query.ts`
- Relevance: Current canonical parser for `page` and `limit`.
- Key patterns: sanitize query params, defaults, positive integer guards.

### Backend query builder pagination

- Location: `apps/backend/src/app/products/services/products-list-query-builder.service.ts`
- Relevance: Applies `take(limit)` and `skip(offset)` logic for page slicing.
- Key patterns: derived offset from page/limit and capped limit behavior.

### Shared products contracts

- Location: `libs/shared/products-contracts/src/lib/products-contracts.ts`
- Relevance: Shared types between frontend and backend for request/response shaping.
- Key patterns: cross-app DTO/query type definitions in `libs`.
