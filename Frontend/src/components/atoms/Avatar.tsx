import { useId } from "react";
import { cn } from "../../utils";
import { BorderGradient, BorderGradientProps } from "./BorderGradient";
import { Link } from "react-router-dom";

export interface AvatarProps {
  size?: number;
  online?: boolean;
  showStatus?: boolean;
  link?: string;
  src?: string;
  border?: Partial<BorderGradientProps>;
  onClick?: () => void;
}
export const Avatar: Atom<AvatarProps> = ({
  size = 32,
  online,
  link = "",
  ...props
}) => {
  let TagWraper = link ? Link : "div";
  const id = useId();
  let _w = size;
  let _h = size;

  if (props.border) {
    _w -= props.border.size || 8;
    _h -= props.border.size || 8;
  }

  const child = (
    <TagWraper
      draggable={false}
      to={link}
      className={cn(
        "border-base border relative cursor-pointer rounded-full block ",
        props.className
      )}
      style={{ width: _w, height: _h }}
    >
      <div className={cn("rounded-full overflow-hidden w-full h-full")}>
        <img
          draggable={false}
          className="w-full h-full object-cover"
          src={props.src || `https://unsplash.it/${_w}/${_h}?t=${id}`}
        />
      </div>
      {props.showStatus && (
        <span
          className={cn(
            "block w-2 h-2 rounded-full  absolute bottom-0 right-0 shadow-[0_0_0_2px_white] dark:shadow-slate-900",
            { "bg-green-500": online, "bg-gray-500": !online }
          )}
        ></span>
      )}
    </TagWraper>
  );

  if (typeof props.border === "object") {
    return (
      <BorderGradient className="rounded-full " size={props.border.size}>
        <div className=" rounded-full">{child}</div>
      </BorderGradient>
    );
  }

  return child;
};
