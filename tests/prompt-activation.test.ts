import assert from 'node:assert/strict';
import test from 'node:test';
import { createPromptActivationGuard } from '../src/lib/prompt-activation';

test('accepts at most one activation for each displayed prompt', () => {
  const guard = createPromptActivationGuard();
  const promptIds = Array.from({ length: 6 }, (_, index) => `prompt-${index + 1}`);
  const answers: string[] = [];
  let step = 0;

  const activate = (promptId: string) => {
    if (!guard.accept(promptId)) return;
    answers.push(promptId);
    step += 1;
  };

  for (const promptId of promptIds) {
    guard.display(promptId);
    activate(promptId);
    activate(promptId);
  }

  assert.equal(step, 6);
  assert.deepEqual(answers, promptIds);
  assert.equal(new Set(answers).size, 6);
});
