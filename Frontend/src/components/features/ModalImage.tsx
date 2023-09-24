import { ButtonIconChevronLeft } from '@components/atoms/Icon/IconChevronLeft';
import { ButtonIconChevronRight } from '@components/atoms/Icon/IconChevronRight';
import { ButtonIconClose } from '@components/atoms/Icon/IconClose';
import { PATH } from '@constants/path';
import { faker } from '@faker-js/faker';
import { KeyBoard, useShortcut } from '@hooks/useShortcut';
import { cn } from '@utils';
import { Event } from '@utils/event';
import { mock } from '@utils/mock';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
export const ModalImage = () => {
  const [open, setOpen] = useState(false);
  const [images] = useState<string[]>(() => mock(() => faker.image.url())(30));
  const [indexActive, setIndexActive] = useState(0);
  const [isCanPrev, setIsCanPrev] = useState(false);
  const [isCanNext, setIsCanNext] = useState(true);
  const localRef = useRef<HTMLDivElement>(null);
  const id = useId();
  useEffect(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  }, [indexActive]);
  const onNext = useCallback(() => {
    let index = indexActive + 1;
    if (index < images.length) {
      setIndexActive(index);
      setIsCanPrev(true);
    }

    if (index >= images.length - 1) {
      setIsCanNext(false);
    }
  }, [indexActive]);

  const onPrev = useCallback(() => {
    let index = indexActive - 1;
    if (index >= 0) {
      setIndexActive(index);
      setIsCanNext(true);
    }

    if (index <= 0) {
      setIsCanPrev(false);
    }
  }, [indexActive]);
  useShortcut(
    [KeyBoard.ArrowDown, KeyBoard.ArrowRight],
    onNext,
    [onNext],
    open,
  );
  useShortcut([KeyBoard.ArrowUp, KeyBoard.ArrowLeft], onPrev, [onPrev], open);
  useShortcut(KeyBoard.Escape, () => setOpen(false));

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
    };
    Event.on('OpenModalImage', onOpen);

    if (open) {
      document.getElementById('main-content')?.classList.add('blur-xl');
      document.documentElement.classList.add('overflow-hidden');
      document.getElementById('floating-chat')?.classList.add('hidden');

      return () => {
        document.getElementById('main-content')?.classList.remove('blur-xl');
        document.documentElement.classList.remove('overflow-hidden');
        document.getElementById('floating-chat')?.classList.remove('hidden');
        Event.off('OpenModalImage', onOpen);
      };
    }

    return () => {
      Event.off('OpenModalImage', onOpen);
    };
  }, [open]);

  return createPortal(
    open && (
      <div
        ref={localRef}
        className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-50 py-2 scroll-auto"
      >
        <Link
          to={PATH.Home}
          className="dark:text-white text-slate-800 text-2xl font-bold flex items-center gap-1 absolute left-3 top-3"
        >
          {/* Fucin<span className="text-black px-1 ml-1 leading-8 inline-flex items-center rounded bg-[#ea8f1c]">srule</span> */}
          <img
            src="https://spacedev.vn/images/LOGO-image-full.svg"
            className="w-[45px]"
          />
          <span>Fucinsrule</span>
        </Link>
        <div className=" w-[700px] font-semibold py-2 h-0 m-auto flex justify-between text-white absolute left-1/2 -translate-x-1/2">
          <p>Người tạo: Đặng Thuyền Vương</p>
          <p>Hình ảnh con mèo</p>
          <p>Ngày tạo: 25/02/1994</p>
        </div>
        <ButtonIconClose
          className="absolute top-3 right-3 !w-12 !h-12"
          size={30}
          onClick={() => setOpen(false)}
        />
        <div className="overflow-auto h-full w-[800px] mx-auto flex justify-center flex-col gap-1 items-center relative">
          <div>
            <img src={images[indexActive]} />
          </div>
          {isCanPrev && (
            <ButtonIconChevronLeft
              size={35}
              onClick={onPrev}
              className="!w-11 !h-11 z-10 absolute top-1/2 -translate-y-1/2 left-3"
            />
          )}
          {isCanNext && (
            <ButtonIconChevronRight
              size={35}
              onClick={onNext}
              className="!w-11 !h-11 z-10 absolute top-1/2 -translate-y-1/2 right-3"
            />
          )}
        </div>

        <div className="fixed top-10 bottom-10 right-20 flex flex-col gap-1 overflow-auto">
          {images.map((e, i) => (
            <div
              id={indexActive === i ? id : undefined}
              onClick={() => setIndexActive(i)}
              key={e}
              className={cn(
                'h-[150px] w-[150px] min-h-[150px] min-w-[150px] cursor-pointer border-2 rounded-lg border-base',
                { ['!border-primary-neon']: indexActive === i },
              )}
            >
              <img className="w-full h-full object-cover rounded-lg" src={e} />
            </div>
          ))}
        </div>
      </div>
    ),
    document.body,
  );
};
