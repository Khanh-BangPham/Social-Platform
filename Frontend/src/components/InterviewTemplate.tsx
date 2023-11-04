import { useQuery } from "@tanstack/react-query";
import { Avatar } from "./Avatar";
import { Card } from "./Card";
import { IconAddFriend } from "./Icon/IconAddFriend";
import { friendService } from "../services/friend";
import { Link, generatePath } from "react-router-dom";
import { PATH } from "../constants/path";
import { INTERVIEW_TEMPLATE } from "@constants/queryKey";
import { interviewTemplateService } from "@services/interview_template";
import { ModalCreateInterviewRoom } from "./ModalCreateInterviewRoom";
import { FC, useState } from "react";
import { Button } from "antd";
import { SELECT_TEMPLATE, setGlobalState } from "@store/queryClient";
import { ModalCreateInterviewQuestion } from "./ModalCreateInterviewQuestion";
export interface InterviewTemplateProps {
  onSuccess?: (interviewTemplate: InterviewTemplate) => void;
}
export const InterviewTemplate: FC<InterviewTemplateProps> = (props) => {
  const { data } = useQuery({
    queryKey: [INTERVIEW_TEMPLATE],
    queryFn: interviewTemplateService.getTemplate,
  });
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  return (
    <Card
      title="Your Interview Template"
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
          setGlobalState(SELECT_TEMPLATE, null)
          setOpen(false);
          props?.onSuccess?.(interviewTemplate);
        }}
        width={608}
      />
        <ModalCreateInterviewQuestion
        open={open1}
        onCancel={() => setOpen(false)}
        onSuccess={(interviewTemplate) => {
          setGlobalState(SELECT_TEMPLATE, null)
          setOpen1(false);
          props?.onSuccess?.(interviewTemplate);
        }}
        width={1000}
      />
      <div className="mt-4 flex flex-col gap-4">
        {data?.map((e) => (
          <div key={e._id} className="flex gap-2  items-center">
            <Link
              to="#"
              onClick={() => {setOpen1(true); setGlobalState(SELECT_TEMPLATE, e._id)}}
              className="flex gap-2  items-center flex-1"
            >
              <div className="flex-1 ">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                  {e.status}
                </h4>
              </div>
            </Link>
            <Button className="border-none" onClick={() => {setOpen(true); setGlobalState(SELECT_TEMPLATE, e._id)}}><IconAddFriend /></Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
