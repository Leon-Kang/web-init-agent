# Web Init Agent

[English](README.md) | **简体中文** | [日本語](README.ja.md)

框架无关的 TypeScript Web 项目模板，供开发者与 AI 编程代理共同使用。
通过明确、可重复执行的工程规范完成项目初始化。完整规则见 [`AGENTS.md`](AGENTS.md)。

## 工具链

| 工具 | 职责 |
|---|---|
| **pnpm** | 包管理器 |
| **TypeScript** | 严格模式类型检查 |
| **dprint** | JS/TS/JSON/CSS 格式化 |
| **Biome** | JS/TS 代码检查 |
| **Stylelint** | CSS 代码检查 |
| **PostCSS** | 使用 preset-env 和 autoprefixer 转换 CSS |
| **Vitest** | 单元测试 |
| **husky + lint-staged** | 提交前钩子 |
| **Renovate** | 自动更新依赖 |

## 快速开始

### 已有项目

安装依赖并初始化 Git 钩子，然后运行完整验证：

```bash
pnpm install
pnpm run verify
```

### 从模板创建新项目

按下面七个步骤完成初始化。

## 新项目初始化

### 第 1 步 · 安装框架

选择一个框架。模板本身不包含运行时依赖。

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

### 第 2 步 · 安装固定版本依赖

依赖与 pnpm 运行时均固定版本，保证安装结果可复现：

```bash
pnpm install
```

创建仓库后，Renovate 会以可见、可审查的方式维护依赖更新。

### 第 3 步 · 配置 TypeScript

根据所选框架调整 `tsconfig.json`：

| 框架 | TypeScript 配置 |
|---|---|
| Next.js | 使用框架生成的 TypeScript 配置 |
| Astro | 继承 `astro/tsconfigs/strict`；使用 React 岛屿时添加 `jsx: "react-jsx"` |
| Vite + React | 添加 `jsx: "react-jsx"` |
| Remix | 使用 `moduleResolution: "bundler"` 并添加框架类型 |

调整 `include` 以匹配源码目录。Next.js App Router 示例：

```jsonc
"include": ["app", "src", "next-env.d.ts"]
```

Vite、Astro 或 Remix 示例：

```jsonc
"include": ["src"]
```

### 第 4 步 · 更新 dprint 插件

`.dprint.jsonc` 中的插件地址在模板创建时固定。初始化项目时更新插件：

```bash
pnpm dlx dprint config update
```

### 第 5 步 · 搭建测试环境

**浏览器项目（React、Next.js、Astro）**

安装浏览器测试依赖：

