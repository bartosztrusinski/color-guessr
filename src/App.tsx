import { batch, createEffect, createSignal, Match, Show, Switch, type Component } from 'solid-js';

import { Board } from './components/Board';
import { Layout } from './components/Layout';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';

import { Difficulty, GameState } from './types';
import { generateRoundData, getPointsPerWin } from './utils';
import {
  DEFAULT_DIFFICULTY,
  DIFFICULTY_STORAGE_KEY,
  SCORE_STORAGE_KEY,
  TOP_SCORE_STORAGE_KEY,
} from './config';

const App: Component = () => {
  const [gameState, setGameState] = createSignal<GameState>(GameState.Playing);
  // TODO: Store round data in local storage
  const [roundData, setRoundData] = createSignal(generateRoundData());
  const [difficulty, setDifficulty] = createSignal(
    (localStorage.getItem(DIFFICULTY_STORAGE_KEY) as Difficulty) ?? DEFAULT_DIFFICULTY,
  );
  const [score, setScore] = createSignal(Number(localStorage.getItem(SCORE_STORAGE_KEY)) ?? 0);

  const topScore = () => Math.max(score(), Number(localStorage.getItem(TOP_SCORE_STORAGE_KEY)));
  const colorsOnBoard = () => roundData()[difficulty()].colors;
  const winningColorIndex = () => roundData()[difficulty()].winningColorIndex;
  const winningColor = () => colorsOnBoard()[winningColorIndex()];
  const isPlaying = () => gameState() === 'playing';
  const isWin = () => gameState() === 'win';

  const initializeGame = () => {
    batch(() => {
      setGameState(GameState.Playing);
      setRoundData(generateRoundData());
    });
  };

  const guessColor = (chosenColorIndex: number) => {
    if (!isPlaying()) {
      return;
    }

    const isWin = chosenColorIndex === winningColorIndex();
    const pointsPerWin = getPointsPerWin(difficulty());

    setGameState(isWin ? GameState.Win : GameState.Lose);
    setScore(isWin ? score() + pointsPerWin : 0);
  };

  createEffect(() => {
    localStorage.setItem(SCORE_STORAGE_KEY, score().toString());
  });

  createEffect(() => {
    localStorage.setItem(TOP_SCORE_STORAGE_KEY, topScore().toString());
  });

  createEffect(() => {
    localStorage.setItem(DIFFICULTY_STORAGE_KEY, difficulty());
  });

  return (
    <Layout>
      <LeftSidebar>
        <Header currentDifficulty={difficulty()} selectDifficulty={setDifficulty} />
      </LeftSidebar>

      <main class="p-4 text-center md:py-8">
        <MobileDrawer>
          <Header currentDifficulty={difficulty()} selectDifficulty={setDifficulty} />
        </MobileDrawer>
        <p class="inline-block bg-gradient-colorful bg-clip-text pb-4 font-display text-4xl font-bold text-transparent">
          <Switch fallback="Try Again!">
            <Match when={isWin()}>You win!</Match>
            <Match when={isPlaying()}>RGB ({Object.values(winningColor()).join(', ')})</Match>
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
        <Board colors={colorsOnBoard()} onClick={guessColor} />
      </main>

      <RightSidebar>
        <section class="mt-3 flex flex-col items-center gap-1 text-slate-50">
          <div class="text-lg font-bold">Score</div>
          <div class="rounded-lg bg-gradient-colorful p-4 font-display text-5xl">{score()}</div>
        </section>
        <section class="mt-5 flex flex-col items-center gap-1 text-slate-50">
          <div class="font-bold">Top Score</div>
          <div class="rounded-lg bg-gradient-colorful p-3 font-display text-4xl">{topScore()}</div>
        </section>
      </RightSidebar>
    </Layout>
  );
};

export default App;
