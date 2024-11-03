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
    <div>
      <div class="mb-1 text-center">Select difficulty</div>
      <div class="join">
        <Index each={getKeys(difficultySettings)}>
          {(difficulty) => (
            <button
              type="button"
              class="btn btn-primary join-item font-bold text-slate-50"
              classList={{ 'btn-active': props.currentDifficulty === difficulty() }}
              onClick={[props.onClick, difficulty]}
            >
              {capitalize(difficulty())}
            </button>
          )}
        </Index>
      </div>
    </div>
  );
};
