# Standards for Department-Based Product Filtering

The following standards apply to this work.

---

## frontend/redux-rtk-query-api-standard

All frontend backend-API calls must be implemented through Redux Toolkit Query (RTK Query) and not through feature-local `fetch`/`axios` wrappers.

Requirements:
- Use a shared Redux API base as the single entry point for backend calls.
- Define feature endpoints via `baseApi.injectEndpoints(...)`.
- Consume data and mutations through generated RTK Query hooks in UI components.
- Keep backend call concerns centralized in the shared API base layer.

---

## backend/feature-structure

All backend features in `apps/backend/src/app/` follow feature-local folders:
- `controllers/`
- `services/`
- `dto/`
- `entities/`
- `<feature>.module.ts` at feature root.

Controllers and services remain in their folders, and app module composition stays clean.

---

## global/shared-code-in-libs

Reusable/shared code must live in `libs/`, while `apps/` contains app-specific wiring. Shared DTO/contracts and reusable domain literals belong in libraries and should be imported from public entrypoints.

---

## global/extract-repeated-literals-to-enums

Repeated literals should be extracted into a shared enum or enum-like const map and reused across schema, logic, and UI to avoid drift and typo bugs.
