import { createSignal, createUniqueId, JSX, mergeProps, ParentComponent } from 'solid-js';
import { MenuIcon } from './MenuIcon';

type Props = {
  icon?: JSX.Element;
  drawerOpenSide?: 'left' | 'right';
};

export const Drawer: ParentComponent<Props> = (explicitProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = createSignal(false);
  const id = createUniqueId();
  const props = mergeProps(
    { icon: <MenuIcon class="size-6" />, drawerOpenSide: 'left' },
    explicitProps,
  );

  return (
    <div
      class="drawer w-auto"
      classList={{ 'drawer-open': isDrawerOpen(), 'drawer-end': props.drawerOpenSide === 'right' }}
    >
      <input
        id={id}
        type="checkbox"
        class="drawer-toggle"
        onInput={[setIsDrawerOpen, !isDrawerOpen]}
      />
      <div class="drawer-content">
        <label for={id} class="btn btn-square btn-primary drawer-button text-slate-50">
          {props.icon}
        </label>
      </div>
      <div class="drawer-side z-10">
        <label for={id} aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="menu w-72 gap-6 rounded-xl bg-base-200 p-6 pb-16 text-base-content">
          {props.children}
        </div>
      </div>
    </div>
  );
};
