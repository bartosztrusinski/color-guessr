import { ParentComponent } from 'solid-js';

export const RightSidebar: ParentComponent = (props) => {
  return <aside class="hidden flex-col items-center gap-5 py-16 lg:flex">{props.children}</aside>;
};
