# Avoid Unnecessary Mapping And Align Model Names

## Rule
Avoid unnecessary object-to-object mapping when backend and frontend are both owned in the same codebase and no boundary transformation is needed.

## Requirements
- Prefer aligned naming across DB-mapped entities, DTO/contracts, and frontend usage (`id`, `name`, etc.) to reduce adapter code.
- Do not create mapper functions that only rename obvious fields without adding real transformation or protection value.
- Keep transformations only when they are required (for example: `numeric` to `number`, `Date` to ISO string, masking/removing sensitive fields, or intentional shape flattening).
- If a mapping layer exists, it must have clear purpose beyond naming differences.

## DTO And Entity Guidance
- Keep column names in the DB schema (`product_id`, `product_name`) mapped via decorators, while TypeScript property names stay API-friendly.
- Keep shared contracts in `libs/shared/*-contracts` aligned with the API response shape to avoid frontend re-mapping.
- If DTO and entity shapes are intentionally identical for a feature, keep one lightweight normalization step only for type/runtime conversion needs.

## Exceptions
- Public/external APIs where response contracts must be versioned and decoupled from persistence.
- Features with strict security boundaries where entity fields must never leak.
- Legacy modules where full rename would create disproportionate migration risk.

## Checklist
- Are entity/DTO/frontend names aligned for core fields?
- Is any remaining mapping doing necessary transformation only?
- Is there no frontend-only mapper that just renames fields?
- Are shared contracts the single source of truth for API shapes?
