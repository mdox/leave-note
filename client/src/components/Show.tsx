import { Children, isValidElement, ReactNode } from "react";

export interface ShowProps {
  when: boolean;
  children: ReactNode;
}

export function Show(props: ShowProps) {
  if (props.when) {
    if (isValidElement(props.children)) {
      if (Children.count(props.children) === 1) {
        return props.children;
      } else {
        return <>{props.children}</>;
      }
    }
  }

  return null;
}
