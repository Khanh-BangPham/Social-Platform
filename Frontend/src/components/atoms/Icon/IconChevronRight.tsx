import { Icon } from './Icon';
import { ButtonIconProps, IconProps } from './type';

export const ButtonIconChevronRight: Atom<ButtonIconProps> = ({
  size,
  ...props
}) => {
  return (
    <Icon {...props}>
      <IconChevronRight size={size} />
    </Icon>
  );
};

export const IconChevronRight: Atom<IconProps> = ({ size = 17, ...props }) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-right"
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
      <path d="M9 6l6 6l-6 6" />
    </svg>
  );
};
