# Release Readiness

Use this checklist before publishing, tagging, or asking reviewers to trust the package surface.

## Package Surface

- Package: `67speed`
- Repository: `https://github.com/rogerchappel/67speed`
- Pack contents are constrained by the `files` allowlist in `package.json`.

## CLI Surface

- No CLI bin is published by this package.

## Verification Commands

- `npm run check`: `tsc --noEmit`
- `npm run test`: `node --import tsx --test tests/**/*.test.ts`
- `npm run build`: `next build`
- `npm run smoke`: `npm run build && node scripts/smoke.mjs`
- `npm run package:smoke`: `npm run build && npm pack --dry-run`
- `npm run audit:high`: `npm audit --audit-level=high`
- `npm run release:check`: `npm test && npm run check && npm run smoke && npm run package:smoke`

From a clean checkout, run `npm ci`, `npm audit --json`, `npm run audit:high`,
and `npm run release:check` before opening a release PR. Record any skipped
command and the reason in the PR body.

The PostCSS override must remain outside the affected ranges documented in
[GHSA-6g55-p6wh-862q](https://github.com/advisories/GHSA-6g55-p6wh-862q)
and [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849).
CI runs the high-severity audit after a clean install so regressions fail
before the release checks.

## Reviewer Notes

- Compare README examples with the current CLI bins or module exports.
- Inspect `npm pack --dry-run` output for generated logs, caches, or private fixtures.
- Confirm CI exercises the same audit and release check paths used locally.
