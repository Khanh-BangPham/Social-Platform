import { Auth, Field, GraphQL, Param, Resolve } from "@/common/core/decorator";
import {PostLikeService} from "./post-like.service";
import { Inject } from "@/common/core/decorator/DI-IoC";

@GraphQL(
  `PostLike`,
  `
  _id: String!
  refId: String,
  createdBy: String
`
)

export class PostLikeSchema {
    @Inject(PostLikeService) postLikeService!: PostLikeService;
    @Resolve("postlike: PostLike")
    async postlike(@Param("createdBy") @Param("refId") refId: string, createdBy: string) {
      return await this.postLikeService.searchPostLike(createdBy, refId);
    }
}