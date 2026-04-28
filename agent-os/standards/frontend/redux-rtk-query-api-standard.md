# frontend/redux-rtk-query-api-standard

## Rule
All frontend backend-API calls must be implemented through Redux Toolkit Query (RTK Query) and not through feature-local `fetch`/`axios` wrappers.

## Requirements
- Use a shared Redux API base (for example `baseApi`) as the single entry point for backend calls.
- Define feature endpoints via `baseApi.injectEndpoints(...)`.
- Consume data and mutations through generated RTK Query hooks in UI components.
- Keep backend call concerns (headers, auth token handling, refresh, retries, base URL) centralized in the shared API base layer.
- Do not introduce new ad-hoc HTTP client wrappers in feature folders for backend calls.

## Project Structure Guidance
- Keep Redux store and shared API infrastructure under `apps/front/src/app/reduxStore/`.
- Keep feature endpoint declarations close to their feature modules (for example `apps/front/src/app/auth/api.ts`) while still using the shared base API.
- Register only the shared base API reducer and middleware in the Redux store.

## Error Handling and Auth
- Normalize API error handling so UI gets predictable error shapes/messages.
- Use centralized auth handling (token injection and refresh-on-401) in the shared base API layer.
- Avoid duplicating auth/refresh logic per feature endpoint file.

## Exception Process
- If a call is not a backend API request (for example static asset fetch from same bundle context), document the reason in the feature spec.
- Any non-RTK backend call pattern requires explicit approval and migration follow-up.

## Checklist
- Does the feature use `baseApi.injectEndpoints(...)`?
- Are UI components using generated RTK Query hooks?
- Is reducer/middleware wired from shared base API only?
- Is there no new feature-local raw `fetch`/`axios` backend wrapper?
- Is auth/error handling centralized in shared API base logic?
