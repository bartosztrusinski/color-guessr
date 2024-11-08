import { Component } from 'solid-js';
import { ReloadIcon } from './ReloadIcon';
import { defaultProps } from '../lib/defaultProps';

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'full';
  handleClick: () => void;
};

export const PlayAgainButton: Component<Props> = (explicitProps) => {
  const props = defaultProps({ size: 'full' }, explicitProps);

  return (
    <div>
      <div class="mb-1 text-center">Play again</div>
      <button
        type="button"
        class="btn btn-accent text-base text-slate-50"
        classList={{
          'btn-lg': props.size === 'lg',
          'btn-sm': props.size === 'sm',
          'btn-block': props.size === 'full',
        }}
        onClick={props.handleClick}
      >
        <ReloadIcon class="size-7" />
      </button>
    </div>
  );
};
