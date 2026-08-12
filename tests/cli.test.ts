import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const runCli = (script: string, args: string[]) => spawnSync(
  process.execPath,
  ['--import', 'tsx', script, ...args],
  { encoding: 'utf8' },
);

test('generate CLI accepts documented date and seed modes', () => {
  const byDate = JSON.parse(execFileSync(process.execPath, ['--import', 'tsx', 'scripts/generate.mjs', '--date', '2026-05-07'], { encoding: 'utf8' }));
  const bySeed = JSON.parse(execFileSync(process.execPath, ['--import', 'tsx', 'scripts/generate.mjs', '--seed', '67'], { encoding: 'utf8' }));

  assert.equal(byDate.seed, '2026-05-07');
  assert.equal(bySeed.seed, '67');
});

for (const args of [
  ['--unknown', 'value'],
  ['--date'],
  ['--date', '2026-05-07', '--seed', '67'],
]) {
  test(`generate CLI rejects invalid arguments: ${args.join(' ')}`, () => {
    const result = runCli('scripts/generate.mjs', args);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Usage: npm run generate/);
  });
}

test('card CLI accepts its documented example', () => {
  const directory = mkdtempSync(join(tmpdir(), '67speed-card-cli-'));
  const output = join(directory, 'example.png');

  try {
    const result = runCli('scripts/card.mjs', ['--score', '82', '--archetype', 'Certified Hallway Menace', '--out', output]);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(readFileSync(output).subarray(0, 8), Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

for (const args of [
  ['--score', 'nope'],
  ['--score', 'Infinity'],
  ['--score', '101'],
  ['--score'],
  ['--out'],
  ['--unknown', 'value'],
]) {
  test(`card CLI rejects invalid arguments: ${args.join(' ')}`, () => {
    const result = runCli('scripts/card.mjs', args);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Usage: npm run card/);
  });
}
