import { cn } from '@utils';
import React from 'react';

export interface SkeletonProp {
  circle?: boolean;
  text?: boolean;
  width?: number | string;
  height?: number | string;
  avatar?: boolean;
  image?: boolean;
}
export const Skeleton: Atom<SkeletonProp> = React.memo(
  ({ width, height, circle, text, className, avatar, image }) => {
    let _className =
      'bg-[#eee] rounded-lg bg-[length:200%_100%] bg-gradient-to-r from-[#ececec] via-[#ffffff] to-[#ececec] animate-shine w-full block dark:from-slate-600 dark:via-slate-500  dark:to-slate-600';

    if (image) {
      return (
        <svg
          className={cn('text-gray-200 dark:text-primary-600', className)}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
          style={{ width: width || height, height: height || width }}
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      );
    }
    if (avatar) {
      return (
        <svg
          style={{ width: width || height, height: height || width }}
          className={cn(
            'text-gray-200 dark:text-primary-700 fill-[#ececec] dark:fill-slate-500',
            className,
          )}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
      );
    }

    if (circle) {
      return (
        <span
          className={cn(_className, className, 'rounded-full')}
          style={{ width: width || height, height: height || width }}
        ></span>
      );
    }

    if (text) {
      return (
        <span
          className={cn(_className, className)}
          style={{
            width: width || `${Math.round(Math.random() * 100)}%`,
            height: 14,
          }}
        ></span>
      );
    }

    return (
      <span
        className={cn(_className, className)}
        style={{ width, height }}
      ></span>
    );
  },
);

{
  /* <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  <div className="animate-pulse flex space-x-4">
    <div className="rounded-full bg-slate-700 h-10 w-10" />
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-700 rounded" />
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2" />
          <div className="h-2 bg-slate-700 rounded col-span-1" />
        </div>
        <div className="h-2 bg-slate-700 rounded" />
      </div>
    </div>
  </div>
</div>; */
}

// img
// <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
//             <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
//         </svg>

// avatar
{
  /* <svg class="w-10 h-10 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg> */
}
