import { createSignal, Match, onMount, Show, Switch, type Component } from 'solid-js';

import { Board } from './components/Board';
import { Layout } from './components/Layout';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { ReloadIcon } from './components/ReloadIcon';

import { createPersistentSignal } from './createPersistentSignal';
import { onPressEscape } from './onPressEscape';
import { GameState } from './types';
import { generateRoundData, getPointsPerWin, setRoundBoardsToWinningColor } from './utils';
import {
  DEFAULT_DIFFICULTY,
  DIFFICULTY_STORAGE_KEY,
  GAME_STATE_STORAGE_KEY,
  ROUND_DATA_STORAGE_KEY,
  SCORE_STORAGE_KEY,
  TOP_SCORE_STORAGE_KEY,
} from './config';

export const App: Component = () => {
  const [gameState, setGameState] = createPersistentSignal<GameState>(
    GAME_STATE_STORAGE_KEY,
    GameState.Playing,
  );
  const [roundData, setRoundData] = createPersistentSignal(
    ROUND_DATA_STORAGE_KEY,
    generateRoundData(),
  );
  const [difficulty, setDifficulty] = createPersistentSignal(
    DIFFICULTY_STORAGE_KEY,
    DEFAULT_DIFFICULTY,
  );
  const [score, setScore] = createPersistentSignal(SCORE_STORAGE_KEY, 0);
  const [topScore, setTopScore] = createPersistentSignal(TOP_SCORE_STORAGE_KEY, 0);
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const [isNewTopScore, setIsNewTopScore] = createSignal(false);

  const colorsOnBoard = () => roundData()[difficulty()].colors;
  const winningColorIndex = () => roundData()[difficulty()].winningColorIndex;
  const winningColor = () => colorsOnBoard()[winningColorIndex()];
  const isPlaying = () => gameState() === 'playing';
  const isWin = () => gameState() === 'win';

  const initializeGame = () => {
    setGameState(GameState.Playing);
    setRoundData(generateRoundData());
    setIsModalOpen(false);
    setIsNewTopScore(false);
  };

  const guessColor = (chosenColorIndex: number) => {
    if (!isPlaying()) {
      return;
    }

    const isWin = chosenColorIndex === winningColorIndex();
    const pointsPerWin = getPointsPerWin(difficulty());
    const newScore = isWin ? score() + pointsPerWin : 0;
    const newRoundData = setRoundBoardsToWinningColor(roundData());

    setGameState(isWin ? GameState.Win : GameState.Lose);
    setRoundData(newRoundData);
    setIsNewTopScore(newScore > topScore());
    setScore(newScore);
    setTopScore(Math.max(newScore, topScore()));
    setIsModalOpen(true);
  };

  onMount(() => {
    if (!isPlaying()) {
      initializeGame();
    }
  });

  onPressEscape(() => setIsModalOpen(false));

  return (
    <Layout>
      <LeftSidebar>
        <Header currentDifficulty={difficulty()} changeDifficulty={setDifficulty} />
        <Show when={!isPlaying()}>
          <button
            type="button"
            class="btn btn-accent btn-lg mt-12 self-center text-base text-slate-50"
            onClick={initializeGame}
          >
            <ReloadIcon class="size-7" />
          </button>
        </Show>
      </LeftSidebar>

      <main class="p-4 text-center md:py-8">
        <MobileDrawer>
          <Header currentDifficulty={difficulty()} changeDifficulty={setDifficulty} />
        </MobileDrawer>
        <h3 class="mb-4 inline-block bg-gradient-colorful bg-clip-text font-display text-4xl font-bold text-transparent">
          RGB ({Object.values(winningColor()).join(', ')})
        </h3>
        <Board colors={colorsOnBoard()} onClick={guessColor} />

        <dialog class="modal" classList={{ 'modal-open': isModalOpen() }}>
          <div class="modal-box">
            <p class="bg-gradient-colorful bg-clip-text pb-5 font-display text-4xl font-bold text-transparent">
              <Show when={isWin()} fallback="You Lose">
                You Win
              </Show>
            </p>
            <p class="pb-10 text-lg text-slate-50">
              <Switch fallback="Better luck next time!">
                <Match when={isNewTopScore()}>Wow! You just beat the top score!</Match>
                <Match when={isWin()}>Good job! You guessed the right color</Match>
              </Switch>
            </p>
            <button
              type="button"
              class="btn btn-accent btn-block text-lg text-slate-50"
              onClick={initializeGame}
            >
              <Show when={isWin()} fallback="Try Again">
                Next Round
              </Show>
            </button>
          </div>
          <form method="dialog" onSubmit={[setIsModalOpen, false]} class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
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
