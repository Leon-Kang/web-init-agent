# AGENTS.md — Universal Web Project Rules

This file provides guidance to AI agents when working with code in a web project.

Toolchain: TypeScript, CSS Modules, PostCSS, Biome, dprint, Stylelint, Vitest, husky + lint-staged, pnpm.

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Git hooks are set up automatically via "prepare" script
#    (runs husky on install)

# 3. Run all checks
pnpm run check        # format + lint + typecheck in one command

# 4. Development scripts
pnpm run fmt          # format all files
pnpm run lint         # lint JS/TS
pnpm run lint:css     # lint CSS
pnpm run typecheck    # type check
pnpm run build        # compile the minimal example
pnpm run test         # run tests once
pnpm run test:watch   # run tests in watch mode
pnpm run verify       # check + build + test
```

## AI Operational Safety

- Inspect the repository and read relevant files before editing; never overwrite unseen files.
- Treat existing uncommitted changes as user-owned and keep unrelated files untouched.
- Do not commit, push, merge, deploy, publish packages, or change production infrastructure without explicit authorization.
- Do not run destructive Git, database, filesystem, or cloud operations without resolving exact targets and obtaining explicit authorization.
- Database and persistent-data changes require a rollback plan, backups where applicable, and migration tests.
- Never weaken tests, lint rules, branch protection, or security checks merely to make validation pass.
- After changes, run `pnpm run verify`; report any skipped or environment-blocked validation plainly.
- Keep `examples/minimal/` buildable and tested until a framework project replaces it with equivalent coverage.
- Keep secrets out of prompts, logs, fixtures, screenshots, telemetry, and committed environment files.

## New Project Checklist

Complete these steps **once** when bootstrapping a project from this template.
Work through them in order — each step unblocks the next.

### Step 1 — Choose a framework and install it

```bash
# Next.js
pnpm add next react react-dom
pnpm add -D @types/react @types/react-dom

# Vite + React
pnpm add react react-dom
pnpm add -D @types/react @types/react-dom vite @vitejs/plugin-react

# Astro
pnpm add astro
```

> This template has no runtime dependencies by design. Add your framework here.

### Step 2 — Install pinned package versions

The template pins its toolchain and package-manager versions for reproducible installs:

```bash
pnpm install
```

Use Renovate pull requests to review dependency updates after creating a project.

### Step 3 — Configure TypeScript for your framework

Edit `tsconfig.json` and fill in the framework-specific overrides:

| Framework | compilerOptions override | extends |
|---|---|---|
| Next.js | `"jsx": "preserve"` | Add `"next/core-web-vitals"` to extends array |
| Astro | keep `"jsx": "react-jsx"` for React islands | `"astro/tsconfigs/strict"` |
| Vite + React | add `"jsx": "react-jsx"` | — |
| Remix | `"moduleResolution": "bundler"` | add Remix types to `"types"` array |

Update `"include"` to match your framework's source layout:

```jsonc
// Next.js (App Router)
"include": ["app", "src", "next-env.d.ts"]

// Vite / Astro / Remix
"include": ["src"]
```

### Step 4 — Update dprint plugin versions

Plugin versions in `.dprint.jsonc` are pinned at template creation time and age quickly:

```bash
pnpm dlx dprint config update   # rewrites plugin URLs to latest versions
```

### Step 5 — Set up the test environment

**5a.** If the project targets a browser (React, Next.js, Astro with React):

Install the framework's browser test dependencies and change `vitest.config.ts` to `jsdom`.

**5b.** If the project is server-only (Node.js, API routes only):

The starter defaults to the dependency-free Node.js environment:

```ts
environment: "node",
```

**5c.** For React browser tests, install the required packages, enable the setup file, and create it:

```bash
pnpm add -D jsdom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

In `vitest.config.ts`, uncomment:

```ts
setupFiles: ["./src/test/setup.ts"],
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom";
```

**5d.** Add a triple-slash reference so TypeScript recognises Vitest globals:

Create (or update) `src/vite-env.d.ts`:

```ts
/// <reference types="vitest/globals" />
```

### Step 6 — Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in values for local development.
Add any new required variables to `.env.example` (no secrets — just keys with empty or example values).

### Step 7 — Verify everything works

```bash
pnpm run check    # must pass with zero errors
pnpm run build    # must compile production source
pnpm run test     # must run at least one real test
```

