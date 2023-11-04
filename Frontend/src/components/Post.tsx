import { FC, useState, useRef } from "react";
import { Avatar } from "./Avatar";
import { IconBookmark } from "./Icon/IconBookmark";
import { IconComment } from "./Icon/IconComment";
import { ButtonIconHeart } from "./Icon/IconHeart";
import { IconShare } from "./Icon/IconShare";
import {
  ButtonIconThreeDotAction,
  IconThreeDotAction,
} from "./Icon/IconThreeDotAction";
import { Modal, ModalProps } from "./Modal";
import { Button } from "./Button";
import moment from "moment";
import { Link, generatePath } from "react-router-dom";
import { PATH } from "../constants/path";
import { Dropdown } from "./Dropdown";
import { ModalCreateEditPost } from "./ModalCreateEditPost";
import { USER_LOGIN, useGlobalState } from "../store/queryClient";
import { postService } from "../services/post";
import { reportService } from "../services/report";
import { ReporType } from "../@types/report";
import { commentService } from "../services/comment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { COMMENT } from "../constants/queryKey";
import { Menu } from "./Menu";
import { ENTER_KEY } from "../constants";
import { hideContentService } from "../services/hide-content";
import { postLikeService } from "@services/post-like";

export interface PostProps extends Post {
  onDeleteSuccess?: () => void;
  onEditSuccess?: () => void;
  onReportSuccess?: () => void;
  onHidePostSuccess?: () => void;
}

export const Post: FC<PostProps> = (props) => {
  const { content, image, author, createdAt, _id } = props;
  const user = useGlobalState(USER_LOGIN);
  const [open, setOpen] = useState(false);
  const userPath = generatePath(PATH.User, { _id: author._id });
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [isLike, setLike] = useState(false);
  const { data } = useQuery({
    queryKey: ["liked-post"],
    queryFn: async () => {
      // return await post
    }
  })
  const { mutate: likeAction } = useMutation({
    mutationFn: async () => {
      await postLikeService.createPostLike({
        createdBy: user?._id,
        refId: _id
      })
    }
  })
  return (
    <>
      <ModalDetail
        overlayCloseable
        open={open}
        onCancel={() => setOpen(false)}
        {...props}
      />
      <ModalCreateEditPost
        open={openModalCreate}
        onCancel={() => setOpenModalCreate(false)}
        width={608}
        post={props}
        onEditSuccess={props.onEditSuccess}
        edit
      />

      <div className="rounded-lg bg-white pb-4 dark:bg-slate-900">
        <div className="flex items-center gap-2 p-4">
          <Link to={userPath}>
            <Avatar src={author.avatar} />
          </Link>
          <div className="flex-1 -mt-1">
            <div className="flex gap-2 items-baseline">
              <Link to={userPath}>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {author.name}
                </h4>
              </Link>
              - <span className="text-sm">{moment(createdAt).fromNow()}</span>
            </div>
            <p className="text-gray-500 text-xs">HCM city, VN</p>
          </div>
          <div>
            <Dropdown
              placement="bottomRight"
              content={
                <Menu
                  menus={[
                    {
                      label: "Chỉnh sửa bài viết",
                      onClick: () => setOpenModalCreate(true),
                      enabled: author._id === user?._id,
                    },
                    {
                      onClick: async () => {
                        await postService.deletePost(_id);
                        props?.onDeleteSuccess?.();
                      },
                      label: "Xóa bài viết",
                      enabled: author._id === user?._id,
                    },
                    {
                      onClick: async () => {
                        await hideContentService.hidePost(_id);
                        props.onHidePostSuccess?.();
                      },
                      enabled: author._id !== user?._id,
                      label: "Ẩn bài viết",
                    },
                    {
                      label: "Báo cáo bài viết",
                      enabled: author._id !== user?._id,
                      onClick: async () => {
                        await reportService.createReport(_id, ReporType.Post);
                        props.onReportSuccess?.();
                      },
                    },
                  ]}
                />
              }
            >
              <ButtonIconThreeDotAction transparent />
            </Dropdown>
          </div>
        </div>
        {content && (
          <p className="px-5 mb-4 text-sm">
            {content}
          </p>
        )}
        <div className="overflow-hidden flex items-center max-h-[400px]">
          <a
            className="w-full"
            href="#"
            onClick={(ev) => {
              ev.preventDefault();
              setOpen(true);
            }}
          >
            <img className="w-full h-full object-cover" src={image} />
          </a>
        </div>
        <div className="flex items-center justify-between p-3">
          <div className="flex gap-0.5 ">
            <ButtonIconHeart liked={isLike} onClick={async () => {
              await likeAction()
              setLike(!isLike)
            }}/>
            
            <div className="flex gap-1 items-center text-xs">
              <IconComment /> {props.countComment}
            </div>
            <IconShare />
          </div>
          <div>
            <IconBookmark />
          </div>
        </div>
        <div className="flex px-5 gap-2 items-center">
          <p className="text-sm">
            <b>{props.countLike} likes</b>
          </p>
        </div>
      </div>
    </>
  );
};

