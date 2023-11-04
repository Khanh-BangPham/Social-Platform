export interface CreateInterviewTemplateInput {
    managerId: string,
    status: string,
  }
  
export interface BodyCreateInterviewTemplate
  extends Omit<CreateInterviewTemplateInput, "managerId"> {}
  
  
  