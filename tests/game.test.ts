import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mkdtempSync } from 'node:fs';
import { archetypeForScore, createResult, dailySeed, hashSeed, pickPrompts, resultFromId, resultIdFromSeed, scoreAnswers } from '../src/lib/game';
import { renderCardPng, renderCardSvg } from '../src/lib/card';
import { GET as getOgCard } from '../src/app/api/og/[resultId]/route';
import { GET as getResultCard } from '../src/app/api/result-card/[resultId]/route';

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

test('daily seed is deterministic by date string', () => {
  assert.equal(dailySeed(new Date('2026-05-07T00:00:00.000Z')), '2026-05-07');
});

test('prompt picks are deterministic', () => {
  assert.deepEqual(pickPrompts('seed-67', 3).map((item) => item.id), pickPrompts('seed-67', 3).map((item) => item.id));
});

test('score calculation stays bounded', () => {
  const score = scoreAnswers(Array.from({ length: 6 }, (_, index) => ({ promptId: `p${index}`, reactionMs: 350 + index * 30, choice: (index % 4) as 0 | 1 | 2 | 3 })), 'abc');
  assert.ok(score >= 7 && score <= 100);
});

test('archetypes map across bands', () => {
  assert.equal(archetypeForScore(95), 'Dangerously 6-7');
  assert.equal(archetypeForScore(20), 'Too Normal');
});

test('result ids are deterministic', () => {
  assert.equal(resultIdFromSeed('abc', 82, 'Certified Hallway Menace'), resultIdFromSeed('abc', 82, 'Certified Hallway Menace'));
  assert.notEqual(hashSeed('abc'), hashSeed('abd'));
});

test('results preserve their identity and display values when reopened', () => {
  const answers = Array.from({ length: 6 }, (_, index) => ({ promptId: `p${index}`, reactionMs: 350 + index * 30, choice: (index % 4) as 0 | 1 | 2 | 3 }));
  const created = createResult('seed-67', answers);
  const reopened = resultFromId(created.id);

  assert.equal(reopened.id, created.id);
  assert.equal(reopened.score, created.score);
  assert.equal(reopened.archetype, created.archetype);
  assert.equal(reopened.seed, created.seed);
  assert.deepEqual(reopened.prompts.map(({ id }) => id), created.prompts.map(({ id }) => id));
  assert.equal(reopened.challengeUrl, `/start/?seed=${encodeURIComponent(created.seed)}&challenge=${created.id}`);
});

test('result ids round-trip URL-safe Unicode seeds', () => {
  const seed = 'daily challenge 🦘/67?';
  const id = resultIdFromSeed(seed, 82, 'Certified Hallway Menace');

  assert.equal(resultFromId(id).seed, seed);
  assert.doesNotMatch(id, /[/?#%]/);
});

test('legacy and malformed result ids retain deterministic fallbacks', () => {
  assert.equal(resultFromId('certified-hallway-menace-83-7tcx3f').seed, '7tcx3f');
  assert.equal(resultFromId('certified-hallway-menace-83~v2~%%%').seed, '67seed');
  assert.deepEqual(
    resultFromId('certified-hallway-menace-83~v2~%%%').prompts,
    resultFromId('certified-hallway-menace-83~v2~%%%').prompts,
  );
});

test('versioned result ids with an omitted seed payload use the stable fallback', () => {
  const result = resultFromId('too-normal-20~v2~');
  const fallback = resultFromId('too-normal-20~v2~%%%');

  assert.equal(result.seed, '67seed');
  assert.match(result.challengeUrl, /[?&]seed=67seed(?:&|$)/);
  assert.deepEqual(result.prompts.map(({ id }) => id), fallback.prompts.map(({ id }) => id));
});

test('card renderer returns branded svg', () => {
  const result = createResult('seed', Array.from({ length: 6 }, (_, index) => ({ promptId: `p${index}`, reactionMs: 350 + index * 30, choice: (index % 4) as 0 | 1 | 2 | 3 })));
  const svg = renderCardSvg(result);
  assert.match(svg, /67speed\.com/);
  assert.match(svg, /svg/);
});

test('card renderer returns deterministic PNG bytes', async () => {
  const result = createResult('seed', Array.from({ length: 6 }, (_, index) => ({ promptId: `p${index}`, reactionMs: 350 + index * 30, choice: (index % 4) as 0 | 1 | 2 | 3 })));
  const first = await renderCardPng(result);
  const second = await renderCardPng(result);

  assert.deepEqual(first.subarray(0, pngSignature.length), pngSignature);
  assert.deepEqual(first, second);
});

test('advertised card API routes return PNG content and MIME type', async () => {
  const result = createResult('api-seed', Array.from({ length: 6 }, (_, index) => ({ promptId: `p${index}`, reactionMs: 350 + index * 30, choice: (index % 4) as 0 | 1 | 2 | 3 })));
  const context = { params: Promise.resolve({ resultId: `${result.id}.png` }) };

  for (const handler of [getOgCard, getResultCard]) {
    const response = await handler(new Request(`https://67speed.com/card/${result.id}.png`), context);
    const body = Buffer.from(await response.arrayBuffer());

    assert.equal(response.headers.get('content-type'), 'image/png');
    assert.deepEqual(body.subarray(0, pngSignature.length), pngSignature);
  }
});

test('card CLI writes PNG bytes to its documented extension', () => {
  const directory = mkdtempSync(join(tmpdir(), '67speed-card-'));
  const output = join(directory, 'example.png');

  try {
    execFileSync(process.execPath, ['--import', 'tsx', 'scripts/card.mjs', '--score', '82', '--archetype', 'Certified Hallway Menace', '--out', output]);
    assert.deepEqual(readFileSync(output).subarray(0, pngSignature.length), pngSignature);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
