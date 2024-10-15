import { batch, createSignal, type Component } from 'solid-js';

import { Board } from './components/Board';
import { Layout } from './components/Layout';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { Logo } from './components/Logo';
import { DifficultySelect } from './components/DifficultySelect';
import { MobileDrawer } from './components/MobileDrawer';

import { Difficulty, GameState } from './types';
import { defaultDifficulty } from './config';
import { generateRandomColors, getBoardSize, pickRandomIndex } from './utils';

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
        <header class="mb-4 mt-3 px-4">
          <Logo />
          <div class="chat chat-end my-4 px-6">
            <div class="chat-bubble chat-bubble-primary text-balance text-center text-slate-50">
              Try and guess the color based on the RGB values! 🌈
            </div>
          </div>
        </header>
        <DifficultySelect
          currentDifficulty={difficulty()}
          onClick={changeDifficulty}
        />
      </LeftSidebar>

      <main class="p-4 text-center md:py-8">
        <MobileDrawer>
          <header class="mb-4 mt-3">
            <Logo />
            <div class="chat chat-end my-5 px-4">
              <div class="chat-bubble chat-bubble-primary text-balance text-center text-slate-50">
                Try and guess the color based on the RGB values! 🌈
              </div>
            </div>
          </header>
          <DifficultySelect
            currentDifficulty={difficulty()}
            onClick={changeDifficulty}
          />
        </MobileDrawer>
        <p class="inline-block bg-gradient-colorful bg-clip-text pb-4 font-display text-4xl font-bold text-transparent">
          {gameState() === 'playing' ?
            <p>RGB ({Object.values(winningColor()).join(', ')})</p>
          : isWin() ?
            <p>You win!</p>
          : <p>Try again!</p>}
        </p>
        {!isPlaying() && (
          <button
            type="button"
            class="btn btn-secondary btn-wide mx-auto mb-4 block text-base"
            onClick={initializeGame}
          >
            Play again
          </button>
        )}
        <Board colors={colors()} onClick={guessColor} />
      </main>

      <RightSidebar></RightSidebar>
    </Layout>
  );
};

export default App;
