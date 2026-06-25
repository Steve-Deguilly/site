// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://steve-deguilly.com',
  output: 'static',

  integrations: [
    sitemap({
      // /cv est non indexée (accès via lien footer uniquement) → hors sitemap.
      filter: (page) => !/\/cv\/?$/.test(page),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    inlineStylesheets: 'always',
  },

  compressHTML: true,
  adapter: cloudflare()
});