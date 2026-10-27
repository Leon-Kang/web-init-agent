# Web Init Agent

**English** | [简体中文](README.zh-CN.md) | [日本語](README.ja.md)

A framework-agnostic TypeScript foundation for projects built by humans and AI coding agents.
It turns project initialization into an explicit, repeatable engineering contract. See
[`AGENTS.md`](AGENTS.md) for the full rule set.

## Toolchain

| Tool | Role |
|---|---|
| **pnpm** | Package manager |
| **TypeScript** | Type checking in strict mode |
| **dprint** | JS/TS/JSON/CSS formatting |
| **Biome** | JS/TS linting |
| **Stylelint** | CSS linting |
| **PostCSS** | CSS transforms with preset-env and autoprefixer |
| **Vitest** | Unit testing |
| **husky + lint-staged** | Pre-commit hooks |
| **Renovate** | Automated dependency updates |

## Getting Started

### Existing project

Install dependencies and Git hooks, then run the full verification suite:

```bash
pnpm install
pnpm run verify
```

### New project from this template

Follow the seven setup steps below.

## New Project Setup

### Step 1 · Install a framework

Choose one framework. This template has no runtime dependencies by design.

**Next.js**

```bash
pnpm add next react react-dom
pnpm add -D @types/react @types/react-dom
```

**Vite + React**

```bash
pnpm add react react-dom
pnpm add -D @types/react @types/react-dom vite @vitejs/plugin-react
```

**Astro**

```bash
pnpm add astro
```

### Step 2 · Install pinned dependencies

Dependencies and the pnpm runtime are pinned for reproducible installs:

```bash
pnpm install
```

Renovate keeps dependency updates visible and reviewable after the repository is created.

### Step 3 · Configure TypeScript

Edit `tsconfig.json` for your framework:

| Framework | TypeScript configuration |
|---|---|
| Next.js | Use the framework-generated TypeScript configuration |
| Astro | Extend `astro/tsconfigs/strict`; add `jsx: "react-jsx"` for React islands |
| Vite + React | Add `jsx: "react-jsx"` |
| Remix | Use `moduleResolution: "bundler"` and add the framework types |

Update `include` to match your source layout. For Next.js App Router:

```jsonc
"include": ["app", "src", "next-env.d.ts"]
```

For Vite, Astro, or Remix:

```jsonc
"include": ["src"]
```

### Step 4 · Update dprint plugins

Plugin URLs in `.dprint.jsonc` are pinned at template creation time. Update them when setting up your project:

```bash
pnpm dlx dprint config update
```

### Step 5 · Set up tests

**Browser projects (React, Next.js, Astro)**

Install the browser testing dependencies:

```bash
pnpm add -D jsdom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

Change `vitest.config.ts` to `environment: "jsdom"`.

**Server-only projects**

The starter already uses the Node.js environment:

```ts
environment: 'node',
```

**Test setup file**

For browser tests, enable the setup file in `vitest.config.ts`:

```ts
setupFiles: ['./src/test/setup.ts'],
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom';
```

**Optional Vitest globals**

If you enable `globals: true`, add this reference to `src/vite-env.d.ts` so TypeScript recognizes the global test APIs:

```ts
/// <reference types="vitest/globals" />
```

### Step 6 · Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your local values in `.env.local`. Never commit secrets. Document new required variable names in `.env.example` without secret values.

### Step 7 · Verify

```bash
pnpm run check
pnpm run build
pnpm run test
```

All three commands must pass. Fix errors after framework installation instead of suppressing lint rules.

## From Initialization to a Reviewed PR

This repository establishes the project baseline. After initialization,
[issue-to-pr](https://github.com/Leon-Kang/issue-to-pr) can take work from an issue through
implementation, tests, review, and a pull request requiring human approval.

## Scripts

| Command | Purpose |
|---|---|
| `pnpm run fmt` | Format files |
| `pnpm run fmt:check` | Check formatting without writing |
| `pnpm run lint` | Lint JS/TS |
| `pnpm run lint:css` | Lint CSS |
| `pnpm run lint:fix` | Fix JS/TS lint issues automatically |
| `pnpm run typecheck` | Check TypeScript types |
| `pnpm run build` | Compile the minimal example |
| `pnpm run check` | Run formatting, lint, and type checks |
| `pnpm run test` | Run tests once |
| `pnpm run test:watch` | Run tests in watch mode |
| `pnpm run verify` | Run checks, build, and tests |

The checked-in [`examples/minimal/`](examples/minimal/) project is the acceptance fixture.
Replace it only after equivalent production build and non-empty tests are wired into `verify`.

The starter version is recorded in [`starter-version.json`](starter-version.json). See
[`docs/upgrading.md`](docs/upgrading.md) for upgrade guidance.

## Key Conventions

### Code style

- **Indentation**: 4 spaces for JS/TS; 2 spaces for CSS/JSON.
- **Quotes**: Single quotes in JS/TS; double quotes in JSX attributes.
- **Semicolons**: Always.
- **Line width**: 100 for JS/TS; 80 for CSS/JSON.
- **Type imports**: Use `import type { Foo }` for types.

### File naming

| Kind | Convention | Example |
|---|---|---|
| Component | PascalCase | `UserCard.tsx` |
| Hook | camelCase with a `use` prefix | `useUserData.ts` |
| Utility | camelCase | `formatDate.ts` |
| Type | PascalCase | `UserProfile.ts` |
| Directory | kebab-case | `search-results/` |
| Test | Match the source filename | `UserCard.spec.tsx` |

### Git

Branch prefixes: `feat/`, `fix/`, `refactor/`, `docs/`, `chore/`.
Use Conventional Commits:

```text
feat(auth): add OAuth2 login
fix(cart): prevent duplicate items
```

### CSS

- Native CSS and CSS Modules (`*.module.css`); no Sass or LESS.
- CSS custom properties for theming, such as `--color-primary`.
- Native CSS nesting, such as `& .child {}`.
- Browser target: `defaults and fully supports es6-module`.

## File Reference

| File | Purpose |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Full AI agent rules |
| [`package.json`](package.json) | Dependencies, scripts, and staged-file hooks |
| [`pnpm-workspace.yaml`](pnpm-workspace.yaml) | Security, version, peer, and override policies |
| [`tsconfig.base.json`](tsconfig.base.json) | Strict TypeScript base configuration |
| [`tsconfig.json`](tsconfig.json) | Framework-specific TypeScript configuration |
| [`vitest.config.ts`](vitest.config.ts) | Framework-neutral Node test configuration |
| [`biome.json`](biome.json) | JS/TS lint configuration |
| [`.dprint.jsonc`](.dprint.jsonc) | Formatting configuration |
| [`.stylelintrc.js`](.stylelintrc.js) | CSS lint configuration |
| [`postcss.config.js`](postcss.config.js) | PostCSS plugins |
| [`.editorconfig`](.editorconfig) | Editor defaults |
| [`.env.example`](.env.example) | Required environment variable names |
| [`renovate.json`](renovate.json) | Automated dependency updates |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | CI verification and security audit |
| [`examples/minimal/`](examples/minimal/) | Buildable and tested baseline |
| [`.vscode/`](.vscode/) | VS Code settings and recommended extensions |

## License

Released under the [MIT License](LICENSE).
