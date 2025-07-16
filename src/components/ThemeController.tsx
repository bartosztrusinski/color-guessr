import { Component, For, Show } from 'solid-js';
import { useAppContext } from '../context/app-context';
import { THEMES } from '../lib/config';
import { capitalize } from '../utils';

export const ThemeController: Component = () => {
  const { appState, setAppState } = useAppContext();

  return (
    <div>
      <p class="mb-1 text-center">Select theme</p>
      <div class="dropdown dropdown-center w-full">
        <div tabindex={0} role="button" class="btn btn-primary btn-block justify-between">
          <span>Theme</span>
          <svg
            class="size-2 shrink-0 fill-current opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
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
                    <svg
                      class="size-3 shrink-0 fill-current opacity-80"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                    </svg>
                  </Show>
                </button>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};
