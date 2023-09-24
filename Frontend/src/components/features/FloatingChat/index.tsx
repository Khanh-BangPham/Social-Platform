import { Badge } from '@components/atoms/Badge';
import { DropFile } from '@components/atoms/DropFile';
import { Dropdown } from '@components/atoms/Dropdown';
import { IconApplication } from '@components/atoms/Icon/IconApplication';
import { IconCircleCheck } from '@components/atoms/Icon/IconCircleCheck';
import { IconImage } from '@components/atoms/Icon/IconImage';
import { IconLock } from '@components/atoms/Icon/IconLock';
import { IconLogo } from '@components/atoms/Icon/IconLogo';
import { IconLogout } from '@components/atoms/Icon/IconLogout';
import { IconMessage } from '@components/atoms/Icon/IconMessage';
import { ButtonIconNarrowDown } from '@components/atoms/Icon/IconNarrowDown';
import { IconPoll } from '@components/atoms/Icon/IconPoll';
import { IconSetting } from '@components/atoms/Icon/IconSetting';
import { IconSignature } from '@components/atoms/Icon/IconSignature';
import { IconSquareRoundCheck } from '@components/atoms/Icon/IconSquareRoundCheck';
import { IconUser } from '@components/atoms/Icon/IconUser';
import { IconUserGroup } from '@components/atoms/Icon/IconUserGroup';
import { IconUserPlus } from '@components/atoms/Icon/IconUserPlus';
import { InfinityLoading } from '@components/atoms/InfinityLoading';
import { Menu } from '@components/atoms/Menu';
import { MessageInput, MessageInputRef } from '@components/atoms/MessageInput';
import { useTranslate } from '@components/atoms/TranslateProvider';
import { UploadFile, UploadfileRef } from '@components/atoms/UploadFile';
import { handleSelectEnd, scrollBottom } from '@utils/element';
import { Event } from '@utils/event';
import { convertImageUrlToFile } from '@utils/file';
import {
  IMessage,
  fakeApi,
  mockMessages,
  mockUploadImage,
  mockUser,
} from '@utils/mock';
import { uniqueId } from 'lodash';
import { FC, useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../utils';
import { Avatar } from '../../atoms/Avatar';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { ButtonIconClose, IconClose } from '../../atoms/Icon/IconClose';
import { ButtoniconGIF } from '../../atoms/Icon/IconGIF';
import { IconMaximize } from '../../atoms/Icon/IconMaximize';
import { IconMinimize } from '../../atoms/Icon/IconMinimize';
import { IconMinus } from '../../atoms/Icon/IconMinus';
import { ButtonIconPlus, IconPlus } from '../../atoms/Icon/IconPlus';
import { ButtonIconThreeDotAction } from '../../atoms/Icon/IconThreeDotAction';
import { ButtonIconUploadImage } from '../../atoms/Icon/IconUploadImage';
import { Gif } from '../Gif';
import { MessageItem } from './MessageItem';
import { ModalGroupChat } from './ModalGroupChat';

export const FloatingChat = () => {
  return createPortal(
    <div
      id="floating-chat"
      className="fixed bottom-0 right-3 flex gap-3 items-end pr-[var(--body-padding-right)]"
    >
      <ChatScreen />
      {/* <ChatScreen /> */}
    </div>,
    document.body,
  );
};

const fullScreenClass = 'h-[700px] w-[600px]';
const isHideClass =
  '!h-[49px] !w-[400px] [&_.main]:hidden [&_.footer]:hidden cursor-pointer';

export const ChatScreen: FC = () => {
  const { t } = useTranslate();
  const uploadFileRef = useRef<UploadfileRef>(null);
  const chatScreenRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  const inputRef = useRef<MessageInputRef>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const [messages, setMessages] = useState(() => mockMessages(20));
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<{ path: string; id: string }[]>([]);
  const [openBackToBottom, setOpenBackToBottom] = useState(false);
  const imageWraperRef = useRef<HTMLDivElement>(null);
  const checkMiniRef = useRef(false);
  const messageWraperId = useId();
  // const lastRangeRef = useRef<ReturnType<typeof getCurrentCaretRange>>();

  useEffect(() => {
    chatScreenRef.current?.scrollTo({
      top: chatScreenRef.current.scrollHeight,
    });
  }, []);
  useEffect(() => {
    imageWraperRef.current?.scrollBy({
      left: imageWraperRef.current.scrollWidth,
      behavior: 'smooth',
    });
  }, [images]);

  const uploadFile = useCallback(
    async (files: File[]) => {
      const imgs = [];
      for (const i in files) {
        const imgSrc = await mockUploadImage(files[i]);
        imgs.push(imgSrc);
      }

      setImages([...images, ...imgs]);
    },
    [images],
  );

  return (
    <>
      <ModalGroupChat open={openMember} onCancel={() => setOpenMember(false)} />
      <div
        className={cn(
          'transition-all duration-200 rounded-b-none shadow-[0_4px_5px_rgba(0,0,0,.5)] flex flex-col border border-solid border-b-0 border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 text-gray-900 dark:text-white h-[500px] w-[400px] rounded-lg',
          {
            [fullScreenClass]: isFullScreen,
            [isHideClass]: isHide,
          },
        )}
        onClick={(ev) => {
          if (inputRef.current && ev.target !== inputRef.current.ele) {
            inputRef.current.restoreLastRange();
          }
          // console.log(document.getSelection()?.getRangeAt(0).toString());
          // // if (!window?.getSelection()?.toString()) {
          // // console.log(cursorPosition());
          // if (inputRef.current) {
          //   inputRef.current?.focus();
          //   if (lastRangeRef.current) {
          //     document.getSelection()?.addRange(lastRangeRef.current);
          //   } else {
          //     handleSelectEnd(inputRef.current);
          //   }
          //   // selectionRef.current?.modify(
          //   //   'extend',
          //   //   'backward',
          //   //   'paragraphboundary',
          //   // );
          //   // handleSelectEnd(inputRef.current);
          // }
          // // }
        }}
      >
        <div
          onClick={() => {
            if (!checkMiniRef.current) {
              setIsHide(false);
            }

            checkMiniRef.current = false;
          }}
          className="[&_.actions]:hover:opacity-100 flex gap-3 items-center p-2 border-b border-solid border-gray-300 dark:border-slate-700"
        >
          <Badge count={10}>
            <Avatar border={{}} />
          </Badge>
          <h3 className="flex-1 font-bold text-sm">Katherine Jordan</h3>
          <div className="flex gap-0.5 items-center">
            <Dropdown
              placement="bottomRight"
              // getPopupContainer={(node) => node}
              content={
                <Menu
                  menus={[
                    {
                      label: t('Go to the group information page'),
                      icon: <IconLogo />,
                    },
                    {
                      label: t('Open in big screen'),
                      icon: <IconMessage />,
                    },
                    {
                      label: t('View profile'),
                      icon: <IconUser />,
                    },
                    {
                      label: t('Change theme'),
                      icon: <IconApplication />,
                    },
                    {
                      line: true,
                    },
                    {
                      label: t('Nickname'),
                      icon: <IconSignature />,
                    },
                    {
                      label: t('Encrypt messages'),
                      icon: <IconLock />,
                    },
                    {
                      label: t('Group member'),
                      onClick: () => setOpenMember(true),
                      icon: <IconUserGroup />,
                    },
                    { label: t('Create a group'), icon: <IconUserPlus /> },
                    {
                      label: t('Leave the group'),
                      icon: <IconLogout />,
                    },
                    {
                      label: t('Setting'),
                      icon: <IconSetting />,
                    },
                  ]}
                />
              }
            >
              <ButtonIconThreeDotAction transparent />
            </Dropdown>
            <Icon transparent onClick={() => setIsFullScreen(!isFullScreen)}>
              {isFullScreen ? <IconMinimize /> : <IconMaximize />}
            </Icon>
            <Icon
              transparent
              onClick={() => {
                checkMiniRef.current = true;
                // ev.stopPropagation();
                setIsFullScreen(false);
                setIsHide(!isHide);
              }}
            >
              {isHide ? <IconPlus /> : <IconMinus />}
            </Icon>

            <IconClose size={17} transparent />
          </div>
        </div>

        <DropFile
          className="flex flex-col flex-1 h-1"
          title={{
            post: t('Drop your article here'),
            img: t('Drop image links here'),
          }}
          includes={{
            img: async (value) => {
              const file = await convertImageUrlToFile(value);
              uploadFileRef.current?.trigger([file]);
            },
            post(value) {
              setMessages([
                ...messages,
                {
                  avatar: value.user,
                  content: value.content,
                  id: value.id,
                  myMessage: true,
                  url: value.url,
                } as any,
              ]);
            },
            files: (files) => {
              uploadFileRef.current?.trigger(files);
            },
            text: (text) => {
              console.log(inputRef.current, text);
              if (inputRef.current) {
                inputRef.current.ele.innerHTML = text;
              }
            },
            url: (url) => {
              console.log(inputRef.current, url);
              if (inputRef.current) {
                inputRef.current.ele.innerHTML = url;
              }
            },
          }}
        >
          <InfinityLoading
            ref={chatScreenRef}
            id={messageWraperId}
            offset={200}
            haveNext
            placement="top"
            loading={loading}
            className="flex flex-col py-2 gap-2 flex-1 main overflow-auto custom-scrollbar-behavior"
            onScroll={(ev) => {
              Event.emit('CloseContextMenu', {});
              let ele = ev.currentTarget;

              if (ele.scrollTop + ele.offsetHeight < ele.scrollHeight - 40) {
                setOpenBackToBottom(true);
              } else {
                setOpenBackToBottom(false);
              }
            }}
            onNext={async () => {
              setLoading(true);
              const res = await fakeApi(mockMessages);
              setMessages([...res, ...messages]);
              setLoading(false);
            }}
          >
            {/* <div className="flex flex-col text-center gap-2 items-center px-2">
            <Avatar size={50} />
            <div className="">
              <h3 className="font-bold text-sm">
                <Tooltip title="demo">Hunter Gonzales</Tooltip>
              </h3>
              <p className="text-sm text-black dark:text-white text-opacity-70">
                Lập trình viên
              </p>
            </div>
          </div>
          <div className="text-center my-4 dark:text-slate-300 text-gray-500 text-sm font-semibold text-opacity-90">
            Thứ sáu, 11/05/2023
          </div> */}
            {messages.map((e) => (
              <MessageItem
                key={e.id}
                content={e.content}
                myMessage={e.myMessage}
                img={e.img}
                url={e.url}
              />
            ))}
          </InfinityLoading>

          <div className="relative footer border-t border-solid border-gray-300 dark:border-slate-700 p-1">
            <ButtonIconNarrowDown
              onClick={() =>
                chatScreenRef.current?.scrollBy({
                  top: chatScreenRef.current.scrollHeight,
                  behavior: 'smooth',
                })
              }
              className={cn(
                'opacity-0 transition-all duration-200 absolute left-1/2 -top-10 -translate-x-1/2 dark:!bg-primary dark:hover:!bg-primary-700 animate-bounce',
                { 'opacity-100': openBackToBottom },
              )}
            />
            {images.length > 0 && (
              <div
                ref={imageWraperRef}
                className="overflow-x-auto mb-0.5 pb-0.5"
              >
                <div className="flex gap-1  w-fit">
                  <div
                    onClick={() => {
                      uploadFileRef.current?.trigger();
                    }}
                    className="border-base border dark:hover:bg-slate-800 select-none w-20 h-20 rounded overflow-hidden flex flex-col !text-opacity-60 text-black dark:text-white text-sm font-semibold gap-1 hover:bg-gray-100 items-center justify-center cursor-pointer"
                  >
                    <IconImage /> {t('Add more')}
                  </div>
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="border-base border relative select-none w-20 h-20 rounded overflow-hidden"
                    >
                      <img
                        src={img.path}
                        className="pointer-events-none w-full h-full object-cover"
                      />
                      <ButtonIconClose
                        size={14}
                        width={30}
                        height={30}
                        className="absolute top-1 right-1"
                        onClick={() =>
                          setImages(images.filter((e) => e.id !== img.id))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <MessageInput
              onChange={(val) => setValue(val)}
              ref={inputRef}
              includes={['emoji']}
              // onBur={() => {
              //   lastRangeRef.current = getCurrentCaretRange();
              //   // if (range) {
              //   //   console.log(range.toString());
              //   //   document.getSelection()?.addRange(range);
              //   // }
              //   // ev.currentTarget.save
              //   // console.log(cursorPosition());
              //   // ev.currentTarget.blur();
              //   // selectionRef.current = document.getSelection();
              // }}
              onEnter={() => {
                setValue('');
              }}
              onPasteFile={async (files) => {
                uploadFileRef.current?.trigger(files);
              }}
              placeholder={t('Write a message...')}
            />
          </div>
          <div className="flex items-center border-t dark:border-slate-700 border-gray-300 py-1 px-2">
            <div className="flex items-center">
              <Dropdown
                content={
                  <Menu
                    menus={[
                      {
                        label: t('Create a poll'),
                        icon: <IconPoll />,
                      },

                      {
                        label: t('Create a to-do list'),
                        icon: <IconSquareRoundCheck />,
                      },
                    ]}
                  />
                }
                placement="topRight"
              >
                <ButtonIconPlus transparent />
              </Dropdown>
              <UploadFile
                className="rounded-full"
                ref={uploadFileRef}
                multiple
                onChange={uploadFile}
              >
                <ButtonIconUploadImage transparent />
              </UploadFile>
              <Gif
                onSelect={(val, { close }) => {
                  setMessages([
                    ...messages,
                    {
                      img: [{ id: uniqueId(), thumbnail: val }],
                      myMessage: true,
                      sender: mockUser(),
                      id: uniqueId(),
                    } as IMessage,
                  ]);
                  close();
                  setTimeout(() => {
                    scrollBottom(document.getElementById(messageWraperId));
                  }, 300);
                }}
              >
                <ButtoniconGIF transparent />
              </Gif>
              {/* <Emoji
                onSelect={() => {
                  console.log((inputRef.current as any).selectionStart);
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
              </Emoji> */}
            </div>
            <div className="ml-auto flex items-center">
              <Button
                type={value || images.length > 0 ? 'primary' : 'default'}
                disabled={!value && images.length === 0}
                className="rounded-full px-5"
                size="small"
                onClick={() => {
                  console.log('send message');
                  handleSelectEnd(inputRef.current?.ele as Node);
                  setValue('');
                  if (inputRef.current) {
                    inputRef.current.ele.innerHTML = '';
                  }
                  setImages([]);
                  setMessages([
                    ...messages,
                    {
                      content: value,
                      id: uniqueId(),
                      img: images.map((e) => ({
                        id: uniqueId(),
                        thumbnail: e.path,
                      })),
                      myMessage: true,
                      sender: mockUser(),
                    } as IMessage,
                  ]);

                  setTimeout(() => {
                    scrollBottom(document.getElementById(messageWraperId));
                  }, 300);
                }}
              >
                {t('Send')}
              </Button>
              <Dropdown
                placement="topRight"
                autoClose
                content={
                  <Menu
                    menus={[
                      {
                        className: '[&_.icon]:!text-primary-500',
                        label: t('Press Enter to send the message'),
                        icon: <IconCircleCheck />,
                      },
                      {
                        label: t('Press the button to send the message'),
                        className: '[&:hover_.icon]:!text-primary-500',
                        icon: <IconCircleCheck />,
                      },
                    ]}
                  />
                }
              >
                <ButtonIconThreeDotAction transparent />
              </Dropdown>
            </div>
          </div>
        </DropFile>
      </div>
    </>
  );
};
