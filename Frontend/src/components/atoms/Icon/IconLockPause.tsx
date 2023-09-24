import { cn } from '@utils';
import { Icon } from './Icon';
import { ButtonIconProps, IconProps } from './type';

export const ButtonIconLockPause: Atom<ButtonIconProps> = ({
  size,
  ...props
}) => {
  return (
    <Icon {...props}>
      <IconLockPause size={size} />
    </Icon>
  );
};

export const IconLockPause: Atom<IconProps> = ({ size = 17, ...props }) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'icon icon-tabler icon-tabler-clock-pause',
        props.className,
      )}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20.942 13.018a9 9 0 1 0 -7.909 7.922" />
      <path d="M12 7v5l2 2" />
      <path d="M17 17v5" />
      <path d="M21 17v5" />
    </svg>
  );
};
