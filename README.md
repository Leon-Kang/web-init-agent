# Web Project Template

A framework-agnostic TypeScript web project template with a modern, opinionated toolchain.
Designed for AI-assisted development — see `AGENTS.md` for the full rule set.

框架无关的 TypeScript Web 项目模板，配备现代化工具链。
专为 AI 辅助开发设计，完整规则见 `AGENTS.md`。

---

## Toolchain / 工具链

| Tool / 工具 | Role / 职责 |
|---|---|
| **pnpm** | Package manager / 包管理器 |
| **TypeScript** | Type checking (strict mode) / 类型检查（严格模式） |
| **dprint** | Code formatting — JS/TS/JSON/CSS / 代码格式化 |
| **Biome** | JS/TS linting / JS/TS 代码检查 |
| **Stylelint** | CSS linting / CSS 代码检查 |
| **PostCSS** | CSS transforms (preset-env, autoprefixer) / CSS 转换 |
| **Vitest** | Unit testing / 单元测试 |
| **husky + lint-staged** | Pre-commit hooks / 提交前钩子 |
| **Renovate** | Automated dependency updates / 依赖自动更新 |

---

## Getting Started / 快速开始

### Existing project / 已有项目

```bash
pnpm install      # install deps + set up git hooks / 安装依赖并初始化 Git 钩子
pnpm run check    # format check + lint + typecheck / 格式检查 + 代码检查 + 类型检查
pnpm run test     # run tests / 运行测试
```

### New project from this template / 从模板创建新项目

Follow the 7 steps below. / 按以下 7 步操作。

---

## New Project Setup / 新项目初始化

### Step 1 · 安装框架

Choose one and install. This template has no runtime dependencies by design.
选择一个框架安装，模板本身不含任何运行时依赖。

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

### Step 2 · 固定依赖版本

Template versions are `"latest"` placeholders — resolve them immediately.
模板中的版本号均为 `"latest"` 占位符，需立即解析为精确版本。

```bash
pnpm install    # resolve "latest" in pnpm-lock.yaml / 将 latest 解析写入 lockfile
pnpm up         # rewrite package.json with exact versions / 将精确版本回写到 package.json
pnpm -v         # check pnpm version / 查看 pnpm 版本
```

Update `package.json`:
更新 `package.json`：

```json
"packageManager": "pnpm@<version from pnpm -v>"
```

### Step 3 · 配置 TypeScript

Edit `tsconfig.json` with framework-specific overrides.
编辑 `tsconfig.json`，补充框架相关配置。

| Framework | `compilerOptions` | `extends` |
|---|---|---|
| Next.js | `"jsx": "preserve"` | add `"next/core-web-vitals"` |
| Astro | keep `"jsx": "react-jsx"` | `"astro/tsconfigs/strict"` |
| Vite + React | base works as-is / 无需修改 | — |
| Remix | `"moduleResolution": "bundler"` | add Remix types |

Update `"include"` to match your source layout:
更新 `"include"` 匹配框架目录结构：

```jsonc
// Next.js (App Router)
"include": ["app", "src", "next-env.d.ts"]

// Vite / Astro / Remix
"include": ["src"]
```

### Step 4 · 更新 dprint 插件版本

Plugin URLs in `.dprint.jsonc` are pinned at template creation time.
`.dprint.jsonc` 中的插件版本在模板创建时固定，需更新到最新版本。

```bash
pnpm dlx dprint config update
```

### Step 5 · 搭建测试环境

**Browser project (React, Next.js, Astro) / 浏览器项目：**
`vitest.config.ts` is already set to `environment: "jsdom"` — no change needed.
`vitest.config.ts` 已设置 `environment: "jsdom"`，无需修改。

**Server-only project / 纯服务端项目：**

```ts
// vitest.config.ts
environment: "node",
```

**Enable the setup file / 启用测试 setup 文件：**

Uncomment in `vitest.config.ts` / 取消注释：

```ts
setupFiles: ["./src/test/setup.ts"],
```

Create the file / 创建文件 `src/test/setup.ts`：

```ts
import "@testing-library/jest-dom";
```

**Enable Vitest globals in TypeScript / 让 TypeScript 识别 Vitest 全局 API：**

