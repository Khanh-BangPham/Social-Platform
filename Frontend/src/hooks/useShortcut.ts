import { Observable } from '@utils/Observable';
import { useEffect } from 'react';
import { fromEvent } from 'rxjs';

function enumize<K extends string>(...args: K[]): { [P in K]: P } {
  const ret = {} as { [P in K]: P };
  args.forEach((k) => (ret[k] = k));
  return ret;
}

let keyboardEvent = new Observable(fromEvent(window, 'keydown'));
export const KeyBoard = enumize(
  'Escape',
  'ArrowDown',
  'ArrowUp',
  'ArrowLeft',
  'ArrowRight',
);

export const useShortcut = (
  shortcut: string | string[],
  effect: (ev: KeyboardEvent) => void,
  dependencies: any[] = [],
  enabled = true,
) => {
  useEffect(() => {
    if (enabled) {
      let shortcuts = typeof shortcut === 'string' ? [shortcut] : shortcut;
      const onKeydownEvent = (ev: KeyboardEvent): any => {
        console.log(ev.key);
        if (shortcuts.includes(ev.key)) {
          effect(ev);
          // stopImmediatelyPropagation
          // return false;
        }
      };

      let unsubscribe = keyboardEvent.subscribe(onKeydownEvent);

      return () => {
        unsubscribe();
      };
    }
  }, [enabled, ...dependencies]);
};
