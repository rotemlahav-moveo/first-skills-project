# Product Card Page Plan

## Scope
Build a new `productCardPage` (product details page) aligned with the provided Figma product screen and include full user behavior for quantity and add-to-cart.

## Non-Goals
- Do not implement color chooser UI.
- Do not include color selection logic/state.

## Tasks
1. Save spec documentation.
2. Map existing contracts and route entry points.
3. Build hierarchical product page sections.
4. Implement behavior with RTK Query and cart integration.
5. Validate standards and run checks.

## Execution Notes
- Use shared contracts from `libs/shared/products-contracts`.
- Keep API calls in RTK Query (`baseApi.injectEndpoints`).
- Keep major page sections in dedicated files.
