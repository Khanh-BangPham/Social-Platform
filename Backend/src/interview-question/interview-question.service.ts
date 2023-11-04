import { Injectable } from "@/common/core/decorator/DI-IoC";
import { CreateInterviewQuestionInput } from './interview-question.type';
import { InterviewQuestion } from './interview-question.model';

@Injectable()
export class InterviewQuestionService {
    async createInterviewQuestion(input: CreateInterviewQuestionInput){
        let interview_question = new InterviewQuestion(input);
        await interview_question.save()
        return interview_question
    }
    
    searchInterviewQuestion(createdBy: string, refId: string) {
        return InterviewQuestion.findOne({ createdBy, refId });
    }
}