import { cn } from '@utils';

export interface TagProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: any;
}

export const Tag: Atom<{ children: any }> = ({ children, ...props }) => {
  return (
    <a
      {...props}
      href="#"
      className={cn(
        'leading-6 hover:bg-gray-200 bg-gray-100 rounded-full px-4 text-xs font-semibold text-gray-900 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700',
        props.className,
      )}
    >
      {children}
    </a>
  );
};
