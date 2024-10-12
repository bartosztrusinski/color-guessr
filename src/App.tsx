import { batch, createSignal, type Component } from 'solid-js';

import { Board } from './components/Board';
import { Layout } from './components/Layout';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';

import { Difficulty, GameState } from './types';
import { defaultDifficulty, difficultySettings } from './config';
import {
  capitalize,
  generateRandomColors,
  getBoardSize,
  getKeys,
  pickRandomIndex,
} from './utils';

const App: Component = () => {
  const [gameState, setGameState] = createSignal<GameState>('playing');
  const [difficulty, setDifficulty] =
    createSignal<Difficulty>(defaultDifficulty);
  const boardSize = () => getBoardSize(difficulty());
  const [colors, setColors] = createSignal(generateRandomColors(boardSize()));
  const [winningColorIndex, setWinningColorIndex] = createSignal(
    pickRandomIndex(boardSize()),
  );
  const winningColor = () => colors()[winningColorIndex()];
  const isPlaying = () => gameState() === 'playing';
  const isWin = () => gameState() === 'win';

  const initializeGame = () => {
    batch(() => {
      setGameState('playing');
      setColors(generateRandomColors(boardSize()));
      setWinningColorIndex(pickRandomIndex(boardSize()));
    });
  };

  const changeDifficulty = (newDifficulty: Difficulty) => {
    if (newDifficulty === difficulty()) {
      return;
    }

    setDifficulty(newDifficulty);
    initializeGame();
  };

  const guessColor = (cardIndex: number) => {
    if (!isPlaying()) {
      return;
    }

    setGameState(cardIndex === winningColorIndex() ? 'win' : 'lose');
  };

  return (
    <Layout>
      <LeftSidebar>
        <header class="px-4">
          <h1 class="text-3xl font-bold text-slate-50">ColorGuessr</h1>
          <p class="text-pretty text-lg">
            Click on the color that matches the RGB value below.
          </p>
        </header>
        <p class="mt-2 self-center">Difficulty: {difficulty()}</p>
        <div class="mt-3 self-center">
          <h2 class="mb-1 text-lg">Select difficulty</h2>
          <div class="join">
            {getKeys(difficultySettings).map((difficulty) => (
              <button
                type="button"
                class="btn btn-primary join-item"
                onClick={() => changeDifficulty(difficulty)}
              >
                {capitalize(difficulty)}
              </button>
            ))}
          </div>
        </div>
      </LeftSidebar>

      <main class="p-6 text-center md:px-4">
        <p class="mb-4 text-3xl font-bold">
          {gameState() === 'playing' ?
            <p>RGB ({Object.values(winningColor()).join(', ')})</p>
          : isWin() ?
            <p>You win!</p>
          : <p>Try again!</p>}
        </p>
        {!isPlaying() && (
          <button
            type="button"
            class="btn btn-secondary mb-4"
            onClick={initializeGame}
          >
            Play again
          </button>
        )}
        <Board colors={colors()} onClick={guessColor} />
      </main>

      <RightSidebar>
        <span class="text-center text-4xl font-bold">🚧WIP🚧</span>
      </RightSidebar>
    </Layout>
  );
};

export default App;