Create (or update) `src/vite-env.d.ts`:

```ts
/// <reference types="vitest/globals" />
```

### Step 6 · 配置环境变量

```bash
cp .env.example .env.local   # copy template / 复制模板
```

Edit `.env.local` with your local values. Never commit secrets.
编辑 `.env.local` 填入本地值。不要提交任何 secret。

Add new required variables (keys only, no values) to `.env.example`.
将新增的必要变量（只写 key，不写值）同步到 `.env.example`。

### Step 7 · 验证

```bash
pnpm run check    # must pass / 必须通过
pnpm run test     # must pass / 必须通过
```

If `check` fails after framework install, fix the errors — do not suppress lint rules.
如果安装框架后 `check` 失败，修复错误，不要绕过 lint 规则。

---

## Scripts / 脚本

```bash
pnpm run fmt          # format all files / 格式化所有文件
pnpm run fmt:check    # check formatting without writing / 检查格式（不修改文件）
pnpm run lint         # lint JS/TS / 检查 JS/TS
pnpm run lint:css     # lint CSS / 检查 CSS
pnpm run lint:fix     # auto-fix lint issues / 自动修复 lint 问题
pnpm run typecheck    # type check / 类型检查
pnpm run check        # all of the above / 以上全部
pnpm run test         # run tests once / 运行测试（单次）
pnpm run test:watch   # run tests in watch mode / 监听模式运行测试
```

---

## Key Conventions / 主要约定

### Code style / 代码风格

- **Indentation / 缩进**: 4 spaces for JS/TS, 2 spaces for CSS/JSON
- **Quotes / 引号**: Single (`'`) in JS/TS, double (`"`) in JSX attributes
- **Semicolons / 分号**: Always / 始终加
- **Line width / 行宽**: 100 (JS/TS), 80 (CSS/JSON)
- **Import type**: `import type { Foo }` enforced for type-only imports / 强制使用

### File naming / 文件命名

| Kind / 类型 | Convention / 规范 | Example |
|---|---|---|
| Component / 组件 | PascalCase | `UserCard.tsx` |
| Hook | camelCase with `use` prefix | `useUserData.ts` |
| Utility / 工具函数 | camelCase | `formatDate.ts` |
| Type / 类型 | PascalCase | `UserProfile.ts` |
| Directory / 目录 | kebab-case | `search-results/` |
| Test / 测试 | matches source | `UserCard.spec.tsx` |

### Git / 版本控制

Branch naming / 分支命名: `feat/`, `fix/`, `refactor/`, `docs/`, `chore/`

Commit format (Conventional Commits):
```
feat(auth): add OAuth2 login
fix(cart): prevent duplicate items
```

### CSS

- Native CSS + CSS Modules (`*.module.css`) — no Sass or LESS
- CSS custom properties for theming (`--color-primary`)
- Native CSS nesting (`& .child {}`)
- Target: `defaults and fully supports es6-module`

---

## File Reference / 文件索引

| File | Purpose / 用途 |
|---|---|
| `AGENTS.md` | Full rule set for AI agents / AI agent 完整规则 |
| `package.json` | Dependencies, scripts, lint-staged / 依赖、脚本、提交钩子 |
| `.npmrc` | pnpm config: exact versions, peer deps / pnpm 配置 |
| `tsconfig.base.json` | Strict TypeScript base / 严格 TS 基础配置 |
| `tsconfig.json` | Framework overrides (edit this) / 框架配置（在这里改） |
| `vitest.config.ts` | Test runner config / 测试运行配置 |
| `biome.json` | JS/TS linter config / JS/TS 检查配置 |
| `.dprint.jsonc` | Formatter config / 格式化配置 |
| `.stylelintrc.js` | CSS linter config / CSS 检查配置 |
| `postcss.config.js` | PostCSS plugins / PostCSS 插件 |
| `.editorconfig` | Editor defaults / 编辑器基础配置 |
| `.env.example` | Required env vars template / 环境变量模板 |
| `renovate.json` | Automated dependency updates / 依赖自动更新 |
| `.github/workflows/ci.yml` | CI: check + test / CI 流水线 |
| `.vscode/` | VS Code settings + recommended extensions / 编辑器配置 |
