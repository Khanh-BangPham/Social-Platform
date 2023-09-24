import { useDomEvent } from '@hooks/useDomEvent';
import { useEffect, useRef, useState } from 'react';
export interface StickyProps {
  children?: any;
  top?: number;
  bottom?: number;
}

export const Sticky: Atom<StickyProps> = ({
  children,
  top = 0,
  bottom = 0,
}) => {
  const localRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const oldScrollTopRef = useRef(window.document.documentElement.scrollTop);
  const [direction, setDirection] = useState<'top' | 'bottom'>('bottom');
  const wraperRef = useRef<HTMLDivElement>(null);

  const [_top, setTop] = useState(0);
  const [_bottom, setBottom] = useState(0);
  useEffect(() => {
    setTop(
      window.innerHeight - (wraperRef.current?.offsetHeight || 0) - bottom,
    );
    setBottom(
      window.innerHeight - (wraperRef.current?.offsetHeight || 0) - top,
    );
  }, []);

  useDomEvent(
    { current: window } as any,
    'scroll',
    () => {
      let newDirection =
        oldScrollTopRef.current - window.document.documentElement.scrollTop > 0
          ? 'bottom'
          : 'top';

      if (newDirection != direction) {
        setDirection(direction === 'bottom' ? 'top' : 'bottom');
        setHeight(wraperRef.current?.offsetTop || 0);
      }

      oldScrollTopRef.current = window.document.documentElement.scrollTop;
    },
    [direction],
  );

  return (
    <div ref={localRef} className="relative h-full">
      <div style={{ height }}></div>
      <div
        ref={wraperRef}
        className="sticky"
        style={
          direction === 'top'
            ? {
                top: _top,
              }
            : {
                bottom: _bottom,
              }
        }
      >
        {children}
      </div>
    </div>
  );
};
