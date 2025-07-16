import { Component, For } from 'solid-js';
import { useAppContext } from '../context/app-context';
import { getPointsPerWin, setRoundBoardsToWinningColor } from '../utils';
import { RoundStatus } from '../types';

export const Board: Component = () => {
  const { appState, setAppState, colorsOnBoard, isPlaying, winningColorIndex } = useAppContext();

  const guessColor = (chosenColorIndex: number) => {
    if (!isPlaying()) {
      return;
    }

    const isWin = chosenColorIndex === winningColorIndex();
    const pointsPerWin = getPointsPerWin(appState.difficulty);
    const newScore = isWin ? appState.score + pointsPerWin : 0;
    const newRoundData = setRoundBoardsToWinningColor(appState.roundData);

    setAppState((prevState) => ({
      ...prevState,
      roundStatus: isWin ? RoundStatus.Win : RoundStatus.Lose,
      roundData: newRoundData,
      score: newScore,
      isNewTopScore: newScore > prevState.topScore,
      topScore: Math.max(newScore, prevState.topScore),
      isModalOpen: true,
    }));
  };

  return (
    <div class="mx-auto grid max-w-[72vh] grid-cols-3 gap-3 sm:gap-5 md:gap-4 lg:gap-5">
      <For each={colorsOnBoard()}>
        {(color, cardIndex) => (
          <button
            type="button"
            class="btn aspect-square h-full border-none bg-(--card-color) p-0 shadow-xl outline-(--card-color) transition-all duration-150 hover:scale-105 focus-visible:outline-4"
            style={{ '--card-color': `rgb(${color.r} ${color.g} ${color.b})` }}
            onClick={[guessColor, cardIndex()]}
          ></button>
        )}
      </For>
    </div>
  );
};
