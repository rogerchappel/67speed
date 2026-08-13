import { dailySeed, createResult } from '../src/lib/game.ts';
import { fail, parseOptions } from './cli-options.mjs';

const usage = 'Usage: npm run generate -- [--date YYYY-MM-DD | --seed VALUE]';
const args = parseOptions(process.argv.slice(2), new Set(['--date', '--seed']), usage);
if (args.has('--date') && args.has('--seed')) fail('--date and --seed are mutually exclusive', usage);
if (args.has('--date') && !isCanonicalDate(args.get('--date'))) fail('--date must be a real date in YYYY-MM-DD', usage);

const seed = args.get('--date') ?? args.get('--seed') ?? dailySeed();
const result = createResult(String(seed), Array.from({ length: 6 }, (_, index) => ({ promptId: `p${index}`, reactionMs: 320 + index * 70, choice: index % 4 })));
console.log(JSON.stringify(result, null, 2));

function isCanonicalDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth[month - 1];
}
