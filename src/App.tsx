import {
  batch,
  createEffect,
  createSignal,
  Match,
  Show,
  Switch,
  type Component,
} from 'solid-js';

import { Board } from './components/Board';
import { Layout } from './components/Layout';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';

import { Difficulty, GameState } from './types';
import {
  DEFAULT_DIFFICULTY,
  DIFFICULTY_STORAGE_KEY,
  SCORE_STORAGE_KEY,
} from './config';
import {
  generateRandomColors,
  getBoardSize,
  getPointsPerWin,
  pickRandomIndex,
} from './utils';

const App: Component = () => {
  const [gameState, setGameState] = createSignal<GameState>('playing');
  const [difficulty, setDifficulty] = createSignal<Difficulty>(
    (localStorage.getItem(DIFFICULTY_STORAGE_KEY) as Difficulty) ??
      DEFAULT_DIFFICULTY,
  );
  const [score, setScore] = createSignal(
    Number(localStorage.getItem(SCORE_STORAGE_KEY)) ?? 0,
  );
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

    const isWin = cardIndex === winningColorIndex();
    const pointsPerWin = getPointsPerWin(difficulty());

    setGameState(isWin ? 'win' : 'lose');
    setScore(isWin ? score() + pointsPerWin : 0);
  };

  createEffect(() => {
    localStorage.setItem(SCORE_STORAGE_KEY, score().toString());
  });

  createEffect(() => {
    localStorage.setItem(DIFFICULTY_STORAGE_KEY, difficulty());
  });

  return (
    <Layout>
      <LeftSidebar>
        <Header
          currentDifficulty={difficulty()}
          handleDifficultyChange={changeDifficulty}
        />
      </LeftSidebar>

      <main class="p-4 text-center md:py-8">
        <MobileDrawer>
          <Header
            currentDifficulty={difficulty()}
            handleDifficultyChange={changeDifficulty}
          />
        </MobileDrawer>
        <p class="inline-block bg-gradient-colorful bg-clip-text pb-4 font-display text-4xl font-bold text-transparent">
          <Switch fallback="Try Again!">
            <Match when={isWin()}>You win!</Match>
            <Match when={isPlaying()}>
              RGB ({Object.values(winningColor()).join(', ')})
            </Match>
          </Switch>
        </p>
        <Show when={!isPlaying()}>
          <button
            type="button"
            class="btn btn-secondary btn-wide mx-auto mb-4 block text-base"
            onClick={initializeGame}
          >
            Play again
          </button>
        </Show>
        <Board colors={colors()} onClick={guessColor} />
      </main>

      <RightSidebar>
        <div class="mx-auto my-3 text-center text-slate-50">
          <p class="text-lg font-bold">Score</p>
          <p class="my-3 rounded-lg bg-gradient-colorful p-4 font-display text-5xl">
            {score()}
          </p>
        </div>
      </RightSidebar>
    </Layout>
  );
};

export default App;
