import { ParentComponent } from 'solid-js';

export const LeftSidebar: ParentComponent = (props) => {
  return <aside class="hidden flex-col items-center gap-8 py-8 md:flex">{props.children}</aside>;
};
