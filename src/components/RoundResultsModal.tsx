import { Match, Show, Switch } from 'solid-js';

import { Modal } from './Modal';

import { closeModal, initializeGame, isModalOpen, isNewTopScore, isWin } from '../lib/gameState';

export const RoundResultsModal = () => {
  return (
    <Modal isOpen={isModalOpen()} handleClose={closeModal}>
      <p class="bg-gradient-colorful bg-clip-text pb-5 text-center font-display text-4xl font-bold text-transparent">
        <Show when={isWin()} fallback="You Lose">
          You Win
        </Show>
      </p>
      <p class="pb-8 text-center text-lg text-slate-50">
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
    </Modal>
  );
};