```bash
pnpm add -D jsdom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

将 `vitest.config.ts` 中的环境改为 `environment: "jsdom"`。

**纯服务端项目**

模板默认使用 Node.js 环境：

```ts
environment: 'node',
```

**测试初始化文件**

浏览器测试需要在 `vitest.config.ts` 中启用初始化文件：

```ts
setupFiles: ['./src/test/setup.ts'],
```

创建 `src/test/setup.ts`：

```ts
import '@testing-library/jest-dom';
```

**可选的 Vitest 全局 API**

如果启用 `globals: true`，在 `src/vite-env.d.ts` 中添加以下引用，让 TypeScript 识别全局测试 API：

```ts
/// <reference types="vitest/globals" />
```

### 第 6 步 · 配置环境变量

```bash
cp .env.example .env.local
```

在 `.env.local` 中填写本地配置，不要提交密钥。新增必要变量时，在 `.env.example` 中记录变量名，不写入敏感值。

### 第 7 步 · 验证

```bash
pnpm run check
pnpm run build
pnpm run test
```

三个命令必须全部通过。如果安装框架后出现错误，应修复问题，不要关闭检查规则。

## 从初始化到经过审查的 PR

本仓库负责建立项目基础。初始化完成后，
[issue-to-pr](https://github.com/Leon-Kang/issue-to-pr) 可以将 issue 推进到实现、测试、审查，
并创建需要人工批准的 PR。

## 脚本

| 命令 | 用途 |
|---|---|
| `pnpm run fmt` | 格式化文件 |
| `pnpm run fmt:check` | 检查格式，不修改文件 |
| `pnpm run lint` | 检查 JS/TS |
| `pnpm run lint:css` | 检查 CSS |
| `pnpm run lint:fix` | 自动修复 JS/TS 检查问题 |
| `pnpm run typecheck` | 检查 TypeScript 类型 |
| `pnpm run build` | 编译最小示例 |
| `pnpm run check` | 执行格式、代码和类型检查 |
| `pnpm run test` | 运行一次测试 |
| `pnpm run test:watch` | 监听文件变化并运行测试 |
| `pnpm run verify` | 执行检查、构建和测试 |

仓库中的 [`examples/minimal/`](examples/minimal/) 是验收示例。
只有为 `verify` 接入等效的生产构建和非空测试后，才能用所选框架的项目替换它。

模板版本记录在 [`starter-version.json`](starter-version.json)，升级说明见
[`docs/upgrading.md`](docs/upgrading.md)。

## 主要约定

### 代码风格

- **缩进**：JS/TS 使用 4 个空格，CSS/JSON 使用 2 个空格。
- **引号**：JS/TS 使用单引号，JSX 属性使用双引号。
- **分号**：始终添加。
- **行宽**：JS/TS 为 100，CSS/JSON 为 80。
- **类型导入**：使用 `import type { Foo }`。

### 文件命名

| 类型 | 规范 | 示例 |
|---|---|---|
| 组件 | PascalCase | `UserCard.tsx` |
| Hook | camelCase，带 `use` 前缀 | `useUserData.ts` |
| 工具函数 | camelCase | `formatDate.ts` |
| 类型 | PascalCase | `UserProfile.ts` |
| 目录 | kebab-case | `search-results/` |
| 测试 | 与源文件名对应 | `UserCard.spec.tsx` |

### Git

分支前缀：`feat/`、`fix/`、`refactor/`、`docs/`、`chore/`。
提交信息使用 Conventional Commits 格式：

```text
feat(auth): add OAuth2 login
fix(cart): prevent duplicate items
```

### CSS

- 使用原生 CSS 和 CSS Modules（`*.module.css`），不使用 Sass 或 LESS。
- 使用 CSS 自定义属性管理主题，例如 `--color-primary`。
- 使用原生 CSS 嵌套，例如 `& .child {}`。
- 浏览器目标：`defaults and fully supports es6-module`。

## 文件索引

| 文件 | 用途 |
|---|---|
| [`AGENTS.md`](AGENTS.md) | 完整的 AI 代理规则 |
| [`package.json`](package.json) | 依赖、脚本和暂存文件钩子 |
| [`pnpm-workspace.yaml`](pnpm-workspace.yaml) | 安全、版本、peer 依赖及 override 策略 |
| [`tsconfig.base.json`](tsconfig.base.json) | 严格的 TypeScript 基础配置 |
| [`tsconfig.json`](tsconfig.json) | 框架相关的 TypeScript 配置 |
| [`vitest.config.ts`](vitest.config.ts) | 框架无关的 Node 测试配置 |
| [`biome.json`](biome.json) | JS/TS 检查配置 |
| [`.dprint.jsonc`](.dprint.jsonc) | 格式化配置 |
| [`.stylelintrc.js`](.stylelintrc.js) | CSS 检查配置 |
| [`postcss.config.js`](postcss.config.js) | PostCSS 插件 |
| [`.editorconfig`](.editorconfig) | 编辑器默认设置 |
| [`.env.example`](.env.example) | 必要环境变量名 |
| [`renovate.json`](renovate.json) | 自动更新依赖 |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | CI 验证与安全审计 |
| [`examples/minimal/`](examples/minimal/) | 可构建、可测试的基础示例 |
| [`.vscode/`](.vscode/) | VS Code 设置和推荐扩展 |

## 许可证

本项目基于 [MIT 许可证](LICENSE) 发布。
