import { ParentComponent } from 'solid-js';

import { MenuIcon } from './MenuIcon';

export const MobileDrawer: ParentComponent = (props) => {
  return (
    <div class="drawer md:hidden">
      <input id="mobile-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content mb-3 flex content-start">
        <label for="mobile-drawer" class="btn btn-primary drawer-button px-3 text-slate-50">
          <MenuIcon class="size-6" />
        </label>
      </div>
      <div class="drawer-side z-10">
        <label for="mobile-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="menu min-h-full w-72 bg-base-200 py-3 text-base-content">{props.children}</div>
      </div>
    </div>
  );
};
