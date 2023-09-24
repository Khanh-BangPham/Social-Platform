import { cn } from '@utils';
import { useMemo } from 'react';

export const useClassNames: typeof cn = (...args) => {
  const className = useMemo(() => {
    return cn(...args);
  }, [...args]);
  return className;
};
