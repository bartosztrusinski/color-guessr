import { onMount, Show, type Component } from 'solid-js';

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
import { ThemeController } from './components/ThemeController';

import { useAppContext } from './context/app-context';

export const App: Component = () => {
  const { appState, startRound, isPlaying, isWin, isLose, winningColor } = useAppContext();

  onMount(() => {
    if (!isPlaying()) {
      startRound();
    }
  });

  return (
    <Layout>
      <LeftSidebar>
        <Header />
        <div class="flex items-center gap-6 lg:hidden">
          <Score score={appState.score} />
          <Score score={appState.topScore} label="Top Score" />
        </div>
        <ThemeController />
        <DifficultySelect />
        <Show when={!isPlaying()}>
          <PlayAgainButton class="btn-xl" />
        </Show>
      </LeftSidebar>

      <main class="p-4 text-center md:py-8">
        <div class="flex place-content-between items-center pb-4 md:hidden">
          <Drawer>
            <Header />
          </Drawer>

          <div class="flex items-center gap-2">
            <Score score={appState.score} labelClass="text-sm" scoreClass="text-3xl p-2" />
            <Score
              score={appState.topScore}
              label="Top Score"
              labelClass="text-sm"
              scoreClass="text-3xl p-2"
            />
          </div>
          <Drawer icon={<LogoIcon class="size-8" />} drawerOpenSide="right">
            <ThemeController />
            <DifficultySelect />
            <Show when={isWin() || isLose()}>
              <PlayAgainButton class="btn-block" />
            </Show>
          </Drawer>
        </div>
        <h3 class="bg-gradient font-display mb-4 inline-block bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          RGB ({Object.values(winningColor()).join(', ')})
        </h3>
        <Board />
      </main>

      <RightSidebar>
        <Score score={appState.score} labelClass="text-lg" scoreClass="text-5xl p-4" />
        <Score score={appState.topScore} label="Top Score" />
      </RightSidebar>

      <RoundResultsModal />
    </Layout>
  );
};
