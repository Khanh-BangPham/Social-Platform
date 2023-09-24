import { cn } from "../../utils";

export interface BorderGradientProps {
  children: any;
  size?: number;
}
export const BorderGradient: Atom<BorderGradientProps> = ({
  size = 2,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-gradient-to-tl from-[#ff105d]  via-[#d300c5] to-[#ffc700]",
        props.className
      )}
      style={{
        padding: size,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};
