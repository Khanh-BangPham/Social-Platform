import Joi from "joi";
import { CreateInterviewAnswersInput } from "./interview-answers.type";

export const validateCreateInterviewsAnswersSchema = Joi.object<CreateInterviewAnswersInput>({
    questionId: Joi.string(),
    interview_roomId: Joi.string(),
    content: Joi.string(),
})