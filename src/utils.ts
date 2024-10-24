import { difficultySettings } from './config';
import { BoardData, Difficulty, Rgb } from './types';

function generateRandomRgb(): Rgb {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

export function generateRandomColors(size: number): Rgb[] {
  return Array.from({ length: size }, generateRandomRgb);
}

export function getBoardSize(difficulty: Difficulty): number {
  return difficultySettings[difficulty].boardSize;
}

export function getPointsPerWin(difficulty: Difficulty): number {
  return difficultySettings[difficulty].pointsPerWin;
}

export function pickRandomIndex(size: number): number {
  return Math.floor(Math.random() * size);
}

export const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.substring(1);
}

export function generateBoardDataForDifficulty(difficulty: Difficulty): BoardData {
  const boardSize = getBoardSize(difficulty);

  return {
    colors: generateRandomColors(boardSize),
    winningColorIndex: pickRandomIndex(boardSize),
  };
}

export function generateRoundData(): Record<Difficulty, BoardData> {
  return Object.values(Difficulty).reduce(
    (roundData, difficultyLevel) => {
      return { ...roundData, [difficultyLevel]: generateBoardDataForDifficulty(difficultyLevel) };
    },
    {} as Record<Difficulty, BoardData>,
  );
}
