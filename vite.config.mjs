/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Absolute imports are rooted at `src/` (matches the old jsconfig.json baseUrl
// and eslint's import resolver `moduleDirectory`). Keep this list in sync with
// the top-level folders under src/.
const srcDir = (p) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

export default defineConfig({
  // User GitHub Pages site (vinny2001.github.io) is served from the domain root.
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      app: srcDir('app'),
      components: srcDir('components'),
      config: srcDir('config'),
      content: srcDir('content'),
      features: srcDir('features'),
      hooks: srcDir('hooks'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // Keep the output dir the gh-pages deploy script already points at.
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    css: true,
  },
});
