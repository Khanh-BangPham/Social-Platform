import { Schema, model } from "mongoose";

const InterviewRoomSchema = new Schema(
    {
        intervieweeId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        interview_templateId: String,
        record: String,
        evaluate: Number
    }, 
    {
        timestamps: true
    }
)

export const InterviewRoom = model('InterviewRoom', InterviewRoomSchema)