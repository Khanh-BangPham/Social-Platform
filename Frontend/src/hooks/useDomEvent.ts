import { useEffect } from 'react';

export const useDomEvent = (
  ele: React.RefObject<HTMLElement>,
  eventName: string,
  callback: Function,
  dependencies?: any[],
  options?: boolean | AddEventListenerOptions | undefined,
) => {
  useEffect(() => {
    ele.current?.addEventListener(eventName, callback as any, options);
    return () => {
      ele.current?.removeEventListener(eventName, callback as any, options);
    };
  }, dependencies);
};
