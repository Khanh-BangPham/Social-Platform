export interface ButtonIconProps extends React.DOMAttributes<HTMLDivElement> {
  size?: number;
  className?: string;
  transparent?: boolean;
  children?: any;
  width?: number;
  height?: number;
}

export interface IconProps extends React.DOMAttributes<HTMLOrSVGElement> {
  size?: number;
  transparent?: boolean;
  children?: any;
  width?: number;
  height?: number;
}

export interface IconVariant {
  off?: boolean;
}
