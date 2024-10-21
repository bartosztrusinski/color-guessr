import { ParentComponent } from 'solid-js';

export const LeftSidebar: ParentComponent = (props) => {
  return <aside class="hidden flex-col gap-2 py-2 md:flex">{props.children}</aside>;
};
