import { cn } from '@utils';
import { Icon } from './Icon';
import { ButtonIconProps, IconProps } from './type';

export const ButtonIconNarrowDown: Atom<ButtonIconProps> = ({
  size,
  ...props
}) => {
  return (
    <Icon {...props}>
      <IconNarrowDown size={size} />
    </Icon>
  );
};

export const IconNarrowDown: Atom<IconProps> = ({ size = 17, ...props }) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'icon icon-tabler icon-tabler-arrow-narrow-down',
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
      <path d="M12 5l0 14" />
      <path d="M16 15l-4 4" />
      <path d="M8 15l4 4" />
    </svg>
  );
};
