# Product Card Page - Shaping Notes

## Scope
Create a new product details page route for individual products, based on the Figma product screen reference, with full behavior for loading, quantity updates, and add-to-cart.

## Decisions
- Build a new page route instead of extending the listing page.
- Use existing frontend shop and backend products patterns as references.
- Exclude color chooser from UI and logic.
- Keep model naming aligned across backend, shared contracts, and frontend usage.

## Context
- Visuals: Figma product screen (`/product/r2`) from the provided file.
- References: frontend `shop` module and backend `products` module.
- Product alignment: support MVP shopping flow and React/Tailwind/shadcn stack.

## Standards Applied
- `frontend/new-section-component-hierarchy` - extract major sections into dedicated components.
- `frontend/redux-rtk-query-api-standard` - keep backend API calls in RTK Query.
- `global/shared-code-in-libs` - rely on shared DTO/contracts in `libs/`.
- `global/avoid-unnecessary-mapping-align-model-names` - avoid no-op field renaming mappers.
