import { ServerEvent } from '@constants/event';
import { socket } from '@socket';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { userStorage } from '../utils/createStorage';

export const POPUP_LOGIN = 'POPUP_LOGIN';
export const USER_LOGIN = 'USER_LOGIN';
export const SELECT_TEMPLATE = 'SELECT_TEMPLATE';
export const SELECT_ROOM = 'SELECT_ROOM';
export const SELECT_USER = 'SELECT_USER';
export const CONVERSATION = 'CONVERSATION';
export const USERS = 'USERS';
export const REFRESH_TOKEN = 'REFRESH_TOKEN'

export interface GlobalState {
  [POPUP_LOGIN]: boolean;
  [USER_LOGIN]?: User;
  [CONVERSATION]: Conversation[];
  [USERS]: User[];
  [REFRESH_TOKEN]: string;
  [SELECT_USER]?: any; 
  [SELECT_TEMPLATE]?: any;
  [SELECT_ROOM]?: any;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const setGlobalState = <T extends keyof GlobalState>(
  name: T,
  value: Required<GlobalState>[T],
) => {
  queryClient.setQueryData([name], value);
  queryClient.invalidateQueries([name]);
};

export const getGlobalState = <T extends keyof GlobalState>(
  name: T,
): GlobalState[T] => {
  return queryClient.getQueryData([name]) as GlobalState[T];
};

export const removeGlobalState = <T extends keyof GlobalState>(name: T) => {
  queryClient.setQueryData([name], null);
  queryClient.invalidateQueries([name]);
};

export const useGlobalState = <T extends keyof GlobalState>(
  name: T,
  defaultValue?: any,
): GlobalState[T] => {
  let { data } = useQuery({
    queryKey: [name],
    queryFn: () => {
      let value = getGlobalState(name) as any;
      if (typeof value === 'object')
        value.___id = Date.now() + '_' + Math.random();
      if (typeof value !== 'undefined') return value;

      if (typeof defaultValue !== 'undefined') return defaultValue;

      return null;
    },
  });
  return data as GlobalState[T];
};
let user = userStorage.get();

setGlobalState(POPUP_LOGIN, false);
setGlobalState(USER_LOGIN, user);
setGlobalState(CONVERSATION, []);
setGlobalState(USERS, []);

if (user) {
  setTimeout(() => {
    socket.emit(ServerEvent.Login, user._id);
  }, 1000);
}
