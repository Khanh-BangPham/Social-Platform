import { FC } from 'react';
import { cn } from '../../utils';
export const Card: FC<{
  children?: any;
  title?: string;
  action?: any;
  className?: string;
  titleClassName?: string;
}> = (props) => {
  return (
    <div
      className={cn(
        'shadow dark:bg-slate-900 bg-white rounded-lg px-3 py-4 flex flex-col',
        props.className,
      )}
    >
      {props.title && (
        <div
          className={cn(
            'flex justify-between items-center',
            props.titleClassName,
          )}
        >
          <h2 className="font-bold text-lg ">{props.title}</h2>
          {props.action}
        </div>
      )}
      {props.children}
    </div>
  );
};
