import { createSignal } from 'solid-js';

import { generateRoundData } from '../utils';
import { DEFAULT_DIFFICULTY, storageKeyConstants } from './config';
import { GameState } from './types';
import { createPersistentSignal } from './createPersistentSignal';

const [gameState, setGameState] = createPersistentSignal<GameState>(
  storageKeyConstants.GAME_STATE,
  GameState.Playing,
);
const [roundData, setRoundData] = createPersistentSignal(
  storageKeyConstants.ROUND_DATA,
  generateRoundData(),
);
const [difficulty, setDifficulty] = createPersistentSignal(
  storageKeyConstants.DIFFICULTY,
  DEFAULT_DIFFICULTY,
);
const [score, setScore] = createPersistentSignal(storageKeyConstants.SCORE, 0);
const [topScore, setTopScore] = createPersistentSignal(storageKeyConstants.TOP_SCORE, 0);
const [isModalOpen, setIsModalOpen] = createSignal(false);
const [isNewTopScore, setIsNewTopScore] = createSignal(false);

const colorsOnBoard = () => roundData()[difficulty()].colors;
const winningColorIndex = () => roundData()[difficulty()].winningColorIndex;
const winningColor = () => colorsOnBoard()[winningColorIndex()];
const isPlaying = () => gameState() === GameState.Playing;
const isWin = () => gameState() === GameState.Win;
const isLose = () => gameState() === GameState.Lose;

export {
  setGameState,
  roundData,
  setRoundData,
  difficulty,
  setDifficulty,
  score,
  setScore,
  topScore,
  setTopScore,
  isModalOpen,
  setIsModalOpen,
  isNewTopScore,
  setIsNewTopScore,
  winningColor,
  isPlaying,
  isWin,
  isLose,
};
