import { ReactNode } from "react";
import Portal from "./Portal";

export interface ModalProps {
  children: ReactNode;
}

export default function Modal(props: ModalProps) {
  return <Portal>{props.children}</Portal>;
}
