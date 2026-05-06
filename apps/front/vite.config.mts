/// <reference types='vitest' />
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/front',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [tailwindcss(), react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@shared/auth-contracts': path.resolve(
        import.meta.dirname,
        '../../libs/shared/auth-contracts/src/index.ts',
      ),
      '@shared/auth-domain': path.resolve(import.meta.dirname, '../../libs/shared/auth-domain/src/index.ts'),
      '@shared/form-system': path.resolve(import.meta.dirname, '../../libs/shared/form-system/src/index.ts'),
      '@shared/products-contracts': path.resolve(
        import.meta.dirname,
        '../../libs/shared/products-contracts/src/index.ts',
      ),
      '@shared/favorites-contracts': path.resolve(
        import.meta.dirname,
        '../../libs/shared/favorites-contracts/src/index.ts',
      ),
    },
  },
  build: {
    outDir: '../../dist/front',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    name: 'front',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/front',
      provider: 'v8' as const,
    },
  },
}));
