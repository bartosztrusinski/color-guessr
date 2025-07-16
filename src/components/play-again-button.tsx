import { useAppContext } from '../context/app-context';
import { cn } from '../utils';
import { ReloadIcon } from './reload-icon';

type Props = {
  class?: string;
};

export function PlayAgainButton(props: Props) {
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
}
