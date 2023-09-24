import { Dispatch, SetStateAction, useRef, useState } from 'react';

type UseStateDelayRes<T> = [T, Dispatch<SetStateAction<T>>];
type UseStateDelayDispatch<T> = UseStateDelayRes<T>[1];

export const useStateDelay = <T>(
  defaultValue?: T,
  delay = 100,
): [...UseStateDelayRes<T>, ...UseStateDelayRes<T>] => {
  const [value, _setValue] = useState<T extends undefined ? undefined : T>(
    defaultValue as any,
  );
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const checkRef = useRef(true);
  const setValue: UseStateDelayDispatch<T> = (value: any) => {
    if (checkRef.current) {
      checkRef.current = false;
      setTimeout(() => {
        _setValue(value);
        setCurrentValue(value);
        checkRef.current = true;
      }, delay);
    }
  };

  const setImmediately = (value: any) => {
    setCurrentValue(value);
  };

  return [value as any, setValue, currentValue as any, setImmediately];
};
