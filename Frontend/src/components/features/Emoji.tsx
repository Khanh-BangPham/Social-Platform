import { EMOJI } from '@constants/emoji';
import { memo } from 'react';
import { Popover } from '../atoms/Popover';

export interface EmojiProps {
  children?: any;
  placement?: 'bottom' | 'top';
  onSelect?: (url: string, emoji: any) => void;
}

export const Emoji: Atom<EmojiProps> = memo(({ children, ...props }) => {
  return (
    <Popover
      width={350}
      height={350}
      content={
        <div>
          {EMOJI.map(({ title, emoji }) => (
            <div key={title}>
              <p className="text-sm my-4 text-black dark:text-white !text-opacity-70">
                {title}
              </p>
              <div className="grid grid-cols-8 gap-2 ">
                {emoji.map((e) => (
                  <div
                    onClick={() => {
                      props.onSelect?.(e, e);
                    }}
                    key={e}
                    className="flex items-center justify-center"
                  >
                    <img
                      className="max-w-full object-contain cursor-pointer hover:scale-125 transition-all "
                      src={e}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    >
      {children}
    </Popover>
  );
});
