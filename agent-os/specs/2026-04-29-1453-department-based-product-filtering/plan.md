# Department-Based Product Filtering Plan

## Goal
Implement single-department assignment per product and server-side filtering by department, then wire home section filtering to request only matching products.

## Scope Decisions
- Product-to-department is **one-to-many** (each product has exactly one department).
- Department values are fixed domain literals: `men`, `women`, `accessories`.
- Frontend department filter target is **home sections**.
- Keep alignment with product goals: faster discovery and clearer browsing.

## Relevant Standards
- [frontend/redux-rtk-query-api-standard](../../standards/frontend/redux-rtk-query-api-standard.md)
- [backend/feature-structure](../../standards/backend/feature-structure.md)
- [global/shared-code-in-libs](../../standards/global/shared-code-in-libs.md)
- [global/extract-repeated-literals-to-enums](../../standards/global/extract-repeated-literals-to-enums.md)

## Task Breakdown
1. Save spec documentation.
2. Add backend department domain and product relation.
3. Extend shared product contracts.
4. Add department filtering to products API.
5. Wire home department filter to RTK Query.
6. Verify behavior and regressions.
