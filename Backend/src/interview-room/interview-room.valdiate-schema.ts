import Joi from "joi";
import { CreateInterviewRoomInput } from "./interview-room.type";

export const validateCreateInterviewsRoomSchema = Joi.object<CreateInterviewRoomInput>({
    intervieweeId: Joi.string(),
    interview_templateId: Joi.string(),
    record: Joi.string(),
    evaluate: Joi.number()
})