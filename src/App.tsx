import type { Component } from 'solid-js';
import { Board } from './components/Board';
import { Layout } from './components/Layout';
import { generateRandomColors } from './utils';

const BOARD_SIZE = 9;

const App: Component = () => {
  const colors = generateRandomColors(BOARD_SIZE);
  const winningColorIndex = Math.floor(Math.random() * BOARD_SIZE);
  const winningColor = colors[winningColorIndex];

  const handleCardClick = (cardIndex: number) => {
    if (cardIndex === winningColorIndex) {
      alert('You win!');
    } else {
      alert('Try again!');
    }
  };

  return (
    <Layout>
      <header>
        <h1 class="text-3xl font-bold text-slate-50">ColorGuessr</h1>
        <p class="text-lg">
          Click on the color that matches the RGB value below.
        </p>
        <p class="bg-gradient-to-t p-5 text-center text-3xl">
          RGB ({winningColor.r} {winningColor.g} {winningColor.b})
        </p>
      </header>
      <Board colors={colors} onClick={handleCardClick} />
    </Layout>
  );
};

export default App;
