import _ from 'lodash';
import { useEffect } from 'react';

export const useWindowEvent = (
  eventName: string,
  callback: (ev: Event) => void,
  dependencies?: any[],
  options?:
    | boolean
    | AddEventListenerOptions
    | undefined
    | (AddEventListenerOptions & { enabled?: boolean }),
) => {
  useEffect(() => {
    let opts =
      typeof options === 'object' ? _.omit(options, 'enabled') : options;
    let enabled =
      typeof (options as any)?.enabled !== 'undefined'
        ? (options as any)?.enabled
        : true;
    if (enabled) {
      window.addEventListener(eventName, callback as any, options);

      return () => {
        window.removeEventListener(eventName, callback as any, opts);
      };
    }
  }, dependencies);
};
