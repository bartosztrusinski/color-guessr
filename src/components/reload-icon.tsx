import { cn } from '../utils';

type Props = {
  class?: string;
};

export function ReloadIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={cn('size-12 fill-none stroke-current stroke-2', props.class)}
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}
