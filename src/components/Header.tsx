import { Component } from 'solid-js';

import { Logo } from './Logo';
import { DifficultySelect } from './DifficultySelect';
import { Difficulty } from '../lib/types';

type Props = {
  currentDifficulty: Difficulty;
  changeDifficulty: (newDifficulty: Difficulty) => void;
};

export const Header: Component<Props> = (props) => {
  return (
    <>
      <header class="my-3 flex flex-col items-center">
        <Logo />
        <div class="chat chat-end my-4">
          <div class="chat-bubble chat-bubble-primary max-w-44 text-center text-slate-50">
            Try and guess the color based on the RGB values! 🌈
          </div>
        </div>
      </header>
      <DifficultySelect
        currentDifficulty={props.currentDifficulty}
        onClick={props.changeDifficulty}
      />
    </>
  );
};
