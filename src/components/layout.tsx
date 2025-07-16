import { ParentProps } from 'solid-js';

export function Layout(props: ParentProps) {
  return (
    <div class="grid h-screen grid-cols-1 justify-center md:grid-cols-[var(--sidebar-col)_var(--game-col)] lg:grid-cols-[var(--sidebar-col)_var(--game-col)_var(--sidebar-col)]">
      {props.children}
    </div>
  );
}
