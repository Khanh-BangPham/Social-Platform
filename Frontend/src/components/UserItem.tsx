import { Avatar } from './Avatar';
export interface UserProps {
  action?: any;
  sub?: any;
}
export const UserItem: Atom<UserProps> = ({ action, sub }) => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar />
      <div className="flex-1 ">
        <h4 className="text-xs font-bold text-gray-900 dark:text-white">
          Lola Hines
        </h4>
        <p className="text-xs text-gray-500">{sub}</p>
      </div>
      {action}
    </div>
  );
};
