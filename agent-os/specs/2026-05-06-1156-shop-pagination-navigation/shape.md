# Shop Pagination Navigation - Shaping Notes

## Scope
Implement pagination page navigation in the shop product listing so moving between pages fetches the correct 20 items per page. Preserve filters/sort while changing pages, sync page in URL query params, and support accurate pagination controls via backend metadata.

## Decisions
- This is an enhancement of existing pagination, not a full UI redesign.
- Backend will return pagination metadata (`total`, `page`, `limit`, `totalPages`) to drive frontend controls.
- URL is the source of truth for current page to support refresh/share behavior.
- When filters/sort change, page resets to `1`.
- When page changes, active filters/sort remain unchanged.

## Context
- Visuals: None provided.
- References: Existing shop frontend flow, products RTK API endpoint, backend query parser/query builder, and shared products contracts.
- Product alignment: Focus on fast and reliable product discovery on listing pages, aligned with product mission and MVP roadmap.

## Standards Applied
- `frontend/redux-rtk-query-api-standard` - keep backend calls routed through shared RTK Query base API and generated hooks.
- `global/shared-code-in-libs` - keep reusable contracts/types in `libs/shared`.
- `global/keep-tsx-clean-from-logic` - extract non-trivial pagination behavior into named handlers/derived values.
