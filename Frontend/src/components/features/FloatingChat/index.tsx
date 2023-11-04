import { IconSpin } from '@components/Icon/IconSpin';
import { Badge } from '@components/atoms/Badge';
import { Dropdown } from '@components/atoms/Dropdown';
import { Menu } from '@components/atoms/Menu';
import { Modal, ModalProps } from '@components/atoms/Modal';
import { Tab } from '@components/atoms/Tab';
import { Tooltip } from '@components/atoms/Tooltip';
import { UserItem } from '@components/atoms/UserItem';
import { ClientEvent, ServerEvent } from '@constants/event';
import { socket } from '@socket';
import {
  CONVERSATION,
  USER_LOGIN,
  getGlobalState,
  setGlobalState,
  useGlobalState,
} from '@store/queryClient';
import { FC, useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils';
import { Icon } from '../../Icon/Icon';
import { IconClose } from '../../Icon/IconClose';
import { ButtoniconEmotion } from '../../Icon/IconEmotion';
import { ButtoniconGIF } from '../../Icon/IconGIF';
import { IconMaximize } from '../../Icon/IconMaximize';
import { IconMinimize } from '../../Icon/IconMinimize';
import { IconMinus } from '../../Icon/IconMinus';
import { IconPlus } from '../../Icon/IconPlus';
import { ButtonIconThreeDotAction } from '../../Icon/IconThreeDotAction';
import { ButtonIconUploadImage } from '../../Icon/IconUploadImage';
import { Avatar } from '../../atoms/Avatar';
import { Button } from '../../atoms/Button';

let receiverMessageEvent = (message: Message) => {
  let conversations = getGlobalState(CONVERSATION);
  let conversation = conversations.find((e) => e._id === message.conversation);
  if (conversation) {
    conversation.messages = [...conversation.messages, message];
    setGlobalState(CONVERSATION, [...conversations]);
  }
};

export const FloatingChat = () => {
  const conversations = useGlobalState(CONVERSATION);
  useEffect(() => {
    socket.on(ClientEvent.ReceiverMessage, receiverMessageEvent);

    return () => {
      socket.off(ClientEvent.ReceiverMessage, receiverMessageEvent);
    };
  }, []);

  return (
    <div className="fixed bottom-0 right-3 flex gap-3 items-end">
      {conversations?.map((e) => (
        <ChatScreen key={e._id} conversation={e} />
      ))}
      {/* <ChatScreen />
      <ChatScreen /> */}
    </div>
  );
};

const fullScreenClass = 'h-[600px] w-[550px]';
const isHideClass =
  'h-[49px] w-[200px] [&_.main]:hidden [&_.footer]:hidden cursor-pointer';
const anotherMessageclass =
  '[&_.message]:bg-gray-700 [&_.message]:rounded-l [&_.message]:rounded-r-2xl [&_.wrap]:items-start';
const myMessageClass =
  'flex-row-reverse text-right [&_.message]:bg-blue-700 [&_.avatar]:hidden [&_.message]:rounded-r [&_.message]:rounded-l-2xl [&_.wrap]:items-end';

interface ChatScreenProps {
  conversation: Conversation;
}

export const ChatScreen: FC<ChatScreenProps> = ({ conversation }) => {
  const chatScreenRef = useRef<HTMLDivElement>(null);
  const user = useGlobalState(USER_LOGIN);
  const [value, setValue] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  // const [messages, setMessages] = useState(conversation.messages);
  let { messages } = conversation;

  // useEffect(() => {
  //   setMessages(conversation.messages);
  // }, [conversation.messages]);

  useEffect(() => {
    chatScreenRef.current?.scrollTo({ top: 99999999, behavior: 'smooth' });
  }, [messages]);

  let anotherUser = conversation.users.find((e) => e._id !== user?._id);

  return (
    <>
      <ModalGroupChat open={openMember} onCancel={() => setOpenMember(false)} />
      <div
        className={cn(
          'transition-all duration-200 rounded-b-none shadow-[0_4px_5px_rgba(0,0,0,.5)] flex flex-col border border-solid border-b-0 border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-700 text-gray-900 dark:text-white h-[400px] w-[350px] rounded-lg overflow-hidden',
          {
            [fullScreenClass]: isFullScreen,
            [isHideClass]: isHide,
          },
        )}
      >
        <div
          onClick={() => setIsHide(false)}
          className="[&_.actions]:hover:opacity-100 flex gap-3 items-center p-2 border-b border-solid border-gray-300 dark:border-slate-700"
        >
          <Badge>
            <Avatar
              showStatus
              userId={anotherUser?._id}
              src={anotherUser?.avatar}
            />
          </Badge>
          <h3 className="flex-1 font-bold text-sm">{anotherUser?.name}</h3>
          <div className="flex gap-0.5 items-center">
            <Dropdown
              placement="bottomRight"
              content={
                <Menu
                  menus={[
                    {
                      label: 'Mở trong màn hình lớn',
                    },
                    {
                      label: 'Xem trang cá nhân',
                    },
                    {
                      label: 'Thay đổi chủ đề',
                    },
                    {
                      line: true,
                    },
                    {
                      label: 'Nickname',
                    },
                    {
                      label: 'Mã hóa tin nhắn',
                    },
                    {
                      label: 'Thành viên nhóm',
                      onClick: () => setOpenMember(true),
                    },
                    {
                      label: 'Rời khỏi nhóm',
                    },
                    {
                      label: 'Cài đặt',
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
              onClick={(ev: any) => {
                ev.stopPropagation();
                setIsFullScreen(false);
                setIsHide(!isHide);
              }}
            >
              {isHide ? <IconPlus /> : <IconMinus />}
            </Icon>

            <IconClose
              size={17}
              transparent
              onClick={() => {
                let conversations = getGlobalState(CONVERSATION);
                conversations = conversations.filter(
                  (e) => e._id !== conversation._id,
                );
                setGlobalState(CONVERSATION, conversations);
              }}
            />
          </div>
        </div>
        <div
          ref={chatScreenRef}
          className="flex flex-col py-2 gap-2 flex-1 main overflow-auto"
        >
          <div className="flex flex-col text-center gap-2 items-center px-2">
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
          </div>
          {/* <div className="flex justify-center my-3">
            <IconSpin />
          </div> */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'px-2 flex gap-2',
                message.sender._id === user?._id
                  ? myMessageClass
                  : anotherMessageclass,
              )}
            >
              <Avatar
                size={32}
                className="avatar"
                src={message.sender.avatar}
              />
              <div className="wrap flex-1 inline-flex flex-col gap-[1px] max-w-[60%]">
                <p
                  className="message text-sm text-white px-3 py-2 first-of-type:!rounded-t-2xl last-of-type:!rounded-b-2xl "
                  dangerouslySetInnerHTML={{ __html: message.content }}
                ></p>
                {/* <p className="message text-sm text-white px-3 py-2 first-of-type:!rounded-t-2xl last-of-type:!rounded-b-2xl ">
                  Chào bạn! Tất nhiên, tôi rất vui được giúp bạn. Bạn có một số
                  sở thích cụ thể về mẫu mã, màu sắc hoặc thương hiệu nào không?
                </p>
                <p className="message text-sm text-white px-3 py-2 first-of-type:!rounded-t-2xl last-of-type:!rounded-b-2xl ">
                  Tôi thích màu đen và thường mặc size S. Tôi cũng muốn có một
                  áo thoáng mát cho mùa hè này.
                </p> */}
              </div>
            </div>
          ))}
        </div>
        <div className="footer border-t border-solid border-gray-300 dark:border-slate-700 p-1">
          <div className="px-3 py-1 max-h-[150px] overflow-auto bg-gray-200 rounded dark:bg-slate-700 text-sm">
            {/* <p
              onInput={(ev) => {
                if (!ev.currentTarget.innerText.trim()) {
                  ev.currentTarget.innerHTML = '';
                }
                setValue(ev.currentTarget.innerHTML);
              }}
              contentEditable
              placeholder="Viết tin nhắn..."
              className=" py-1 min-h-[30px] outline-none after:text-gray-500 dark:after:text-slate-400 after:empty:content-[attr(placeholder)] after:absolute after:-translate-y-1/2 after:top-1/2 relative"
            ></p> */}
            <textarea
              placeholder="Viết tin nhắn..."
              className="bg-transparent outline-none w-full resize-none "
              name=""
              id=""
              rows={1}
              spellCheck={false}
              value={value}
              onChange={(ev) => setValue(ev.currentTarget.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex items-center border-t dark:border-slate-700 border-gray-300 py-1 px-2">
          <div className="flex items-center">
            <ButtonIconUploadImage transparent />
            <ButtoniconGIF transparent />
            <ButtoniconEmotion transparent />
          </div>
          <div className="ml-auto flex items-center">
            <Button
              type={value ? 'primary' : 'default'}
              disabled={!value}
              className="rounded-full px-5"
              size="small"
              onClick={() => {
                socket.emit(
                  ServerEvent.SendToUser,
                  {
                    userId: anotherUser?._id,
                    content: value,
                    conversation: conversation._id,
                  },
                  (message: Message) => {
                    // setMessages([...messages, message]);
                    receiverMessageEvent(message);
                    setValue('');
                  },
                );
              }}
            >
              Gửi
            </Button>
            <Dropdown
              placement="topRight"
              content={
                <Menu
                  menus={[
                    {
                      label: 'Nhấn Enter để gửi tin nhắn',
                    },
                    {
                      label: 'Nhấn nút để gửi tin nhắn',
                    },
                  ]}
                />
              }
            >
              <ButtonIconThreeDotAction transparent />
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

interface ModalGroupChatProps extends ModalProps {}

const ModalGroupChat: Atom<ModalGroupChatProps> = ({ ...props }) => {
  return (
    <Modal {...props} overlayCloseable width={400} title="Thành viên nhóm">
      <Tab
        className="pt-3 justify-around border-b dark:border-slate-700"
        itemClass="pb-3"
        menus={[{ label: 'Thành viên' }, { label: 'Ban quản trị' }]}
      />
      <div className="flex flex-col gap-4 px-4 py-5 max-h-[400px] overflow-auto">
        {Array.from(new Array(10)).map((_, i) => (
          <UserItem
            key={i}
            action={
              <>
                <Dropdown
                  placement="bottomRight"
                  content={
                    <Menu
                      menus={[
                        {
                          label: 'Xem trang cá nhân',
                        },
                        {
                          label: 'Nhắn tin',
                        },
                        {
                          label: 'Mời khỏi nhóm',
                        },
                      ]}
                    />
                  }
                >
                  <ButtonIconThreeDotAction />
                </Dropdown>
              </>
            }
          />
        ))}
      </div>
    </Modal>
  );
};
