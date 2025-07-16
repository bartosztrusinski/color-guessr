import { THEMES } from './lib/config';

enum RoundStatus {
  Playing = 'playing',
  Win = 'win',
  Lose = 'lose',
}

enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

type RoundData = Record<Difficulty, BoardData>;

type BoardData = {
  colors: Rgb[];
  winningColorIndex: number;
};

type DifficultySettings = {
  boardSize: number;
  pointsPerWin: number;
};

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type Theme = (typeof THEMES)[number];

export {
  RoundStatus,
  Difficulty,
  type RoundData,
  type BoardData,
  type DifficultySettings,
  type Rgb,
  type Theme,
};
