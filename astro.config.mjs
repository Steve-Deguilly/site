// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://steve-deguilly.com',
  output: 'static',
  integrations: [
    sitemap({
      // Pages non indexées → hors sitemap : /cv (lien footer) et /lab/ccar-f-exam/ (non liée).
      filter: (page) => !/\/cv\/?$/.test(page) && !/\/lab\/ccar-f-exam\/?$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
});
