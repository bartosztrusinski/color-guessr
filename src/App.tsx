import { createSignal, onMount, Show, type Component } from 'solid-js';

import { Board } from './components/Board';
import { Layout } from './components/Layout';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { Header } from './components/Header';
import { RoundResultsModal } from './components/RoundResultsModal';
import { Score } from './components/Score';
import { DifficultySelect } from './components/DifficultySelect';
import { Drawer } from './components/Drawer';
import { LogoIcon } from './components/LogoIcon';
import { PlayAgainButton } from './components/PlayAgainButton';

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
        <div class="flex items-center gap-6 lg:hidden">
          <Score score={score()} />
          <Score score={topScore()} label="Top Score" />
        </div>
        <DifficultySelect currentDifficulty={difficulty()} onClick={setDifficulty} />
        <Show when={!isPlaying()}>
          <PlayAgainButton handleClick={initializeGame} size="lg" />
        </Show>
      </LeftSidebar>

      <main class="p-4 text-center md:py-8">
        <div class="flex place-content-between items-center pb-4 md:hidden">
          <Drawer>
            <Header />
          </Drawer>
          <div class="flex items-center gap-2">
            <Score score={0} size="sm" />
            <Score score={25} label="Top Score" size="sm" />
          </div>
          <Drawer icon={<LogoIcon class="size-6" />} drawerOpenSide="right">
            <DifficultySelect currentDifficulty={difficulty()} onClick={setDifficulty} />
            <Show when={!isPlaying()}>
              <PlayAgainButton handleClick={initializeGame} />
            </Show>
          </Drawer>
        </div>
        <h3 class="mb-4 inline-block bg-gradient-colorful bg-clip-text font-display text-3xl font-bold text-transparent md:text-4xl">
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
