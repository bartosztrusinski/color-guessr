import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <main class="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-900">
      <h1 class="p-2 text-4xl font-bold text-slate-200">Hello Solid</h1>
      <button class="btn btn-primary">Nice button</button>
    </main>
  );
};

export default App;
