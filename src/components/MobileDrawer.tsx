import { ParentComponent } from 'solid-js';

import { MenuIcon } from './MenuIcon';

export const MobileDrawer: ParentComponent = (props) => {
  return (
    <div class="drawer md:hidden">
      <input id="mobile-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex content-start">
        <label
          for="mobile-drawer"
          class="btn btn-primary drawer-button px-3 text-slate-50"
        >
          <MenuIcon class="size-6" />
        </label>
      </div>
      <div class="drawer-side z-10">
        <label
          for="mobile-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          {props.children}
        </ul>
      </div>
    </div>
  );
};
