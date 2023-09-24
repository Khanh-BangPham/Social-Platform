import { useShortcut } from '@hooks/useShortcut';
import { cn } from '@utils';
import { useRef, useState } from 'react';
import { ButtonIconChevronDown } from './Icon/IconChevronDown';
import { ButtonIconChevronUp } from './Icon/IconChevronUp';
export interface SliderProps {
  children?: any;
}

export const Slider: Atom<SliderProps> = ({ children, ...props }) => {
  const localRef = useRef<HTMLDivElement>(null);
  const [isCanPrev, setIsCanPrev] = useState(false);
  const [isCanNext, setIsCanNext] = useState(true);
  useShortcut(['ArrowDown', 'ArrowRight'], () => {
    localRef.current?.scrollBy({ top: 100, behavior: 'smooth' });
  });
  useShortcut(['ArrowUp', 'ArrowLeft'], () => {
    localRef.current?.scrollBy({ top: -100, behavior: 'smooth' });
  });
  return (
    <div className="h-full relative w-full">
      <div
        ref={localRef}
        className={cn(
          'flex flex-col gap-1 max-h-full w-full overflow-auto',
          props.className,
        )}
        onScroll={(ev) => {
          let ele = ev.currentTarget;
          setIsCanNext(
            ele.scrollTop + ele.offsetHeight < ele.scrollHeight - 100,
          );
          setIsCanPrev(ele.scrollTop > 100);
        }}
      >
        {children}
      </div>
      {isCanPrev && (
        <ButtonIconChevronUp
          size={35}
          onClick={() => {
            localRef.current?.scrollBy({ top: -100, behavior: 'smooth' });
          }}
          className="!w-11 !h-11 z-10 absolute left-1/2 -translate-x-1/2 top-3"
        />
      )}
      {isCanNext && (
        <ButtonIconChevronDown
          size={35}
          onClick={() => {
            localRef.current?.scrollBy({ top: 100, behavior: 'smooth' });
          }}
          className="!w-11 !h-11 z-10 absolute left-1/2 -translate-x-1/2 bottom-3"
        />
      )}
    </div>
  );
};
