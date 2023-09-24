import { useShortcut } from '@hooks/useShortcut';
import { useWindowEvent } from '@hooks/useWindowEvent';
import { Observable } from '@utils/Observable';
import {
  FC,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';

const observable = new Observable();

document.body.addEventListener('click', (...args) => {
  observable.emit(args);
});

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
  closeWhenScroll?: boolean;
  trigger?: ('click' | 'hover' | 'contextmenu')[];
  delay?: number;
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
  onClose?: () => void;
  autoClose?: boolean;
  keyboard?: boolean;
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
  autoClose = false,
  keyboard = true,
  closeWhenScroll = false,
  delay = 0,
  trigger = ['click'],
  ...props
}) => {
  const childrenRef = useRef<HTMLDivElement>(null);
  const clickChildrenRef = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>({
    top: -99999,
    left: -99999,
  });
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const checkHoverRef = useRef(false);
  const checkHoverLeaveRef = useRef<NodeJS.Timeout>();
  let _isTriggerClick = useMemo(() => trigger.includes('click'), []);
  let _isTriggerHover = useMemo(() => trigger.includes('hover'), []);
  let _isTriggerContextmenu = useMemo(
    () => trigger.includes('contextmenu'),
    [],
  );

  useShortcut(
    `Escape`,
    () => {
      if (keyboard) {
        setOpen(false);
      }
    },
    [keyboard],
    open,
  );

  useWindowEvent('scroll', () => {});

  useEffect(() => {
    if (childrenRef.current) {
      const container = props?.getPopupContainer?.(childrenRef.current);

      const { top, left, height, right } =
        container?.getBoundingClientRect() ||
        childrenRef.current.getBoundingClientRect();

      const contentRect = contentRef.current?.getBoundingClientRect() || null;

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
  }, [open, placement]);

  useEffect(() => {
    if (!open) props.onClose?.();
  }, [open]);

  useEffect(() => {
    const onClickBody = () => {
      if (!clickChildrenRef.current) {
        setOpen(false);
      }

      clickChildrenRef.current = false;
    };

    window.addEventListener('click', onClickBody);
    return () => {
      window.removeEventListener('click', onClickBody);
    };
  }, []);

  const _onToggleOpen = (value?: boolean) => {
    if (allowToggle) {
      startTransition(() => {
        setOpen(typeof value !== 'undefined' ? value : !open);
      });
    } else {
      startTransition(() => {
        setOpen(true);
      });
    }
  };

  return (
    <>
      <div
        onClick={() => {
          if (!_isTriggerClick) return;
          clickChildrenRef.current = true;
          _onToggleOpen();
        }}
        ref={childrenRef}
        className={cn('inline-flex gap-1 items-center', props.className)}
        onContextMenu={(ev) => {
          if (!_isTriggerContextmenu) return;
          ev.preventDefault();
          _onToggleOpen();
        }}
        onMouseEnter={() => {
          if (!_isTriggerHover) return;
          hoverTimeoutRef.current = setTimeout(() => {
            checkHoverRef.current = true;
            _onToggleOpen(true);
          }, delay);
        }}
        onMouseLeave={() => {
          if (!_isTriggerHover) return;
          clearTimeout(hoverTimeoutRef.current);
          checkHoverLeaveRef.current = setTimeout(() => {
            _onToggleOpen(false);
          }, 100);
        }}
      >
        {props.children}
      </div>
      {open &&
        createPortal(
          <>
            {/* <div
              className="fixed top-0 left-0 w-screen h-screen z-[1000]"
              onClick={_onClose}
            ></div> */}
            <div
              onClick={() => {
                if (autoClose) {
                  setOpen(false);
                } else {
                  clickChildrenRef.current = true;
                }
              }}
              ref={contentRef}
              // onClick={(ev) => ev.stopPropagation()}
              style={{ ...position }}
              className={cn(
                'absolute p-2 dark:bg-slate-800 bg-white rounded-lg z-[1000] shadow-[5px_5px_15px_rgba(0,0,0,0.5)]',
                props.popupClassName,
              )}
              onMouseEnter={() => {
                if (!_isTriggerHover) return;

                clearTimeout(checkHoverLeaveRef.current);
              }}
              onMouseLeave={() => {
                if (!_isTriggerHover) return;

                checkHoverLeaveRef.current = setTimeout(() => {
                  if (checkHoverRef.current) {
                    _onToggleOpen(false);
                  }
                  checkHoverRef.current = false;
                }, 300);
              }}
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
