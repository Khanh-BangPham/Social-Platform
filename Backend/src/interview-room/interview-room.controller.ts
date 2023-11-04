import { Controller, Middlewares, Post, UseGuard, Validate } from "@/common/core/decorator";
import { Inject } from "@/common/core/decorator/DI-IoC";
import { validateCreateInterviewsRoomSchema } from "./interview-room.valdiate-schema";
import { AuthRequest } from "@/common/@types";
import { CreateInterviewRoomInput } from "./interview-room.type";
import { HttpResponse } from "@/common/utils/HttpResponse";
import { random } from "lodash";
import { InterviewRoomService } from "./interview-room.service";

@Controller("/interview-room")
// @UseGuard()
export class InterviewRoomController{
    @Inject(InterviewRoomService) interviewRoomService!: InterviewRoomService;
    @Post("/add-room")
    @Validate(validateCreateInterviewsRoomSchema)
    async createInterviewRoom(req: AuthRequest<CreateInterviewRoomInput>){
        return HttpResponse.created(
            await this.interviewRoomService.createInterviewRoom({
                ...req.body
            })
        )
    }           

}
