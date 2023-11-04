import { Schema, model } from "mongoose";

const InterviewTemplateSchema = new Schema(
    {
        managerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        status: String,
    }, 
    {
        timestamps: true
    }
)

export const InterviewTemplate = model('InterviewTemplate', InterviewTemplateSchema)