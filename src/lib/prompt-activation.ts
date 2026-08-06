export type PromptActivationGuard = {
  display(promptId: string): void;
  accept(promptId: string): boolean;
};

export function createPromptActivationGuard(): PromptActivationGuard {
  let displayedPromptId: string | null = null;
  let accepted = false;

  return {
    display(promptId) {
      displayedPromptId = promptId;
      accepted = false;
    },
    accept(promptId) {
      if (promptId !== displayedPromptId || accepted) return false;
      accepted = true;
      return true;
    },
  };
}
