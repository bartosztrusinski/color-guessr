import { LogoIcon } from './logo-icon';

export function Logo() {
  return (
    <div class="flex items-center justify-center gap-2">
      <LogoIcon class="bg-gradient size-12 -rotate-12 rounded-lg p-2" />
      <h1 class="bg-gradient font-display bg-clip-text text-3xl font-bold text-transparent">
        ColorGuessr
      </h1>
    </div>
  );
}
