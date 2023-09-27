interface User {
  _id: string;
  name: string;
  avatar?: string;
  email: string;
  nickname: string;
  cover: string;
  hideFriendList: boolean;
  distance?: number;
  block: User[];
  follow: User[];
  allowFollow: boolean;
  online?: boolean;
}
