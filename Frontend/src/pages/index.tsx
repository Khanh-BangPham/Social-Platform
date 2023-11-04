import { useQuery } from "@tanstack/react-query";
import { Activity } from "../components/Activity";
import { useAuth } from "../components/AuthProvider";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { GeneralInfo } from "../components/GeneralInfo";
import { Message } from "../components/Message";
import { NewPost } from "../components/NewPost";
import { Post } from "../components/Post";
import { Story } from "../components/Story";
import { InterviewTemplate} from "../components/InterviewTemplate";
import {
  POPUP_LOGIN,
  USER_LOGIN,
  setGlobalState,
  useGlobalState,
} from "../store/queryClient";
import { postService } from "../services/post";
import { InterviewRoom } from "@components/InterviewRoom";

export const Home = () => {
  // const { user } = useAuth();
  const user = useGlobalState(USER_LOGIN);
  const { data, refetch } = useQuery({
    queryKey: [],
    queryFn: postService.getPosts,
  });

  return (
    <div className="px-4 flex w-full gap-4 mt-4">
      <div className="w-sidebar flex gap-4 flex-col">
        {user ? (
          <>
            <Activity />
            <InterviewTemplate />
            <InterviewRoom />
          </>
        ) : (
          <>
            <div className="px-2">
              <p className="text-sm">
                Đăng nhập để thực hiện các hành động như like, comment, chia
                sẻ,...
              </p>
              <Button
                size="large"
                type="red"
                className="w-full mt-3"
                onClick={() => setGlobalState(POPUP_LOGIN, true)}
              >
                Đăng nhập
              </Button>
            </div>
          </>
        )}

        <GeneralInfo />
      </div>
      <div className="flex-1 w-1 pb-4 ">
        <div className="max-w-main-content mx-auto flex flex-col gap-4">
          {user && (
            <>
              <Story />
              <NewPost onSuccess={() => refetch()} />
            </>
          )}

          {data?.map((e) => (
            <Post
              key={e._id}
              {...e}
              onDeleteSuccess={refetch}
              onEditSuccess={refetch}
              onHidePostSuccess={refetch}
              onReportSuccess={refetch}
            />
          ))}
        </div>
      </div>
      <div className="w-sidebar flex gap-4 flex-col sticky self-end bottom-16">
        {user && <Message />}
      </div>
    </div>
  );
};
