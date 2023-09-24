import { IconSpin } from '@components/atoms/Icon/IconSpin';
import { FC } from 'react';
import { cn } from '../../utils';

const typeClass = {
  default:
    'text-gray-900  dark:bg-white dark:text-white bg-black !bg-opacity-5 hover:!bg-opacity-10',
  primary: 'bg-primary-500 hover:bg-primary-600 text-white',
  link: '',
  red: 'bg-red-700 bg-opacity-90 hover:bg-opacity-100 text-white',
};

const sizeClass = {
  small: 'text-xs px-2 leading-7',
  default: 'text-sm px-3 leading-9',
  large: 'px-5 leading-12 text-lg',
};

export interface ButtonProps {
  children: any;
  className?: string;
  type?: 'default' | 'primary' | 'link' | 'red';
  disabled?: boolean;
  size?: 'small' | 'default' | 'large';
  outline?: boolean;
  onClick?: () => void;
  loading?: boolean;
  iconPrefix?: any;
  iconSuffix?: any;
}

export const Button: FC<ButtonProps> = ({
  size = 'default',
  type = 'default',
  loading,
  iconPrefix,
  iconSuffix,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={cn(
        'active:scale-[0.99] font-semibold rounded border-current border-solid',
        props.className,
        sizeClass[size],
        typeClass[type],
        {
          'opacity-50 pointer-events-none': props.disabled,
        },
      )}
    >
      <span className="flex gap-2 items-center justify-center">
        {iconPrefix}
        {loading && <IconSpin />}
        {props.children}
        {iconSuffix}
      </span>
    </button>
  );
};
