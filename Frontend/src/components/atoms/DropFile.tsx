import { useDebounce } from '@hooks/useDebounce';
import { cn } from '@utils';
import { Observable } from '@utils/Observable';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import { IconDropImage } from './Icon/IconDropImage';

const observableDragOver = new Observable(
  fromEvent<DragEvent>(window, 'dragover'),
);
const observableDrop = new Observable(fromEvent<DragEvent>(window, 'drop'));
const observableDragLeave = new Observable(
  fromEvent<DragEvent>(window, 'dragleave'),
);

interface DropFileProps {
  children: any;
  content?: any;
  includes?: { [k in keyof DropFileType]?: (value: DropFileType[k]) => void };
  title?: { [k in keyof DropFileType]?: string };
  backdropClassName?: string;
  isGlobal?: boolean;
  renderBackdrop?: () => any;
  onDragStart?: () => void;
  onDragLeave?: () => void;
}

export const setDropFileData = <T extends keyof DropFileType>(
  ev: DragEvent | React.DragEvent<HTMLElement>,
  type: T,
  data: DropFileType[T],
) => {
  ev.stopPropagation();
  ev?.dataTransfer?.clearData();
  ev?.dataTransfer?.setData(type, JSON.stringify(data));
};

export const getDropFileData = <T extends keyof DropFileType>(
  ev: DragEvent,
  type: T,
): DropFileType[T] => {
  return ev?.dataTransfer?.getData(type) as DropFileType[T];
};

const defaultMap: {
  [k: string]: {
    types: string[];
    handler(ev: DragEvent): any;
    title: string;
  };
} = {
  url: {
    title: 'Thả link vào đây',
    types: ['text/uri-list'],
    handler(ev) {
      return ev.dataTransfer?.getData('text');
    },
  },
  text: {
    title: 'Thả văn bản vào đây',
    types: ['text/plain', 'text/html'],
    handler(ev) {
      return ev.dataTransfer?.getData('text');
    },
  },

  files: {
    title: 'Thả file vào đây',
    types: ['Files'],
    handler(ev) {
      return Array.from(ev?.dataTransfer?.files || []);
    },
  },
};

export const DropFile: Atom<DropFileProps> = ({
  children,
  className,
  includes,
  ...props
}) => {
  const [open, setOpen] = useDebounce(false, 10);
  const [isDragEnter, setIsDragEnter] = useState(false);
  const checkRef = useRef(false);

  const getAllowTypes = () => {
    let allowTypes = Object.keys(includes || {});

    allowTypes = allowTypes.reduce(
      (cum, cur) => [
        ...cum,
        ...(typeof defaultMap[cur] !== 'undefined'
          ? defaultMap[cur].types
          : [cur]),
      ],
      [] as string[],
    );
    return allowTypes;
  };

  const [type, setType] = useState('');

  const onDrop = async (ev: DragEvent) => {
    ev.preventDefault();
    // ev.stopPropagation();
    const types = ev?.dataTransfer?.types;
    if (types) {
      for (const i of types) {
        const checkIsDefault = _.findKey(defaultMap, (e) =>
          e.types.includes(i),
        );

        if (checkIsDefault) {
          const data = defaultMap[checkIsDefault].handler(ev);
          if (data) {
            includes?.[checkIsDefault as keyof typeof includes]?.(data);
            break;
          }
        } else {
          const data = ev.dataTransfer.getData(i);
          if (data) {
            includes?.[i as keyof typeof includes]?.(JSON.parse(data));
            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    const allowTypes = getAllowTypes();

    const unsubscribe1 = observableDragOver.subscribe((ev: DragEvent) => {
      ev.preventDefault();
      const types = ev.dataTransfer?.types || [];
      const check = _.findIndex(allowTypes, (el) => _.includes(types, el));
      if (check !== -1) {
        setType(allowTypes[check]);
        props.onDragStart?.();
        setOpen(true);
      }
      return true;
    });
    const unsubscribe2 = observableDrop.subscribe((ev: DragEvent) => {
      if (checkRef.current) {
        checkRef.current = false;
        onDrop(ev);
        return false;
      }
    });

    const unsubscribe5 = observableDrop.alway(() => {
      setOpen(false);
      checkRef.current = false;
      props.onDragLeave?.();
    });
    const unsubscribe3 = observableDragLeave.subscribe(() => {
      setOpen(false);
      props.onDragLeave?.();
      checkRef.current = false;
    });

    const unsubscribe4 = props.isGlobal
      ? observableDrop.subscribe(
          (ev: DragEvent) => {
            ev.preventDefault();
            onDrop(ev);
            return false;
          },
          { last: true },
        )
      : null;

    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
      unsubscribe4?.();
      unsubscribe5();
    };
  }, []);
  return (
    <div className={cn('relative', className)}>
      {children}
      {open &&
        (props.renderBackdrop?.() || (
          <div
            onDrop={() => {
              checkRef.current = true;
            }}
            onDragEnter={() => {
              setIsDragEnter(true);
            }}
            onDragLeave={() => {
              setIsDragEnter(false);
            }}
            className={cn(
              'gap-2 absolute top-0 left-0 w-full h-full  dark:text-white bg-black !bg-opacity-60 flex items-center justify-center text-white font-bold text-xl',
              props.backdropClassName,
              { ['border border-dashed border-primary-300']: isDragEnter },
            )}
          >
            <IconDropImage />
            {props?.title?.[type as keyof DropFileType] ||
              props.content ||
              'Thả tệp tại đây'}
          </div>
        ))}
    </div>
  );
};
