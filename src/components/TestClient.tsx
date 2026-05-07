'use client';
import { useMemo, useState } from 'react';
import { createResult, dailySeed, pickPrompts, type AnswerValue } from '@/lib/game';
const CHOICES = ['Too early','6 energy','7 energy','Pure nonsense'] as const;
export function TestClient({ seed = dailySeed() }: { seed?: string }) {
  const prompts = useMemo(() => pickPrompts(seed, 6), [seed]);
  const [step, setStep] = useState(0);
  const [startedAt] = useState(() => Date.now());
  const [answers, setAnswers] = useState<{ promptId: string; reactionMs: number; choice: AnswerValue }[]>([]);
  const result = answers.length === prompts.length ? createResult(seed, answers) : null;
  const handleChoice = (choice: AnswerValue) => { const prompt = prompts[step]; const reactionMs = Date.now() - startedAt - step * 670; setAnswers((current) => [...current, { promptId: prompt.id, reactionMs, choice }]); setStep((current) => current + 1); };
  if (result) return <section className="panel result" aria-live="polite"><p className="eyebrow">Result locked</p><h2>{result.title}</h2><p className="big">{result.archetype}</p><p>{result.summary}</p><ul>{result.shareCopy.map((line) => <li key={line}>{line}</li>)}</ul><div className="actions"><a className="button" href={`/r/${result.id}/`}>Open result page</a><a className="button ghost" href={`/start/?seed=${encodeURIComponent(dailySeed())}`}>Run it again</a></div></section>;
  const prompt = prompts[step];
  return <section className="panel" aria-live="polite"><p className="eyebrow">6.7-second mode</p><h2>{prompt.cue}</h2><p>{prompt.label}</p><p className="counter">Prompt {step + 1} / {prompts.length}</p><div className="choice-grid">{CHOICES.map((choice, index) => <button key={choice} className="choice" onClick={() => handleChoice(index as AnswerValue)}>{choice}</button>)}</div><p className="hint">Keyboard-friendly, no login, no uploads, no weird tracking.</p></section>;
}
