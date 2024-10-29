import { onCleanup } from 'solid-js';

export function onPressEscape(callback: () => void) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      callback();
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  onCleanup(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });
}
