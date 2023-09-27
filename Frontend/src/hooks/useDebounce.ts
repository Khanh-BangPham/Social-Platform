import { useState, useRef } from "react";
export const useDebounce = <T>(
  timeout = 300,
  defaultValue?: T
): [T, (value: T) => void] => {
  const [value, _setValue] = useState<T>(defaultValue as T);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const setValue = (_value: T) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      _setValue(_value);
    }, timeout);
  };

  return [value, setValue];
};
