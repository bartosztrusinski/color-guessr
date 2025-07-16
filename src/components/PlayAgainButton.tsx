import { Component } from 'solid-js';
import { useAppContext } from '../context/app-context';
import { cn } from '../utils';
import { ReloadIcon } from './ReloadIcon';

type Props = {
  class?: string;
};

export const PlayAgainButton: Component<Props> = (props) => {
  const { startRound } = useAppContext();

  return (
    <div>
      <div class="mb-1 text-center">Play again</div>
      <button
        type="button"
        class={cn('btn btn-accent font-semibold', props.class)}
        onClick={startRound}
      >
        <ReloadIcon class="size-8" />
      </button>
    </div>
  );
};
