import { Emoji } from '@components/features/Emoji';
import {
  cn,
  cursorPosition,
  getCurrentCaretRange,
  restoreCaretRange,
} from '@utils';
import { getFileFromPaste } from '@utils/file';
import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ButtoniconEmotion } from './Icon/IconEmotion';
import { ButtoniconGIF } from './Icon/IconGIF';
import { ButtonIconUploadImage } from './Icon/IconUploadImage';
import { UploadFile, UploadfileRef } from './UploadFile';

export interface MessageInput extends DefaultProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  clearWhenEnter?: boolean;
  allowShiftEnter?: boolean;
  onPasteFile?: (file: File[]) => void;
  onUploadImage?: (file: File[]) => void;
  includes?: ('gif' | 'emoji')[];
  onBur?: React.FocusEventHandler<HTMLDivElement>;
}

export interface MessageInputRef {
  ele: HTMLParagraphElement;
  // getRange: () => [Node, number];
  restoreLastRange: () => void;
}
export const MessageInput = forwardRef<MessageInputRef, MessageInput>(
  (
    { allowShiftEnter = true, clearWhenEnter = true, includes, ...props },
    inputRef,
  ) => {
    const uploadFileRef = useRef<UploadfileRef>(null);
    useImperativeHandle(
      inputRef,
      () => {
        let ele = document.getElementById(id);
        return {
          ele: ele,
          restoreLastRange: () => {
            if (lastRangeRef.current) {
              restoreCaretRange(ele as HTMLElement, lastRangeRef.current);
            }
          },
        } as unknown as MessageInputRef;
      },
      [],
    );
    const lastRangeRef = useRef<ReturnType<typeof getCurrentCaretRange>>();
    const id = useId();
    // const [lastCaretIndex, setLastCaretIndex] = useState(0);
    let [value, setValue] = useState('');
    return (
      <div
        className={cn(
          'flex gap-1 bg-gray-200 dark:bg-slate-700',
          props.className,
        )}
      >
        <div
          className={cn(
            'flex-1 w-full focus:caret-primary-500 focus:border-blue-500 focus:border-solid border-transparent border px-3 max-h-[150px] overflow-auto  rounded  text-sm py-1 min-h-[30px] outline-none relative',
            {
              'after:empty:text-gray-500 dark:after:empty:text-slate-400 after:empty:content-[attr(placeholder)] after:empty:absolute after:-translate-y-1/2 after:empty:top-1/2':
                !value,
            },
          )}
          id={id}
          spellCheck={false}
          onPaste={(pasteEvent) => {
            props.onPasteFile?.(getFileFromPaste(pasteEvent));
          }}
          onFocus={() => {}}
          onBlur={() => {
            lastRangeRef.current = getCurrentCaretRange();
          }}
          onInput={(ev) => {
            if (!ev.currentTarget.innerText.trim()) {
              ev.currentTarget.innerHTML = '';
            }
            // ev.currentTarget.innerText = ev.currentTarget.innerText;
            // handleSelectEnd(ev.currentTarget);
            props.onChange?.(ev.currentTarget.innerHTML);
            setValue(ev.currentTarget.innerText);
          }}
          onKeyDown={(ev) => {
            if (!ev.shiftKey && ev.key === 'Enter') {
              ev.preventDefault();

              props.onEnter?.(ev.currentTarget.innerHTML);

              if (clearWhenEnter) {
                ev.currentTarget.innerHTML = '';
              }
            }
            if (ev.shiftKey && ev.key === 'Enter') {
              // if (ev.currentTarget.innerHTML.endsWith('<br><br>')) {
              //   ev.currentTarget.innerHTML = ev.currentTarget.innerHTML.replace(
              //     /\<br\>\<br\>$/,
              //     '',
              //   );
              //   handleSelectEnd(ev.currentTarget);
              // }
              // if (allowShiftEnter) {
              //   ev.currentTarget.innerHTML += '<div><br></div>';
              //   handleSelectEnd(ev.currentTarget);
              // }
            }
            setValue(ev.currentTarget.innerText);
          }}
          contentEditable
          suppressContentEditableWarning={true}
          placeholder={props.placeholder}
        ></div>
        {props.onUploadImage && (
          <UploadFile
            className="rounded-full"
            ref={uploadFileRef}
            multiple
            onChange={props.onUploadImage}
          >
            <ButtonIconUploadImage transparent />
          </UploadFile>
        )}
        {includes?.includes('gif') && <ButtoniconGIF transparent />}
        {includes?.includes('emoji') && (
          <Emoji
            onSelect={(val) => {
              let input = document.getElementById(id);
              if (input) {
                let curPos = cursorPosition() as number;
                let range = getCurrentCaretRange();

                input.innerText =
                  input.innerHTML.slice(0, curPos) +
                  `<img class="h-5 w-5 inline align-middle mx-0.5" src=${val}/>` +
                  input.innerHTML.slice(curPos);
                if (range) {
                  console.log(range);
                  restoreCaretRange(
                    document.getElementById(id) as HTMLElement,
                    range as any,
                  );
                }
              }
              // console.log((inputRef.current as any).selectionStart);
              // if (inputRef.current) {
              //   if (inputRef.current) {
              //     let curPos = cursorPosition();
              //     inputRef.current.innerHTML =
              //       inputRef.current.innerHTML.slice(0, curPos) +
              //       `<img class="h-5 w-5 inline align-middle mx-0.5" src=${val}/>` +
              //       inputRef.current.innerHTML.slice(curPos);
              //   }
              // }
            }}
          >
            <ButtoniconEmotion transparent />
          </Emoji>
        )}
      </div>
    );
  },
);
