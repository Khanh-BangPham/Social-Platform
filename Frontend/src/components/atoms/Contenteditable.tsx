import { useClassNames } from '@hooks/useClassNames';
import { cn, handleSelectEnd } from '@utils';
import { forwardRef } from 'react';

export interface ContenteditableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  placeholder?: string;
  onChange?: (value: string) => void;
  children?: any;
  disabled?: boolean;
  maxLength?: number;
}
export const Contenteditable = forwardRef<
  HTMLParagraphElement,
  ContenteditableProps
>(({ onChange, ...props }, inputRef) => {
  const classNames = useClassNames(props.className);

  return (
    <div
      {...props}
      className={cn(
        'after:empty:content-[attr(placeholder)] after:absolute after:-translate-y-1/2 after:top-1/2 relative',
        classNames,
      )}
      spellCheck={false}
      ref={inputRef}
      onInput={(ev) => {
        if (!ev.currentTarget.innerText.trim()) {
          ev.currentTarget.innerHTML = '';
        }
        if (props.maxLength) {
          if (ev.currentTarget.innerHTML.length > props.maxLength) {
            ev.currentTarget.innerHTML = ev.currentTarget.innerHTML.slice(
              0,
              props.maxLength,
            );
            handleSelectEnd(ev.currentTarget);
          }
        }
        onChange?.(ev.currentTarget.innerHTML);
      }}
      contentEditable={!props.disabled}
      suppressContentEditableWarning={true}
      placeholder={props.placeholder}
    >
      {props.children}
    </div>
  );
});
