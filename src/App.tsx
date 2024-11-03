import { createSignal, onMount, Show, type Component } from 'solid-js';

import { Board } from './components/Board';
import { Layout } from './components/Layout';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { ReloadIcon } from './components/ReloadIcon';
import { RoundResultsModal } from './components/RoundResultsModal';
import { Score } from './components/Score';
import { DifficultySelect } from './components/DifficultySelect';

import { createPersistentSignal } from './lib/createPersistentSignal';
import { GameState } from './lib/types';
import { DEFAULT_DIFFICULTY, storageKeyConstants } from './lib/config';
import { generateRoundData, getPointsPerWin, setRoundBoardsToWinningColor } from './utils';

export const App: Component = () => {
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
  const isPlaying = () => gameState() === 'playing';
  const isWin = () => gameState() === 'win';

  const closeModal = () => setIsModalOpen(false);

  const initializeGame = () => {
    setGameState(GameState.Playing);
    setRoundData(generateRoundData());
    closeModal();
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

  return (
    <Layout>
      <LeftSidebar>
        <Header />
        <DifficultySelect currentDifficulty={difficulty()} onClick={setDifficulty} />
        <div class="flex items-center gap-8 lg:hidden">
          <Score score={score()} />
          <Score score={topScore()} label="Top Score" size="sm" />
        </div>
        <Show when={!isPlaying()}>
          <button
            type="button"
            class="btn btn-accent btn-lg text-base text-slate-50"
            onClick={initializeGame}
          >
            <ReloadIcon class="size-7" />
          </button>
        </Show>
      </LeftSidebar>

      <main class="p-4 text-center md:py-8">
        <MobileDrawer>
          <Header />
          <DifficultySelect currentDifficulty={difficulty()} onClick={setDifficulty} />
        </MobileDrawer>
        <h3 class="mb-4 inline-block bg-gradient-colorful bg-clip-text font-display text-4xl font-bold text-transparent">
          RGB ({Object.values(winningColor()).join(', ')})
        </h3>
        <Board colors={colorsOnBoard()} onClick={guessColor} />
      </main>

      <RightSidebar>
        <Score score={score()} size="lg" />
        <Score score={topScore()} label="Top Score" />
      </RightSidebar>

      <RoundResultsModal
        isOpen={isModalOpen()}
        isWin={isWin()}
        isNewTopScore={isNewTopScore()}
        handleClose={closeModal}
        handleClick={initializeGame}
      />
    </Layout>
  );
};
