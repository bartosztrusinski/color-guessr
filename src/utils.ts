import { Rgb } from './types';

export function generateRandomRgb(): Rgb {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

export function generateRandomColors(size: number): Rgb[] {
  return Array.from({ length: size }, generateRandomRgb);
}
