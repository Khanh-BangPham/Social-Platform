import { useQuery } from "@tanstack/react-query";
import { Avatar } from "./Avatar";
import { Card } from "./Card";
import { IconAddFriend } from "./Icon/IconAddFriend";
import { friendService } from "../services/friend";
import { Link, generatePath } from "react-router-dom";
import { PATH } from "../constants/path";
import { interviewRoomService } from "@services/interview_room";
import { ModalCreateInterviewRoom } from "./ModalCreateInterviewRoom";
import { FC, useState } from "react";
import { Button } from "antd";
import { SELECT_ROOM, setGlobalState } from "@store/queryClient";
import { INTERVIEW_ROOM } from "@constants/queryKey";
import { userService } from "@services/user";
import { IconApp } from "./Icon/IconApp";
import { ButtonIconCamera } from "./Icon/IconCamera";
export interface InterviewRoomProps {
  onSuccess?: (interviewTemplate: InterviewTemplate) => void;
}
export const InterviewRoom: FC<InterviewRoomProps> = (props) => {
  const { data } = useQuery({
    queryKey: [INTERVIEW_ROOM],
    queryFn: interviewRoomService.getRoom,
  });
  const [open, setOpen] = useState(false);
  return (
    <Card
      title="Your Interview Room"
      action={
        <a href="#" className="text-gray-400 font-semibold text-xs">
          See all
        </a>
      }
    >
      <ModalCreateInterviewRoom
        open={open}
        onCancel={() => setOpen(false)}
        onSuccess={(interviewTemplate) => {
          setGlobalState(SELECT_ROOM, null)
          setOpen(false);
          props?.onSuccess?.(interviewTemplate);
        }}
        width={608}
      />
      <div className="mt-4 flex flex-col gap-4">
      {data?.map((e) => (
          <div key={e._id} className="flex gap-2  items-center">
            <Link
              to="#"
              className="flex gap-2  items-center flex-1"
            >
              <div className="flex-1 ">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                  {e._id}
                </h4>
              </div>
            </Link>
            <Button className="border-none" onClick={() => setOpen(true)}><ButtonIconCamera /></Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
