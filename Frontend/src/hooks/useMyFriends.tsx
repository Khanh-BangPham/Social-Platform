import { FRIENDS } from '@constants/queryKey';
import { friendService } from '@services/friend';
import { USER_LOGIN, useGlobalState } from '@store/queryClient';
import { useQuery } from '@tanstack/react-query';
import { setUsers } from './useUser';

export const useMyFriends = () => {
  const user = useGlobalState(USER_LOGIN);
  return useQuery({
    queryKey: [FRIENDS],
    queryFn: async () => {
      let results = await friendService.getUserFriend(user?._id);
      let users: User[] = [];
      for (let friend of results) {
        let anotherUser =
          friend.sender._id === user?._id ? friend.receiver : friend.sender;
        users.push(anotherUser);
      }
      setUsers(users);
      return results;
    },
  });
};
