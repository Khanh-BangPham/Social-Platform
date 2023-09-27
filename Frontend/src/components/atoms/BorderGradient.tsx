import { cn } from '../../utils';
export const BorderGradient: Atom<{ children: any; size?: number }> = ({
  size = 2,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-[#743ad5]  via-pink-500 to-[#d53a9d]',
        props.className,
      )}
      style={{ padding: size }}
    >
      {props.children}
    </div>
  );
};
