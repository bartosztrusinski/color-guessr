import { Component, mergeProps } from 'solid-js';

import { cn } from '../utils';

type Props = {
  score: number;
  label?: string;
  scoreClass?: string;
  labelClass?: string;
};

export const Score: Component<Props> = (props) => {
  const { label, score, labelClass, scoreClass } = mergeProps({ label: 'Score', score: 0 }, props);

  return (
    <div class="text-center">
      <div class={cn('mb-1 font-medium', labelClass)}>{label}</div>
      <div
        class={cn(
          'bg-primary text-primary-content font-display rounded-lg p-3 text-4xl font-semibold',
          scoreClass,
        )}
      >
        {score}
      </div>
    </div>
  );
};
