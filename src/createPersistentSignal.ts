import { createEffect, createSignal } from 'solid-js';

export const createPersistentSignal = <T>(key: string, value: T) => {
  const storedValue = localStorage.getItem(key);
  const initialValue = storedValue ? JSON.parse(storedValue) : value;
  const [getter, setter] = createSignal<T>(initialValue);

  createEffect(() => {
    localStorage.setItem(key, JSON.stringify(getter()));
  });

  return [getter, setter] as const;
};
