export enum GameState {
  Playing = 'playing',
  Win = 'win',
  Lose = 'lose',
}

export type BoardData = {
  colors: Rgb[];
  winningColorIndex: number;
};

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export type DifficultySettings = {
  boardSize: number;
  pointsPerWin: number;
};

export type Rgb = {
  r: number;
  g: number;
  b: number;
};
