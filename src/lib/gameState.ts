import { createSignal } from 'solid-js';

import { generateRoundData } from '../utils';
import { DEFAULT_DIFFICULTY, storageKeyConstants } from './config';
import { RoundStatus } from './types';
import { createPersistentSignal } from './createPersistentSignal';

const [roundStatus, setRoundStatus] = createPersistentSignal<RoundStatus>(
  storageKeyConstants.GAME_STATE,
  RoundStatus.Playing,
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
const isPlaying = () => roundStatus() === RoundStatus.Playing;
const isWin = () => roundStatus() === RoundStatus.Win;
const isLose = () => roundStatus() === RoundStatus.Lose;

const closeModal = () => setIsModalOpen(false);

const initializeGame = () => {
  setRoundStatus(RoundStatus.Playing);
  setRoundData(generateRoundData());
  closeModal();
  setIsNewTopScore(false);
};

export {
  setRoundStatus,
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
  colorsOnBoard,
  winningColorIndex,
  winningColor,
  isPlaying,
  isWin,
  isLose,
  closeModal,
  initializeGame,
};
