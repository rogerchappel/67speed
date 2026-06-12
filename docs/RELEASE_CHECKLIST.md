# Release Checklist

Use this checklist before shipping a public 67speed update.

1. Install from the lockfile with `npm ci`.
2. Run `npm run release:check`.
3. Run `bash scripts/validate.sh` for the repository hygiene wrapper.
4. Confirm generated cards still write to `dist/cards/` when running `npm run card`.
5. Review the safety and privacy section in `README.md` for any user-facing behavior changes.
