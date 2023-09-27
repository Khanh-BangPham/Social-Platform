import { useState } from "react";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Dropdown } from "../components/Dropdown";
import { Icon } from "../components/Icon/Icon";
import {
  ButtonIconThreeDotAction,
  IconThreeDotAction,
} from "../components/Icon/IconThreeDotAction";
import { ModalFriends } from "../components/ModalFriends";
import { NewPost } from "../components/NewPost";
import { Post } from "../components/Post";
import { ButtonIconCamera } from "../components/Icon/IconCamera";
import { ModalAbout } from "../components/features/About";
import { useQuery } from "@tanstack/react-query";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { GetProfileType, getUserProfile } from "../services";
import { userService } from "../services/user";
import { friendService } from "../services/friend";
import { USER_LOGIN, useGlobalState } from "../store/queryClient";
import { postService } from "../services/post";
import { message } from "antd";
import { PATH } from "../constants/path";
import { FOLLOWER } from "../constants/queryKey";

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const user = useGlobalState(USER_LOGIN);
  const navigate = useNavigate();
  const { _id = "" } = useParams<{ _id?: string }>();
  const { data, refetch: refetchCheckUser } = useQuery({
    queryKey: [`profile-${_id}`],
    queryFn: async () => {
      if (_id) {
        let res = await getUserProfile(_id);
        if (res.user === null) {
          navigate(PATH.Home);
        }

        return res;
      }

      return {
        user: await userService.getUser(),
        checkFriend: null,
      } as GetProfileType;
    },
  });

  const { data: follow, refetch: refetchFollow } = useQuery({
    queryFn: userService.getFollow,
    queryKey: [FOLLOWER],
    initialData: [],
  });

  const { data: posts, refetch } = useQuery({
    queryKey: [`user-post-${_id === "" ? user?._id : _id}`],
    queryFn: () =>
      postService.getUserPosts(_id === "" ? (user?._id as any) : _id),
  });

  return (
    <>
      <ModalFriends
        open={open}
        onCancel={() => setOpen(false)}
        userId={_id || (user?._id as any)}
      />
      <ModalAbout open={openAbout} onCancel={() => setOpenAbout(false)} />
      <div>
        <div className="bg-white dark:bg-slate-900">
          <div className="relative">
            <div className="w-full h-[400px]">
              <img
                className="object-cover w-full h-full"
                src={data?.user?.cover}
              />
            </div>
            <div className="container relative mx-auto">
              <div className="cursor-pointer hover:bg-opacity-60 absolute bottom-2 right-2 bg-black rounded bg-opacity-50 text-white  text-sm flex items-center px-2 py-0.5 drop-shadow-2xl shadow-white">
                <ButtonIconCamera
                  transparent
                  className="text-white hover:bg-transparent"
                />
                Thay đổi ảnh bìa
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4">
            <div className="flex gap-6 -mt-8 pb-8 border-b border-solid border-gray-300 px-4 dark:border-slate-700">
              <div className="relative shadow-[0_0_0_3px] shadow-white rounded-full dark:shadow-slate-900">
                <Avatar src={data?.user?.avatar} size={180} />
                <Icon className="absolute bottom-1 right-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-camera"
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
                    <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                    <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                  </svg>
                </Icon>
              </div>
              <div className="mt-auto">
                <h1 className="text-3xl font-bold">
                  {data?.user?.name}{" "}
                  {data?.user?.nickname && (
                    <span className="font-normal">
                      ({data?.user?.nickname})
                    </span>
                  )}
                </h1>
                <p className="text-gray-600 font-semibold">543 Friends</p>
                <div className="flex [&>*]:-ml-1 [&>*]:shadow-[0_0_0_2px] [&>*]:shadow-gray-200 [&>*]:rounded-full dark:[&>*]:shadow-slate-900 mt-2">
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                  <Avatar />
                </div>
              </div>

              <div className="flex items-end ml-auto">
                {data?.checkFriend === null &&
                  _id !== user?._id &&
                  _id !== "" && (
                    <Button
                      className="min-w-[200px]"
                      type="primary"
                      onClick={async () => {
                        await friendService.addFriend(_id);
                        refetchCheckUser();
                      }}
                    >
                      Kết bạn
                    </Button>
                  )}

                {data?.checkFriend?.confirm && (
                  <Button
                    className="min-w-[200px]"
                    type="red"
                    onClick={async () => {
                      await friendService.cancelFriendRequest(_id);
                      refetchCheckUser();
                    }}
                  >
                    Hủy bạn bè
                  </Button>
                )}

                {data?.checkFriend?.sender._id === user?._id &&
                  data?.checkFriend?.confirm == false && (
                    <Button
                      className="min-w-[200px]"
                      type="red"
                      onClick={async () => {
                        await friendService.cancelFriendRequest(_id);
                        refetchCheckUser();
                      }}
                    >
                      Hủy lời mời
                    </Button>
                  )}

                {data?.checkFriend?.sender._id === _id &&
                  data?.checkFriend?.confirm === false && (
                    <Button
                      className="min-w-[200px]"
                      type="primary"
                      onClick={async () => {
                        await friendService.confirm(_id);
                        refetchCheckUser();
                      }}
                    >
                      Đòng ý kết bạn
                    </Button>
                  )}
                {/* <div className="ml-4">
                  <Dropdown
                    placement="bottomRight"
                    content={
                      <div className="w-[200px]">
                        {user?._id !== _id && (
                          <div
                            onClick={() => {
                              userService.block(_id);
                            }}
                            className="p-2 text-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer rounded"
                          >
                            Chặn người dùng
                          </div>
                        )}
                      </div>
                    }
                  >
                    <ButtonIconThreeDotAction />
                  </Dropdown>
                </div> */}
              </div>
            </div>
          </div>

          <div className="container mx-auto flex px-4 pt-1 items-center">
            <div className="flex">
              <a
                href="#"
                className="flex items-center pb-4 font-bold text-blue-500 border-b-2 border-solid border-blue-500 px-3 pt-4"
              >
                Posts
              </a>
              {_id === "" && (
                <a
                  href="#"
                  className="flex items-center dark:border-slate-900 dark:hover:bg-slate-800 pb-4 text-gray-700 dark:text-gray-400 px-3 border-b-2 border-solid border-white hover:bg-gray-100 rounded pt-4"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setOpenAbout(true);
                  }}
                >
                  Tài khoản
                </a>
              )}
              {data?.user?.hideFriendList === false && (
                <a
                  onClick={(ev) => {
                    ev.preventDefault();
                    setOpen(true);
                  }}
                  href="#"
                  className="flex items-center dark:border-slate-900 dark:hover:bg-slate-800 pb-4 text-gray-700 dark:text-gray-400 px-3 border-b-2 border-solid border-white hover:bg-gray-100 rounded pt-4"
                >
                  Friends
                </a>
              )}

              <a
                href="#"
                className="flex items-center dark:border-slate-900 dark:hover:bg-slate-800 pb-4 text-gray-700 dark:text-gray-400 px-3 border-b-2 border-solid border-white hover:bg-gray-100 rounded pt-4"
              >
                Photos
              </a>
              <Dropdown
                arrow
                content={
                  <div className="w-[200px]">
                    <div className="p-2 text-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer rounded">
                      Followers
                    </div>
                    <div className="p-2 text-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer rounded">
                      Manage sections
                    </div>
                  </div>
                }
                className="dark:border-slate-900 dark:hover:bg-slate-800 pb-4 text-gray-700 dark:text-gray-400 px-3 border-b-2 border-solid border-white hover:bg-gray-100 rounded pt-4 cursor-pointer"
              >
                Xem thêm
              </Dropdown>
            </div>
            <div className="ml-auto">
              <Dropdown
                placement="bottomRight"
                content={
                  <div className="w-[200px]">
                    {_id && user?._id !== _id && (
                      <div
                        onClick={async () => {
                          await userService.block(_id);
                          message.success("Chặn user thành công");
                        }}
                        className="p-2 text-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer rounded"
                      >
                        Chặn người dùng
                      </div>
                    )}

                    {data?.user?.allowFollow && (
                      <>
                        {_id &&
                          user?._id !== _id &&
                          follow.findIndex((e) => e._id === _id) === -1 && (
                            <div
                              onClick={async () => {
                                await userService.follow(_id);
                                refetchFollow();
                              }}
                              className="p-2 text-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer rounded"
                            >
                              Theo dõi
                            </div>
                          )}

                        {_id &&
                          user?._id !== _id &&
                          follow.findIndex((e) => e._id === _id) != -1 && (
                            <div
                              onClick={async () => {
                                await userService.unfollow(_id);
                                refetchFollow();
                              }}
                              className="p-2 text-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer rounded"
                            >
                              Hủy theo dõi
                            </div>
                          )}
                      </>
                    )}
                  </div>
                }
              >
                <ButtonIconThreeDotAction />
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4 flex gap-4">
          <div className="relative flex">
            <div className="flex flex-col gap-4 w-[400px] sticky bottom-6 self-end">
              <Card title="Intro">
                <p className="text-center mt-2 mb-2">
                  There's no victory without sacrifice
                </p>
                <Button className="w-full">Edit bio</Button>
              </Card>
              <Card
                title="Photos"
                action={
                  <a
                    href="#"
                    className="dark:hover:bg-slate-800 text-blue-500 hover:bg-gray-100 rounded px-3 py-0.5"
                  >
                    See all photos
                  </a>
                }
              >
                <div className="mt-3 gap-3 grid grid-cols-3 flex-wrap">
                  {[...new Array(9)].map((_, i) => (
                    <a key={i} href="#" className="">
                      <div className="rounded-lg flex-1 overflow-hidden aspect-square">
                        <img
                          className="object-cover w-full h-full"
                          src={`https://unsplash.it/150/150?t=${Math.random()}`}
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </Card>
              <Card
                title="Friends"
                className="pb-6"
                action={
                  <a
                    href="#"
                    className="dark:hover:bg-slate-800 text-blue-500 hover:bg-gray-100 rounded px-3 py-0.5"
                  >
                    See all friends
                  </a>
                }
              >
                <p className="text-gray-600 dark:text-gray-400">
                  41 mutual friends
                </p>
                <div className="mt-3 gap-3 grid grid-cols-3 flex-wrap">
                  <a href="#" className="">
                    <div className="rounded-lg flex-1 overflow-hidden aspect-square">
                      <img
                        className="object-cover w-full h-full"
                        src={`https://unsplash.it/150/150?t=${Math.random()}`}
                      />
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      Ronald Peters
                    </p>
                  </a>
                  <a href="#" className="">
                    <div className="rounded-lg flex-1 overflow-hidden aspect-square">
                      <img
                        className="object-cover w-full h-full"
                        src={`https://unsplash.it/150/150?t=${Math.random()}`}
                      />
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      Mitchell Watkins
                    </p>
                  </a>
                  <a href="#" className="">
                    <div className="rounded-lg flex-1 overflow-hidden aspect-square">
                      <img
                        className="object-cover w-full h-full"
                        src={`https://unsplash.it/150/150?t=${Math.random()}`}
                      />
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      Cynthia Love
                    </p>
                  </a>
                  <a href="#" className="">
                    <div className="rounded-lg flex-1 overflow-hidden aspect-square">
                      <img
                        className="object-cover w-full h-full"
                        src={`https://unsplash.it/150/150?t=${Math.random()}`}
                      />
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      Todd Smith
                    </p>
                  </a>
                  <a href="#" className="">
                    <div className="rounded-lg flex-1 overflow-hidden aspect-square">
                      <img
                        className="object-cover w-full h-full"
                        src={`https://unsplash.it/150/150?t=${Math.random()}`}
                      />
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      Mabel Cannon
                    </p>
                  </a>
                  <a href="#" className="">
                    <div className="rounded-lg flex-1 overflow-hidden aspect-square">
                      <img
                        className="object-cover w-full h-full"
                        src={`https://unsplash.it/150/150?t=${Math.random()}`}
                      />
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      Lora Ruiz
                    </p>
                  </a>
                  <a href="#" className="">
                    <div className="rounded-lg flex-1 overflow-hidden aspect-square">
                      <img
                        className="object-cover w-full h-full"
                        src={`https://unsplash.it/150/150?t=${Math.random()}`}
                      />
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      Lilly Sims
                    </p>
                  </a>
                  <a href="#" className="">
                    <div className="rounded-lg flex-1 overflow-hidden aspect-square">
                      <img
                        className="object-cover w-full h-full"
                        src={`https://unsplash.it/150/150?t=${Math.random()}`}
                      />
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      Jerry Warren
                    </p>
                  </a>
                  <a href="#" className="">
                    <div className="rounded-lg flex-1 overflow-hidden aspect-square">
                      <img
                        className="object-cover w-full h-full"
                        src={`https://unsplash.it/150/150?t=${Math.random()}`}
                      />
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      Noah Bryan
                    </p>
                  </a>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex-1 rounded-lg flex gap-4 flex-col">
            <NewPost
              onSuccess={() => {
                refetch();
              }}
            />
            {posts?.map((e) => (
              <Post key={e._id} {...e} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
