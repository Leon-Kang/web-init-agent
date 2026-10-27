# Web Init Agent

[English](README.md) | [简体中文](README.zh-CN.md) | **日本語**

開発者と AI コーディングエージェントが共同で使う、フレームワークに依存しない TypeScript Web プロジェクトのテンプレートです。
明確で繰り返し実行できる開発ルールに沿って、プロジェクトを初期化できます。
ルールの詳細は [`AGENTS.md`](AGENTS.md) を参照してください。

## ツールチェーン

| ツール | 役割 |
|---|---|
| **pnpm** | パッケージ管理 |
| **TypeScript** | strict モードでの型チェック |
| **dprint** | JS/TS/JSON/CSS のフォーマット |
| **Biome** | JS/TS の静的解析 |
| **Stylelint** | CSS の静的解析 |
| **PostCSS** | preset-env と autoprefixer による CSS 変換 |
| **Vitest** | ユニットテスト |
| **husky + lint-staged** | コミット前のフック |
| **Renovate** | 依存パッケージの自動更新 |

## クイックスタート

### 既存のプロジェクト

依存パッケージと Git フックをインストールし、すべての検証を実行します。

```bash
pnpm install
pnpm run verify
```

### テンプレートから新規プロジェクトを作成

以下の 7 ステップで初期設定を行います。

## 新規プロジェクトの初期設定

### ステップ 1 · フレームワークのインストール

フレームワークを 1 つ選びます。このテンプレート自体には実行時の依存パッケージはありません。

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

### ステップ 2 · 固定バージョンの依存パッケージをインストール

インストール結果を再現できるよう、依存パッケージと pnpm のバージョンを固定しています。

```bash
pnpm install
```

リポジトリ作成後は、Renovate がレビュー可能な形で依存パッケージの更新を管理します。

### ステップ 3 · TypeScript の設定

選択したフレームワークに合わせて `tsconfig.json` を編集します。

| フレームワーク | TypeScript の設定 |
|---|---|
| Next.js | フレームワークが生成する TypeScript 設定を使用 |
| Astro | `astro/tsconfigs/strict` を継承し、React アイランドを使う場合は `jsx: "react-jsx"` を追加 |
| Vite + React | `jsx: "react-jsx"` を追加 |
| Remix | `moduleResolution: "bundler"` を使い、フレームワークの型を追加 |

ソースの配置に合わせて `include` を変更します。Next.js App Router の例：

```jsonc
"include": ["app", "src", "next-env.d.ts"]
```

Vite、Astro、Remix の例：

```jsonc
"include": ["src"]
```

### ステップ 4 · dprint プラグインの更新

`.dprint.jsonc` のプラグイン URL はテンプレート作成時のバージョンに固定されています。プロジェクトの初期設定時に更新します。

```bash
pnpm dlx dprint config update
```

### ステップ 5 · テスト環境の設定

**ブラウザ向けプロジェクト（React、Next.js、Astro）**

ブラウザテストに必要な依存パッケージをインストールします。

