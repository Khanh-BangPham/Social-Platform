import { FC, useId } from 'react';
import { cn } from '../utils';

export const Avatar: FC<{
  size?: number;
  border?: boolean;
  online?: boolean;
  showStatus?: boolean;
  src?: string;
}> = ({ size = 40, ...props }) => {
  const id = useId();
  return (
    <div
      className={cn('relative h-fit h-8 w-8 cursor-pointer rounded-full', {
        'shadow-[0_0_0_2px_white] dark:shadow-slate-950': props.border,
      })}
      style={{ width: size, height: size }}
    >
      <div className={cn('rounded-full overflow-hidden')}>
        <img
          className="w-full h-full"
          src={props.src || `https://unsplash.it/${size}/${size}?t=${id}`}
        />
      </div>
      {props.showStatus && (
        <span
          className={cn(
            'block w-2 h-2 rounded-full  absolute bottom-0 right-0 shadow-[0_0_0_2px_white] dark:shadow-slate-900',
            {
              'bg-green-500': props.online,
              'bg-gray-500': !props.online,
            },
          )}
        ></span>
      )}
    </div>
  );
};
