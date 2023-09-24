import { cn } from "@utils";
import { useEffect, useRef, useState } from "react";
export interface HorizontalScrollProps {
  height: number;
  itemWidth: number;
  children: any;
}
export const HorizontalScroll: Atom<HorizontalScrollProps> = ({
  children,
  ...props
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();
  useEffect(() => {
    setWidth(parentRef.current?.offsetWidth);
  }, []);
  // const length = React.Children.count(children);
  return (
    <div
      ref={parentRef}
      className={cn("relative overflow-hidden py-2", props.className)}
      style={{ height: props.height + 20 }}
    >
      <div
        className="horizontal-scroll "
        style={
          {
            "--finalHeight": `${props.height}px`,
            "--itemWidth": `${props.itemWidth}px`,
            // left: -2 * props.height + 7,
            // top: 10,
            height: width,
          } as any
        }
      >
        <div style={{ marginBottom: props.height - props.itemWidth }}></div>
        {children}
      </div>
    </div>
  );
};
