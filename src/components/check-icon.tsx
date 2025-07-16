import { cn } from '../utils';

type Props = {
  class?: string;
};

export function CheckIcon(props: Props) {
  return (
    <svg
      class={cn('size-12 fill-current', props.class)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
    </svg>
  );
}
