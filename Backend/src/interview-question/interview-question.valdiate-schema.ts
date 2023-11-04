import Joi from "joi";
import { CreateInterviewQuestionInput } from "./interview-question.type";

export const validateCreateInterviewsQuestionSchema = Joi.object<CreateInterviewQuestionInput>({
    templateId: Joi.string(),
    content: Joi.string(),
    similarQuestion: Joi.array().items(Joi.string()),
    sampleAnswer: Joi.array().items(Joi.string()),
    keyword: Joi.array().items(Joi.string()),
    format: Joi.string().valid('multiple-choice', 'essay', 'orally', 'files'),
    kind: Joi.string()
})