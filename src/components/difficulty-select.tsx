import { Index } from 'solid-js';
import { useAppContext } from '../context/app-context';
import { difficultySettings } from '../lib/config';
import { capitalize, getKeys } from '../utils';

export function DifficultySelect() {
  const { appState, setAppState } = useAppContext();

  return (
    <div>
      <div class="mb-1 text-center">Select difficulty</div>
      <div class="join w-full">
        <Index each={getKeys(difficultySettings)}>
          {(difficulty) => (
            <button
              type="button"
              class="btn btn-primary join-item grow font-bold"
              classList={{ 'btn-active': appState.difficulty === difficulty() }}
              onClick={() => setAppState('difficulty', difficulty())}
            >
              {capitalize(difficulty())}
            </button>
          )}
        </Index>
      </div>
    </div>
  );
}
