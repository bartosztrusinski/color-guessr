import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

export function createPersistentStore<T extends Record<string, unknown>>(
  storageKey: string,
  initialStore: T,
  persistedKeys?: (keyof T)[],
) {
  const persistedStore = loadValue<Partial<T>>(storageKey);
  const [store, setStore] = createStore<T>(
    persistedStore ? { ...initialStore, ...persistedStore } : initialStore,
  );

  createEffect(() => {
    const persistedValue =
      persistedKeys ?
        persistedKeys.reduce((data, key) => ({ ...data, [key]: store[key] }), {} as Partial<T>)
      : store;

    persistValue<Partial<T>>(storageKey, persistedValue);
  });

  return [store, setStore] as const;
}

function loadValue<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.error(`Error getting item from localStorage with key "${key}":`, error);
    return null;
  }
}

function persistValue<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in localStorage with key "${key}":`, error);
  }
}
