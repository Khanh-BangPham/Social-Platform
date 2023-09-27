import { ClientEvent } from '@constants/event';
import { setUser } from '@hooks/useUser';
import io from 'socket.io-client';

export const socket = io('http://localhost:8000');

socket.on('connect', () => {
  console.log(socket.id);
});

socket.on(ClientEvent.UpdateUser, (user: User) => {
  setUser(user);
});
