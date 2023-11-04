import { Injectable } from "@/common/core/decorator/DI-IoC";
import { CreatePostLikeInput } from "./post-like.type";
import { PostLike } from "./post-like.model";

@Injectable()
export class PostLikeService {
    async createPostLike(input: CreatePostLikeInput){
        let post_like = new PostLike(input);
        await post_like.save()
        return post_like
    }
    
    searchPostLike(createdBy: string, refId: string) {
        return PostLike.findOne({ createdBy, refId });
    }
}