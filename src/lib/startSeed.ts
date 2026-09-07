import { dailySeed } from './game';

export function normalizeStartSeed(value: string | string[] | undefined): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : dailySeed();
}
