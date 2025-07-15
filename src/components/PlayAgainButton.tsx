import { Component } from 'solid-js';

import { ReloadIcon } from './ReloadIcon';

import { defaultProps } from '../lib/defaultProps';
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
        class={cn('btn btn-accent text-base text-slate-50', props.class)}
        onClick={initializeGame}
      >
        <ReloadIcon class="size-8" />
      </button>
    </div>
  );
};
