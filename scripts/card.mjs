import fs from 'node:fs';
import path from 'node:path';
import { renderCardPng } from '../src/lib/card.ts';
import { createResult } from '../src/lib/game.ts';
const args = process.argv.slice(2);
const get = (flag, fallback) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : fallback; };
const score = Number(get('--score', '82'));
const archetype = get('--archetype', 'Certified Hallway Menace');
const out = get('--out', 'dist/cards/example.png');
if (path.extname(out).toLowerCase() !== '.png') {
  throw new Error('--out must use the .png extension');
}
const result = createResult('card-seed', Array.from({ length: 6 }, (_, index) => ({ promptId: `p${index}`, reactionMs: 260 + index * 60, choice: index % 4 })));
result.score = score; result.archetype = archetype; result.title = `67 Speed: ${score}/100`;
const png = await renderCardPng(result);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, png);
console.log(out);
