import type { Component } from 'solid-js';
import { Board } from './components/Board';
import { Layout } from './components/Layout';

const App: Component = () => {
  return (
    <Layout>
      <Board size={9} />
    </Layout>
  );
};

export default App;
