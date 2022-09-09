import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { ClientOnly } from "./ClientOnly";

export type PortalProps = {
  children: ReactNode;
};

export default function Portal(props: PortalProps) {
  return (
    <ClientOnly>
      {createPortal(props.children, document.getElementById("portal")!)}
    </ClientOnly>
  );
}
