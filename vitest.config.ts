import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: false,
        // Coverage (optional): pnpm add -D @vitest/coverage-v8
        // coverage: {
        //   provider: "v8",
        //   reporter: ["text", "lcov"],
        //   include: ["src/**"],
        // },
    },
});
