# Backend Feature Structure Standard

All new backend features in `apps/backend/src/app/` must follow a consistent folder layout.

## Required Structure

Each feature gets its own folder, for example `apps/backend/src/app/orders/`:

```text
orders/
  orders.module.ts
  controllers/
    orders.controller.ts
    orders.controller.spec.ts
  services/
    orders.service.ts
    orders.service.spec.ts
  dto/
    create-order.dto.ts
  entities/
    order.entity.ts
```

## Rules

1. Keep controllers in `controllers/` and services in `services/`.
2. Keep DTOs in `dto/` and TypeORM entities in `entities/`.
3. Keep tests next to their implementation files (`*.spec.ts`).
4. Feature module file stays at the feature root (`<feature>.module.ts`) and imports from subfolders.
5. `app.module.ts` should only compose feature modules and global infrastructure.

## Why

- Reduces module sprawl in root app files.
- Makes feature ownership and navigation predictable.
- Scales better as features grow and teams work in parallel.
