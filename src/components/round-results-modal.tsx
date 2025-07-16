import { Match, Show, Switch } from 'solid-js';
import { useAppContext } from '../context/app-context';
import { Modal } from './modal';

export function RoundResultsModal() {
  const { appState, setAppState, isWin, startRound } = useAppContext();

  return (
    <Modal isOpen={appState.isModalOpen} onClose={() => setAppState('isModalOpen', false)}>
      <div class="flex flex-col items-center gap-7">
        <p class="bg-gradient font-display bg-clip-text text-4xl font-bold text-transparent">
          <Show when={isWin()} fallback="You Lose">
            You Win
          </Show>
        </p>
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
