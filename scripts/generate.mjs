import { dailySeed, createResult } from '../src/lib/game.ts';
import { fail, parseOptions } from './cli-options.mjs';

const usage = 'Usage: npm run generate -- [--date YYYY-MM-DD | --seed VALUE]';
const args = parseOptions(process.argv.slice(2), new Set(['--date', '--seed']), usage);
if (args.has('--date') && args.has('--seed')) fail('--date and --seed are mutually exclusive', usage);
if (args.has('--date') && !/^\d{4}-\d{2}-\d{2}$/.test(args.get('--date'))) fail('--date must use YYYY-MM-DD', usage);

const seed = args.get('--date') ?? args.get('--seed') ?? dailySeed();
const result = createResult(String(seed), Array.from({ length: 6 }, (_, index) => ({ promptId: `p${index}`, reactionMs: 320 + index * 70, choice: index % 4 })));
console.log(JSON.stringify(result, null, 2));
