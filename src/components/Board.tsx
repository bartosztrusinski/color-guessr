import { Component } from 'solid-js';
import { Rgb } from '../types';

type Props = {
  colors: Rgb[];
  onClick: (cardIndex: number) => void;
};

export const Board: Component<Props> = (props) => {
  return (
    <div class="grid grid-cols-3 gap-5">
      {props.colors.map((color, cardIndex) => (
        <button
          class="btn aspect-square h-full transform bg-[var(--card-color)] p-0 hover:bg-[var(--card-color)]"
          style={{ '--card-color': `rgb(${color.r} ${color.g} ${color.b})` }}
          onClick={() => props.onClick(cardIndex)}
        ></button>
      ))}
    </div>
  );
};
