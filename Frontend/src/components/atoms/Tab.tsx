import { cn } from '@utils';
import { useState } from 'react';
export interface TabProps {
  items: {
    label: any;
    key?: any;
    onClick?: () => void;
    children?: any;
  }[];
  onChange?: (key: any, index: number) => void;
  itemClass?: string;
  defaultActiveKey?: any;

  // size?: 'large' | 'normal' | 'small';
}

export const Tab: Atom<TabProps> = ({ items, ...props }) => {
  const [tabActive, setTabActive] = useState(0);
  return (
    <>
      <div className={cn('item-key flex', props.className)}>
        {items.map((e, i) => (
          <a
            onClick={(ev) => {
              ev.preventDefault();
              setTabActive(i);
              props.onChange?.(i, i);
              e?.onClick?.();
            }}
            key={i}
            href="#"
            className={cn(
              'text-sm  font-semibold text-black dark:text-white text-opacity-60 dark:text-opacity-60 pb-1 text-center select-none',
              props.itemClass,
              {
                [' dark:border-white  border-b-2 border-solid  border-black  !text-opacity-100 dark:!text-opacity-100']:
                  tabActive === i,
              },
            )}
          >
            {e.label}
          </a>
        ))}
      </div>
      {items[tabActive].children}
    </>
  );
};
