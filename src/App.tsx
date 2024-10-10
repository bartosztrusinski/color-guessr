import { createSignal, type Component } from 'solid-js';

import { Board } from './components/Board';
import { Layout } from './components/Layout';
import { generateRandomColors } from './utils';
import { Difficulty, GameState } from './types';
import { defaultDifficulty, difficultySettings } from './config';

const App: Component = () => {
  const [gameState, setGameState] = createSignal<GameState>('playing');
  const [difficulty, setDifficulty] =
    createSignal<Difficulty>(defaultDifficulty);
  const boardSize = () => difficultySettings[difficulty()].boardSize;
  const [colors, setColors] = createSignal(generateRandomColors(boardSize()));
  const [winningColorIndex, setWinningColorIndex] = createSignal(
    Math.floor(Math.random() * boardSize()),
  );
  const winningColor = () => colors()[winningColorIndex()];

  const initializeGame = () => {
    setGameState('playing');
    setColors(generateRandomColors(boardSize()));
    setWinningColorIndex(Math.floor(Math.random() * boardSize()));
  };

  const changeDifficulty = (newDifficulty: Difficulty) => {
    if (newDifficulty === difficulty()) {
      return;
    }

    setDifficulty(newDifficulty);
    initializeGame();
  };

  const guessColor = (cardIndex: number) => {
    if (gameState() !== 'playing') {
      return;
    }

    setGameState(cardIndex === winningColorIndex() ? 'win' : 'lose');
  };

  return (
    <Layout>
      <header class="mb-5 flex flex-col justify-center gap-1">
        <h1 class="text-3xl font-bold text-slate-50">ColorGuessr</h1>
        <p class="text-lg">
          Click on the color that matches the RGB value below.
        </p>
        <p>Difficulty: {difficulty()}</p>
        <p class="my-2 bg-gradient-to-t text-center text-3xl">
          {gameState() === 'playing' ?
            <p>RGB ({Object.values(winningColor()).join(' ')})</p>
          : gameState() === 'win' ?
            <p>You win!</p>
          : <p>Try again!</p>}
        </p>
        {gameState() !== 'playing' && (
          <button
            type="button"
            class="btn btn-secondary self-center"
            onClick={initializeGame}
          >
            Play again
          </button>
        )}
      </header>
      <Board colors={colors()} onClick={guessColor} />
      <h2 class="mt-4">Select difficulty</h2>
      <div class="join">
        <button
          type="button"
          class="btn btn-primary join-item"
          onClick={() => changeDifficulty('easy')}
        >
          Easy
        </button>
        <button
          type="button"
          class="btn btn-primary join-item"
          onClick={() => changeDifficulty('medium')}
        >
          Medium
        </button>
        <button
          type="button"
          class="btn btn-primary join-item"
          onClick={() => changeDifficulty('hard')}
        >
          Hard
        </button>
      </div>
    </Layout>
  );
};

export default App;
