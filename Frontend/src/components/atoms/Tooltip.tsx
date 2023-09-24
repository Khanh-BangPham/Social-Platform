import { useId } from "react";

export interface TooltipProps {
  children?: any;
  title?: any;
}

export const Tooltip: Atom<TooltipProps> = ({ children, title }) => {
  const id = useId();
  return (
    <>
      <div data-tooltip-target={id}>{children}</div>
      <div
        id={id}
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        {title}
        <div className="tooltip-arrow" data-popper-arrow />
      </div>
    </>
  );
};
