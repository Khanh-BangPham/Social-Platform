import { Avatar } from '@components/atoms/Avatar';
import { setDropFileData } from '@components/atoms/DropFile';
import { ButtonIconChevronLeft } from '@components/atoms/Icon/IconChevronLeft';
import { ButtonIconChevronRight } from '@components/atoms/Icon/IconChevronRight';
import { IconPlus } from '@components/atoms/Icon/IconPlus';
import { useTranslate } from '@components/atoms/TranslateProvider';
import { faker } from '@faker-js/faker';
import { mockStories } from '@utils/mock';
import { useId, useRef, useState } from 'react';

export const Story = () => {
  const { t } = useTranslate();
  const [stories] = useState(() => mockStories(10));
  const [img] = useState(() => faker.image.url({ height: 400, width: 400 }));
  const wraperRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const id = useId();

  return (
    <div className="pt-2 px-2 shadow bg-white rounded-lg dark:bg-slate-800 select-none relative cursor-pointer">
      <div
        className="flex gap-3 pb-2 items-center snap-x snap-always overflow-auto hide-scrollbar"
        ref={wraperRef}
        onScroll={(ev) => {
          let ele = ev.currentTarget;
          if (ele.scrollWidth - (ele.scrollLeft + ele.offsetWidth) <= 10) {
            setShowRight(false);
          } else {
            setShowRight(true);
          }

          if (ele.scrollLeft <= 10) {
            setShowLeft(false);
          } else {
            setShowLeft(true);
          }
        }}
        id={id}
        // onWheel={(ev) => {
        //   ev.preventDefault();
        //   if (ev.deltaY > 0) {
        //   } else {
        //   }
        // }}
      >
        <div className="">
          <div className="flex flex-col items-center relative cursor-pointer snap-always snap-start gap-1 overflow-hidden w-[150px] h-[250px]">
            <div className="active:scale-95 relative rounded-lg overflow-hidden w-full h-full">
              <div className="rounded-lg overflow-hiddens w-full h-full">
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src={img}
                />
              </div>
              <div className="flex flex-col gap-3 items-center justify-end  text-md p-4 bottom-0 left-0 right-0 rounded-lg  font-semibold whitespace-nowrap text-white absolute bg-gradient-to-t from-[#000000]  h-[100px] to-[#00000000]">
                <div className="w-7 h-7 flex items-center justify-center text-white bg-primary-500 hover:bg-primary-600 rounded-full shadow-[0_0_0_2px_white]">
                  <IconPlus />
                </div>
                {t('Create Story')}
              </div>
            </div>
          </div>
        </div>
        {stories.map((story) => (
          <div key={story.id} className="">
            <div className=" flex flex-col items-center relative cursor-pointer snap-always snap-start gap-1 overflow-hidden w-[150px] h-[250px]">
              <div className="active:scale-95 border-[2px] border-primary-neon relative overflow-hidden w-full h-full rounded-xl  border-solid">
                <div className="absolute top-2 left-2 overflow-hidden rounded-full">
                  <Avatar
                    src={story.user.avatar}
                    size={40}
                    border={{ size: 3 }}
                  />
                </div>
                <div className="rounded-lg overflow-hiddens w-full h-full">
                  <img
                    className="object-cover w-full h-full rounded-lg"
                    src={story.src}
                    onDragStart={(ev) => {
                      setDropFileData(ev, 'img', story.src);
                    }}
                  />
                </div>
                <div className="text-xs flex items-end p-4 bottom-0 left-0 right-0 rounded-lg font-semibold whitespace-nowrap text-white absolute bg-gradient-to-t from-[#000000]  h-[100px] to-[#00000000]">
                  <p className="line-clamp-2 whitespace-break-spaces">
                    {story.user.fullName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* <div className="flex flex-col items-center relative cursor-pointer snap-always snap-center gap-1 px-1 pt-[7px] mb-[-150px]">
        <BorderGradient
          size={3}
          className="relative rounded-lg overflow-hidden "
        >
          <div className="p-0.5 bg-white  dark:bg-slate-900 absolute top-2 left-2 overflow-hidden rounded-full">
            <Avatar size={32} />
          </div>
          <div className="rounded-lg overflow-hiddens w-full h-full">
            <img
              className="object-cover w-full h-full"
              src={'https://unsplash.it/400/400'}
            />
          </div>
        </BorderGradient>
        <p className="text-gray-900 text-small font-semibold whitespace-nowrap dark:text-white">
          Briggs
        </p>
      </div> */}
      </div>
      {showLeft && (
        <ButtonIconChevronLeft
          onClick={() =>
            wraperRef.current?.scrollTo({
              left:
                wraperRef.current.scrollLeft - wraperRef.current.offsetWidth,
              behavior: 'smooth',
            })
          }
          size={30}
          className="w-[40px] h-[40px] shadow absolute top-1/2 left-4 -translate-y-1/2"
        />
      )}

      {showRight && (
        <ButtonIconChevronRight
          onClick={() =>
            wraperRef.current?.scrollTo({
              left:
                wraperRef.current.scrollLeft + wraperRef.current.offsetWidth,
              behavior: 'smooth',
            })
          }
          size={30}
          className="w-[40px] h-[40px] shadow absolute top-1/2 right-4 -translate-y-1/2"
        />
      )}
    </div>
  );
};
