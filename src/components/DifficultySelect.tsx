import { Component, Index } from 'solid-js';

import { difficultySettings } from '../lib/config';
import { capitalize, getKeys } from '../utils';
import { Difficulty } from '../lib/types';

type Props = {
  currentDifficulty: Difficulty;
  onClick: (difficulty: Difficulty) => void;
};

export const DifficultySelect: Component<Props> = (props) => {
  return (
    <div class="mx-auto">
      <p class="mb-1">Select difficulty</p>
      <div class="join">
        <Index each={getKeys(difficultySettings)}>
          {(difficulty) => (
            <button
              type="button"
              class={`btn btn-primary join-item font-bold text-slate-50 ${props.currentDifficulty === difficulty() ? 'btn-active' : ''}`}
              onClick={() => props.onClick(difficulty())}
            >
              {capitalize(difficulty())}
            </button>
          )}
        </Index>
      </div>
    </div>
  );
};
