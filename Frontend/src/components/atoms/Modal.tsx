import { useShortcut } from '@hooks/useShortcut';
import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';
import { ButtonIconClose } from './Icon/IconClose';

export interface ModalProps {
  open?: boolean;
  onCancel?: () => void;
  children?: any;
  title?: any;
  overlayCloseable?: boolean;
  width?: number | string;
  height?: number | string;
  hideIconClose?: boolean;
  className?: string;
  keyboard?: boolean;
  backdropClassName?: string;
}

export const Modal: FC<ModalProps> = ({
  width,
  height,
  keyboard = true,
  overlayCloseable = true,
  ...props
}) => {
  const checkClickInsideRef = useRef(false);
  useEffect(() => {
    if (props.open) {
      document.documentElement.style.setProperty(
        '--body-padding-right',
        `var(--scrollbar-width)`,
      );
      document.body.classList.add('overflow-hidden');
      // document.body.style.paddingRight = "7px";
    } else {
      document.body.classList.remove('overflow-hidden');
      // document.body.style.paddingRight = "0";
      document.documentElement.style.setProperty('--body-padding-right', '0px');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      // document.body.style.paddingRight = "0";
      document.documentElement.style.setProperty('--body-padding-right', '0px');
    };
  }, [props.open]);

  useShortcut(
    `Escape`,
    () => {
      if (keyboard) {
        setTimeout(() => {
          props.onCancel?.();
        }, 100);
      }
    },
    [keyboard],
    props.open,
  );

  if (!props.open) return null;

  return createPortal(
    <div
      onClick={() => {
        if (overlayCloseable && !checkClickInsideRef.current) {
          props.onCancel?.();
        }
        checkClickInsideRef.current = false;
      }}
      className={cn(
        'px-3 z-20 flex items-center justify-center bg-black !bg-opacity-90 fixed top-0 left-0 w-full h-full',
        props.backdropClassName,
      )}
    >
      <div
        className={cn(
          'flex flex-col bg-white rounded-lg text-gray-900 dark:bg-slate-900 dark:text-white overflow-hidden',
          props.className,
        )}
        onClick={() => {
          // ev.stopPropagation();
          checkClickInsideRef.current = true;
        }}
        onMouseDown={() => (checkClickInsideRef.current = true)}
        style={{ width, height }}
      >
        <div className="relative">
          {props.title && (
            <h2 className="dark:border-slate-700 p-3 text-center text-2xl font-bold border-b border-solid border-gray-300">
              {props.title}
            </h2>
          )}
          {!props.hideIconClose && (
            <div className="absolute right-3 top-3">
              <ButtonIconClose
                onClick={props.onCancel}
                transparent
                className="!text-gray-700 dark:!text-slate-300 dark:hover:bg-slate-700"
              />
            </div>
          )}
        </div>
        {props.children}
      </div>
    </div>,
    document.body,
  );
};
