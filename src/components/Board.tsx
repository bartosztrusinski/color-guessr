import { Component, For } from 'solid-js';

import { getPointsPerWin, setRoundBoardsToWinningColor } from '../utils';
import { RoundStatus } from '../lib/types';
import {
  colorsOnBoard,
  difficulty,
  isPlaying,
  roundData,
  score,
  setRoundStatus,
  setIsModalOpen,
  setIsNewTopScore,
  setRoundData,
  setScore,
  setTopScore,
  topScore,
  winningColorIndex,
} from '../lib/gameState';

export const Board: Component = () => {
  const guessColor = (chosenColorIndex: number) => {
    if (!isPlaying()) {
      return;
    }

    const isWin = chosenColorIndex === winningColorIndex();
    const pointsPerWin = getPointsPerWin(difficulty());
    const newScore = isWin ? score() + pointsPerWin : 0;
    const newRoundData = setRoundBoardsToWinningColor(roundData());

    setRoundStatus(isWin ? RoundStatus.Win : RoundStatus.Lose);
    setRoundData(newRoundData);
    setIsNewTopScore(newScore > topScore());
    setScore(newScore);
    setTopScore(Math.max(newScore, topScore()));
    setIsModalOpen(true);
  };

  return (
    <div class="mx-auto grid max-w-[72vh] grid-cols-3 gap-3 sm:gap-5 md:gap-4 lg:gap-5">
      <For each={colorsOnBoard()}>
        {(color, cardIndex) => (
          <button
            type="button"
            class="btn aspect-square h-full border-none bg-[var(--card-color)] p-0 hover:scale-105 hover:bg-[var(--card-color)]"
            style={{ '--card-color': `rgb(${color.r} ${color.g} ${color.b})` }}
            onClick={[guessColor, cardIndex()]}
          ></button>
        )}
      </For>
    </div>
  );
};