If `pnpm run check` fails after framework install, the framework may have added files
that conflict with lint rules. Fix errors before proceeding — do not suppress rules.

---

## Project Structure

Recommended directory layout (adapt to your framework):

```
project-root/
  .husky/               # Git hooks (pre-commit runs lint-staged)
  .vscode/              # Editor settings + recommended extensions
  src/
    components/         # UI components (PascalCase.tsx)
    hooks/              # Custom hooks (useSomething.ts)
    utils/              # Utility functions (camelCase.ts)
    types/              # Type definitions + enums
    styles/             # Global CSS, custom properties, resets
    assets/             # Static assets (images, fonts, icons)
  public/               # Static files served as-is
  .editorconfig
  .gitignore
  biome.json
  .dprint.jsonc
  .stylelintrc.js
  postcss.config.js
  tsconfig.json         # extends tsconfig.base.json
  tsconfig.base.json
  package.json
```

Framework-specific variations:

| Framework | Entry Point | Router |
|---|---|---|
| Next.js (App Router) | `app/` replaces `src/` | file-based routing in `app/` |
| Next.js (Pages) | `pages/` + `src/` | file-based routing in `pages/` |
| Astro | `src/pages/` + `src/layouts/` | file-based routing |
| Vite + React | `src/main.tsx` | manual (react-router, tanstack-router) |
| Remix | `app/routes/` | file-based routing |

## Formatting Rules

