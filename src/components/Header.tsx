import { Component } from 'solid-js';

import { Logo } from './Logo';

export const Header: Component = () => {
  return (
    <header class="flex flex-col gap-5">
      <Logo />
      <div class="chat chat-end">
        <div class="chat-bubble chat-bubble-primary max-w-44 text-center text-slate-50">
          Try and guess the color based on the RGB values 🌈
        </div>
      </div>
      <div class="chat chat-start">
        <div class="chat-bubble max-w-44 text-center text-slate-50">Good luck! 🍀</div>
      </div>
    </header>
  );
};
