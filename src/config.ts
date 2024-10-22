import { Difficulty, DifficultySettings } from './types';

export const DEFAULT_DIFFICULTY: Difficulty = Difficulty.Medium;

const STORAGE_KEY_PREFIX = 'color-guessr-';
export const SCORE_STORAGE_KEY = STORAGE_KEY_PREFIX + 'score';
export const TOP_SCORE_STORAGE_KEY = STORAGE_KEY_PREFIX + 'top-score';
export const DIFFICULTY_STORAGE_KEY = STORAGE_KEY_PREFIX + 'difficulty';

export const difficultySettings: Record<Difficulty, DifficultySettings> = {
  easy: { boardSize: 3, pointsPerWin: 1 },
  medium: { boardSize: 6, pointsPerWin: 3 },
  hard: { boardSize: 9, pointsPerWin: 5 },
};
