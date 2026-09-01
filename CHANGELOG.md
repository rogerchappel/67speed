# Changelog

## Unreleased

- Refreshed Next.js to 16.3.4, `@types/react` to 19.2.18, and `tsx` to
  4.23.13 without introducing unrelated major dependency updates.
- Updated Next.js to 16.3.3, React and React DOM to 19.2.8, and Sharp to
  0.35.4; Sharp's bundled declarations now work without a TypeScript
  suppression.
- Preserve the original challenge seed in new public result IDs so shared
  results reproduce their prompt sequence, while retaining deterministic
  handling for legacy and malformed IDs.
- Updated the PostCSS override beyond the affected ranges in
  [GHSA-6g55-p6wh-862q](https://github.com/advisories/GHSA-6g55-p6wh-862q)
  and [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849),
  with a high-severity dependency audit added to CI.

## 0.1.0

- Initial static-first 67speed experience with deterministic scoring and share/result routes.
- Added local share-card generation and smoke checks for release review.
- Added safety, privacy, and contribution documentation for public OSS promotion.
