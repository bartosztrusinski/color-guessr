import { ParentComponent } from 'solid-js';

export const Layout: ParentComponent = (props) => {
  return (
    <div class="grid h-screen grid-cols-1 justify-center md:grid-cols-[var(--sidebar-col)_var(--game-col)] lg:grid-cols-[var(--sidebar-col)_var(--game-col)_var(--sidebar-col)]">
      {props.children}
    </div>
  );
};
