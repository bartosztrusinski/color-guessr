import { Match, Show, Switch } from 'solid-js';
import { Modal } from './Modal';

type Props = {
  isOpen: boolean;
  isWin: boolean;
  isNewTopScore: boolean;
  handleClose: () => void;
  handleClick: () => void;
};

export const RoundResultsModal = (props: Props) => {
  return (
    <Modal {...props}>
      <p class="bg-gradient-colorful bg-clip-text pb-5 text-center font-display text-4xl font-bold text-transparent">
        <Show when={props.isWin} fallback="You Lose">
          You Win
        </Show>
      </p>
      <p class="pb-8 text-center text-lg text-slate-50">
        <Switch fallback="Better luck next time!">
          <Match when={props.isNewTopScore}>Wow! You just beat the top score!</Match>
          <Match when={props.isWin}>Good job! You guessed the right color</Match>
        </Switch>
      </p>
      <button
        type="button"
        class="btn btn-accent btn-block text-lg text-slate-50"
        onClick={props.handleClick}
      >
        <Show when={props.isWin} fallback="Try Again">
          Next Round
        </Show>
      </button>
    </Modal>
  );
};
