import { ConfigKey, Difficulty, DifficultySettings } from './types';

export const DEFAULT_DIFFICULTY: Difficulty = Difficulty.Medium;

export const THEMES = ['default', 'cupcake', 'retro', 'forest', 'cyberpunk', 'synthwave'] as const;
export const DEFAULT_THEME: (typeof THEMES)[number] = 'default';

export const difficultySettings: Record<Difficulty, DifficultySettings> = {
  easy: { boardSize: 3, pointsPerWin: 1 },
  medium: { boardSize: 6, pointsPerWin: 3 },
  hard: { boardSize: 9, pointsPerWin: 5 },
};

const storagePrefix = 'color-guessr';
const storageKeys = [
  'score',
  'top-score',
  'difficulty',
  'round-data',
  'game-state',
  'theme',
] as const;

export const storageKeyConstants = Object.freeze(generateStorageKeyConstants(storageKeys));

function generateStorageKeyConstants<T extends string>(
  storageKeys: readonly T[],
): Record<ConfigKey<T>, string> {
  return storageKeys.reduce(
    (storageKeyConstants, key) => ({
      ...storageKeyConstants,
      [key.toUpperCase().replace('-', '_')]: `${storagePrefix}-${key}`,
    }),
    {} as Record<ConfigKey<T>, string>,
  );
}
