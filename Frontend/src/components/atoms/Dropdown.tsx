import { FC, startTransition, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';

const container = document.createElement('div');
interface Position {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export interface DropdownProps {
  children?: any;
  className?: string;
  content?: any;
  arrow?: boolean;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight';
  getPopupContainer?: (parentNode: HTMLDivElement) => HTMLElement;
  popupClassName?: string;
  allowToggle?: boolean;
  preventClose?: boolean;
}

const Arrow = () => {
  return (
    <svg
      height={12}
      viewBox="0 0 21 12"
      width={21}
      fill="currentColor"
      style={{ transform: 'scale(-1, -1) translate(0px, 0px)' }}
    >
      <path d="M20.685.12c-2.229.424-4.278 1.914-6.181 3.403L5.4 10.94c-2.026 2.291-5.434.62-5.4-2.648V.12h20.684z" />
    </svg>
  );
};

export const Dropdown: FC<DropdownProps> = ({
  arrow = false,
  placement = 'bottomLeft',
  allowToggle = true,
  ...props
}) => {
  const childrenRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>({
    top: -99999,
    left: -99999,
  });
  useEffect(() => {
    if (childrenRef.current) {
      let container = props?.getPopupContainer?.(childrenRef.current);

      let { top, left, height, right } =
        container?.getBoundingClientRect() ||
        childrenRef.current.getBoundingClientRect();

      let contentRect = contentRef.current?.getBoundingClientRect() || null;

      let pos: Position = {};
      if (placement === 'bottomLeft') {
        pos = {
          top: top + height,
          left,
        };
      } else if (placement === 'bottomRight') {
        pos = {
          top: top + height,
          right: window.innerWidth - right,
        };
      } else if (placement === 'topRight') {
        pos = {
          top: top - (contentRect?.height || 0),
          right: window.innerWidth - right,
        };
      }

      if (!props.getPopupContainer && typeof pos.top !== 'undefined') {
        pos.top += window.scrollY;
      }

      setPosition(pos);
    }

    if (open) {
      const event = () => {
        setOpen(false);
      };

      // window.addEventListener("click", event);

      // return () => {
      //   window.removeEventListener("click", event);
      // };
    }
  }, [open, placement]);

  return (
    <>
      <div
        onClick={(ev) => {
          if (allowToggle) {
            startTransition(() => {
              setOpen(!open);
            });
          } else {
            if (open) {
              ev.stopPropagation();
            }

            startTransition(() => {
              setOpen(true);
            });
          }
        }}
        ref={childrenRef}
        className={cn('inline-flex gap-1 items-center', props.className)}
      >
        {props.children}
      </div>
      {open &&
        createPortal(
          <>
            <div
              className="fixed top-0 left-0 w-screen h-screen z-[1000]"
              onClick={() => setOpen(false)}
              onMouseDownCapture={() => {
                console.log('capture');
              }}
            ></div>
            <div
              onClick={() => {
                if (!props.preventClose) setOpen(false);
              }}
              ref={contentRef}
              // onClick={(ev) => ev.stopPropagation()}
              style={{ ...position }}
              className={cn(
                'absolute p-2 dark:bg-slate-800 bg-white rounded-lg z-[1000] shadow-[5px_5px_15px_rgba(0,0,0,0.5)]',
                props.popupClassName,
              )}
            >
              {arrow && (
                <div className="text-white dark:text-slate-800 top-[-6px] right-0 absolute">
                  <Arrow />
                </div>
              )}

              {props.content}
            </div>
          </>,
          props?.getPopupContainer?.(childrenRef.current || container) ||
            document.body,
        )}

      {/* {open && (
        <div
          className=" top-0 left-0 w-screen h-screen"
          onClick={() => setOpen(false)}
        >
          <div
            ref={contentRef}
            onClick={(ev) => ev.stopPropagation()}
            style={{ ...position }}
            className={cn(
              "absolute p-2 dark:bg-slate-800 bg-white rounded-lg z-1 shadow-[5px_5px_15px_rgba(0,0,0,0.5)]",
              props.popupClassName
            )}
          >
            {props.content}
          </div>
        </div>
      )} */}
    </>
  );
};
