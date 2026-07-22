import test from 'node:test';
import assert from 'node:assert/strict';
import { archetypeForScore, createResult, dailySeed, hashSeed, pickPrompts, resultFromId, resultIdFromSeed, scoreAnswers } from '../src/lib/game';
import { renderCardSvg } from '../src/lib/card';

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
});

test('card renderer returns branded svg', () => {
  const result = createResult('seed', Array.from({ length: 6 }, (_, index) => ({ promptId: `p${index}`, reactionMs: 350 + index * 30, choice: (index % 4) as 0 | 1 | 2 | 3 })));
  const svg = renderCardSvg(result);
  assert.match(svg, /67speed\.com/);
  assert.match(svg, /svg/);
});
