import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    // Native tsconfig path alias resolution (replaces vite-tsconfig-paths)
    tsconfigPaths: true,
    alias: {
      '@': new URL('.', import.meta.url).pathname.replace(/\/$/, ''),
    },
  },
  test: {
    environment: 'node',
    globals: false,
    include: ['__tests__/**/*.test.ts', '__tests__/**/*.test.tsx'],
  },
})
