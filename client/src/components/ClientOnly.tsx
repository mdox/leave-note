import { ReactNode, useEffect, useState } from "react";
import { Show } from "./Show";

export interface ClientOnlyProps {
  children: ReactNode;
}

export function ClientOnly(props: ClientOnlyProps) {
  const [stateMounted, setStateMounted] = useState(false);

  useEffect(() => {
    setStateMounted(true);
    return () => {
      setStateMounted(false);
    };
  }, []);

  return <Show when={stateMounted}>{props.children}</Show>;
}
