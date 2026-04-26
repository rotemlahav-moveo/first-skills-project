# References for Auth Backend Feature

## Similar Implementations

### App Module Baseline

- Location: `apps/backend/src/app/app.module.ts`
- Relevance: Shows root module imports and TypeORM configuration pattern.
- Key patterns: `ConfigModule.forRoot`, `TypeOrmModule.forRootAsync`, module registration.

### Controller Baseline

- Location: `apps/backend/src/app/app.controller.ts`
- Relevance: Demonstrates controller wiring and route handler style.
- Key patterns: constructor injection and method-level route decorators.

### Service Baseline

- Location: `apps/backend/src/app/app.service.ts`
- Relevance: Demonstrates injectable service structure.
- Key patterns: class-level `@Injectable()` and typed return signatures.
