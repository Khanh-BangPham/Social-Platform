import likeGif from '@assets/icon/like.gif';
import loveGif from '@assets/icon/love.gif';
import { Avatar } from '@components/atoms/Avatar';
import { cn } from '@utils';
import { Event } from '@utils/event';
import { MessageContextMenu } from './MessageContextMenu';
export interface MessageItemProps {
  myMessage?: boolean;
  content: any;
  img?: { id: string; thumbnail: string }[];
  url?: {
    title: string;
    image: string;
    link: string;
  };
}

const anotherMessageclass =
  '[&_.message]:bg-gray-700 [&_.message]:rounded-l [&_.message]:rounded-r-2xl [&_.wrap]:items-start [&_.reaction]:ml-auto';
const myMessageClass =
  '[&_.share-url]:text-left flex-row-reverse text-right [&_.message]:bg-primary [&_.avatar]:hidden [&_.message]:rounded-r [&_.message]:rounded-l-2xl [&_.wrap]:items-end [&_.reaction]:mr-auto [&_.reaction>div]:flex-row-reverse';

export const MessageItem: Atom<MessageItemProps> = ({
  myMessage,
  content,
  img,
  url,
}) => {
  return (
    <div
      onSelect={() => {
        console.log('select');
      }}
      className={cn('pl-2 pr-[1px] flex gap-2 mb-2', {
        [myMessageClass]: myMessage,
        [anotherMessageclass]: !myMessage,
      })}
      onContextMenu={(ev) => ev.preventDefault()}
    >
      <Avatar size={32} className="avatar" />
      <div className="wrap flex-1 inline-flex flex-col gap-[1px] max-w-[60%]">
        {img && (
          <div className="flex gap-1 flex-wrap overflow-hidden rounded-2xl">
            {img.map((e) => (
              <MessageContextMenu
                key={e.id}
                className="flex-[calc(100%/4)] cursor-pointer"
              >
                <img
                  onClick={() => Event.emit('OpenModalImage', {})}
                  className="w-full h-full"
                  src={e.thumbnail}
                />
              </MessageContextMenu>
            ))}
          </div>
        )}
        {content && (
          <MessageContextMenu>
            <p className="message text-sm text-white px-3 py-2 first-of-type:!rounded-t-2xl last-of-type:!rounded-b-2xl ">
              {content}
            </p>
          </MessageContextMenu>
        )}

        {url && (
          <MessageContextMenu className="share-url bg-black !bg-opacity-10 text-black dark:text-white dark:bg-white rounded-2xl overflow-hidden">
            <a href={url.link} target="_blank">
              <div className="">
                <img className="w-full -h-full object-cover" src={url.image} />
              </div>
              <h3 className="p-2 font-bold text-sm">{url.title}</h3>
            </a>
          </MessageContextMenu>
        )}
        {/* <p className="message text-sm text-white px-3 py-2 first-of-type:!rounded-t-2xl last-of-type:!rounded-b-2xl ">
                  Chào bạn! Tất nhiên, tôi rất vui được giúp bạn. Bạn có một số
                  sở thích cụ thể về mẫu mã, màu sắc hoặc thương hiệu nào không?
                </p>
                <p className="message text-sm text-white px-3 py-2 first-of-type:!rounded-t-2xl last-of-type:!rounded-b-2xl ">
                  Tôi thích màu đen và thường mặc size S. Tôi cũng muốn có một
                  áo thoáng mát cho mùa hè này.
                </p> */}
        <div className="flex gap-1 reaction ">
          <div className="flex gap-0.5 font-bold">
            <img
              className="w-4 cursor-pointer hover:scale-125 transition-all"
              src={likeGif}
            />
            <span className="text-small">10</span>
          </div>
          <div className="flex gap-0.5 font-bold text-red-500">
            <img
              className="w-4 cursor-pointer hover:scale-125 transition-all"
              src={loveGif}
            />
            <span className="text-small">1</span>
          </div>
          {/* 
          <div className="flex gap-0.5 pr-2 font-bold bg-gray-300 rounded-full dark:bg-slate-700">
            <img
              className="w-4 cursor-pointer hover:scale-125 transition-all"
              src={careGif}
            />
            <span className="text-small">1</span>
          </div>
          <div className="flex gap-0.5 pr-2 font-bold bg-gray-300 rounded-full dark:bg-slate-700">
            <img
              className="w-4 cursor-pointer hover:scale-125 transition-all"
              src={hahaGif}
            />
            <span className="text-small">1</span>
          </div>
          <div className="flex gap-0.5 pr-2 font-bold bg-gray-300 rounded-full dark:bg-slate-700">
            <img
              className="w-4 cursor-pointer hover:scale-125 transition-all"
              src={wowGif}
            />
            <span className="text-small">1</span>
          </div>
          <div className="flex gap-0.5 pr-2 font-bold bg-gray-300 rounded-full dark:bg-slate-700">
            <img
              className="w-4 cursor-pointer hover:scale-125 transition-all"
              src={sadGif}
            />
            <span className="text-small">1</span>
          </div>
          <div className="flex gap-0.5 pr-2 font-bold bg-gray-300 rounded-full dark:bg-slate-700">
            <img
              className="w-4 cursor-pointer hover:scale-125 transition-all"
              src={angryGif}
            />
            <span className="text-small">1</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};