All formatting is enforced by **dprint** (not Biome's formatter). See `.editorconfig` for editor-level defaults.

### Indentation & Line Endings

- **Charset**: UTF-8
- **Line endings**: LF (`\n`), never CRLF
- **Final newline**: Always insert a trailing newline at end of file
- **Trailing whitespace**: Always trim (except `.md` files)

| File Type | Indent Style | Indent Size |
|---|---|---|
| JS / TS / JSX / TSX | Spaces | 4 |
| CSS | Spaces | 2 |
| JSON / JSONC | Spaces | 2 |
| YAML / TOML | Spaces | 2 |
| HTML / MDX | Spaces | 2 |
| Vue / Svelte / Astro | Spaces | 2 |
| Markdown | Spaces | 4 |
| Shell scripts | Spaces | 4 |
| Makefile | Tabs | — |

### JS/TS Formatting (dprint-plugin-typescript)

- **Line width**: 100
- **Quote style**: Single quotes (`'`) for JS/TS; double quotes (`"`) for JSX attributes
- **Semicolons**: Always use
- **Trailing commas**: Only on multi-line constructs
- **Braces**: Use when not single-line (`useBraces: whenNotSingleLine`)
- **Brace position**: Same line unless hanging
- **Arrow functions**: Always use parentheses
- **Operator position**: Next line (for line-broken expressions)

### CSS Formatting (malva)

- **Line width**: 80
- **Indent**: 2 spaces
- **Quotes**: Prefer double quotes
- **Declaration order**: SMACSS
- **Hex colors**: Lowercase, short form
- **Leading zero**: Keep (`0.5` not `.5`)
- **Trailing comma**: No

### JSON Formatting

- **Line width**: 80
- **Indent**: 2 spaces
- **Trailing commas**: Allowed in `.jsonc` files only

## TypeScript Configuration

Enable strict mode. See `tsconfig.base.json` for the full base configuration.

```jsonc
{
  "compilerOptions": {
    "strict": true,                         // enables all strict sub-flags
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,

    "isolatedModules": true,                // required by most bundlers
    "moduleResolution": "bundler",
    "module": "esnext",
    "target": "esnext",
    "lib": ["ESNext", "DOM", "DOM.Iterable"]
  }
}
```

Key principles:
- **No `any`**: Avoid `any`. If unavoidable, prefer `unknown` and narrow with type guards.
- **No unused code**: Compiler flags enforce zero unused locals/parameters.
- **Strict null checks**: Always enabled. Handle `null`/`undefined` explicitly.
- **Type-only imports**: Use `import type { ... }` for type-only imports (enforced by Biome).

### Framework-Specific Overrides

Frameworks may need to extend or override this base config:

| Framework | Typical Override |
|---|---|
| Next.js | Extend with `next/core-web-vitals` tsconfig, set `jsx: "preserve"` |
| Astro | Use `astro/tsconfigs/strict`, set `jsx: "react-jsx"` for React islands |
| Vite (React) | Set `jsx` to `react-jsx` |
| Remix | Set `moduleResolution: "bundler"`, extend with Remix types |

## Linting Rules (Biome)

Biome handles JS/TS linting. The formatter is **disabled** (dprint handles formatting).

### Core Rules

- **Recommended rules**: Enabled
- **JSX runtime**: `transparent` (auto-detects classic vs automatic transform)
- **Accessibility (a11y)**: Recommended rules enabled by default

### Enforced Rules

| Rule | Level | Rationale |
|---|---|---|
| `style/useImportType` | error | Enforce `import type` for type-only imports |
| `style/useNodejsImportProtocol` | warn | Prefer `node:fs` over `fs` for clarity |
| `correctness/useExhaustiveDependencies` | warn | React hooks dependency completeness |
| `correctness/useJsxKeyInIterable` | warn | Require `key` prop in list rendering |
| `complexity/useArrowFunction` | warn | Prefer arrow functions over function expressions |
| `style/noNonNullAssertion` | warn | Discourage `!` non-null assertions |
| `style/useDefaultParameterLast` | warn | Default parameters should be last |
| `style/noUselessElse` | warn | Remove unnecessary else after return |
| `security/noDangerouslySetInnerHtml` | warn | Flag dangerous HTML injection |
| `suspicious/noAssignInExpressions` | warn | No assignments in expressions |
| `suspicious/noFallthroughSwitchClause` | warn | Prevent switch fallthrough |
| `suspicious/noPrototypeBuiltins` | warn | Use `Object.hasOwn()` over `obj.hasOwnProperty()` |
| `suspicious/noThenProperty` | warn | Avoid objects with `.then` property |
| `correctness/noUnreachable` | warn | Flag unreachable code |

### Relaxed Rules (intentionally off)

| Rule | Rationale |
|---|---|
| `complexity/noForEach` | `forEach` is acceptable for side-effect iteration |
| `style/noInferrableTypes` | Explicit types are fine for clarity |
| `style/useTemplate` | String concatenation is acceptable |
| `suspicious/noExplicitAny` | Handled by TS compiler (`noImplicitAny`) instead |
| `suspicious/noArrayIndexKey` | Sometimes index keys are the only option |
| `performance/noAccumulatingSpread` | Acceptable in non-hot paths |
| `performance/noDelete` | `delete` is acceptable when needed |

## CSS Linting (Stylelint)

### Base Config

Extends `stylelint-config-standard`.

### Styling Approach

- **Native CSS** with **CSS Modules** for component scoping (`*.module.css`)
- **PostCSS** for transforms: `postcss-preset-env` (modern CSS features), `autoprefixer`
- **No preprocessors** (no LESS, no Sass) — use native CSS nesting, custom properties, `color-mix()` instead
- Use CSS custom properties (`--var-name`) for theming and shared values

### Key Rules

- **CSS Modules**: In `*.module.css` files, forbid global-scoped selectors
- **Number precision**: Max 8 decimal places
- **Alpha notation**: Use number notation (e.g., `0.5` not `50%`)
- **Color function notation**: Modern (`rgb(0 0 0 / 0.5)` with `color-mix()` for adjustments)
- **Media feature notation**: Range syntax preferred (`width >= 768px`)
- **Pseudo-class**: Allow `:global` (for CSS Modules)
- **Selector patterns**: No enforced pattern for class/id names (project decides)
- **Value keywords**: Lowercase, except `currentColor` and `optimizeLegibility`
- **Nesting**: Use native CSS nesting (`& .child {}`) — supported in all modern browsers

### PostCSS Plugins

```
postcss-preset-env  — Polyfill modern CSS features based on browserslist
autoprefixer        — Add vendor prefixes automatically
```

> **Maintenance note**: CSS nesting, custom media queries, and range media queries are
> natively supported in all modern browsers as of 2024. Run `npx browserslist` periodically
> to check your target coverage. When a feature reaches 100%, remove it from
> `postcss.config.js → features`. Eventually only `autoprefixer` (or nothing) may remain.

### Browserslist

Define target browsers in `package.json` or `.browserslistrc`:

```
defaults and fully supports es6-module
```

This targets modern browsers with ES module support, which aligns with the native CSS features used (nesting, `color-mix()`, etc.).

## Coding Conventions

### Import Order

Maintain the following order, separated by blank lines:

```typescript
// 1. Type imports
import type { SomeType } from 'some-lib';

// 2. Framework (React, Vue, Svelte, etc.)
import { useState } from 'react';

// 3. Third-party libraries
import classNames from 'classnames';

// 4. Internal modules (path aliases)
import { helper } from '@/utils/helper';

// 5. Relative imports
import { LocalComponent } from './LocalComponent';
import styles from './styles.module.css';
```

### File Naming

| Category | Naming | Extension | Directory |
|---|---|---|---|
| Component | `PascalCase` | `.tsx` | `components/` |
| Hook | `camelCase` (`use` prefix) | `.ts` | `hooks/` |
| Utility / Helper | `camelCase` | `.ts` | `utils/` or `helpers/` |
| Type definitions | `PascalCase` | `.ts` | `types/` |
| Config / Constant | `PascalCase` or `camelCase` | `.ts` | `configs/` |
| Test | matches source file | `.spec.ts(x)` or `.test.ts(x)` | co-located or `__tests__/` |

### Directory Naming

- Use **kebab-case** for directory names
- For complex component structures, use nested folders: `search/user/result-list.tsx`

### Naming Completeness

Names must be descriptive and complete:
- Bad: `List`, `verify`, `data`
- Good: `SearchUserResultList`, `verifySearchUserForm`, `userData`

### Naming Consistency

The exported name must match the filename:
- `SearchUserResultList.tsx` exports `SearchUserResultList`
- `verifySearchUserForm.ts` exports `verifySearchUserForm`

## Dependency Management

### Package Manager

- **pnpm** is the required package manager (pinned via `packageManager` field in `package.json`)
- ALWAYS use `pnpm`. NEVER use `npm`, `yarn`, or any other package manager.
- ALWAYS use `pnpm run <script>`. NEVER use `npm run <script>`.
- pnpm enforces strict peer dependency resolution — no phantom dependencies

### Version Pinning

- **Always use exact versions** in `package.json` (no `^` or `~` prefixes)
- Enforced via `pnpm-workspace.yaml` with `saveExact: true`
- This ensures deterministic installs across environments

### Initial Setup

Run `pnpm install` to install the pinned toolchain and configure the Git hooks. Keep dependency
updates exact and review them through Renovate or explicit `pnpm up --latest` changes.

### Adding Dependencies

```bash
# Add a runtime dependency (exact version pinned by project settings)
pnpm add <package>

# Add a dev dependency
pnpm add -D <package>

# Remove a dependency
pnpm remove <package>
```

### pnpm-specific Config (`pnpm-workspace.yaml`)

```yaml
autoInstallPeers: false
strictPeerDependencies: true
saveExact: true
minimumReleaseAge: 1440
trustPolicy: no-downgrade
```

## Testing

### Framework

Choose based on project bundler:

| Bundler | Recommended Test Runner |
|---|---|
| Vite (Astro, SvelteKit, Remix) | **Vitest** |
| Webpack, Turbopack (Next.js) | **Jest** or **Vitest** |
| Any (new projects) | **Vitest** (preferred) |

### Patterns

```typescript
// Vitest or Jest — API is compatible
import { describe, it, expect } from 'vitest'; // or omit for Jest globals
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
    it('renders correctly', () => {
        render(<MyComponent />);
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });
});
```

### Conventions

- Test files use `.spec.ts(x)` or `.test.ts(x)` extension
- Place tests co-located with source or in `__tests__/` directories
- Use `describe` blocks to group related tests
- Test behavior, not implementation details

## Code Quality Toolchain

### Tool Responsibilities

```
Biome      → JS/TS linting (formatter disabled)
dprint     → Code formatting (JS/TS/JSON/CSS)
Stylelint  → CSS linting
PostCSS    → CSS transforms (preset-env, autoprefixer)
TypeScript → Type checking (via tsc --noEmit)
```

### Workflow

1. **Format**: `dprint fmt` — formats all supported files
2. **Lint JS/TS**: `biome lint` — checks JS/TS rules
3. **Lint CSS**: `stylelint` — checks CSS rules
4. **Type check**: `tsc --noEmit` — verifies TypeScript types

### CI Integration

Run all checks on changed files before merge:

```bash
dprint check
biome lint .
stylelint "**/*.css"
tsc --noEmit
```

## Git Conventions

### Branch Naming

```
feat/short-description     # new feature
fix/short-description      # bug fix
refactor/short-description # code refactoring
docs/short-description     # documentation only
chore/short-description    # tooling, deps, CI
```

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>

[optional body]
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`, `perf`, `ci`, `build`

Examples:
```
feat(auth): add OAuth2 login flow
fix(cart): prevent duplicate item additions
refactor(api): extract shared fetch wrapper
chore(deps): update biome to 2.4.9
```

### Pre-commit Hooks

Configured via **husky** + **lint-staged** (see `package.json`):

- On every commit, lint-staged runs automatically:
  - JS/TS files: `biome lint --write` + `dprint fmt`
  - CSS files: `stylelint --fix` + `dprint fmt`
  - JSON files: `dprint fmt`
- Commits with lint errors are blocked until fixed

### Pull Requests

- Keep PRs focused on a single concern
- PR title follows commit message format: `feat(scope): description`
- Include a brief description of what changed and why

## Environment Variables

### File Naming

```
.env                # ignored local values
.env.local          # local overrides (gitignored)
.env.development    # ignored development values
.env.production     # ignored production values
.env.*.local        # local overrides per mode (gitignored)
```

### Rules

- **NEVER** commit secrets (API keys, tokens, passwords) to `.env` files in git
- All `.env` variants are gitignored except `.env.example`
- Use `.env.example` to document required variables with non-secret examples only
- Prefix client-exposed variables per framework convention:
  - Next.js: `NEXT_PUBLIC_`
  - Vite / Astro: `VITE_` or `PUBLIC_`
  - Remix: use loader to expose server-side env

### Type Safety (recommended)

Validate environment variables at build/startup time:

```typescript
// env.ts
const requiredEnvVars = ['DATABASE_URL', 'API_KEY'] as const;

for (const key of requiredEnvVars) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}
```

For advanced validation, use `zod` or `@t3-oss/env-core`.

## Framework Adaptation Guide

This template is framework-agnostic. When adopting for a specific framework:

### Next.js
- Extend `tsconfig.base.json` with `next/core-web-vitals` config
- PostCSS is built-in — `postcss.config.js` works as-is
- CSS Modules are supported natively (`.module.css`)
- Use `next lint` alongside Biome, or replace ESLint with Biome

### Astro
- Extend `tsconfig.base.json` with `astro/tsconfigs/strict`
- Vite handles PostCSS natively — `postcss.config.js` works as-is
- Add `.astro` to editorconfig (already included)
- Biome can lint `.astro` files with the `--files-ignore-unknown=true` flag

### Vite + React/Vue/Svelte
- React projects must set `jsx` to `react-jsx`; Vue and Svelte use their framework config
- Vite handles PostCSS natively
- For Vue/Svelte, add framework-specific Stylelint plugins if needed

### Remix
- Extend `tsconfig.base.json` with Remix types
- PostCSS/CSS Modules work with Remix's Vite integration

## Included Files Reference

| File | Purpose |
|---|---|
| `AGENTS.md` | AI agent rules (this file) |
| `package.json` | Dependencies, scripts, lint-staged, browserslist, engines, packageManager |
| `pnpm-workspace.yaml` | pnpm security, exact-version, peer dependency, and override policy |
| `tsconfig.base.json` | TypeScript strict base config (framework-agnostic) |
| `tsconfig.json` | Project-level tsconfig — extends base, add framework overrides here |
| `vitest.config.ts` | Framework-neutral Vitest Node environment |
| `biome.json` | Biome linter config (formatter disabled) |
| `.dprint.jsonc` | dprint formatter config (JS/TS/JSON/CSS) |
| `.stylelintrc.js` | Stylelint CSS linter config |
| `postcss.config.js` | PostCSS plugins (preset-env, autoprefixer) |
| `.editorconfig` | Editor indent/encoding defaults |
| `.gitignore` | Git ignore patterns |
| `.env.example` | Documents required env vars — copy to `.env.local` |
| `renovate.json` | PR-based non-major devDependency updates; major updates require review |
| `examples/minimal/` | Real source, build, and tests proving the baseline works |
| `starter-version.json` | Starter identity and migration schema version |
| `docs/upgrading.md` | Safe update process for generated projects |
| `.husky/pre-commit` | Git pre-commit hook (runs lint-staged) |
| `.vscode/settings.json` | VS Code: dprint formatter on save, Biome lint actions, Stylelint |
| `.vscode/extensions.json` | Recommended VS Code extensions |
| `.github/workflows/ci.yml` | GitHub Actions CI: verify and security audit |
