import { cn } from '@utils';
import { Icon } from './Icon';
import { ButtonIconProps, IconProps, IconVariant } from './type';

export const ButtonIconMessage: Atom<ButtonIconProps & IconVariant> = ({
  size,
  off,
  ...props
}) => {
  return (
    <Icon {...props}>
      <IconMessage size={size} off={off} />
    </Icon>
  );
};

export const IconMessage: Atom<IconProps & IconVariant> = ({
  size = 17,
  off,
  ...props
}) => {
  if (off) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          'icon icon-tabler icon-tabler-message-circle-off',
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
        <path d="M8.595 4.577c3.223 -1.176 7.025 -.61 9.65 1.63c2.982 2.543 3.601 6.523 1.636 9.66m-1.908 2.109c-2.787 2.19 -6.89 2.666 -10.273 1.024l-4.7 1l1.3 -3.9c-2.229 -3.296 -1.494 -7.511 1.68 -10.057" />
        <path d="M3 3l18 18" />
      </svg>
    );
  }

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'icon icon-tabler icon-tabler-message-circle',
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
      <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
    </svg>
  );
};
