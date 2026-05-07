export type Prompt = {
  id: string;
  cue: string;
  label: string;
  good: string;
  bad: string;
  weight: number;
};

export const PROMPTS: Prompt[] = [
  { id: 'locker', cue: 'The hallway goes silent. Someone whispers “six…”', label: 'Tap when seven lands, not before.', good: 'Patient menace', bad: 'Jumped the bit', weight: 11 },
  { id: 'scoreboard', cue: 'A scoreboard flickers from 65 to 66 to 67.', label: 'Hold until 67, then slam it.', good: 'Clutch timing', bad: 'Benched by suspense', weight: 15 },
  { id: 'teacher', cue: 'A teacher says “who keeps saying numbers?”', label: 'Stay cool until the room breaks.', good: 'Straight-face legend', bad: 'Too obvious', weight: 9 },
  { id: 'groupchat', cue: 'Your mate posts a blurry selfie and asks for a rating.', label: 'Pick the most 6-7 answer.', good: 'Chaotic diplomat', bad: 'Too normal', weight: 13 },
  { id: 'warmup', cue: 'The beat is imaginary. The hands start seesawing.', label: 'Tap exactly on the fake drop.', good: 'Beat psychic', bad: 'Lost the rhythm', weight: 10 },
  { id: 'canteen', cue: 'Lunch is mystery texture. Everyone looks at you.', label: 'React with proper nonsense confidence.', good: 'Cafeteria oracle', bad: 'Visible concern', weight: 9 },
  { id: 'daily', cue: 'Today only: respect the six, fear the seven.', label: 'Freeze on six. Fire on seven.', good: 'Daily demon', bad: 'Calendar fraud', weight: 12 }
};

export const ARCHETYPES = [
  'Dangerously 6-7',
  'Certified Hallway Menace',
  'Too Normal',
  'Bench Mob Prophet',
  'Parent-Teacher Mystery',
  'Gym-Class Oracle'
] as const;
