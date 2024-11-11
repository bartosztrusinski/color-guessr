import { Component } from 'solid-js';

import { ReloadIcon } from './ReloadIcon';

import { defaultProps } from '../lib/defaultProps';
import { initializeGame } from '../lib/gameState';

type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

type Props = {
  size?: ButtonSize;
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  full: 'btn-block',
};

export const PlayAgainButton: Component<Props> = (explicitProps) => {
  const props = defaultProps({ size: 'full' }, explicitProps);
  const buttonSizeClass = buttonSizeClasses[props.size];

  return (
    <div>
      <div class="mb-1 text-center">Play again</div>
      <button
        type="button"
        class={`btn-m btn btn-accent text-base text-slate-50 ${buttonSizeClass}`}
        onClick={initializeGame}
      >
        <ReloadIcon class="size-7" />
      </button>
    </div>
  );
};
