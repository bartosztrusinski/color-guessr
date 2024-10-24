import { Component, For } from 'solid-js';

import { Rgb } from '../types';

type Props = {
  colors: Rgb[];
  onClick: (cardIndex: number) => void;
  isPlaying: boolean;
  winningColor: Rgb;
};

export const Board: Component<Props> = (props) => {
  return (
    <div
      class="mx-auto grid max-w-[72vh] grid-cols-3 gap-3 sm:gap-5 md:gap-4 lg:gap-5"
      style={{
        '--winning-color': `rgb(${props.winningColor.r} ${props.winningColor.g} ${props.winningColor.b})`,
      }}
    >
      <For each={props.colors}>
        {(color, cardIndex) => (
          <button
            type="button"
            class="btn aspect-square h-full border-none bg-[var(--card-color)] p-0 hover:scale-105 hover:bg-[var(--card-color)]"
            style={{
              '--card-color':
                props.isPlaying ? `rgb(${color.r} ${color.g} ${color.b})` : 'var(--winning-color)',
            }}
            onClick={() => props.onClick(cardIndex())}
          ></button>
        )}
      </For>
    </div>
  );
};
