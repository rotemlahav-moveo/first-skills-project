# global/use-switch-for-discriminated-branches

## Rule
Prefer `switch` over chained `if`/`else if` when branching on one discriminated value (for example `kind`, `type`, `status`, or enum-like unions).

## Requirements
- Use `switch` when all branches compare the same variable to different literal values.
- Keep each branch focused and explicit (`case 'x':`).
- Include a `default` branch when practical; for TypeScript union values, keep branch handling exhaustive where possible.
- Keep simple boolean guards as `if` statements (do not force `switch` for unrelated predicates).

## Why
- Makes branch intent clearer and easier to scan.
- Reduces repetitive comparisons on the same value.
- Improves maintainability as union values grow.

## Examples
- Preferred: branching form rendering by `field.kind` using `switch`.
- Not required: early-return null checks or independent boolean conditions.
