import { ParentProps } from 'solid-js';

export function RightSidebar(props: ParentProps) {
  return <aside class="hidden flex-col items-center gap-5 py-16 lg:flex">{props.children}</aside>;
}
