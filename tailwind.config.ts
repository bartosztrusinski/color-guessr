import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-colorful':
          'linear-gradient(-20deg, #003f5b, #2b4b7d, #5f5195, #98509d, #cc4c91, #f25375, #ff6f4e, #ff9913);',
      },
      fontFamily: {
        display: ['Righteous', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
