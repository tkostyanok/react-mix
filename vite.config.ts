import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

import { glob } from 'glob';
import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// https://vite.dev/config/
const viteConfig = defineViteConfig({
  plugins: [react(), libInjectCss(), dts({ tsconfigPath: './tsconfig.lib.json' })],
  build: {
    // Do not allow Vite copies all files from the public directory to the
    //  output folder.
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      fileName: 'react-mix',
      formats: ['es'],
      name: 'react-mix',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob
          .sync('lib/**/*.{ts,tsx}', {
            ignore: ['lib/**/*.d.ts', 'lib/**/*.stories.tsx'],
          })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative('lib', file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        // Put chunk styles at <output>/assets
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
  // server: {
  //   port: 3000,
  // },
});

const vitestConfig = defineVitestConfig({
  test: {
    // `globals: true` means global variables will be available during tests like
    //    'describe, it, expect' so we don't have to import it in every test file
    globals: true,
    // Specified _'jsdom'_ as the test environment, simulating a browser environment
    environment: 'jsdom',
  },
});

export default mergeConfig(viteConfig, vitestConfig);
