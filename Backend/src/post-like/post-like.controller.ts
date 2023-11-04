import { Controller, Post, UseGuard, Validate, Delete } from "@/common/core/decorator";
import { Inject } from "@/common/core/decorator/DI-IoC";
import { PostLikeService } from "./post-like.service";
import { validateCreatePostLikeSchema } from "./post-like.valdiate-schema";
import { AuthRequest } from "@/common/@types";
import { HttpResponse } from "@/common/utils/HttpResponse";
import { BodyCreatePostLike, BodyDeletePostLike } from "./post-like.type";
import { PostLike } from "./post-like.model"
@Controller("/post-like")
@UseGuard()
export class PostLikeController{
    @Inject(PostLikeService) postLikeService!: PostLikeService;

    @Post()
    @Validate(validateCreatePostLikeSchema)
    async createPostLike(req: AuthRequest<BodyCreatePostLike>){
        return HttpResponse.created(
            await this.postLikeService.createPostLike({
                createdBy: req.user,
                ...req.body
            })
        )
    }

    @Delete("\:id")
    async deletePostLike(req: AuthRequest<any, any, { id: string }>) {
        let post_like = await PostLike.findOne({
          _id: req.params.id,
          createdBy: req.user,
          refId: req.body.refId
        });
        if (post_like) {
          return HttpResponse.deleted(
            await PostLike.deleteOne({ _id: req.params.id })
          );
        }
    
        throw "Bạn không có quyền trên này biết này";
      }
}
