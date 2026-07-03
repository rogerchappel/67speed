# 67speed

A zero-login nonsense speed test for the `6-7` meme.

67speed is built like a viral toy, not a bloated app: tiny pages, deterministic results, shareable cards, and no dependency on copyrighted audio, celebrity likeness, or account creation.

## What it does

- Runs a playful 6-prompt `67 Speed` test in the browser
- Produces deterministic score + archetype output from a seed
- Serves share/result pages at short URLs
- Includes parent and teacher explainers without pretending the meme has one official meaning
- Keeps result pages `noindex` by default and avoids low-value SEO spam patterns

## Routes

- `/` — landing page
- `/start/` — main test
- `/daily/` — deterministic daily challenge
- `/r/<result-id>/` — result page
- `/what-is-6-7/` — concise explainer
- `/parents/` — parent explainer
- `/teachers/` — teacher explainer
- `/about/` and `/privacy/`
- `/api/og/<result-id>.png`
- `/api/result-card/<result-id>.png`

## Quickstart

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Practical examples

Generate a deterministic fixture payload:

```bash
npm run generate -- --date 2026-05-07 --seed 67
```

Build a share card locally:

```bash
npm run card -- --score 82 --archetype "Certified Hallway Menace" --out dist/cards/example.svg
```

Run the local verification stack:

```bash
npm test
npm run check
npm run build
npm run smoke
bash scripts/validate.sh
```


## Verification

Run the local quality gates before opening a pull request:

```sh
npm run lint
npm test
npm run smoke
```

`npm run lint` is an alias for the repository static check so contributors can use the common npm workflow without guessing the project-specific command.

## Safety and privacy

- No login required
- No user-upload storage in V1
- No copyrighted music/video clips
- No NBA/player/creator likeness use
- No fake global counters or fake live leaderboards
- Result pages are designed for sharing, not mass indexing

## Tech shape

- Next.js App Router
- Static-first content model
- Deterministic scoring in `src/lib/game.ts`
- SVG-based share card generation for cache-friendly output
- Fixture-backed node tests using the built-in test runner

## Contributing

Small, atomic changes preferred. Run `bash scripts/validate.sh` before shipping.

## Security

If you find a vulnerability, follow [SECURITY.md](SECURITY.md).

## License

MIT

## Development

Run the same checks locally before opening a PR:

- `npm run check` - tsc --noEmit
- `npm run build` - next build
- `npm test` - node --import tsx --test tests/**/*.test.ts
- `npm run smoke` - npm run build && node scripts/smoke.mjs
- `npm run package:smoke` - npm run build && npm pack --dry-run
- `npm run release:check` - npm test && npm run check && npm run smoke && npm run package:smoke

## Release Verification

Before publishing or tagging a release, run the same verification path used by CI:

- `npm run release:check`
- `npm run package:smoke`

See `docs/release-readiness.md` for the package surface, CLI bins, and reviewer checklist.
