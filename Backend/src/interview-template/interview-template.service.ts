import { Injectable } from "@/common/core/decorator/DI-IoC";
import { CreateInterviewTemplateInput } from './interview-template.type';
import { InterviewTemplate } from './interview-template.model';

@Injectable()
export class InterviewTemplateService {
    async createInterviewTemplate(input: CreateInterviewTemplateInput){
        let interview_Template = new InterviewTemplate(input);
        await interview_Template.save()
        return interview_Template
    }
    
    searchInterviewTemplate() {
        return InterviewTemplate.findOne();
    }
}