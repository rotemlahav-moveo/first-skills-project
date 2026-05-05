# References for Product Card Page

## Similar Implementations

### Shop Listing Page
- Location: `apps/front/src/app/shop/ShopPage.tsx`
- Relevance: uses products RTK Query hook, loading/error rendering, and cart integration.
- Key patterns:
  - query products via `useGetProductsQuery`
  - add items using `useCart().addToCart(...)`
  - compose page sections with dedicated section components

### Shop Product Card
- Location: `apps/front/src/app/shop/components/ShopProductCard.tsx`
- Relevance: current product card UI and add-to-cart interaction.
- Key patterns:
  - render product image/title/price
  - route candidate for product details entry point

### Products API (Frontend)
- Location: `apps/front/src/redux/productsApi/productsApi.ts`
- Relevance: existing `baseApi.injectEndpoints(...)` feature API implementation.
- Key patterns:
  - endpoint injection
  - generated hooks consumed directly in UI

### Products Module (Backend)
- Location: `apps/backend/src/app/products/controllers/products.controller.ts`
- Relevance: response shaping and domain query parsing for products API.
- Key patterns:
  - normalized DTO responses
  - price/date conversion where needed
  - concise controller-to-service flow
