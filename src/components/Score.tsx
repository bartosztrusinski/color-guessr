import { Component, mergeProps } from 'solid-js';

import { cn } from '../utils';

type Props = {
  score: number;
  label?: string;
  scoreClass?: string;
  labelClass?: string;
};

export const Score: Component<Props> = (props) => {
  const finalProps = mergeProps({ label: 'Score', score: 0 }, props);

  return (
    <div class="text-center">
      <div class={cn('mb-1 font-medium', finalProps.labelClass)}>{finalProps.label}</div>
      <div
        class={cn(
          'bg-primary text-primary-content font-display rounded-lg p-3 text-4xl font-semibold',
          finalProps.scoreClass,
        )}
      >
        {finalProps.score}
      </div>
    </div>
  );
};
