import { Event } from '@utils/event';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ContextMenuProps {
  children: any;
  content?: any;
  width?: number;
}

export const ContextMenu: Atom<ContextMenuProps> = ({
  children,
  width,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: -99999, top: -99999 });
  const checkCurrent = useRef(false);
  useEffect(() => {
    if (open) {
      const onCloseContextMenu = () => {
        setOpen(false);
      };
      Event.on('CloseContextMenu', onCloseContextMenu);

      const onClose = () => {
        if (!checkCurrent.current) {
          setOpen(false);
        }
        checkCurrent.current = false;
      };
      window.addEventListener('contextmenu', onClose);
      window.addEventListener('click', onClose);
      window.addEventListener('scroll', onClose);
      return () => {
        window.removeEventListener('contextmenu', onClose);
        window.removeEventListener('click', onClose);
        window.removeEventListener('scroll', onClose);

        Event.off('CloseContextMenu', onCloseContextMenu);
      };
    }
  }, [open]);

  return (
    <div
      onContextMenu={(ev) => {
        ev.preventDefault();
        checkCurrent.current = true;
        setOpen(true);

        let left =
          width && window.innerWidth - ev.clientX < width
            ? window.innerWidth - width
            : ev.clientX;
        setPosition({ left, top: ev.clientY });
      }}
      className={props.className}
    >
      {children}
      {open &&
        createPortal(
          <div
            className="fixed dark:bg-slate-800 p-1 whitespace-nowrap z-50"
            style={{ ...position, width }}
          >
            {props.content}
          </div>,
          document.body,
        )}
    </div>
  );
};
