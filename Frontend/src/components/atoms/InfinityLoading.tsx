import { IconSpin } from '@components/atoms/Icon/IconSpin';
import { forwardRef } from 'react';
// import { FixedSizeList as List } from "react-window";

export interface InfinityLoadingProps extends DefaultProps {
  placement?: 'top' | 'bottom';
  children?: any;
  loading?: boolean;
  loadingRender?: any;
  haveNext?: boolean;
  offset?: number;
  onNext?: () => void;
  onScroll?: (ev: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  // virtualized?: {
  //   itemSize: number;
  //   itemCount: number;
  //   data: any;
  // };
}

// const Row = ({ index, style, children, ...props }: any) => {
//   console.log(props);
//   return <div style={style}>{children}</div>;
// };

export const InfinityLoading = forwardRef<
  HTMLDivElement,
  InfinityLoadingProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      placement = 'bottom',
      children,
      loading,
      offset = 50,
      haveNext,
      onNext,
      loadingRender,
      // virtualized,
      ...props
    },
    ref,
  ) => {
    const _children = children;
    // if (virtualized) {
    //   _children = (
    //     <List
    //       height={226}
    //       width={184}
    //       itemCount={virtualized.itemCount}
    //       itemSize={virtualized.itemSize}
    //       itemData={virtualized.data}
    //     >
    //       {Row}
    //     </List>
    //   );
    // }

    return (
      <div
        ref={ref}
        {...props}
        onScroll={(ev) => {
          ev.preventDefault();
          const ele = ev.currentTarget;

          if (!loading && haveNext) {
            let _offset = 0;
            if (placement === 'top') {
              _offset = ele.scrollTop;
            } else {
              _offset = ele.scrollHeight - ele.scrollTop - ele.offsetHeight;
            }

            if (_offset < offset) {
              onNext?.();
            }
          }
          if (loading && placement === 'top' && ele.scrollTop < 1) {
            ele.scrollTop = 1;
          }
          props.onScroll?.(ev);
        }}
      >
        {loading &&
          placement === 'top' &&
          (loadingRender || (
            <div className="flex justify-center my-3">
              <IconSpin />
            </div>
          ))}

        {_children}
        {loading &&
          placement === 'bottom' &&
          (loadingRender || (
            <div className="flex justify-center my-3">
              <IconSpin />
            </div>
          ))}
      </div>
    );
  },
);
