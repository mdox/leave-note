import { PropsWithChildren } from "react";

export function Layout(props: PropsWithChildren) {
  return (
    <div className="mx-auto max-w-screen-md text-stone-900 px-2">
      {props.children}
    </div>
  );
}
