import { Match, Show, Switch } from 'solid-js';
import { useAppContext } from '../context/app-context';
import { Modal } from './modal';

export function RoundResultsModal() {
  const { appState, setAppState, isWin, startRound, winningColor } = useAppContext();

  return (
    <Modal isOpen={appState.isModalOpen} onClose={() => setAppState('isModalOpen', false)}>
      <div class="flex flex-col items-center gap-5">
        <p class="bg-gradient font-display bg-clip-text text-4xl font-bold text-transparent">
          <Show when={isWin()} fallback="You Lose">
            You Win
          </Show>
        </p>
        <div
          class="font-display bg-(--winning-color) bg-clip-text text-2xl font-medium text-transparent"
          style={{
            '--winning-color': `rgb(${winningColor().r}, ${winningColor().g}, ${winningColor().b})`,
          }}
        >
          <div>RGB ({Object.values(winningColor()).join(', ')})</div>
          <div class="mx-auto mt-1 size-16 rounded bg-inherit shadow-lg"></div>
        </div>

        <p class="text-lg font-medium">
          <Switch fallback="Better luck next time!">
            <Match when={appState.isNewTopScore}>Wow! You just beat the top score!</Match>
            <Match when={isWin()}>Good job! You guessed the right color</Match>
          </Switch>
        </p>
        <button type="button" class="btn btn-accent btn-block text-lg" onClick={startRound}>
          <Show when={isWin()} fallback="Try Again">
            Next Round
          </Show>
        </button>
      </div>
    </Modal>
  );
}
