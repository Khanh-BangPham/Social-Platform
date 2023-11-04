import { useMutation } from "@tanstack/react-query";
import { fileService } from "../services/file";
import { postService } from "../services/post";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { IconArrow } from "./Icon/IconArrow";
import { ButtonIconImage } from "./Icon/IconImage";
import { Modal, ModalProps } from "./Modal";
import { FC, useEffect, useRef, useState } from "react";
import { SELECT_TEMPLATE, SELECT_USER, USER_LOGIN, setGlobalState, useGlobalState } from "../store/queryClient";
import { ButtonIconUser } from "./Icon/IconUser";
import { ModalSelectUser } from "./ModalSelectUser";
import { Space, Tag } from "antd";
import { interviewRoomService } from "@services/interview_room";

export interface ModalCreateInterviewRoomProps extends ModalProps {
  edit?: boolean;
  post?: Post;
  onSuccess?: (interviewTemplate: InterviewTemplate) => void;
  
  onCreateSuccess?: (user: User) => void;
  onEditSuccess?: () => void;
}

export const ModalCreateInterviewRoom: FC<ModalCreateInterviewRoomProps> = (props) => {
  let { edit, post } = props;

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState(post?.image || "");
  const [file, setFile] = useState<File>();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const user = useGlobalState(USER_LOGIN);
  const selected = useGlobalState(SELECT_USER);
  const [value, setValue] = useState(post?.content || "");
  const selected_user = useGlobalState(SELECT_USER);
  const selected_template = useGlobalState(SELECT_TEMPLATE);
  useEffect(() => {
    if (props.open) {
      inputRef.current?.focus();
    }
  }, [props.open]);
  const [open, setOpen] = useState(false);
  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        if(selected_user && selected_template) {
          let result = await interviewRoomService.addInterviewRoom({
            "intervieweeId": selected_user._id,
            "interview_templateId": selected_template,
          })
          props.onEditSuccess?.();
          props.onCancel?.();
          return result as unknown as Post;
        }
      } catch (error) {
        console.log(error)
      }
    },
  });

  return (
    <>
          <ModalSelectUser
        open={open}
        onCancel={() => setOpen(false)}
        onSelectSuccess={(user) => {
          setOpen(false);
          props?.onCreateSuccess?.(user);
        }}
        width={608}
        />
            <Modal {...props} title={edit ? "Chỉnh sửa cuộc phỏng vấn" : "Tạo cuộc phỏng vấn"}>
      <div className="p-3">
        <div className="flex gap-3 pb-2">
          <Avatar size={40} src={user?.avatar} />
          <div>
            <h3 className="font-bold">{user?.name}</h3>
            <Dropdown
              getPopupContainer={(parentNode) => parentNode}
              content={
                <div className="w-[200px]">
                  <div className="text-gray-900 text-opacity-80 p-2 cursor-pointer rounded hover:bg-black hover:bg-opacity-10 text-sm dark:text-gray-300 hover:text-opacity-100 dark:hover:text-white">
                    Công khai
                  </div>
                  <div className="text-gray-900 text-opacity-80 p-2 cursor-pointer rounded hover:bg-black hover:bg-opacity-10 text-sm dark:text-gray-300 hover:text-opacity-100 dark:hover:text-white">
                    Chỉ mình tôi
                  </div>
                  <div className="text-gray-900 text-opacity-80 p-2 cursor-pointer rounded hover:bg-black hover:bg-opacity-10 text-sm dark:text-gray-300 hover:text-opacity-100 dark:hover:text-white">
                    Chỉ bạn bè tôi
                  </div>
                  <div className="text-gray-900 text-opacity-80 p-2 cursor-pointer rounded hover:bg-black hover:bg-opacity-10 text-sm dark:text-gray-300 hover:text-opacity-100 dark:hover:text-white">
                    Ẩn danh
                  </div>
                </div>
              }
            >
              <Button size="small" className="flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye"
                  width={17}
                  height={17}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
                Only me{" "}
                <IconArrow
                  transparent
                  className="!w-3 h-fit !p-0 h-3 !bg-transparent"
                />
              </Button>
            </Dropdown>
          </div>
        </div>
        {!selected && <div className="flex border rounded-lg p-2 items-center mt-2">
          <p className="flex-1 text-sm">Chọn người tham gia</p>
          <ButtonIconUser
            onClick={() => setOpen(true)}
          />
        </div>}

        {selected && <Space size={[0, 8]} wrap>
          <Tag      
          closeIcon onClose={() => {
            setGlobalState(SELECT_USER, null)
          }}
          style={{ userSelect: 'none' }}>
            {selected.name}
            </Tag>
        </Space> 
        }
        <div className="mt-4">
          <Button
            onClick={() => mutate()}
            className="w-full"
            disabled={!(selected)}
            type={selected ? "primary" : "default"}
          >
            {edit ? "Chỉnh sửa" : "Tạo cuộc phỏng vấn"}
          </Button>
        </div>
      </div>
    </Modal>
    </>

  );
};
