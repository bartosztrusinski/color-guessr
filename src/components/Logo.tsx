import { Component } from 'solid-js';

import { LogoIcon } from './LogoIcon';

export const Logo: Component = () => {
  return (
    <div class="flex items-center justify-center gap-2">
      <LogoIcon class="size-12 -rotate-12 rounded-lg bg-gradient-colorful p-2 text-slate-50" />
      <h1 class="bg-gradient-colorful bg-clip-text font-display text-3xl font-bold text-transparent">
        ColorGuessr
      </h1>
    </div>
  );
};
