# Backend shop filters + URL state — Plan

## Goal

Server-side facet filtering and sorting for the shop catalog, with full filter + sort state in the URL so refresh and deep links preserve the view.

## Task 1: Spec documentation

This folder: `plan.md`, `shape.md`, `standards.md`, `references.md`, `visuals/README.md`.

## Task 2: Backend

- Query DTO / parser for `department`, `sort`, `category`, `size`, `color`, `priceRange`, `brand`.
- `ProductsService.findAll` via TypeORM QueryBuilder (facets + sort).
- Wire `GET /products` in controller; tests for query parsing and/or service wiring.

## Task 3: RTK Query

- Extend `getProducts` args and build query string with repeated keys for arrays.

## Task 4: Shop frontend

- Parse URL → form + query args; sync form changes to URL; remove client `filterProducts` / `sortProducts` from listing.

## Task 5: Verify

- Run backend tests; smoke-check home shop section and shop URL refresh/back.
