import { cn } from '@utils';
import { useState } from 'react';
export interface TabProps {
  menus: {
    label: any;
    onClick?: () => void;
  }[];
  onChange?: (i: number) => void;
  itemClass?: string;
  // size?: 'large' | 'normal' | 'small';
}

export const Tab: Atom<TabProps> = ({ menus, ...props }) => {
  const [open, setOpen] = useState(0);
  return (
    <div className={cn('flex justify-around', props.className)}>
      {menus.map((e, i) => (
        <a
          onClick={(ev) => {
            ev.preventDefault();
            setOpen(i);
            props.onChange?.(i);
            e?.onClick?.();
          }}
          key={i}
          href="#"
          className={cn(
            'text-sm  font-semibold text-black dark:text-white text-opacity-60 dark:text-opacity-60 pb-1 flex-1 text-center select-none',
            props.itemClass,
            {
              [' dark:border-white  border-b-2 border-solid  border-black  !text-opacity-100 dark:!text-opacity-100']:
                open === i,
            },
          )}
        >
          {e.label}
        </a>
      ))}
    </div>
  );
};
