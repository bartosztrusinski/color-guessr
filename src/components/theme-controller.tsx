import { For, Show } from 'solid-js';
import { useAppContext } from '../context/app-context';
import { THEMES } from '../lib/config';
import { capitalize } from '../utils';
import { ArrowDownIcon } from './arrow-down-icon';
import { CheckIcon } from './check-icon';

export function ThemeController() {
  const { appState, setAppState } = useAppContext();

  return (
    <div>
      <p class="mb-1 text-center">Select theme</p>
      <div class="dropdown dropdown-center w-full">
        <div tabindex={0} role="button" class="btn btn-primary btn-block min-w-32 justify-between">
          <span>{capitalize(appState.theme)}</span>
          <ArrowDownIcon class="size-2 opacity-80" />
        </div>
        <ul
          tabindex={0}
          class="dropdown-content bg-base-200 menu rounded-box z-1 w-full min-w-40 p-2 shadow-xl"
        >
          <For each={THEMES}>
            {(theme) => (
              <li>
                <button
                  class="btn btn-ghost btn-primary justify-between"
                  onClick={() => setAppState('theme', theme)}
                >
                  <span>{capitalize(theme)}</span>
                  <Show when={theme === appState.theme}>
                    <CheckIcon class="size-3" />
                  </Show>
                </button>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
}
