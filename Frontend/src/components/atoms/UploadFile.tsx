import { cn } from '@utils';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface UploadFileProps extends DefaultProps {
  children?: any;
  multiple?: boolean;
  onChange?: (fileList: File[]) => void;
}
export interface UploadfileRef {
  trigger(files?: File[]): void;
}
export const UploadFile = forwardRef<UploadfileRef, UploadFileProps>(
  ({ children, multiple = false, ...props }, ref) => {
    useImperativeHandle(
      ref,
      () => {
        return {
          trigger: (files) => {
            if (!files) {
              return fileRef.current?.click();
            }

            props.onChange?.(files);
          },
        };
      },
      [props.onChange],
    );
    const fileRef = useRef<HTMLInputElement>(null);
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
      const files = ev.target.files;
      if (files && files?.length > 0) {
        props.onChange?.(Array.from(files));
        if (fileRef.current) {
          (fileRef.current as any).value = null;
        }
      }
    };
    return (
      <div
        className={cn('cursor-pointer', props.className)}
        onClick={() => fileRef.current?.click()}
      >
        {children}
        <input
          onChange={onChange}
          ref={fileRef}
          type="file"
          hidden
          multiple={multiple}
        />
      </div>
    );
  },
);
