// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://steve-deguilly.com',
  output: 'static',
  // /demo est volontairement « discrète » (noindex, hors menu) → exclue du sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/demo') })],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
});
