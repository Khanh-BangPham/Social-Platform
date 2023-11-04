import { Injectable } from "@/common/core/decorator/DI-IoC";
import { CreateInterviewRoomInput } from './interview-room.type';
import { InterviewRoom } from './interview-room.model';

@Injectable()
export class InterviewRoomService {
    async createInterviewRoom(input: CreateInterviewRoomInput){
        let interview_Room = new InterviewRoom(input);
        await interview_Room.save()
        return interview_Room
    }
    
    searchInterviewRoom() {
        return InterviewRoom.findOne();
    }
}