import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/test/**',
        'src/**/__fixtures__/**',
        'src/types/**',
        'src/components/ui/icons/**',
        'src/content/**',
        'src/app/**/page.tsx',
        'src/app/**/layout.tsx',
        'src/app/**/*-shell.tsx',
        'src/app/**/blog-*.tsx',
        'src/app/**/projects-*.tsx',
        'src/app/**/project-detail-shell.tsx',
        'src/components/sections/**',
        'src/components/mdx/**',
        'src/components/motion/motion-config-provider.tsx',
        'src/components/motion/fade-in-stagger.tsx',
        'src/components/ui/animated-*.tsx',
        'src/components/ui/fav-icon-updater.tsx',
        'src/components/ui/avatar.tsx',
        'src/components/ui/separator.tsx',
        'src/components/seo/localized-metadata.tsx',
        'src/components/layout/index.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
