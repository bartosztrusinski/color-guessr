import { ParentProps } from 'solid-js';

export function LeftSidebar(props: ParentProps) {
  return <aside class="hidden flex-col items-center gap-8 py-8 md:flex">{props.children}</aside>;
}
