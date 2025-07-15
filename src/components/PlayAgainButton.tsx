import { Component } from 'solid-js';
import { ReloadIcon } from './ReloadIcon';
import { initializeGame } from '../lib/gameState';
import { cn } from '../utils';

type Props = {
  class?: string;
};

export const PlayAgainButton: Component<Props> = (props) => {
  return (
    <div>
      <div class="mb-1 text-center">Play again</div>
      <button
        type="button"
        class={cn('btn btn-accent font-semibold', props.class)}
        onClick={initializeGame}
      >
        <ReloadIcon class="size-8" />
      </button>
    </div>
  );
};
