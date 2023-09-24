import { cn } from '@utils';
import { Observable } from '@utils/Observable';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { fromEvent } from 'rxjs';

let obseverable = new Observable(fromEvent(window, 'mousedown'));

export interface PopoverProps {
  children?: any;
  content?: any;
  placement?: 'bottom' | 'top';
  open?: boolean;
  onCancel?: () => void;
  width: number;
  height: number;
  offsetTop?: number;
}
export const Popover: Atom<PopoverProps> = ({
  children,
  content,
  className,
  open,
  ...props
}) => {
  const localRef = useRef<HTMLDivElement>(null);
  const [_open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: -9999, top: -9999 });
  const checkRef = useRef(false);
  let contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onWindowClick = (): void => {
      if (!checkRef.current) {
        setOpen(false);
        props?.onCancel?.();
      }

      checkRef.current = false;
    };
    let un = obseverable.subscribe(onWindowClick);
    return () => {
      un();
    };
  }, [checkRef]);
  //   const [position, setPosition] = useState();

  let $content = createPortal(
    <div
      ref={contentRef}
      onMouseDown={() => {
        obseverable.stopPropagation();
        // ev.stopPropagation();
      }}
      className="flex flex-col fixed z-50 bottom-10 left-1/2 -translate-x-1/2 dark:bg-slate-900 bg-white shadow-2xl px-2 py-2 rounded-lg"
      style={{ ...position, width: props.width, height: props.height }}
    >
      {content}
    </div>,
    document.body,
  );
  return (
    <div ref={localRef} className={cn('relative', className)}>
      <div
        onMouseDown={(ev) => {
          checkRef.current = true;

          setOpen(!_open);
          let ele = ev.currentTarget.getBoundingClientRect();
          let left = ele.left + ele.width / 2;
          if (left + props.width / 2 > window.innerWidth) {
            left = window.innerWidth - props.width / 2;
          }
          console.log(left);
          setPosition({
            left: left,
            top: ele.top - props.height + (props.offsetTop || 0),
          });
        }}
      >
        {children}
      </div>
      {typeof open !== 'undefined' ? open && $content : _open && $content}
    </div>
  );
};
