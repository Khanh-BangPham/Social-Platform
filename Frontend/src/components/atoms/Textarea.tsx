import React, { forwardRef } from 'react';

export interface TextareaProp
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: string;
  disabled?: boolean;
  isTextarea?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProp>(
  ({ children, disabled, className, isTextarea = true, ...props }, ref) => {
    let TagName = isTextarea ? 'textarea' : ('div' as any);
    return (
      <TagName
        ref={ref}
        className={className}
        spellCheck={false}
        disabled={disabled}
        {...props}
      >
        {children}
      </TagName>
    );
  },
);
