# References for Department-Based Product Filtering

## Similar Implementations

### Products Backend Flow
- **Location:** `apps/backend/src/app/products/`
- **Relevance:** Existing products entity, controller mapping, and service query flow.
- **Key patterns:** TypeORM relations, controller response mapping into shared `ProductDto`.

### Frontend Product Fetching
- **Location:** `apps/front/src/redux/productsApi/productsApi.ts`
- **Relevance:** Existing RTK Query endpoint definition for products.
- **Key patterns:** API endpoint injection and typed hook consumption.

### Shop Mapping and Filtering
- **Location:** `apps/front/src/app/shop/mapProductDto.ts`, `apps/front/src/app/shop/filterProducts.ts`
- **Relevance:** Existing product DTO-to-UI mapping and filter semantics.
- **Key patterns:** Derived frontend product shape and filtering behavior.
