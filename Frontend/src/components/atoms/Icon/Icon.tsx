import { cn } from '../../../utils';
import { IconProps } from './type';

export const Icon: Atom<IconProps> = ({
  transparent,
  width,
  height,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'active:scale-95 hover:shadow select-none dark:text-white dark:hover:bg-slate-700 dark:bg-slate-800 text-gray-600 rounded-full p-2 flex items-center justify-center cursor-pointer hover:bg-gray-200 bg-gray-100',
        { 'bg-transparent dark:bg-transparent': transparent },
        className,
      )}
      style={{ width, height }}
      {...props}
    >
      {props.children}
    </div>
  );
};
