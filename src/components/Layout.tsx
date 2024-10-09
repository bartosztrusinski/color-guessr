import { ParentComponent } from 'solid-js';

export const Layout: ParentComponent = (props) => {
  return (
    <div class="h-screen">
      <main class="mx-auto h-full w-full max-w-prose p-4">
        {props.children}
      </main>
    </div>
  );
};
