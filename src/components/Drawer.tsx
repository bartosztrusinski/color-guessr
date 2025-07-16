import { createSignal, createUniqueId, JSXElement, mergeProps, ParentComponent } from 'solid-js';
import { MenuIcon } from './MenuIcon';

type Props = {
  icon?: JSXElement;
  drawerOpenSide?: 'left' | 'right';
};

export const Drawer: ParentComponent<Props> = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = createSignal(false);
  const id = createUniqueId();
  const finalProps = mergeProps(
    { icon: <MenuIcon class="size-8" />, drawerOpenSide: 'left' },
    props,
  );

  return (
    <div
      class="drawer w-auto"
      classList={{
        'drawer-open': isDrawerOpen(),
        'drawer-end': finalProps.drawerOpenSide === 'right',
      }}
    >
      <input
        id={id}
        type="checkbox"
        class="drawer-toggle"
        onInput={[setIsDrawerOpen, !isDrawerOpen]}
      />
      <div class="drawer-content">
        <label for={id} class="btn btn-square btn-lg btn-primary">
          {finalProps.icon}
        </label>
      </div>
      <div class="drawer-side z-10">
        <label for={id} aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="menu bg-base-100 text-base-content m-2 w-72 gap-6 rounded-lg p-6 pb-16">
          {finalProps.children}
        </div>
      </div>
    </div>
  );
};
