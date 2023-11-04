import Joi from "joi";
import { CreateInterviewTemplateInput } from "./interview-template.type";
import { validateObjectId } from "@/common/utils/valdiate";

export const validateCreateInterviewsTemplateSchema = Joi.object<CreateInterviewTemplateInput>({
    managerId: Joi.string(),
    status: Joi.string(),
    
})