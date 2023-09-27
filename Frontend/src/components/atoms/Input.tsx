import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '../../utils';

export interface InputProps
  extends Partial<UseFormRegisterReturn>,
    DefaultProps {
  label?: string;
  type?: string;
  error?: string;
  placeholder?: string;
}

export const Input = forwardRef<HTMLLabelElement, InputProps>(
  ({ label, type = 'text', error, className, ...props }, ref) => {
    return (
      <label className={cn('block', className)} ref={ref}>
        <p className="font-semibold text-md mb-2">{label}</p>
        <input
          type={type}
          className={cn(
            'border border-solid outline-none p-2 w-full rounded dark:bg-slate-800 dark:border-slate-700',
            {
              'border-red-500 text-red-500 dark:border-red-500': error,
            },
          )}
          {...props}
        />
        {error && <p className="text-red-500 italic text-sm">{error}</p>}
      </label>
    );
  },
);
