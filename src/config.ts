import { Difficulty, DifficultySettings } from './types';

export const defaultDifficulty: Difficulty = 'medium';

export const difficultySettings: Record<Difficulty, DifficultySettings> = {
  easy: { boardSize: 3 },
  medium: { boardSize: 6 },
  hard: { boardSize: 9 },
};
