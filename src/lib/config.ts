import { Difficulty, DifficultySettings, Theme } from '../types';

export const DEFAULT_DIFFICULTY: Difficulty = Difficulty.Medium;

export const APP_STATE_STORAGE_KEY = 'app-state';
export const THEMES = ['default', 'cupcake', 'retro', 'forest', 'cyberpunk', 'synthwave'] as const;
export const DEFAULT_THEME: Theme = 'default';

export const difficultySettings: Record<Difficulty, DifficultySettings> = {
  easy: { boardSize: 3, pointsPerWin: 1 },
  medium: { boardSize: 6, pointsPerWin: 3 },
  hard: { boardSize: 9, pointsPerWin: 5 },
};
