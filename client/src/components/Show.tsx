import { isValidElement, ReactNode } from "react";

export interface ShowProps {
  when: boolean;
  children: ReactNode;
}

export function Show(props: ShowProps) {
  if (props.when) {
    if (isValidElement(props.children)) {
      return props.children;
    } else {
      return <>{props.children}</>;
    }
  }

  return null;
}
