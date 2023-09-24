import { Dispatch, SetStateAction, useRef, useState } from 'react';

type UseDebounceRes<T> = [T, Dispatch<SetStateAction<T>>];
type UseDebounceDispatch<T> = UseDebounceRes<T>[1];

export const useDebounce = <T>(
  defaultValue: T,
  delay = 300,
): [...UseDebounceRes<T>, ...UseDebounceRes<T>] => {
  const [value, _setValue] = useState(defaultValue);
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const timeoutRef = useRef<NodeJS.Timeout>();
  const setValue: UseDebounceDispatch<T> = (value: any) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      _setValue(value);
    }, delay);
    setCurrentValue(value);
  };

  const setImmediately = (value: any) => {
    setCurrentValue(value);
  };

  return [value, setValue, currentValue, setImmediately];
};
