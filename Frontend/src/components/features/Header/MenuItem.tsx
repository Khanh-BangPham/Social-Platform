export interface MenuItemProps {
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children?: any;
  suffix?: any;
  prefix?: any;
}
export const MenuItem: Atom<MenuItemProps> = ({ children, onClick }) => {
  return (
    <a
      onClick={(ev) => {
        ev.preventDefault();
        onClick?.(ev);
      }}
      href="#"
      className="px-2 py-2 rounded hover:bg-black font-semibold hover:bg-opacity-20 flex gap-3 items-center text-gray-900 dark:text-white"
    >
      {children}
    </a>
  );
};
