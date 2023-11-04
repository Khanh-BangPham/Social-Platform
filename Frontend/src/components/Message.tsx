import { ServerEvent } from '@constants/event';
import { useMyFriends } from '@hooks/useMyFriends';
import { socket } from '@socket';
import {
  CONVERSATION,
  USER_LOGIN,
  getGlobalState,
  setGlobalState,
  useGlobalState,
} from '@store/queryClient';
import { Link } from 'react-router-dom';
import { PATH } from '../constants/path';
import { Badge } from './Badge';
import { Card } from './Card';
import { Avatar } from './atoms/Avatar';
import { Tab } from './atoms/Tab';
import { friendService } from '@services/friend';
import { useQuery } from '@tanstack/react-query';

export const Message = () => {
  const user = useGlobalState(USER_LOGIN);
  let {
    data: friends,
    isLoading,
    refetch: refetchGetMyFriend,
  } = useMyFriends();
  return (
    <Card
      title="Messages"
      action={
        <Link
          to={PATH.Messenger}
          className="text-gray-400 font-semibold text-xs"
        >
          See all
        </Link>
      }
      className="h-[calc(100vh-130px)] flex flex-col"
    >
      <div className="flex flex-col flex-1 h-1">
        <div className="dark:bg-slate-800 flex mt-4 bg-gray-100 rounded-full items-center gap-2 px-2 text-gray-600 h-7">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search"
              width={17}
              height={17}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </span>

          <input
            placeholder="Search messages...."
            className="text-xs flex-1 placeholder:text-xs outline-none bg-transparent"
          />
        </div>
        <div className="flex justify-between items-baseline">
          <Tab
            className="gap-2 mt-2"
            itemClass="whitespace-nowrap"
            menus={[{ label: 'Bạn bè' }, { label: 'Nhóm' }]}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 h-full overflow-auto pt-2">
          <div className="flex flex-col gap-4">
            {friends?.map((e, index) => {
              let userFriend =
                e.sender._id === user?._id ? e.receiver : e.sender;

              return (
                <div
                  key={index}
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => {
                    socket.emit(
                      ServerEvent.Conversation,
                      {
                        users: [user?._id, userFriend._id],
                      },
                      (conversation: Conversation) => {
                        let conversations = getGlobalState(CONVERSATION) || [];
                        setGlobalState(CONVERSATION, [
                          ...conversations,
                          conversation,
                        ]);
                      },
                    );
                  }}
                >
                  <Badge>
                    <Avatar
                      showStatus
                      online={userFriend.online}
                      src={userFriend.avatar}
                      userId={userFriend._id}
                    />
                  </Badge>
                  <div className="flex-1 ">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      {userFriend.name}
                    </h4>
                    <p className="text-xs text-gray-500">Active 30m ago</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};