export interface ModalPostDetail extends Post, ModalProps {}

const ModalDetail: FC<ModalPostDetail> = (props) => {
  let { content, image, author, _id, createdAt } = props;
  const { data: comments, refetch: refetchComment } = useQuery({
    queryKey: [`${COMMENT}${_id}`],
    queryFn: () => commentService.getComment(_id),
    enabled: props.open,
  });
  const [commentEdit, setCommentEdit] = useState<IComment>();
  const { mutate: actionSend } = useMutation({
    mutationFn: async () => {
      if (commentEdit) {
        await commentService.updatedComment(commentEdit._id, {
          content: value,
        });
        setCommentEdit(undefined);
      } else {
        await commentService.createComment({
          content: value,
          refId: _id,
        });
      }
      setValue("");
    },
  });

  const [value, setValue] = useState("");
  return (
    <Modal
      {...props}
      className="w-full max-h-[500px] h-full max-w-[900px] m-3"
      hideIconClose
    >
      <div className="flex h-full">
        <div className="flex-1 w-1 bg-black items-center flex">
          <img className="object-contain" src={image} />
        </div>
        <div className="flex-1 w-1 flex flex-col">
          <div className="flex gap-2 p-3 border-b border-solid border-gray-300 dark:border-slate-700">
            <Avatar size={40} />
            <div className="flex flex-col flex-1">
              <h3 className="text-sm font-bold">{author.name}</h3>
              <time className="text-gray-500 text-xs">
                {moment(createdAt).fromNow()}
              </time>
            </div>
            <div className="flex">
              <ButtonIconHeart />
              <IconShare />
              <IconBookmark />

              <ButtonIconThreeDotAction transparent />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {comments?.map((e) => (
              <UserComment
                onEdit={(comment) => {
                  setCommentEdit(comment);
                  setValue(comment.content);
                }}
                onDeleteSuccess={refetchComment}
                onHideCommentSuccess={refetchComment}
                onReportCommentSuccess={refetchComment}
                key={e._id}
                {...e}
              />
            ))}
          </div>
          <div className="">
            <div className="border-t border-solid border-gray-300 flex dark:border-slate-700">
              <input
                value={value}
                onChange={(ev) => setValue(ev.target.value)}
                placeholder="Add a comment..."
                className="outline-0 text-sm px-2 py-3 flex-1 bg-transparent"
              />
              <Button
                type={value ? "primary" : "default"}
                disabled={!value}
                className="rounded-none !px-10"
                onClick={async () => {
                  await actionSend();

                  //fetch comment
                  refetchComment();
                }}
              >
                Gửi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export interface CommentProps extends IComment {
  onEdit?: (comment: IComment) => void;
  onDeleteSuccess?: () => void;
  allowReply?: boolean;
  onHideCommentSuccess?: () => void;
  onReportCommentSuccess?: () => void;
}

export const UserComment: FC<CommentProps> = ({
  allowReply = true,
  ...props
}) => {
  const { content, createdAt, createdBy, refId, onEdit, _id, countReply } =
    props;
  const [openReply, setOpenReply] = useState(false);
  const [openReplyList, setOpenReplyList] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const user = useGlobalState(USER_LOGIN);
  const { data: replies, refetch: refetchReply } = useQuery({
    queryFn: () => commentService.getReplyComment(_id),
    enabled: openReplyList,
  });

  const { mutate } = useMutation({
    mutationFn: () => {
      return commentService.createComment({
        replyId: _id,
        content: value,
        refId,
      });
    },
  });

  let _countReply = replies?.countReply || countReply;
  return (
    <>
      <div
        ref={ref}
        className="flex gap-3 p-3 [&_.icon-action]:hover:opacity-100"
      >
        <Avatar src={createdBy.avatar} />
        <div className="flex-1">
          <div className="flex gap-2 items-center">
            <h3 className="text-sm font-bold">{createdBy.name} </h3>
            <time className="text-xs">{moment(createdAt).fromNow()}</time>
          </div>
          <p className="text-sm mb-2">{content}</p>
          <div className="flex gap-2 text-xs ">
            <a href="#" className="font-bold">
              2 Like
            </a>
            {allowReply && (
              <a
                href="#"
                className="font-bold"
                onClick={(ev) => {
                  ev.preventDefault();
                  setOpenReply(!openReply);
                }}
              >
                Reply
              </a>
            )}

            {allowReply && _countReply > 0 && (
              <a
                href="#"
                className="font-bold"
                onClick={(ev) => {
                  ev.preventDefault();
                  setOpenReplyList(!openReplyList);
                }}
              >
                Bình luận ({_countReply})
              </a>
            )}

            <Dropdown
              placement="bottomLeft"
              content={
                <Menu
                  menus={[
                    {
                      enabled: user?._id !== createdBy._id,
                      label: "Báo cáo bình luận",
                      onClick: async () => {
                        // onEdit?.(props);
                        await reportService.reportComment(_id);
                        props?.onReportCommentSuccess?.();
                      },
                    },
                    {
                      enabled: user?._id !== createdBy._id,
                      label: "Ẩn bình luận",
                      onClick: async () => {
                        // onEdit?.(props);
                        await hideContentService.hideComment(_id);
                        props?.onHideCommentSuccess?.();
                      },
                    },
                    {
                      enabled: user?._id === createdBy._id,
                      label: "Chỉnh sửa",
                      onClick: () => {
                        onEdit?.(props);
                      },
                    },
                    {
                      enabled: user?._id === createdBy._id,
                      label: "Xóa bình luận",
                      onClick: async () => {
                        await commentService.deleteComment(_id);
                        props.onDeleteSuccess?.();
                      },
                    },
                  ]}
                />
              }
            >
              <IconThreeDotAction className="ml-4 cursor-pointer icon-action opacity-0" />
            </Dropdown>
          </div>
          {openReply && (
            <div className="mt-2">
              <input
                value={value}
                onChange={(ev) => setValue(ev.target.value)}
                onKeyUp={async (ev) => {
                  if (ev.key === ENTER_KEY) {
                    if (value.trim()) {
                      await mutate();
                      setOpenReply(false);
                      setValue("");

                      setOpenReplyList(true);
                      refetchReply();
                    }
                  }
                }}
                placeholder="Bình luận...."
                className="w-full border text-sm p-2 rounded outline-none"
              />
            </div>
          )}

          {/* <div className="text-gray-400 flex items-baseline gap-2 cursor-pointer text-xs font-bold mt-4 before:content-normal before:block before:w-8 before:h-[1px] before:bg-gray-400">
          View replies (10)
        </div> */}
        </div>
        <ButtonIconHeart className="icon-action opacity-0" />
      </div>
      {openReplyList && (
        <div className="pl-10">
          {replies?.replys?.map((e) => (
            <UserComment
              onHideCommentSuccess={refetchReply}
              onReportCommentSuccess={refetchReply}
              allowReply={false}
              key={e._id}
              {...e}
            />
          ))}
        </div>
      )}
    </>
  );
};
