import { Component } from 'solid-js';

import { defaultProps } from '../lib/defaultProps';

type Size = 'sm' | 'md' | 'lg';

type Classes = {
  label: string;
  score: string;
};

type Props = {
  score: number;
  label?: string;
  size?: Size;
};

const sizeClasses: Record<Size, Classes> = {
  sm: {
    label: 'text-sm',
    score: 'text-3xl p-2',
  },
  md: {
    label: 'text-base',
    score: 'text-4xl p-3',
  },
  lg: {
    label: 'text-lg',
    score: 'text-5xl p-4',
  },
};

export const Score: Component<Props> = (explicitProps) => {
  const props = defaultProps({ label: 'Score', size: 'md' }, explicitProps);
  const classes = sizeClasses[props.size];

  return (
    <div class="text-center">
      <div class={`mb-1 font-medium ${classes.label}`}>{props.label}</div>
      <div class={`bg-primary font-display rounded-lg font-semibold ${classes.score}`}>
        {props.score}
      </div>
    </div>
  );
};
