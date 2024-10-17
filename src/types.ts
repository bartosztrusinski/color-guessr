export type GameState = 'playing' | 'win' | 'lose';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type DifficultySettings = {
  boardSize: number;
  pointsPerWin: number;
};

export type Rgb = {
  r: number;
  g: number;
  b: number;
};
