import { FC, useState } from "react";
import { Modal, ModalProps } from "../../Modal";
import { Avatar } from "../../Avatar";
import { ButtonIconUser, IconUser } from "../../Icon/IconUser";
import { IconNotification } from "../../Icon/IconNotification";
import { IconApp } from "../../Icon/IconApp";
import { IconWorld } from "../../Icon/IconWorld";
import { ButtonIconCamera } from "../../Icon/IconCamera";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../../../services/user";
import { BLOCK_USER } from "../../../constants/queryKey";
import { Button } from "../../Button";
import { Switch } from "../../Switch";
import { USER_LOGIN, useGlobalState } from "../../../store/queryClient";

enum Menu {
  MyAccount = "MyAccount",
  Block = "Block",
}

export const ModalAbout: FC<ModalProps> = (props) => {
  const [menu, setMenu] = useState<Menu>(Menu.MyAccount);
  const user = useGlobalState(USER_LOGIN) as User;

  return (
    <Modal {...props} title="About">
      <div className="w-[900px] flex min-h-[700px]">
        <div className="bg-gray-50 w-[250px] dark:bg-slate-800 dark:bg-opacity-50">
          <h2 className="font-semibold text-sm p-3">Account</h2>
          <div className="px-3">
            <div className="flex gap-2 items-center">
              <Avatar />
              <div>
                <h3 className="text-sm font-bold ">Phạm Khánh Băng</h3>
                <p className="text-xs text-gray-500">
                  phamkhanhbang150902@gmail.com
                </p>
              </div>
            </div>
          </div>
          <div className="px-0.5 flex flex-col gap-0.5 mt-3">
            <a
              href="#"
              className="flex gap-2 items-center hover:bg-black hover:bg-opacity-10 py-1 rounded px-2.5"
              onClick={(ev) => {
                ev.preventDefault();
                setMenu(Menu.MyAccount);
              }}
            >
              <IconUser />
              <span className="text-sm">My account</span>
            </a>
            <a
              href="#"
              className="flex gap-2 items-center hover:bg-black hover:bg-opacity-10 py-1 rounded px-2.5"
            >
              <IconNotification />
              <span className="text-sm">My notifications & settings</span>
            </a>
            <a
              href="#"
              className="flex gap-2 items-center hover:bg-black hover:bg-opacity-10 py-1 rounded px-2.5"
            >
              <IconApp />
              <span className="text-sm">My connections</span>
            </a>
            <a
              href="#"
              className="flex gap-2 items-center hover:bg-black hover:bg-opacity-10 py-1 rounded px-2.5"
            >
              <IconWorld />
              <span className="text-sm">Language & region</span>
            </a>
            <a
              href="#"
              className="flex gap-2 items-center hover:bg-black hover:bg-opacity-10 py-1 rounded px-2.5"
              onClick={(ev) => {
                ev.preventDefault();
                setMenu(Menu.Block);
              }}
            >
              <IconWorld />
              <span className="text-sm">Chặn người dùng</span>
            </a>
          </div>
        </div>
        {menu === Menu.MyAccount && <MenuAbout user={user} />}

        {menu === Menu.Block && <MenuBlock />}
      </div>
    </Modal>
  );
};

export interface MenuAboutProps {
  user: User;
}
export const MenuAbout: FC<MenuAboutProps> = ({ user }) => {
  const [allowFollow, setAllowFollow] = useState(user.allowFollow);

  return (
    <div className="flex-1 px-10">
      <h2 className="font-bold py-5 border-b border-solid border-gray-300 dark:border-slate-700">
        My Account
      </h2>
      <div className="flex gap-4 mt-3">
        <div className="relative">
          <Avatar size={70} />
          <div className="absolute -right-1 -bottom-1">
            <ButtonIconCamera />
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          Họ và tên
          <input
            type="text"
            placeholder="Họ và tên"
            value={user.name}
            className="outline-none bg-gray-100 px-2 rounded border border-solid border-gray-300 text-sm py-1 w-60 dark:bg-slate-800 dark:border-slate-700"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={async () => {
            await userService.updateInfo({ allowFollow: !allowFollow });
            setAllowFollow(!allowFollow);
          }}
        >
          <p className="text-md">Cho phép theo dỗi</p>
          <Switch checked={allowFollow} />
        </div>
      </div>
    </div>
  );
};

export const MenuBlock = () => {
  const { data, refetch } = useQuery({
    queryFn: userService.getBlockUser,
    queryKey: [BLOCK_USER],
  });
  return (
    <div className="flex-1 px-10">
      <h2 className="font-bold py-5 border-b border-solid border-gray-300 dark:border-slate-700">
        Những người mà bạn block
      </h2>
      <div className="flex flex-col gap-4 mt-3">
        {data?.map((e) => (
          <div key={e._id} className="flex gap-2  items-center">
            <div className="flex gap-2  items-center flex-1">
              <Avatar src={e.avatar} />
              <div className="flex-1 ">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                  {e.name}
                </h4>
                <p className="text-xs text-gray-500">
                  Khoảng cách {Math.round(e.distance || 0)}m
                </p>
              </div>
            </div>
            <Button
              onClick={async () => {
                await userService.unblock(e._id);
                refetch();
              }}
              type="default"
            >
              Bỏ chặn
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
