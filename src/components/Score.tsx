import { Component, mergeProps } from 'solid-js';

type Size = 'sm' | 'md' | 'lg';

type Props = {
  score: number;
  label?: string;
  size?: Size;
};

const labelClasses: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};
const scoreClasses: Record<Size, string> = {
  sm: 'text-3xl p-2',
  md: 'text-4xl p-3',
  lg: 'text-5xl p-4',
};

export const Score: Component<Props> = (props) => {
  const finalProps = mergeProps({ label: 'Score', size: 'md' }, props) as Required<Props>;
  const finalScoreClasses = scoreClasses[finalProps.size];
  const finalLabelClasses = labelClasses[finalProps.size];

  return (
    <div class="text-center text-slate-50">
      <div class={`mb-1 ${finalLabelClasses}`}>{finalProps.label}</div>
      <div class={`rounded-lg bg-gradient-colorful font-display ${finalScoreClasses}`}>
        {finalProps.score}
      </div>
    </div>
  );
};
