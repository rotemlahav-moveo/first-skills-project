# References — Backend shop filters + URL state

## Similar implementations

### Shop listing (current)

- **Location:** [`apps/front/src/app/shop/ShopPage.tsx`](../../../apps/front/src/app/shop/ShopPage.tsx), [`apps/front/src/app/shop/filterProducts.ts`](../../../apps/front/src/app/shop/filterProducts.ts), [`apps/front/src/app/shop/formConfig.ts`](../../../apps/front/src/app/shop/formConfig.ts)
- **Relevance:** Source of filter/sort rules and UI field structure before server move.
- **Key patterns:** `toFilterSelections`, `FilterSectionTitle`, `SortOption`.

### Products API

- **Location:** [`apps/front/src/redux/productsApi/productsApi.ts`](../../../apps/front/src/redux/productsApi/productsApi.ts), [`apps/backend/src/app/products/controllers/products.controller.ts`](../../../apps/backend/src/app/products/controllers/products.controller.ts), [`apps/backend/src/app/products/services/products.service.ts`](../../../apps/backend/src/app/products/services/products.service.ts)
- **Relevance:** Extend list endpoint query args and service query logic.
- **Key patterns:** Optional `department` query; RTK `injectEndpoints`.

### Home products section

- **Location:** [`apps/front/src/app/home/sections/ProductsSection.tsx`](../../../apps/front/src/app/home/sections/ProductsSection.tsx)
- **Relevance:** Must keep calling `useGetProductsQuery()` with no extra params.

### Prior department filtering spec

- **Location:** [`agent-os/specs/2026-04-29-1453-department-based-product-filtering/`](../2026-04-29-1453-department-based-product-filtering/)
- **Relevance:** Department filter on `GET /products` and shared contracts precedent.
