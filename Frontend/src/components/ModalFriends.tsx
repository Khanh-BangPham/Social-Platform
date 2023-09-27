import { useMyFriends } from '@hooks/useMyFriends';
import { FC } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { PATH } from '../constants/path';
import { friendService } from '../services/friend';
import { USER_LOGIN, useGlobalState } from '../store/queryClient';
import { Avatar } from './Avatar';
import { BorderGradient } from './BorderGradient';
import { Button } from './Button';
import { Modal, ModalProps } from './Modal';

export interface ModalFriendProps extends ModalProps {
  userId: string;
}

export const ModalFriends: FC<ModalFriendProps> = (props) => {
  const user = useGlobalState(USER_LOGIN);
  // const {
  //   data,
  //   isLoading,
  //   refetch: refetchGetMyFriend,
  // } = useQuery({
  //   queryKey: [FRIENDS],
  //   queryFn: () => friendService.getUserFriend(props.userId),
  // });
  let { data, isLoading, refetch: refetchGetMyFriend } = useMyFriends();
  console.log(data);

  return (
    <Modal
      title="Friends"
      onCancel={props.onCancel}
      open={props.open}
      width={500}
    >
      <div className="px-3 flex flex-col gap-3 py-3 max-h-[400px] overflow-auto">
        {data?.map((friend) => {
          let u =
            props.userId === friend.sender._id
              ? friend.receiver
              : friend.sender;
          return (
            <div
              key={friend._id}
              className="flex gap-2 items-center"
              onClick={() => {
                props.onCancel?.();
              }}
            >
              <Link
                to={generatePath(PATH.User, { _id: u._id })}
                className="flex gap-2 items-center"
              >
                <BorderGradient>
                  <div className="border-2 border-solid border-white rounded-full">
                    <Avatar src={u.avatar} size={40} />
                  </div>
                </BorderGradient>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {u.name}
                  </h3>
                  <p className="text-xs text-gray-500">{u.nickname}</p>
                </div>
              </Link>
              <Button
                className="ml-auto"
                onClick={async (ev) => {
                  ev.stopPropagation();
                  await friendService.cancelFriendRequest(u._id);
                  refetchGetMyFriend();
                }}
              >
                Hủy kết bạn
              </Button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
