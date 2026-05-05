# global/keep-tsx-clean-from-logic

## Rule
Keep TSX focused on rendering. Move non-trivial logic out of JSX into named functions, callbacks, hooks, selectors, or utilities.

## Requirements
- Do not place multi-step logic directly inside JSX props like `onClick`, `onChange`, `onSubmit`, `onKeyDown`, `className`, or conditional render blocks.
- Extract event handlers into named callbacks (for example `handleAddToCart`, `handleSubmit`, `handleCardKeyDown`).
- Extract derived values and branching decisions into variables or memoized selectors before `return`.
- Prefer custom hooks or utility functions for reusable UI behavior instead of duplicating inline logic.
- Keep inline JSX expressions simple and declarative (data binding, simple ternary, direct prop wiring).
- Use clear naming that expresses intent (`navigateToProduct`, `removeFavorite`) instead of anonymous inline functions with embedded business logic.

## Why
- Improves readability by separating rendering from behavior.
- Reduces duplicate logic and makes reuse easier.
- Simplifies testing because logic is available through named units.
- Makes component diffs smaller and safer during future changes.

## Examples
- Preferred: `onClick={handleAddToCart}` with logic extracted to `const handleAddToCart = useCallback(...)`.
- Preferred: compute `const isDisabled = ...` before JSX and pass `disabled={isDisabled}`.
- Avoid: long inline anonymous functions and nested conditionals directly inside TSX.

