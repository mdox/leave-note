import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";

export function useDefaultedState<T>(
  defaultValue: T
): [
  T,
  Dispatch<SetStateAction<T>>,
  () => void,
  (newDefaultValue: T) => void,
  MutableRefObject<T>
] {
  const [state, setState] = useState<T>(defaultValue);

  const refDefaultValue = useRef<T>(defaultValue);

  const resetState = useCallback(() => {
    setState(refDefaultValue.current);
  }, []);

  const setDefaultState = useCallback((newDefaultValue: T) => {
    refDefaultValue.current = newDefaultValue;
  }, []);

  return [state, setState, resetState, setDefaultState, refDefaultValue];
}
