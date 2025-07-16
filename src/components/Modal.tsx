import { createEffect, ParentComponent } from 'solid-js';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: ParentComponent<Props> = (props) => {
  let modalRef: HTMLDialogElement | undefined;

  createEffect(() => {
    if (!modalRef) return;

    if (props.isOpen) {
      modalRef.showModal();
    } else {
      modalRef.close();
    }
  });

  return (
    <dialog ref={modalRef} class="modal">
      <div class="modal-box">
        {props.children}
        <form method="dialog" onSubmit={props.onClose}>
          <button class="btn btn-error btn-sm absolute top-4 right-4">⨉</button>
        </form>
      </div>
    </dialog>
  );
};
