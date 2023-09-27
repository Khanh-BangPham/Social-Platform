import { gql } from "@apollo/client";
import { api, client } from "../constants/api";

export interface CreatePostInput {
  content: string;
  image: string;
}

export interface UpdatePostInput extends Partial<CreatePostInput> {}

export const postService = {
  createPost(body: CreatePostInput) {
    return api.post<Post>("/post", body) as unknown as Post;
  },
  updatePost(id: string, body: UpdatePostInput) {
    return api.patch(`/post/${id}`, body);
  },
  deletePost(id: string) {
    return api.delete(`/post/${id}`);
  },
  hidePost(id: string) {
    return api.post(`/post/hide-post/${id}`);
  },
  async getPosts() {
    let res = await client.query<{ posts: Post[] }>({
      fetchPolicy: "no-cache",
      query: gql`
        query GetPosts {
          posts {
            _id
            author {
              _id
              name
              avatar
            }
            countComment
            content
            createdAt
            image
            updatedAt
          }
        }
      `,
    });
    return res.data.posts;
  },

  async getUserPosts(user: string) {
    let res = await client.query<{ posts: Post[] }>({
      fetchPolicy: "no-cache",
      query: gql`
        query GetUserPosts($user: String) {
          posts(user: $user) {
            _id
            author {
              _id
              name
              avatar
            }
            content
            createdAt
            image
            updatedAt
          }
        }
      `,
      variables: {
        user,
      },
    });
    return res.data.posts;
  },
};
