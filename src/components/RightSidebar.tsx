import { ParentComponent } from 'solid-js';

export const RightSidebar: ParentComponent = (props) => {
  return <aside class="hidden flex-col gap-2 py-2 lg:flex">{props.children}</aside>;
};
