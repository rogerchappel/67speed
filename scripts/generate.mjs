import { dailySeed, createResult } from '../src/lib/game.ts';
const args = new Map(process.argv.slice(2).map((value, index, array) => value.startsWith('--') ? [value.slice(2), array[index + 1]] : null).filter(Boolean));
const seed = args.get('date') ?? args.get('seed') ?? dailySeed();
const result = createResult(String(seed), Array.from({ length: 6 }, (_, index) => ({ promptId: `p${index}`, reactionMs: 320 + index * 70, choice: index % 4 })));
console.log(JSON.stringify(result, null, 2));
