import { join, resolve } from 'path';
import { config as loadEnv } from 'dotenv';
import { DataSource } from 'typeorm';

/** Repo root when `npm run db:migrate:backend` is executed from workspace root */
const BACKEND_APP_ROOT = resolve(process.cwd(), 'apps/backend');

loadEnv({ path: resolve(BACKEND_APP_ROOT, '.env') });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER ?? 'snap_style',
  password: process.env.DB_PASSWORD ?? 'snap_style',
  database: process.env.DB_NAME ?? 'snapStyle_db',
  migrations: [join(BACKEND_APP_ROOT, 'src/migrations/*.ts')],
  migrationsTableName: 'typeorm_migrations',
});
