import { Controller, Middlewares, Post, UseGuard, Validate } from "@/common/core/decorator";
import { Inject } from "@/common/core/decorator/DI-IoC";
import { validateCreateInterviewsTemplateSchema } from "./interview-template.valdiate-schema";
import { AuthRequest } from "@/common/@types";
import { BodyCreateInterviewTemplate } from "./interview-template.type";
import { HttpResponse } from "@/common/utils/HttpResponse";
import { random } from "lodash";
import { InterviewTemplateService } from "./interview-template.service";

@Controller("/interview-template")
@UseGuard()
export class InterviewTemplateController{
    @Inject(InterviewTemplateService) interviewTemplateService!: InterviewTemplateService;
    @Post("/add-template")
    @Validate(validateCreateInterviewsTemplateSchema)
    async createInterviewTemplate(req: AuthRequest<BodyCreateInterviewTemplate>){
        console.log(req.body)
        return HttpResponse.created(
            await this.interviewTemplateService.createInterviewTemplate({
                managerId: req.user,
                ...req.body
            })
        )
    }           

}
