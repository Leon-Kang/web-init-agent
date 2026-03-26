import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // Use "jsdom" for React/browser projects, "node" for server-only code.
        // Install jsdom separately: pnpm add -D jsdom
        environment: 'jsdom',

        // Global APIs (describe, it, expect) without importing from vitest.
        // Add /// <reference types="vitest/globals" /> to src/vite-env.d.ts (or any .d.ts)
        // to avoid restricting tsconfig "types" array for the whole project.
        globals: true,
        // Setup file runs before each test file.
        // Uncomment after creating this file and importing @testing-library/jest-dom inside it.
        // setupFiles: ["./src/test/setup.ts"],

        // Coverage (optional): pnpm add -D @vitest/coverage-v8
        // coverage: {
        //   provider: "v8",
        //   reporter: ["text", "lcov"],
        //   include: ["src/**"],
        // },
    },
});
