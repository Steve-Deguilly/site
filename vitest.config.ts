import { defineConfig } from 'vitest/config';

// Tests du moteur /diagnostic : logique pure (pas de DOM) → environnement node.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
