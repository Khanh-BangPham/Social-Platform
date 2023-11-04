import { Injectable } from "@/common/core/decorator/DI-IoC";
import { CreateInterviewAnswersInput } from './interview-answers.type';
import { InterviewAnswers } from './interview-answers.model';

@Injectable()
export class InterviewAnswersService {
    async createInterviewAnswers(input: CreateInterviewAnswersInput){
        let interview_answers = new InterviewAnswers(input);
        await interview_answers.save()
        return interview_answers
    }
    
    searchInterviewAnswers(createdBy: string, refId: string) {
        return InterviewAnswers.findOne({ createdBy, refId });
    }
}