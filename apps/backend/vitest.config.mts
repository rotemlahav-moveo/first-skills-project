import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const backendDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.join(backendDir, '..', '..');

const sharedLibs = [
  'auth-contracts',
  'auth-domain',
  'form-system',
  'products-contracts',
  'favorites-contracts',
  'checkout-contracts',
  'cart-contracts',
] as const;

export default defineConfig({
  resolve: {
    alias: Object.fromEntries(
      sharedLibs.map((name) => [
        `@shared/${name}`,
        path.join(workspaceRoot, 'libs/shared', name, 'src/index.ts'),
      ]),
    ),
  },
});
