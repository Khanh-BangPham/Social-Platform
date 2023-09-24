import { cn } from '@utils';
import { Link } from 'react-router-dom';

export interface TagProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: any;
  color?: 'primary';
  to?: string;
}
let colorClass: any = {
  primary: '!bg-primary text-white',
};
export const Tag: Atom<TagProps> = ({
  children,
  to = '#',
  color,
  ...props
}) => {
  return (
    <Link
      {...props}
      to={to}
      className={cn(
        'active:scale-95 leading-6 hover:bg-gray-200 bg-gray-100 rounded-full px-4 text-xs font-semibold text-gray-900 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700',
        props.className,
        colorClass[color as any],
      )}
    >
      {children}
    </Link>
  );
};
