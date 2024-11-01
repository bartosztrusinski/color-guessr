import { ParentComponent } from 'solid-js';
import { onPressEscape } from '../lib/onPressEscape';
import { Portal } from 'solid-js/web';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const Modal: ParentComponent<Props> = (props) => {
  onPressEscape(props.handleClose);

  return (
    <Portal>
      <dialog class="modal" classList={{ 'modal-open': props.isOpen }}>
        <div class="modal-box">{props.children}</div>
        <form method="dialog" onSubmit={props.handleClose} class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </Portal>
  );
};
