# Upgrading generated projects

Generated projects keep `starter-version.json` so maintainers can identify the baseline they
started from. Template updates are not applied automatically.

For every starter release:

1. Review the release diff and migration notes.
2. Apply configuration changes in a focused branch.
3. Preserve project-specific framework overrides.
4. Run `pnpm install --frozen-lockfile` and `pnpm run verify`.
5. Review major dependency updates manually.
6. Merge only through a protected branch with required CI.

If a release requires an irreversible data or infrastructure migration, provide a separate
rollback-tested migration instead of placing it in this template.
