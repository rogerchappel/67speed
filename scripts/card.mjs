import fs from 'node:fs';
import path from 'node:path';
import { renderCardPng } from '../src/lib/card.ts';
import { createResult } from '../src/lib/game.ts';
import { fail, parseOptions } from './cli-options.mjs';

const usage = 'Usage: npm run card -- [--score 7-100] [--archetype TEXT] [--out FILE.png]';
const args = parseOptions(process.argv.slice(2), new Set(['--score', '--archetype', '--out']), usage);
const score = Number(args.get('--score') ?? '82');
const archetype = args.get('--archetype') ?? 'Certified Hallway Menace';
const out = args.get('--out') ?? 'dist/cards/example.png';
if (!Number.isFinite(score) || !Number.isInteger(score) || score < 7 || score > 100) {
  fail('--score must be an integer from 7 to 100', usage);
}
if (path.extname(out).toLowerCase() !== '.png') {
  fail('--out must use the .png extension', usage);
}
const result = createResult('card-seed', Array.from({ length: 6 }, (_, index) => ({ promptId: `p${index}`, reactionMs: 260 + index * 60, choice: index % 4 })));
result.score = score; result.archetype = archetype; result.title = `67 Speed: ${score}/100`;
const png = await renderCardPng(result);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, png);
console.log(out);
