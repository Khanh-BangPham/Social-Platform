import { useMutation, useQuery } from "@tanstack/react-query";
import { fileService } from "../services/file";
import { postService } from "../services/post";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { IconArrow } from "./Icon/IconArrow";
import { ButtonIconImage } from "./Icon/IconImage";
import { Modal, ModalProps } from "./Modal";
import { FC, useEffect, useRef, useState } from "react";
import { SELECT_USER, USER_LOGIN, setGlobalState, useGlobalState } from "../store/queryClient";
import { ButtonIconUser } from "./Icon/IconUser";
import { friendService } from "@services/friend";
import { FRIENDS, SELECT_FRIENDS } from "@constants/queryKey";
import { Link } from "react-router-dom";
import { useMyFriends } from "@hooks/useMyFriends";
import { Badge } from "antd";
import { interviewRoomService } from "@services/interview_room";

export interface ModalSelectUserProps extends ModalProps {
  edit?: boolean;
  post?: Post;
  onSelectSuccess?: (user: User) => void;
  onEditSuccess?: () => void;
}

export const ModalSelectUser: FC<ModalSelectUserProps> = (props) => {
  let { edit, post } = props;

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState(post?.image || "");
  const [selected, setSelected] = useState([]);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (props.open) {
      inputRef.current?.focus();
    }
  }, [props.open]);

  const { mutate } = useMutation({
    mutationFn: async (e: Friend) => {
        let userFriend = e.sender._id === user?._id ? e.receiver : e.sender;
        setGlobalState(SELECT_USER, userFriend)
        props.onSelectSuccess?.(userFriend);
        props.onCancel?.();
        return userFriend as unknown as User;
    },
  });
  const user = useGlobalState(USER_LOGIN);
  let {
    data: friends,
    isLoading,
    refetch: refetchGetMyFriend,
  } = useMyFriends();
  return (
    <Modal {...props} title={"Chọn người tham gia"} height={300}>
      <div className="p-3">
        <div className="flex gap-3 pb-2">
        {friends?.map((e, index) => {
              let userFriend =
                e.sender._id === user?._id ? e.receiver : e.sender;

              return (
                <div
                  key={index}
                  className="flex gap-2 items-center cursor-pointer w-full"
                  onClick={() => mutate(e)}
                >
                  <Badge>
                    <Avatar
                      showStatus
                      online={userFriend.online}
                      src={userFriend.avatar}
                      // userId={userFriend._id}
                    />
                  </Badge>
                  <div className="flex-1 ">
                    <h1 className="text-xs font-bold text-gray-900 dark:text-white">
                      {userFriend.name}
                    </h1>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Modal>
  );
};