```bash
pnpm add -D jsdom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

`vitest.config.ts` の環境を `environment: "jsdom"` に変更します。

**サーバー専用プロジェクト**

テンプレートは初期状態で Node.js 環境を使用します。

```ts
environment: 'node',
```

**テストのセットアップファイル**

ブラウザテストでは、`vitest.config.ts` でセットアップファイルを有効にします。

```ts
setupFiles: ['./src/test/setup.ts'],
```

`src/test/setup.ts` を作成します。

```ts
import '@testing-library/jest-dom';
```

**任意の Vitest グローバル API**

`globals: true` を有効にする場合は、TypeScript がグローバルなテスト API を認識できるよう、`src/vite-env.d.ts` に次の参照を追加します。

```ts
/// <reference types="vitest/globals" />
```

### ステップ 6 · 環境変数の設定

```bash
cp .env.example .env.local
```

`.env.local` にローカル環境の値を入力します。秘密情報はコミットしないでください。必須の変数を追加するときは、機密値を含めず、変数名を `.env.example` に記載します。

### ステップ 7 · 検証

```bash
pnpm run check
pnpm run build
pnpm run test
```

3 つのコマンドすべてが成功する必要があります。フレームワークの導入後にエラーが出た場合は、静的解析ルールを無効にせず、原因を修正してください。

## 初期化からレビュー済み PR まで

このリポジトリでプロジェクトの基盤を整えた後は、
[issue-to-pr](https://github.com/Leon-Kang/issue-to-pr) を使って issue から実装、テスト、レビューへと進め、
人による承認が必要な PR を作成できます。

## スクリプト

| コマンド | 用途 |
|---|---|
| `pnpm run fmt` | ファイルをフォーマット |
| `pnpm run fmt:check` | ファイルを変更せずにフォーマットを確認 |
| `pnpm run lint` | JS/TS を静的解析 |
| `pnpm run lint:css` | CSS を静的解析 |
| `pnpm run lint:fix` | JS/TS の静的解析で検出した問題を自動修正 |
| `pnpm run typecheck` | TypeScript の型をチェック |
| `pnpm run build` | 最小サンプルをコンパイル |
| `pnpm run check` | フォーマット、静的解析、型チェックを実行 |
| `pnpm run test` | テストを 1 回実行 |
| `pnpm run test:watch` | ファイル変更を監視してテストを実行 |
| `pnpm run verify` | チェック、ビルド、テストを実行 |

リポジトリ内の [`examples/minimal/`](examples/minimal/) は、動作確認用のサンプルです。
同等の本番ビルドと実際のテストを `verify` に組み込んでから、選択したフレームワークのプロジェクトに置き換えてください。

テンプレートのバージョンは [`starter-version.json`](starter-version.json) に記録しています。
アップグレード手順は [`docs/upgrading.md`](docs/upgrading.md) を参照してください。

## 主な規約

### コードスタイル

- **インデント**：JS/TS はスペース 4 つ、CSS/JSON はスペース 2 つ。
- **引用符**：JS/TS はシングルクォート、JSX 属性はダブルクォート。
- **セミコロン**：必ず付ける。
- **行幅**：JS/TS は 100、CSS/JSON は 80。
- **型のインポート**：`import type { Foo }` を使用。

### ファイル名

| 種類 | 規約 | 例 |
|---|---|---|
| コンポーネント | PascalCase | `UserCard.tsx` |
| Hook | `use` 接頭辞付きの camelCase | `useUserData.ts` |
| ユーティリティ | camelCase | `formatDate.ts` |
| 型 | PascalCase | `UserProfile.ts` |
| ディレクトリ | kebab-case | `search-results/` |
| テスト | 対応するソースのファイル名に合わせる | `UserCard.spec.tsx` |

### Git

ブランチの接頭辞：`feat/`、`fix/`、`refactor/`、`docs/`、`chore/`。
コミットメッセージは Conventional Commits に従います。

```text
feat(auth): add OAuth2 login
fix(cart): prevent duplicate items
```

### CSS

- ネイティブ CSS と CSS Modules（`*.module.css`）を使い、Sass や LESS は使用しません。
- テーマには `--color-primary` などの CSS カスタムプロパティを使用します。
- `& .child {}` などのネイティブ CSS ネストを使用します。
- 対象ブラウザ：`defaults and fully supports es6-module`。

## ファイル一覧

| ファイル | 用途 |
|---|---|
| [`AGENTS.md`](AGENTS.md) | AI エージェント向けの全ルール |
| [`package.json`](package.json) | 依存パッケージ、スクリプト、ステージ済みファイルのフック |
| [`pnpm-workspace.yaml`](pnpm-workspace.yaml) | セキュリティ、バージョン、peer 依存、override の方針 |
| [`tsconfig.base.json`](tsconfig.base.json) | strict モードの TypeScript 基本設定 |
| [`tsconfig.json`](tsconfig.json) | フレームワークごとの TypeScript 設定 |
| [`vitest.config.ts`](vitest.config.ts) | フレームワークに依存しない Node テスト設定 |
| [`biome.json`](biome.json) | JS/TS の静的解析設定 |
| [`.dprint.jsonc`](.dprint.jsonc) | フォーマット設定 |
| [`.stylelintrc.js`](.stylelintrc.js) | CSS の静的解析設定 |
| [`postcss.config.js`](postcss.config.js) | PostCSS プラグイン |
| [`.editorconfig`](.editorconfig) | エディタの既定設定 |
| [`.env.example`](.env.example) | 必須の環境変数名 |
| [`renovate.json`](renovate.json) | 依存パッケージの自動更新 |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | CI 検証とセキュリティ監査 |
| [`examples/minimal/`](examples/minimal/) | ビルドとテストが可能な基本サンプル |
| [`.vscode/`](.vscode/) | VS Code 設定と推奨拡張機能 |

## ライセンス

[MIT ライセンス](LICENSE) で公開しています。
