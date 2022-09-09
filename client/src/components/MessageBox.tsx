import clsx from "clsx";
import { ReactNode } from "react";
import Modal from "./Modal";
import { ModalCloseButton } from "./ModalCloseButton";
import { Show } from "./Show";

export type MessageBoxAction = "Submit" | "Yes" | "No" | "OK";
export type MessageBoxType = "Warning" | "Danger" | "Info" | "Neutral";

export interface MessageBoxProps {
  actions: MessageBoxAction[];
  title: string;
  type: MessageBoxType;
  children: ReactNode;
  onAction: (action: MessageBoxAction) => void;
  onClose: () => void;
}

function HRule(props: Pick<MessageBoxProps, "type">) {
  return (
    <div
      className={clsx(
        "h-[1px] shadow rounded-full",
        props.type === "Warning" && "bg-yellow-400 shadow-yellow-400",
        props.type === "Danger" && "bg-red-400 shadow-red-400",
        props.type === "Info" && "bg-blue-400 shadow-blue-400",
        props.type === "Neutral" && "bg-stone-400 shadow-stone-400"
      )}
    ></div>
  );
}

export function MessageBox(props: MessageBoxProps) {
  return (
    <Modal>
      <div className="fixed inset-0 bg-stone-900 bg-opacity-25 flex flex-col items-center justify-center p-2">
        <div
          className={clsx(
            "max-w-screen-sm w-full p-2 bg-stone-50 rounded-xl shadow flex flex-col gap-2",
            props.type === "Warning" && "shadow-yellow-400",
            props.type === "Danger" && "shadow-red-400",
            props.type === "Info" && "shadow-blue-400",
            props.type === "Neutral" && "shadow-stone-400"
          )}
        >
          <div className="flex justify-between">
            <div className="flex items-center">
              <h2 className="pl-2">{props.title}</h2>
            </div>
            <div className="flex items-center">
              <ModalCloseButton onClick={props.onClose} />
            </div>
          </div>
          <HRule type={props.type} />
          <div className="flex flex-col p-1">{props.children}</div>
          <Show when={props.actions.length > 0}>
            <HRule type={props.type} />
            <div className="flex justify-end">
              {props.actions.map((action) => (
                <button
                  key={action}
                  type="button"
                  className={
                    action === "OK" || action === "Submit" || action === "Yes"
                      ? "button-submit"
                      : "button"
                  }
                  onClick={() => props.onAction(action)}
                >
                  {action}
                </button>
              ))}
            </div>
          </Show>
        </div>
      </div>
    </Modal>
  );
}
