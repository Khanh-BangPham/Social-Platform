import { FC, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "../utils";

export interface InputProps extends UseFormRegisterReturn {
  label?: string;
  type?: string;
  error?: string;
}

export const Input = forwardRef<HTMLLabelElement, InputProps>(
  ({ label, type = "text", error, ...props }, ref) => {
    return (
      <label className="block" ref={ref}>
        <p className="font-semibold text-md mb-2">{label}</p>
        <input
          type={type}
          className={cn(
            "border border-solid outline-none p-2 w-full rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white",
            {
              "border-red-500 text-red-500 dark:text-red-500": error,
            }
          )}
          {...props}
        />
        {error && <p className="text-red-500 italic text-sm">{error}</p>}
      </label>
    );
  }
);
