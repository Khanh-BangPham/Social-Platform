import { Schema, model } from "mongoose";

const PostLikeSchema = new Schema(
    {
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        refId: {
            type: Schema.Types.ObjectId,
            require: true
        }
    }, 
    {
        timestamps: true
    }
)

export const PostLike = model("PostLike", PostLikeSchema)