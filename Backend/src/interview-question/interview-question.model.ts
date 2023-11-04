import { Schema, model } from "mongoose";

const InterviewQuestionSchema = new Schema(
    {
        templateId: String,
        content: String,
        similarQuestion: [{
            type: String,
            require: false
        }],
        sampleAnswer: [{
            type: String,
            require: false
        }],
        keyword: [{
            type: String,
            require: false
        }],
        format: String,
        kind: String
    }, 
    {
        timestamps: true
    }
)

export const InterviewQuestion = model('InterviewQuestion', InterviewQuestionSchema)