import { IUser } from "@utils/mock";
import { Avatar } from "./Avatar";
export interface UserProps {
  action?: any;
  sub?: any;
  user: IUser;
}
export const UserItem: Atom<UserProps> = ({ action, sub, user }) => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar src={user.avatar} />
      <div className="flex-1 ">
        <h4 className="text-xs font-bold text-gray-900 dark:text-white">
          {user.fullName}
        </h4>
        <p className="text-xs text-gray-500">{sub}</p>
      </div>
      {action}
    </div>
  );
};
