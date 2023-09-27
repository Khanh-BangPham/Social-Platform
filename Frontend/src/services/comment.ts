import { gql } from "@apollo/client";
import { api, client } from "../constants/api";

export interface CreateCommentInput {
  refId: string;
  content?: string;
  image?: string;
  replyId?: string;
}

export interface UpdateCommentInput {
  content?: string;
  image?: string;
}
export const commentService = {
  createComment(body: CreateCommentInput) {
    return api.post("/comment", body);
  },
  updatedComment(id: string, body: UpdateCommentInput) {
    return api.patch(`/comment/${id}`, body);
  },
  deleteComment(id: string) {
    return api.delete(`/comment/${id}`);
  },
  async getComment(postId: string) {
    let res = await client.query<{ comments: IComment[] }>({
      fetchPolicy: "no-cache",
      query: gql`
        query ($refId: String!) {
          comments(refId: $refId) {
            _id
            content
            createdAt
            image
            refId
            countReply
            createdBy {
              avatar
              _id
              name
            }
          }
        }
      `,
      variables: {
        refId: postId,
      },
    });
    return res.data.comments;
  },
  async getReplyComment(id: string) {
    let res = await client.query<{
      comment: { replys: IComment[]; countReply: number };
    }>({
      fetchPolicy: "no-cache",
      query: gql`
        query ($commentId: String!) {
          comment(id: $commentId) {
            countReply
            replys {
              _id
              content
              createdAt
              createdBy {
                avatar
                name
                _id
              }
            }
          }
        }
      `,
      variables: {
        commentId: id,
      },
    });
    return res.data.comment;
  },
};
