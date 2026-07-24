export type ReactionTimer = {
  startPrompt: () => void;
  measure: () => number;
};

export function createReactionTimer(now: () => number = Date.now): ReactionTimer {
  let promptStartedAt = now();

  return {
    startPrompt() {
      promptStartedAt = now();
    },
    measure() {
      return Math.max(0, now() - promptStartedAt);
    },
  };
}
