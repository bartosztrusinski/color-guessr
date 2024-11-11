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

export type ConfigKey<T extends string> = Uppercase<Replace<T, '-', '_'>>;

type Replace<Str extends string, ToReplace extends string, Replacement extends string> =
  Str extends `${infer Prefix}${ToReplace}${infer Suffix}` ? `${Prefix}${Replacement}${Suffix}`
  : Str;

export {
  RoundStatus,
  Difficulty,
  type RoundData,
  type BoardData,
  type DifficultySettings,
  type Rgb,
};
