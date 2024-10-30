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

export type RoundData = Record<Difficulty, BoardData>;

export type DifficultySettings = {
  boardSize: number;
  pointsPerWin: number;
};

export type Rgb = {
  r: number;
  g: number;
  b: number;
};

export type ConfigKey<T extends string> = Uppercase<Replace<T, '-', '_'>>;

type Replace<Str extends string, ToReplace extends string, Replacement extends string> =
  Str extends `${infer Prefix}${ToReplace}${infer Suffix}` ? `${Prefix}${Replacement}${Suffix}`
  : Str;
