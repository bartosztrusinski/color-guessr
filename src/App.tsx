import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <main class='bg-slate-900 min-h-screen flex flex-col gap-4 items-center justify-center'>
      <h1 class='text-4xl p-2 font-bold text-slate-200'>Hello Solid</h1>
      <button class='btn btn-primary'>Nice button</button>
    </main>
  );
};

export default App;
