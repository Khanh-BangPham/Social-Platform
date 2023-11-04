export interface CreateInterviewAnswersInput {
    questionId: string,
    interview_roomId: string,
    content: string,
  }
  
export interface BodyCreateInterviewAnswers
  extends Omit<CreateInterviewAnswersInput, "questionId" | "interview_roomId"> {}
  
  
  