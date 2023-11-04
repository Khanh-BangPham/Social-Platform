import Joi from "joi";
import { CreatePostLikeInput } from "./post-like.type";

export const validateCreatePostLikeSchema = Joi.object<CreatePostLikeInput>({
    createdBy: Joi.string(),
    refId: Joi.string(),
})