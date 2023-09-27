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
import { USER_LOGIN, useGlobalState } from "../store/queryClient";

export interface ModalCreateEditPostProps extends ModalProps {
  edit?: boolean;
  post?: Post;
  onCreateSuccess?: (post: Post) => void;
  onEditSuccess?: () => void;
}

export const ModalCreateEditPost: FC<ModalCreateEditPostProps> = (props) => {
  let { edit, post } = props;

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState(post?.image || "");
  const [file, setFile] = useState<File>();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const user = useGlobalState(USER_LOGIN);
  const [value, setValue] = useState(post?.content || "");
  useEffect(() => {
    if (props.open) {
      inputRef.current?.focus();
    }
  }, [props.open]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (edit && post) {
        let image = post?.image;
        if (file) {
          const fileRes = await fileService.uploadSingle(file);
          image = fileRes.url;
        }

        let result = await postService.updatePost(post._id, {
          content: value,
          image,
        });
        props.onEditSuccess?.();
        props.onCancel?.();
        return result as unknown as Post;
      } else {
        if (file) {
          const fileRes = await fileService.uploadSingle(file);

          let result = await postService.createPost({
            content: value,
            image: fileRes.url,
          });
          setValue("");
          props.onCreateSuccess?.(result);
          props.onCancel?.();
          return result as unknown as Post;
        }
      }
    },
  });

  return (
    <Modal {...props} title={edit ? "Chỉnh sửa bài viêt" : "Tạo bài viết"}>
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
        <div className="flex-1 overflow-auto max-h-[500px] min-h-[200px]">
          <div>
            <textarea
              ref={inputRef}
              placeholder="Bạn đang muốn nói điều gì với những người bạn quan tâm...."
              className="text-xl bg-transparent outline-none w-full resize-none placeholder:text-xl mt-3"
              name=""
              id=""
              rows={1}
              spellCheck={false}
              value={value}
              onChange={(ev) => setValue(ev.target.value)}
            ></textarea>
          </div>
          {src && (
            <div className="">
              <img className="w-full object-contain h-full" src={src} alt="" />
            </div>
          )}
        </div>
        <div className="flex border rounded-lg p-2 items-center mt-2">
          <p className="flex-1 text-sm">Chọn loại media</p>
          <ButtonIconImage
            onClick={() => {
              inputFileRef.current?.click();
            }}
          />
          <input
            onChange={(ev) => {
              if (ev.target.files?.[0]) {
                let reader = new FileReader();

                reader.onload = (ev) => {
                  setSrc(ev.target?.result as any);
                };
                setFile(ev.target.files?.[0]);
                reader.readAsDataURL(ev.target.files?.[0]);
              }
            }}
            ref={inputFileRef}
            hidden
            type="file"
          />
        </div>
        <div className="mt-4">
          <Button
            onClick={() => mutate()}
            className="w-full"
            disabled={!(file || src)}
            type={file || src ? "primary" : "default"}
          >
            {edit ? "Chỉnh sửa bài viết" : "Viết bài"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
