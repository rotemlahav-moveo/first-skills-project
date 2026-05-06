# global/centralize-route-path-constants

## Rule
All application route paths must be defined in a single shared route constants object and referenced from that object (for example `ROUTES.CART`) instead of using inline string literals.

## Requirements
- Define route paths in one dedicated constant map per app domain (for example `ROUTES` in an app-level routes file).
- Use the route constants in router declarations and navigation/link usage (`Route`, `Link`, `navigate`, redirects, guards).
- Do not hardcode route strings like `'/cart'` directly in components or routing modules.
- Keep route key naming stable and explicit (for example `CART`, `SIGN_IN`, `PRODUCT_CARD`).
- When route params are needed, keep the pattern in the constant and derive concrete paths through helper functions where appropriate.

## Why
- Prevents route typos and broken navigation.
- Makes global route updates safe and quick.
- Improves discoverability and autocomplete.
- Keeps routing behavior consistent across the codebase.

## Examples
- Preferred: `path={ROUTES.CART}`, `navigate(ROUTES.SIGN_IN)`.
- Avoid: `path="/cart"`, `navigate('/sign-in')`.

