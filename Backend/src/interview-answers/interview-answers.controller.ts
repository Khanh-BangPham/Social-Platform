import { Controller, Middlewares, Post, UseGuard, Validate } from "@/common/core/decorator";
import { Inject } from "@/common/core/decorator/DI-IoC";
import { validateCreateInterviewsAnswersSchema } from "./interview-answers.valdiate-schema";
import { AuthRequest } from "@/common/@types";
import { BodyCreateInterviewAnswers } from "./interview-answers.type";
import { HttpResponse } from "@/common/utils/HttpResponse";
import { random } from "lodash";
import { InterviewAnswersService } from "./interview-answers.service";

@Controller("/interview-answers")
// @UseGuard()
export class InterviewAnswersController{
    @Inject(InterviewAnswersService) interviewAnswersService!: InterviewAnswersService;
    @Post()
    @Validate(validateCreateInterviewsAnswersSchema)
    async createInterviewAnswers(req: AuthRequest<BodyCreateInterviewAnswers>){
        return HttpResponse.created(
            await this.interviewAnswersService.createInterviewAnswers({
                questionId: random(10).toString(),
                interview_roomId: random(10).toString(),
                ...req.body
            })
        )
    }           

}
