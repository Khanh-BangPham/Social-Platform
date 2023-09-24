import { cn } from '@utils';
import { FC } from 'react';
import { Icon } from './Icon';
import { ButtonIconProps, IconProps, IconVariant } from './type';

export const ButtonIconUser: FC<ButtonIconProps & IconVariant> = ({
  size,
  off,
  ...props
}) => {
  return (
    <Icon {...props}>
      <IconUser size={size} off={off} />
    </Icon>
  );
};

export const IconUser: Atom<IconProps & IconVariant> = ({
  size = 17,
  off,
  ...props
}) => {
  if (off) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        className={cn('icon icon-tabler icon-tabler-user-off', props.className)}
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
        <path d="M8.18 8.189a4.01 4.01 0 0 0 2.616 2.627m3.507 -.545a4 4 0 1 0 -5.59 -5.552" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4c.412 0 .81 .062 1.183 .178m2.633 2.618c.12 .38 .184 .785 .184 1.204v2" />
        <path d="M3 3l18 18" />
      </svg>
    );
  }
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className={cn('icon icon-tabler icon-tabler-user', props.className)}
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
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
  );
};
