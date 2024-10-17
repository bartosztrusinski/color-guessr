import { Difficulty, DifficultySettings } from './types';

export const defaultDifficulty: Difficulty = 'medium';

export const difficultySettings: Record<Difficulty, DifficultySettings> = {
  easy: { boardSize: 3, pointsPerWin: 1 },
  medium: { boardSize: 6, pointsPerWin: 3 },
  hard: { boardSize: 9, pointsPerWin: 5 },
};
