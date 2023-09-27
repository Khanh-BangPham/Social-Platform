import {
  USERS,
  getGlobalState,
  setGloablState,
  useGlobalState,
} from '@store/queryClient';

export const useUser = (userId?: string) => {
  let users = useGlobalState(USERS);
  if (userId) {
    let user = users.find((e) => e._id === userId);
    return user || null;
  }
  return null;
};

export const setUser = (user: User) => {
  let users = getGlobalState(USERS);
  let i = users.findIndex((e) => e._id === user._id);

  if (i === -1) {
    users.push(user);
  } else {
    users[i] = user;
  }

  setGloablState(USERS, [...users]);
};

export const setUsers = (listUser: User[]) => {
  let users = getGlobalState(USERS);

  for (let i in listUser) {
    let index = users.findIndex((e) => e._id === listUser[i]._id);

    if (index === -1) {
      users.push(listUser[i]);
    } else {
      users[index] = listUser[i];
    }
  }

  console.log(users);

  setGloablState(USERS, [...users]);
};
