import { XMarkIcon } from "@heroicons/react/20/solid";

export interface ModalCloseButtonProps {
  onClick: () => void;
}

export function ModalCloseButton(props: ModalCloseButtonProps) {
  return (
    <button
      type="button"
      className="button-danger rounded-full p-0 w-10 h-10"
      onClick={props.onClick}
    >
      <XMarkIcon width={24} height={24} />
    </button>
  );
}
