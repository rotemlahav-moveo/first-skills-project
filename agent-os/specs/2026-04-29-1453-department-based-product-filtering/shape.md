# Department-Based Product Filtering - Shaping Notes

## Scope
Add a `departments` table for `men`, `woman`, and `accessories`, assign each product to exactly one department, and let frontend home sections request only products from the selected department.

## Decisions
- Product belongs to one department (`ManyToOne` from product to department).
- Department filter is implemented for home sections.
- Filtering is server-side via optional query param on `GET /products`.
- Department literals are shared and reused across backend/frontend.

## Context
- **Visuals:** Use existing frontend visuals/components as reference.
- **References:** Existing products backend and shop/home product fetching flow.
- **Product alignment:** Optimize for faster product discovery and category browsing in MVP.

## Standards Applied
- `frontend/redux-rtk-query-api-standard`: RTK Query remains the API layer.
- `backend/feature-structure`: Keep products feature structure consistent.
- `global/shared-code-in-libs`: Contracts/literals stay in shared libs.
- `global/extract-repeated-literals-to-enums`: Centralize department literals.
