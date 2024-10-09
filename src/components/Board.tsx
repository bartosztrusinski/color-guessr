import { Component } from 'solid-js';

type Props = {
  size: number;
};

export const Board: Component<Props> = (props) => {
  const boardCards = Array.from({ length: props.size }, (_, i) => i + 1);

  return (
    <div class="grid grid-cols-3 gap-5">
      {boardCards.map((card) => (
        <button class="btn btn-accent aspect-square h-full w-full">
          {card}
        </button>
      ))}
    </div>
  );
};
