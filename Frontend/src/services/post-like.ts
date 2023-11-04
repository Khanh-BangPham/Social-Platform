import { api, client } from "@constants/api"
import { gql } from "@apollo/client";
export interface PostLikeInput {
    createdBy?: string,
    refId: string
}

export const postLikeService = {
    createPostLike(body: PostLikeInput) {
        return api.post("/post-like", body)
    },
    search: async (c: string, r: string) => {
        let res = await client.query<{ postlike: PostLike }>({
          query: gql`
            query SearchPostLike($c: String, $r: String) {
              postlike(createdBy: $c, refId: $r) {
                _id
              }
            }
          `,
          variables: {
            c, r
          },
        });
        return res.data.postlike;
      }
}