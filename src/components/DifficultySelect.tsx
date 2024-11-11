import { Component, Index } from 'solid-js';

import { capitalize, getKeys } from '../utils';
import { difficultySettings } from '../lib/config';
import { difficulty as currentDifficulty, setDifficulty } from '../lib/gameState';

export const DifficultySelect: Component = () => {
  return (
    <div>
      <div class="mb-1 text-center">Select difficulty</div>
      <div class="join">
        <Index each={getKeys(difficultySettings)}>
          {(difficulty) => (
            <button
              type="button"
              class="btn btn-primary join-item font-bold text-slate-50"
              classList={{ 'btn-active': currentDifficulty() === difficulty() }}
              onClick={[setDifficulty, difficulty]}
            >
              {capitalize(difficulty())}
            </button>
          )}
        </Index>
      </div>
    </div>
  );
};
