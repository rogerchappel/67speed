import test from 'node:test';
import assert from 'node:assert/strict';
import { createReactionTimer } from '../src/lib/reaction-timer';

test('a slow first answer does not contaminate a fast second answer', () => {
  let currentTime = 1_000;
  const timer = createReactionTimer(() => currentTime);

  currentTime += 2_000;
  assert.equal(timer.measure(), 2_000);

  timer.startPrompt();
  currentTime += 25;
  assert.equal(timer.measure(), 25);
});

test('each prompt transition establishes an independent timing window', () => {
  let currentTime = 5_000;
  const timer = createReactionTimer(() => currentTime);

  for (const reactionMs of [900, 40, 1_400, 10]) {
    currentTime += reactionMs;
    assert.equal(timer.measure(), reactionMs);
    timer.startPrompt();
  }
});
