import test from 'node:test';
import assert from 'node:assert/strict';
import { createResult, dailySeed, pickPrompts, type AnswerValue } from '../src/lib/game';
import { normalizeStartSeed } from '../src/lib/startSeed';

test('start query seeds fall back when missing, repeated, empty, or whitespace-only', () => {
  const fallback = dailySeed();

  for (const value of [undefined, [], ['first', 'second'], '', '   ', '\t\n']) {
    assert.equal(normalizeStartSeed(value), fallback);
  }
});

test('start query seeds preserve arbitrary and Unicode values', () => {
  for (const seed of ['67', ' daily challenge ', '🦘/6-7?']) {
    assert.equal(normalizeStartSeed(seed), seed);
  }
});

test('a run completed from every invalid start seed produces a result', () => {
  for (const value of [undefined, '', '   ', '\t\n']) {
    const seed = normalizeStartSeed(value);
    const answers = pickPrompts(seed, 6).map((prompt, index) => ({
      promptId: prompt.id,
      reactionMs: 350 + index * 30,
      choice: (index % 4) as AnswerValue,
    }));

    assert.equal(createResult(seed, answers).seed, seed);
  }
});
