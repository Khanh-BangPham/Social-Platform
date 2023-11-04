import { Controller, Middlewares, Post, UseGuard, Validate } from "@/common/core/decorator";
import { Inject } from "@/common/core/decorator/DI-IoC";
import { validateCreateInterviewsQuestionSchema } from "./interview-question.valdiate-schema";
import { AuthRequest } from "@/common/@types";
import { CreateInterviewQuestionInput } from "./interview-question.type";
import { HttpResponse } from "@/common/utils/HttpResponse";
import { random } from "lodash";
import { InterviewQuestionService } from "./interview-question.service";

@Controller("/interview-question")
// @UseGuard()
export class InterviewQuestionController{
    @Inject(InterviewQuestionService) interviewQuestionService!: InterviewQuestionService;
    @Post()
    @Validate(validateCreateInterviewsQuestionSchema)
    async createInterviewQuestion(req: AuthRequest<CreateInterviewQuestionInput>){
        return HttpResponse.created(
            await this.interviewQuestionService.createInterviewQuestion({
                ...req.body
            })
        )
    }           

}
