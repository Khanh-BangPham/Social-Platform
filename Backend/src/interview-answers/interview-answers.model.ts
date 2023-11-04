import { Schema, model } from "mongoose";

const InterviewAnswersSchema = new Schema(
    {
        questionId: String,
        interview_roomId: String,
        content: String,
        
    }, 
    {
        timestamps: true
    }
)

export const InterviewAnswers = model('InterviewAnswers', InterviewAnswersSchema)