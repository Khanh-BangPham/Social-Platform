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
import { interviewQuestionService } from "@services/interview_question";
import { IconPlus } from "./Icon/IconPlus";
import { ModalCreateAnswerQuestion } from "./ModalCreateAnswerQuestion";

export interface ModalCreateInterviewQuestionProps extends ModalProps {
  edit?: boolean;
  post?: Post;
  onSuccess?: (interviewTemplate: InterviewTemplate) => void;
  onEditSuccess?: () => void;
}

export const ModalCreateInterviewQuestion: FC<ModalCreateInterviewQuestionProps> = (props) => {
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

    },
  });

  return (
    <>
        <ModalCreateAnswerQuestion
        open={open}
        onCancel={() => setOpen(false)}
        onSuccess={(interviewTemplate) => {
          setOpen(false);
          props?.onSuccess?.(interviewTemplate);
        }}
        width={1000}
        />
            <Modal {...props} title={edit ? "Chỉnh sửa cuộc phỏng vấn" : "Tạo cuộc phỏng vấn"}>
      <div className="p-3">
        <div className="flex border rounded-lg p-2 items-center mt-2">
          <p className="flex-1 text-sm">Thêm câu hỏi cho buổi phỏng vấn</p>
          <Button onClick={() => setOpen(true)}><IconPlus
           
          /></Button>
        </div>
        <div className="mt-4">
          <Button
            onClick={() => mutate()}
            className="w-full"
            disabled={!(selected)}
            type={selected ? "primary" : "default"}
          >
            {edit ? "Chỉnh sửa" : "Tạo gói câu hỏi"}
          </Button>
        </div>
      </div>
    </Modal>
    </>

  );
};
